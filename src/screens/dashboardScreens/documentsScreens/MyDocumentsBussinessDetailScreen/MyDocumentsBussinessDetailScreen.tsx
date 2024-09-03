import React, { useEffect, useMemo, useRef, useState } from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import { Keyboard } from "react-native"
import SelectCityModal from "components/SelectCityModal"
import MainModal from "components/MainModal"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import HeaderOnboarding from "components/HeaderOnboarding"
import DatePicker from "react-native-date-picker"
import PaymentMethodModal from "components/PaymentMethodModal"
import AttentionModalComponent from "components/AttentionModalComponent"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import { useTypedSelector } from "store"
import {
  useGetMyDocumentQuery,
  useLazyGetMyDocumentQuery,
  usePostProfilePhotoMutation,
  usePostResendTrustStickersMutation,
} from "services/api"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import {
  AddressType,
  AvailableTrustStickerType,
  PaymentMethodType,
} from "types"

// Libs & Utils
import moment from "moment"
import "moment/locale/ar"

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import colors from "styles/colors"
import EditIcon from "assets/icons/edit.svg"
import AttentionIcon from "assets/icons/attention.svg"
import CalendarIcon from "assets/icons/calendar.svg"
import {
  api,
  useGetTrustStickersQuery,
  usePostPaymentsTrustStickersMutation,
} from "services/api"
import WebView, { WebViewNavigation } from "react-native-webview"
import { useDispatch } from "react-redux"
import CloseIcon from "assets/icons/close.svg"
import CameraIcon from "assets/icons/camera.svg"
import { ImageOrVideo } from "react-native-image-crop-picker"
import SelectPhotosItem from "components/SelectPhotosItem"
import SelectDoPhotoModal from "components/SelectDoPhotoModal"

type Props = RootStackScreenProps<"my-documents-bussiness-detail">

type FormValuesType = {
  file?: ImageOrVideo
  notes?: string
}

const MyDocumentsBussinessDetailScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  const { address } = route.params
  // State
  const [isSelectCityModalVisible, setSelectCityModalVisible] = useState(false)
  const [isAttentionModalVisible, setAttentionModalVisible] = useState(false)
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const [isPaymentModalVisible, setPaymantModalVisible] = useState(false)
  const [isSelectPhotoModalVisible, setSelectPhotoModalVisible] =
    useState(false)
  const [currentTrustSticker, setCurrentTrustSticker] =
    useState<AvailableTrustStickerType>()

  const {
    control,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { isValid, errors },
  } = useForm<FormValuesType>()

  // Global Store
  const { language, user } = useTypedSelector((store) => store.auth)
  // Variables
  const dispatch = useDispatch()
  const { data: documents } = useGetMyDocumentQuery()

  const { t, i18n } = useTranslation()
  const insets = useSafeAreaInsets()
  const [postTrustStickers] = usePostPaymentsTrustStickersMutation()
  const { data } = useGetTrustStickersQuery()
  const [responseUrl, setResponseUrl] = useState("")
  const [postPhoto] = usePostProfilePhotoMutation()
  const [resendDoc] = usePostResendTrustStickersMutation()
  const docAvalibleItem = useMemo(() => {
    const avalibleItems = documents?.filter((item) => {
      if (item?.trustDocumentData?.trustProductId === currentTrustSticker?.id) {
        return true
      }
      return false
    })
    if (avalibleItems?.length) {
      return avalibleItems.pop()
    } else {
      return undefined
    }
  }, [documents, currentTrustSticker])

  const [getDocs] = useLazyGetMyDocumentQuery()

  const webViewRef = useRef<WebView>(null)
  // Refs
  // Methods
  const lastChange = useMemo(() => {
    return user?.address?.changedAt
      ? moment(user?.address?.changedAt).format(
          i18n.language === "ar" ? "YYYY/MM/DD hh.mmA" : "DD/MM/YYYY hh.mmA"
        )
      : t("never")
  }, [user?.address?.changedAt])
  // Handlers
  const handleOpenSelectModal = () => {
    setSelectCityModalVisible(true)
    Keyboard.dismiss()
  }

  const handleSelectPhoto = (item: ImageOrVideo) => {
    setValue("file", item, { shouldValidate: true })
  }

  const hadnleChangeCity = () => {
    handleOpenSelectModal()
  }

  const handleCloseSelectModal = () => {
    setSelectCityModalVisible(false)
  }
  let timeoutId: NodeJS.Timeout

  const handleWebViewNavigationStateChange = async (
    newNavState: WebViewNavigation
  ) => {
    if (newNavState.url.includes("/acceptance/post_pay")) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = await setTimeout(async () => {
        dispatch(api.util.resetApiState())
        setResponseUrl("")
      }, 4000)

      const response = await getDocs().unwrap()

      navigation.navigate("wait", {
        headerTitle: t("trust_stickers"),
        title: t("we_have_received_your_request"),
        descr: t("our_team_members_will_contact_descr"),
        customTimeTitle: t("this_process_may_take_business", {
          number1: 1,
          number2: 2,
        }),
        startHours: 2,
        endHours: 4,
        documents: response,
      })
    }
  }

  const handlePressPayment = async (type: PaymentMethodType) => {
    if (currentTrustSticker) {
      try {
        handleClosePayment()

        let resPhoto
        if (watch("file")) {
          resPhoto = await postPhoto(getValues("file")).unwrap()
        }
        if (resPhoto) {
          const res = await postTrustStickers({
            paymentMethod: type,
            id: currentTrustSticker?.id,
            photo: resPhoto?.storageKey,
            note: getValues("notes"),
          }).unwrap()
          setResponseUrl(res.paymentUrl)
        }
      } catch (e) {
        console.log("Post trust error: ", e)
      }
    }
  }

  const handleImgButtonPress = () => {
    setSelectPhotoModalVisible(true)
  }

  const handleCloseSelectPhotoModal = () => {
    setSelectPhotoModalVisible(false)
  }

  const handleOpenAttentionModal = () => {
    setAttentionModalVisible(true)
  }

  const handleCloseAttentionModal = () => {
    setAttentionModalVisible(false)
  }

  const handleOpenDatePicker = () => {
    setDatePickerVisible(true)
  }

  const handleCloseDatePicker = () => {
    setDatePickerVisible(false)
  }

  const handleSubmit = async () => {
    if (
      docAvalibleItem !== undefined &&
      currentTrustSticker &&
      docAvalibleItem?.files.length
    ) {
      try {
        let resPhoto
        if (watch("file")) {
          resPhoto = await postPhoto(getValues("file")).unwrap()
          await resendDoc({
            id: docAvalibleItem.id,
            fileKey: resPhoto?.storageKey,
          }).unwrap()
          const response = await getDocs().unwrap()

          navigation.navigate("wait", {
            headerTitle: t("trust_stickers"),
            title: t("we_have_received_your_information"),
            descr: t("we_will_verify_the_information_descr"),
            startHours: 2,
            endHours: 4,
            documents: response,
          })
        }
      } catch (e) {
        console.log("resend error: ", e)
      }
    } else {
      handleOpenPayment()
    }
  }

  const handleGoChangeLocatinScreen = () => {
    handleCloseAttentionModal()

    if (user?.address) {
      setTimeout(() => {
        navigation.navigate("my-account-new-address", {
          data: {
            address: user?.address!.streetAddress,
            city: user?.address!.city,
            governorate: user?.address!.governorate,
          },
          onSubmitGoBack: true,
        })
      }, 500)
    }
  }

  const handleClosePayment = () => {
    setPaymantModalVisible(false)
  }

  const handleOpenPayment = () => {
    setPaymantModalVisible(true)
  }

  const handleDeletePhoto = () => {
    setValue("file", undefined, { shouldValidate: true })
  }

  // Hooks

  useEffect(() => {
    const trust = data?.data?.filter(
      (fItem) =>
        fItem.type === "trust" &&
        fItem.descriptionEn === "Verified Business Seal"
    )

    if (trust?.length) {
      setCurrentTrustSticker(trust[0])
    }
  }, [data])

  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      {!responseUrl && (
        <>
          <HeaderOnboarding
            title={t("verified_nusiness")}
            isChevron
            className="px-[14] border-0 pb-[0]"
            classNameTitle="text-14 leading-[18px]"
            onBackComponent={<CloseIcon />}
          />
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 14,
              justifyContent: "space-between",
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <DmView>
              <DmText
                className={clsx(
                  "mt-[33] text-16 leading-[19px] font-custom600",
                  i18n.language === "ar" && "mt-[23]"
                )}
              >
                {t("your_business_address")}
              </DmText>
              <DmText className="mt-[9] text-13 leading-[16px] font-custom500">
                {user?.address?.streetAddress}
              </DmText>
              <DmText className="mt-[7] text-13 leading-[16px] font-custom500">
                {user?.address?.city}, {user?.address?.governorate}
              </DmText>
              <DmView
                className="mt-[10] flex-row items-center"
                onPress={handleOpenAttentionModal}
              >
                <DmText className="text-12 leading-[15px] font-custom400 text-grey2">
                  {t("last_update")} {lastChange}
                </DmText>
                <DmText className="ml-[10] text-13 leading-[16px] font-custom600 text-red">
                  [{t("change")}]
                </DmText>
              </DmView>
              <DmText
                className={clsx(
                  "mt-[30] text-16 leading-[19px] font-custom600",
                  i18n.language === "ar" && "mt-[20]"
                )}
              >
                {t("location_photo")}
              </DmText>
              <DmText className="mt-[5] text-13 leading-[16px] font-custom400">
                {t("upload_a_photo_of_your_business_location")}
              </DmText>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DmView
                    className={clsx(
                      "mt-[20] flex-row",
                      i18n.language === "ar" && "mt-[10]"
                    )}
                  >
                    {!value && (
                      <DmView
                        className={clsx(
                          "px-[13] justify-center items-center border-1 border-grey31 rounded-10"
                        )}
                        onPress={handleImgButtonPress}
                        style={styles.item}
                      >
                        <CameraIcon width={40} height={40} />
                        <DmText className="mt-[5] text-8 leading-[10px] text-center font-custom500">
                          {t("upload_photos")}
                        </DmText>
                      </DmView>
                    )}
                    {!!value && (
                      <SelectPhotosItem
                        item={value}
                        onDelete={handleDeletePhoto}
                        className="mb-[0]"
                      />
                    )}
                  </DmView>
                )}
                name="file"
              />
              <DmText
                className={clsx(
                  "mt-[30] text-15 leading-[19px] font-custom600",
                  i18n.language === "ar" && "mt-[20]"
                )}
              >
                {t("add_notes_optional")}
              </DmText>
              <DmText className="mt-[6] text-13 leading-[20px] font-custom400">
                {t("you_can_add_more_details_descr")}
              </DmText>
              <Controller
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DmInput
                    className="mt-[10]"
                    value={value}
                    onChangeText={onChange}
                    multiline
                  />
                )}
                name="notes"
              />
            </DmView>
            {isValid && (
              <DmView className="mt-[25] px-[6]">
                <ActionBtn
                  className="rounded-5 px-[0]"
                  title={t(
                    docAvalibleItem !== undefined ? "send" : "make_payment"
                  )}
                  onPress={handleSubmit}
                  textClassName="text-14 leading-[17px] font-custom600"
                />
              </DmView>
            )}
          </KeyboardAwareScrollView>

          <PaymentMethodModal
            isVisible={isPaymentModalVisible}
            onClose={handleClosePayment}
            onPress={handlePressPayment}
          />

          <SelectDoPhotoModal
            isVisible={isSelectPhotoModalVisible}
            onClose={handleCloseSelectPhotoModal}
            selectedPhoto={watch("file")}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setSelectedPhoto={handleSelectPhoto}
          />

          <AttentionModalComponent
            isVisible={isAttentionModalVisible}
            Icon={<AttentionIcon />}
            onClose={handleCloseAttentionModal}
            onPress={handleGoChangeLocatinScreen}
          />
        </>
      )}
      {!!responseUrl && (
        <WebView
          ref={webViewRef}
          source={{ uri: responseUrl }}
          style={{ flex: 1 }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
        />
      )}
    </SafeAreaView>
  )
}

export default MyDocumentsBussinessDetailScreen

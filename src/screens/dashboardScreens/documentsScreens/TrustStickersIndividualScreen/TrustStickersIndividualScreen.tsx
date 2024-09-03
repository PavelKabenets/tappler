import React, { useEffect, useMemo, useRef, useState } from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import CustomDatePicker from "components/CustomDatePicker"
import UploadLicenseComponent from "components/UploadLicenseComponent"
import SelectDoPhotoModal from "components/SelectDoPhotoModal"
import WebView, { WebViewNavigation } from "react-native-webview"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import {
  api,
  useGetMyDocumentQuery,
  useGetTrustStickersQuery,
  useLazyGetMyDocumentQuery,
  usePostPaymentsTrustStickersMutation,
  usePostProfilePhotoMutation,
  usePostResendTrustStickersMutation,
} from "services/api"
import { useDispatch } from "react-redux"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { ImageOrVideo } from "react-native-image-crop-picker"
import { AvailableTrustStickerType, PaymentMethodType } from "types"

// Libs & Utils
import moment from "moment"

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import PaymentMethodModal from "components/PaymentMethodModal"
import { Image } from "react-native"

type Props = RootStackScreenProps<"trust-stickers-individual">

type FormValueType = {
  date?: string
  file?: ImageOrVideo
  notes?: string
}

const TrustStickersIndividualScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  const { type } = route.params
  // State
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const [isSelectPhotoModalVisible, setSelectPhotoModalVisible] =
    useState(false)
  const [currentTrustSticker, setCurrentTrustSticker] =
    useState<AvailableTrustStickerType>()
  const [responseUrl, setResponseUrl] = useState("")
  const [isPaymentModalVisible, setPaymantModalVisible] = useState(false)

  const {
    control,
    watch,
    setValue,
    formState: { isValid },
    handleSubmit,
    getValues,
  } = useForm<FormValueType>()
  // Global Store
  // Variables
  const { data: documents } = useGetMyDocumentQuery()
  const { t, i18n } = useTranslation()
  const insets = useSafeAreaInsets()
  const [postPhoto] = usePostProfilePhotoMutation()
  const [getDocs] = useLazyGetMyDocumentQuery()
  const { data } = useGetTrustStickersQuery()
  const [postTrustStickers] = usePostPaymentsTrustStickersMutation()
  const dispatch = useDispatch()
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

  // Refs
  const webViewRef = useRef<WebView>(null)
  // Methods
  const onSelectPhoto = (item: ImageOrVideo) => {
    setValue("file", item, { shouldValidate: true })
  }

  const onSubmit = async () => {
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
  // Handlers
  const handleOpenSelectPhotoModal = () => {
    if (watch("file")) {
      setValue("file", undefined, { shouldValidate: true })
    } else {
      setSelectPhotoModalVisible(true)
    }
  }

  const handlePressPayment = async (type: PaymentMethodType) => {
    if (currentTrustSticker) {
      let resPhoto
      if (watch("file")) {
        resPhoto = await postPhoto(getValues("file")).unwrap()
      }
      if (resPhoto) {
        try {
          handleClosePayment()
          const res = await postTrustStickers({
            paymentMethod: type,
            id: currentTrustSticker?.id,
            photo: resPhoto?.storageKey,
            issueDate: moment(getValues("date"))
              .locale("en")
              .format("YYYY-MM-DD"),
            note: getValues("notes"),
          }).unwrap()
          setResponseUrl(res.paymentUrl)
        } catch (e) {
          console.log("Post trust error: ", e)
        }
      }
    }
  }

  let timeoutId: NodeJS.Timeout

  const handleWebViewNavigationStateChange = async (
    newNavState: WebViewNavigation
  ) => {
    if (newNavState.url.includes("/acceptance/post_pay")) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(async () => {
        dispatch(api.util.resetApiState())
        setResponseUrl("")
      }, 4000)
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
  }

  const handleCloseSelectPhotoModal = () => {
    setSelectPhotoModalVisible(false)
  }

  const handleClosePayment = () => {
    setPaymantModalVisible(false)
  }

  const handleOpenPayment = () => {
    setPaymantModalVisible(true)
  }

  // Hooks
  useEffect(() => {
    const trust = data?.data?.filter(
      (fItem) =>
        fItem.type === "trust" &&
        (type === "fingerpringts"
          ? fItem.descriptionEn === "Fingerprint Certificate"
          : fItem.descriptionEn === "Health Certificate." ||
            fItem.descriptionEn === "Health Certificate")
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
            title={
              type === "fingerpringts"
                ? t("fingerprints_certificate")
                : t("good_health_certificate")
            }
            onBackComponent={<CloseIcon />}
            className="px-[14]"
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
              <DmText className="mt-[28] text-15 leading-[19px] font-custom600">
                {t("issue_date_of_the_certificate")}
              </DmText>
              <DmText className="mt-[9] text-13 leading-[16px] font-custom400">
                {t("the_certificate_must_be_issued_within_the_last_30_days")}
              </DmText>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { value } }) => (
                  <DmInput
                    className="mt-[9]"
                    value={
                      value
                        ? moment(value)
                            .locale("en")
                            .format(
                              i18n.language === "ar"
                                ? "YYYY/MM/DD"
                                : "DD/MM/YYYY"
                            )
                        : ""
                    }
                    editable={false}
                    placeholder={t("issue_date")}
                    onPress={() => setDatePickerVisible(true)}
                  />
                )}
                name="date"
              />
              <DmText className="mt-[30] text-15 leading-[19px] font-custom600">
                {t("upload_copy_of_the_certificate")}
              </DmText>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { value } }) => (
                  <UploadLicenseComponent
                    className="mt-[15]"
                    photoUrl={value?.path || ""}
                    onPress={handleOpenSelectPhotoModal}
                    title={t("upload_certificate")}
                    titleActive={t("certificate_uploaded")}
                  />
                )}
                name="file"
              />
              <DmText className="mt-[30] text-15 leading-[19px] font-custom600">
                {t("add_notes_optional")}
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
              <DmText className="mt-[20] text-15 leading-[19px] font-custom600">
                {t("what_is_next")}
              </DmText>
              <DmText className="mt-[6] text-13 leading-[20px] font-custom400">
                {t("after_we_receive_your_request_descr")}
              </DmText>
            </DmView>
            {isValid && (
              <ActionBtn
                title={t(
                  docAvalibleItem !== undefined ? "send" : "make_payment"
                )}
                className="mt-[25] mx-[6] rounded-5"
                textClassName=" text-13 leading-[16px] font-custom600"
                onPress={handleSubmit(onSubmit)}
              />
            )}
          </KeyboardAwareScrollView>
          <CustomDatePicker
            open={isDatePickerVisible}
            date={moment(watch("date")).toDate()}
            modal
            mode="date"
            onConfirm={(date) => {
              setValue("date", moment(date).toISOString(), {
                shouldValidate: true,
              })
              setDatePickerVisible(false)
            }}
            onCancel={() => setDatePickerVisible(false)}
          />
          <SelectDoPhotoModal
            isVisible={isSelectPhotoModalVisible}
            onClose={handleCloseSelectPhotoModal}
            selectedPhoto={watch("file")}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setSelectedPhoto={onSelectPhoto}
          />
          <PaymentMethodModal
            isVisible={isPaymentModalVisible}
            onClose={handleClosePayment}
            onPress={handlePressPayment}
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

export default TrustStickersIndividualScreen

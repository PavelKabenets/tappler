import React, { useEffect, useMemo, useRef, useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import SelectDoPhotoModal from "components/SelectDoPhotoModal"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import HealthIcon from "assets/icons/health-certificate.svg"
import TradeLicenseIcon from "assets/icons/file.svg"
import CloseIcon from "assets/icons/close.svg"
import ClockIcon from "assets/icons/clock-red-big.svg"
import MastercardIcon from "assets/icons/mastercard.svg"
import VisaIcon from "assets/icons/visa.svg"
import FawryIcon from "assets/icons/fawry.svg"
import MeezaIcon from "assets/icons/meeza.svg"
import UploadLicenseComponent from "components/UploadLicenseComponent"
import { ImageOrVideo } from "react-native-image-crop-picker"
import CheckBlue from "assets/icons/check-blue.svg"
import { useTypedSelector } from "store"
import {
  api,
  useGetTrustStickersQuery,
  useLazyGetMyDocumentQuery,
  usePatchProsServiceCategoriesFoodDeliveryChargeMutation,
  usePostPaymentsTrustStickersMutation,
  usePostProfilePhotoMutation,
} from "services/api"
import { AvailableTrustStickerType, PaymentMethodType } from "types"
import WebView, { WebViewNavigation } from "react-native-webview"
import { useDispatch } from "react-redux"
import PaymentMethodModal from "components/PaymentMethodModal"
import FingerPrintIcon from "assets/icons/fingerprints.svg"

type Props = RootStackScreenProps<"my-documents-health">

const MyDocumentsHealthScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const isBusinnes = route.params?.isBusinnes
  const documents = route.params?.documents
  const isFingerPring = route.params?.isFingerPrint
  // State
  const [photo, setPhoto] = useState<ImageOrVideo>()
  const [isModalVisible, setModalVisible] = useState(false)
  const [currentTrustSticker, setCurrentTrustSticker] =
    useState<AvailableTrustStickerType>()
  const [responseUrl, setResponseUrl] = useState("")
  const [isPaymentModalVisible, setPaymantModalVisible] = useState(false)

  // Global Store
  const { user, token } = useTypedSelector((store) => store.auth)

  // Variables
  const { t, i18n } = useTranslation()
  const insets = useSafeAreaInsets()
  const dispatch = useDispatch()
  const [postTrustStickers] = usePostPaymentsTrustStickersMutation()
  const { data } = useGetTrustStickersQuery()
  const [postPhoto] = usePostProfilePhotoMutation()
  const [getDocs] = useLazyGetMyDocumentQuery()
  const docAvalibleId = useMemo(() => {
    const avalibleItems = documents?.filter((item) => {
      if (item?.trustDocumentData?.trustProductId === currentTrustSticker?.id) {
        return true
      }
      return false
    })
    if (avalibleItems?.length) {
      const item = avalibleItems.pop()
      return item?.trustDocumentData?.trustProductId
    } else {
      return undefined
    }
  }, [documents, currentTrustSticker])

  // Refs
  const webViewRef = useRef<WebView>(null)

  // Methods
  // Handlers
  const handleOpenModal = () => {
    if (photo) {
      setPhoto(undefined)
    } else {
      setModalVisible(true)
    }
  }

  const handleClosePayment = () => {
    setPaymantModalVisible(false)
  }

  const handleOpenPayment = () => {
    setPaymantModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handlePressPayment = async (type: PaymentMethodType) => {
    if (currentTrustSticker) {
      let resPhoto
      if (photo) {
        resPhoto = await postPhoto(photo).unwrap()
      }
      if (resPhoto) {
        try {
          handleClosePayment()
          const res = await postTrustStickers({
            paymentMethod: type,
            id: currentTrustSticker?.id,
            photo: resPhoto?.storageKey,
          }).unwrap()
          setResponseUrl(res.paymentUrl)
        } catch (e) {
          console.log("Post trust error: ", e)
        }
      }
    }
  }

  const handleFinish = () => {
    navigation.navigate("my-documents", { documents })
  }
  let timeoutId: NodeJS.Timeout

  const handleWebViewNavigationStateChange = (
    newNavState: WebViewNavigation
  ) => {
    if (!isBusinnes) {
      if (newNavState.url.includes("/acceptance/post_pay")) {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(async () => {
          dispatch(api.util.resetApiState())
          setResponseUrl("")
          await getDocs().unwrap()
        }, 4000)
        navigation.navigate("wait", {
          headerTitle: t("trust_stickers"),
          title: t("we_have_received_your_information"),
          descr: t("we_will_verify_the_information_descr"),
          startHours: 2,
          endHours: 4,
          documents,
        })
      }
    }
  }

  const handleSubmit = async () => {
    if (!isBusinnes || isFingerPring) {
      navigation.navigate("trust-stickers-individual", {
        type: isFingerPring ? "fingerpringts" : "health",
      })
    } else {
      if (user?.address) {
        navigation.navigate("my-documents-bussiness-detail", {
          address: user?.address,
        })
      }
    }
  }
  // Hooks
  useEffect(() => {
    const trust = data?.data?.filter(
      (fItem) =>
        fItem.type === "trust" &&
        ((isFingerPring
          ? fItem.descriptionEn === "Fingerprint Certificate"
          : fItem.descriptionEn === "Health Certificate." ||
            fItem.descriptionEn === "Health Certificate") ||
          isBusinnes && fItem.descriptionEn === "Verified Business Seal")
    )
    if (trust?.length) {
      setCurrentTrustSticker(trust[0])
    }
  }, [data])

  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      {!responseUrl && (
        <>
          <DmView>
            <HeaderOnboarding
              title={t("trust_stickers")}
              isChevron
              className="px-[12]"
            />
            <DmView className="mt-[35] items-center">
              {!isBusinnes ? (
                <>
                  {isFingerPring ? (
                    <FingerPrintIcon width={78} height={78} />
                  ) : (
                    <HealthIcon width={78} height={78} />
                  )}
                </>
              ) : (
                <CheckBlue width={80} height={80} />
              )}
            </DmView>
            <DmView className="px-[14]">
              <DmText className="mt-[22] text-20 leading-[24px] font-custom600 text-center">
                {t(
                  isBusinnes
                    ? "verified_business_seal"
                    : isFingerPring
                      ? "fingerprints_certificate"
                      : "good_health_certificate"
                )}
              </DmText>
              <TitleRegistrationFlow
                descr={t(
                  isBusinnes
                    ? "verified_company_is_a_seal_added_to_your_profile_descr"
                    : isFingerPring
                      ? "to_earn_background_checked_sticker_you_must_descr"
                      : "the_health_certificate_is_one_of_the_important_documents_descr"
                )}
                classNameDescr={clsx(
                  "mt-[18] text-13 leading-[20px]",
                  i18n.language === "ar" && "mt-[10]"
                )}
              />
              <TitleRegistrationFlow
                classNameTitle={clsx("text-14 leading-[18px]")}
                title={t(
                  isBusinnes
                    ? "how_do_i_get_my_business_verified"
                    : "why_do_i_need_to_provide_this_document"
                )}
                descr={t(
                  isBusinnes
                    ? "to_get_your_business_verified_descr"
                    : isFingerPring
                      ? "providing_this_document_will_grant_descr"
                      : "providing_this_document_will_grant_you_descr"
                )}
                classNameDescr="text-13 leading-[20px]"
                className={clsx(
                  "mt-[14]",
                  isBusinnes && "mt-[28]",
                  i18n.language === "ar" && "mt-[18]"
                )}
              />
              <TitleRegistrationFlow
                title={t("setup_fee")}
                classNameTitle="text-14 leading-[18px]"
                descr={t("number_inclusive_of_VAT_this_fee_doesnt", {
                  number:
                    docAvalibleId !== undefined
                      ? 0
                      : currentTrustSticker?.pricePerYear || 0,
                })}
                classNameDescr="text-13 leading-[20px]"
                className={clsx(
                  "mt-[14]",
                  isBusinnes && "mt-[24]",
                  i18n.language === "ar" && "mt-[14]"
                )}
              />
              <TitleRegistrationFlow
                title={t("accepted_payments")}
                classNameTitle="text-14 leading-[18px]"
                className={clsx(
                  "mt-[14]",
                  isBusinnes && "mt-[24]",
                  i18n.language === "ar" && "mt-[14]"
                )}
              />
              <DmView className="mt-[5] flex-row items-center">
                <MastercardIcon />
                <DmView className="mx-[4]">
                  <VisaIcon />
                </DmView>
                <FawryIcon />
                <DmView className="ml-[4]">
                  <MeezaIcon />
                </DmView>
              </DmView>
              {isBusinnes && (
                <TitleRegistrationFlow
                  title={t("location_photo")}
                  descr={t("upload_photos_of_your_business_location")}
                  classNameDescr="text-13 leading-[20px]"
                  className={clsx(
                    "mt-[14]",
                    isBusinnes && "mt-[24]",
                    i18n.language === "ar" && "mt-[14]"
                  )}
                />
              )}
            </DmView>
          </DmView>
          <ActionBtn
            title={t("continue")}
            onPress={handleSubmit}
            className="mx-[20] rounded-5"
            textClassName="text-13 leading-[16px] font-custom600"
          />
          <SelectDoPhotoModal
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            selectedPhoto={photo}
            setSelectedPhoto={setPhoto}
            isPdf
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

export default MyDocumentsHealthScreen

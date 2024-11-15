import React, { useEffect, useMemo, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import MyServiceDetailItem from "components/MyServiceDetailItem"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import FingerPrintIcon from "assets/icons/fingerprints.svg"
import IdCardIcon from "assets/icons/id-card-documents.svg"
import HealthSertificateIcon from "assets/icons/health-certificate.svg"
import colors from "styles/colors"
import ChevronRighttIcon from "assets/icons/chevron-right.svg"
import {
  useCheckCameraPermissions,
  useRequestCameraPermissions,
} from "hooks/permissionHooks"
import { openAlert } from "utils/goSettigsAlert"
import ImageCropPicker, { ImageOrVideo } from "react-native-image-crop-picker"
import MainModal from "components/MainModal"
import SelectDoPhotoModal from "components/SelectDoPhotoModal"
import ShieldIcon from "assets/icons/shield-close.svg"
import GreenCheckIcon from "assets/icons/check-circle-green.svg"
import { useTypedSelector } from "store"
import TradeLicenseIcon from "assets/icons/trade-license.svg"
import BlueCheckIcon from "assets/icons/check-blue.svg"
import { I18nManager } from "react-native"
import FileIcon from "assets/icons/list.svg"
import BigCheckIcon from "assets/icons/check-mark-big.svg"
import { useGetMyDocumentQuery } from "services/api"
import { useIsFocused } from "@react-navigation/native"

type Props = RootStackScreenProps<"my-documents">

const MyDocumentsScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { documents } = route.params
  // State
  const [cardPhoto, setCardPhoto] = useState<ImageOrVideo>()

  const [isAccountActiveModalVisible, setAccountActiveModalVisible] =
    useState(false)
  const [isRequestModalVisible, setRequestModalVisible] = useState(false)
  const [isPhotoModalVisible, setPhotoModalVisible] = useState(false)
  const [isActiveModalVisible, setActiveModalVisible] = useState(false)
  const [activeModalDescr, setActiveModalDescr] = useState("")
  const [isTrustStickerModalVisible, setTrustStickerModalVisible] =
    useState(false)
  // Global Store
  const { user } = useTypedSelector((store) => store.auth)
  // Variables
  const { t } = useTranslation()
  const isFocused = useIsFocused()
  const checkCameraPermission = useCheckCameraPermissions
  const requestCammeraPermission = useRequestCameraPermissions
  const { data: documentsData } = useGetMyDocumentQuery(undefined, {
    pollingInterval: 10000,
  })

  useEffect(() => {
    if (documentsData && isFocused) {
      navigation.setParams({ documents: documentsData })
    }
  }, [documentsData, isFocused])

  const idStatus = useMemo(() => {
    const arr = Array.isArray(documents) ? documents : [documents]
    if (arr.length) {
      return arr?.filter((item) => item?.type === "id").pop()?.status ===
        "inactive"
        ? "incomplete"
        : arr?.filter((item) => item?.type === "id").pop()?.status ||
            "incomplete"
    }
    return "incomplete"
  }, [documents])

  const companyTradeLicenseStatus = useMemo(() => {
    const arr = Array.isArray(documents) ? documents : [documents]
    if (arr.length) {
      return arr?.filter((item) => item?.type === "companyTradeLicense").pop()
        ?.status === "inactive"
        ? "incomplete"
        : arr?.filter((item) => item?.type === "companyTradeLicense").pop()
            ?.status || "incomplete"
    }
    return "incomplete"
  }, [documents])

  const companyTrustFingerPrintsStatus = useMemo(() => {
    const arr = Array.isArray(documents) ? documents : [documents]
    if (arr.length) {
      const currentArr = arr?.filter(
        (item) =>
          item?.type === "trust" &&
          item?.trustDocumentData?.trustProduct?.descriptionEn ===
            "Fingerprint Certificate"
      )

      const item = currentArr.pop()?.status

      return item === "inactive" ? "incomplete" : item || "incomplete"
    } else {
      return "incomplete"
    }
  }, [documents])

  const companyHealthtatus = useMemo(() => {
    const arr = Array.isArray(documents) ? documents : [documents]

    if (arr.length) {
      const currentArr = arr?.filter(
        (item) =>
          item?.type === "trust" &&
          (item.trustDocumentData?.trustProduct?.descriptionEn ===
            "Health Certificate." ||
            item.trustDocumentData?.trustProduct?.descriptionEn ===
              "Health Certificate")
      )

      const item = currentArr.pop()?.status

      return item === "inactive" ? "incomplete" : item || "incomplete"
    }
    return "incomplete"
  }, [documents])

  const companyTrustStickersStatus = useMemo(() => {
    const arr = Array.isArray(documents) ? documents : [documents]

    if (arr.length) {
      const currentArr = arr?.filter(
        (item) =>
          item?.type === "trust" &&
          item.trustDocumentData?.trustProduct?.descriptionEn ===
            "Verified Business Seal"
      )
      const item = currentArr.pop()?.status

      return item === "inactive" ? "incomplete" : item || "incomplete"
    }
    return "incomplete"
  }, [documents])

  // Refs  // Methods
  // Handlers
  const handlePressIdentificationCard = async () => {
    const res = await checkCameraPermission()
    if (!res) {
      const resRequest = await requestCammeraPermission()

      if (resRequest) {
        navigation.navigate("my-documents-identity")
      } else {
        setTimeout(() => {
          openAlert({
            title: t("permission_denied"),
            descr: t("please_grant_camera_permission_descr"),
            btnText: t("settings"),
            cancelText: t("cancel"),
          })
        }, 400)
      }
    } else {
      navigation.navigate("my-documents-identity")
    }
  }

  const handleFingerprints = () => {
    if (user?.accountStatus !== "active") {
      return handleOpenAccountActiveModal()
    }

    return handleGoodHealth(true)
  }

  const handleGoodHealth = (isFingerPrint?: boolean) => {
    if (isFingerPrint) {
      return navigation.navigate("my-documents-health", {
        isBusinnes: false,
        documents,
        isFingerPrint,
      })
    }
    if (user?.proType === "company") {
      navigation.navigate("my-documents-health", {
        isBusinnes: true,
        documents,
      })
    } else {
      navigation.navigate("my-documents-health", {
        isBusinnes: false,
        documents,
      })
    }
  }

  const handleOpenAccountActiveModal = () => {
    setAccountActiveModalVisible(true)
  }

  const handleCloseAccountActiveModal = () => {
    setAccountActiveModalVisible(false)
  }

  const handleOpenRequestModal = () => {
    setRequestModalVisible(true)
  }

  const handleCloseRequestModal = () => {
    setRequestModalVisible(false)
  }

  const handleOpenTrustModal = () => {
    setTrustStickerModalVisible(true)
  }

  const handleCloseTrustModal = () => {
    setTrustStickerModalVisible(false)
  }

  const handlePressTrustStickers = () => {
    if (user?.proType !== "company") {
      if (
        (user?.accountStatus === "active" &&
          (companyTrustFingerPrintsStatus === "incomplete" ||
            companyTrustFingerPrintsStatus === "rejected")) ||
        user?.proType === "individual" && user?.accountStatus === "active"
      ) {
        return handleGoodHealth()
      }
    } else {
      if (
        user?.accountStatus === "active" &&
        (companyTrustStickersStatus === "incomplete" ||
          companyTrustStickersStatus === "rejected")
      ) {
        return handleGoodHealth()
      }
    }

    if (user?.accountStatus !== "active") {
      handleOpenAccountActiveModal()
    } else {
      handleOpenTrustModal()
    }
  }

  const handleOpenActiveModal = (type: "id" | "license") => {
    if (type === "id") {
      setActiveModalDescr(t("your_identification_card_is_on_file"))
    } else {
      setActiveModalDescr(t("your_business_trade_license_is_on_file"))
    }
    setActiveModalVisible(true)
  }

  const handleCloseActiveModal = () => {
    setActiveModalVisible(false)
  }

  const handleOpenPhotoModal = () => {
    setPhotoModalVisible(true)
  }

  const handleClosePhotoModal = () => {
    setPhotoModalVisible(false)
  }

  const handleTradeLicense = () => {
    navigation.navigate("trade-license")
  }
  // Hooks
  useEffect(() => {
    navigation.setParams({ documents: documentsData })
  }, [documentsData])
  // Listeners
  // Render Methods
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={t("my_documents")}
        className="px-[12]"
        isChevron
      />
      <DmView className="mt-[23] px-[14]">
        <TitleRegistrationFlow
          title={t("account_activation_documents")}
          descr={t("account_activation_documents_descr")}
          classNameTitle="text-20 leading-[24px]"
          classNameDescr="text-13 leading-[17px]"
        />
        <MyServiceDetailItem
          title={t("identification_card")}
          descr={t("your_valid_national_identification_card")}
          titleBtn={t(idStatus || "incomplete")}
          onPress={
            idStatus === "incomplete" || idStatus === "rejected"
              ? handlePressIdentificationCard
              : idStatus === "active" || idStatus === "approved"
                ? () => handleOpenActiveModal("id")
                : handleOpenRequestModal
          }
          Icon={<IdCardIcon />}
          btnVariant={
            idStatus !== "incomplete" && idStatus !== "rejected"
              ? "grey"
              : idStatus === "rejected"
                ? "yellow"
                : undefined
          }
          classNameTitle="text-15 leading-[19px]"
          classNameDescr="mt-[1] text-12 leading-[20px]"
          isCenterIcon
          className="mt-[10] mr-[0] border-0.5 border-grey14 rounded-5"
          RightIcon={
            <DmView className={clsx(I18nManager.isRTL && "scale-x-[-1]")}>
              <ChevronRighttIcon stroke={colors.red} width={18} height={18} />
            </DmView>
          }
          IconDone={<GreenCheckIcon />}
          isDoneIconVisible={idStatus === "active" || idStatus === "approved"}
        />
        {user?.proType === "company" && (
          <MyServiceDetailItem
            title={t("trade_license")}
            descr={t("trade_license_is_one_of_descr")}
            titleBtn={t(companyTradeLicenseStatus || "incomplete")}
            onPress={
              companyTradeLicenseStatus === "incomplete" ||
              companyTradeLicenseStatus === "rejected"
                ? handleTradeLicense
                : companyTradeLicenseStatus === "active" ||
                    companyTradeLicenseStatus === "approved"
                  ? () => handleOpenActiveModal("license")
                  : handleOpenRequestModal
            }
            btnVariant={
              companyTradeLicenseStatus !== "incomplete" &&
              companyTradeLicenseStatus !== "rejected"
                ? "grey"
                : companyTradeLicenseStatus === "rejected"
                  ? "yellow"
                  : undefined
            }
            Icon={<FileIcon />}
            classNameTitle="text-15 leading-[19px]"
            classNameDescr="mt-[1] text-12 leading-[20px]"
            isCenterIcon
            className="mt-[10] mr-[0] border-0.5 border-grey14 rounded-5"
            RightIcon={
              <DmView className={clsx(I18nManager.isRTL && "scale-x-[-1]")}>
                <ChevronRighttIcon stroke={colors.red} width={18} height={18} />
              </DmView>
            }
            IconDone={<GreenCheckIcon />}
            isDoneIconVisible={
              companyTradeLicenseStatus === "active" ||
              companyTradeLicenseStatus === "approved"
            }
          />
        )}
        <TitleRegistrationFlow
          className="mt-[33]"
          title={t("trust_stickers_documents")}
          descr={t("add_trust_stickers_to_your_profile")}
          classNameTitle="text-20 leading-[24px]"
          classNameDescr="text-13 leading-[17px]"
        />
        {user?.proType === "individual" && (
          <>
            <MyServiceDetailItem
              title={t("fingerprints_certificate")}
              descr={t("add_background_checked_to_your_profile_descr")}
              onPress={
                companyTrustFingerPrintsStatus === "incomplete" ||
                companyTrustFingerPrintsStatus === "rejected"
                  ? handleFingerprints
                  : handleOpenRequestModal
              }
              titleBtn={t(
                companyTrustFingerPrintsStatus === "incomplete"
                  ? ""
                  : companyTrustFingerPrintsStatus
              )}
              Icon={<FingerPrintIcon />}
              IconDone={<GreenCheckIcon />}
              btnVariant={
                companyTrustFingerPrintsStatus !== "incomplete" &&
                companyTrustFingerPrintsStatus !== "rejected"
                  ? "grey"
                  : companyTrustFingerPrintsStatus === "rejected"
                    ? "yellow"
                    : undefined
              }
              isDoneIconVisible={
                companyTrustFingerPrintsStatus === "active" ||
                companyTrustFingerPrintsStatus === "approved"
              }
              classNameTitle="text-15 leading-[19px]"
              classNameDescr="mt-[1] text-12 leading-[20px]"
              isCenterIcon
              className="mt-[20] mr-[0] border-0.5 border-grey14 rounded-5"
              RightIcon={
                <DmView className={clsx(I18nManager.isRTL && "scale-x-[-1]")}>
                  <ChevronRighttIcon
                    stroke={colors.red}
                    width={18}
                    height={18}
                  />
                </DmView>
              }
            />
            <MyServiceDetailItem
              title={t("good_health_certificate")}
              descr={t("add_health_checked_sticker_to_your_descr")}
              onPress={
                companyHealthtatus === "rejected" ||
                companyHealthtatus === "incomplete"
                  ? handlePressTrustStickers
                  : handleOpenRequestModal
              }
              Icon={<HealthSertificateIcon />}
              classNameTitle="text-15 leading-[19px]"
              classNameDescr="mt-[1] text-12 leading-[20px]"
              isCenterIcon
              className="mt-[10] mr-[0] border-0.5 border-grey14 rounded-5"
              RightIcon={
                <DmView className={clsx(I18nManager.isRTL && "scale-x-[-1]")}>
                  <ChevronRighttIcon
                    stroke={colors.red}
                    width={18}
                    height={18}
                  />
                </DmView>
              }
              titleBtn={t(
                companyHealthtatus === "incomplete" ? "" : companyHealthtatus
              )}
              IconDone={<GreenCheckIcon />}
              btnVariant={
                companyHealthtatus !== "incomplete" &&
                companyHealthtatus !== "rejected"
                  ? "grey"
                  : companyHealthtatus === "rejected"
                    ? "yellow"
                    : undefined
              }
              isDoneIconVisible={
                companyHealthtatus === "active" ||
                companyHealthtatus === "approved"
              }
            />
          </>
        )}
        {user?.proType === "company" && (
          <MyServiceDetailItem
            title={t("verified_business_seal")}
            descr={t("verification_seal_to_show_descr")}
            onPress={handlePressTrustStickers}
            Icon={<BlueCheckIcon width={24} height={24} />}
            classNameTitle="text-15 leading-[19px]"
            classNameDescr="mt-[1] text-12 leading-[20px]"
            isCenterIcon
            className="mt-[10] mr-[0] border-0.5 border-grey14 rounded-5"
            RightIcon={
              <DmView className={clsx(I18nManager.isRTL && "scale-x-[-1]")}>
                <ChevronRighttIcon stroke={colors.red} width={18} height={18} />
              </DmView>
            }
            titleBtn={t(
              companyTrustStickersStatus === "incomplete"
                ? ""
                : companyTrustStickersStatus
            )}
            IconDone={<GreenCheckIcon />}
            btnVariant={
              companyTrustStickersStatus !== "incomplete" &&
              companyTrustStickersStatus !== "rejected"
                ? "grey"
                : companyTrustStickersStatus === "rejected"
                  ? "yellow"
                  : undefined
            }
            isDoneIconVisible={
              companyTrustStickersStatus === "active" ||
              companyTrustStickersStatus === "approved"
            }
            classNameIcon="items-center"
          />
        )}
      </DmView>
      <MainModal
        isVisible={isAccountActiveModalVisible}
        onClose={handleCloseAccountActiveModal}
        className="py-[30] px-[18]"
        title={t("account_not_active")}
        descr={t("before_adding_trust_stickers_you_must_activate_descr")}
        classNameTitle="mt-[17] text-20 leading-[24px]"
        classNameDescr="text-13 leading-[20px] font-custom500"
        Icon={<ShieldIcon />}
      />
      <MainModal
        isVisible={isRequestModalVisible}
        onClose={handleCloseRequestModal}
        title={t("your_request_is_being_reviewed")}
        descr={t("we_are_reviewing_the_documents_that_you_sent_descr")}
        className="pt-[35] pb-[21] px-[21]"
        classNameTitle="mt-[0] text-16 leading-[19px]"
        classNameDescr="mx-[30] text-13 leading-[18px] font-custom400"
        titleBtn={t("close")}
        onPress={handleCloseRequestModal}
        classNameBtn="mt-[22]"
        classNameActionBtnText="text-13 leading-[16px] font-custom600"
      />
      <MainModal
        isVisible={isTrustStickerModalVisible}
        onClose={handleCloseTrustModal}
        title={t("your_request_is_being_processed")}
        descr={t("please_expect_a_response_as_soon_as_possible")}
        className="pt-[35] pb-[21] px-[21]"
        classNameTitle="mt-[0] text-16 leading-[19px]"
        classNameDescr="mx-[30] text-13 leading-[18px] font-custom400"
        titleBtn={t("close")}
        onPress={handleCloseTrustModal}
        classNameBtn="mt-[22]"
        classNameActionBtnText="text-13 leading-[16px] font-custom600"
      />
      <SelectDoPhotoModal
        isVisible={isPhotoModalVisible}
        onClose={handleClosePhotoModal}
        selectedPhoto={cardPhoto}
        setSelectedPhoto={setCardPhoto}
        isPdf
      />
      <MainModal
        isVisible={isActiveModalVisible}
        onClose={handleCloseActiveModal}
        descr={activeModalDescr}
        Icon={<BigCheckIcon />}
        onPress={handleCloseActiveModal}
        titleBtn={t("close")}
        classNameBtn="mt-[10] h-[41]"
        classNameActionBtnText="text-13 leading-[16px] font-custom600"
        classNameDescr="mt-[10] text-13 leading-[20px] mx-[20] font-custom500"
        className="py-[35] px-[21]"
      />
    </SafeAreaView>
  )
}

export default MyDocumentsScreen

import React, { useState } from "react"

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

type Props = RootStackScreenProps<"my-documents-health">

const MyDocumentsHealthScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const isBusinnes = route.params?.isBusinnes
  const documents = route.params?.documents
  // State
  const [photo, setPhoto] = useState<ImageOrVideo>()
  const [isModalVisible, setModalVisible] = useState(false)
  // Global Store
  const { user, token } = useTypedSelector((store) => store.auth)

  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  // Refs
  // Methods
  // Handlers
  const handleOpenModal = () => {
    if (photo) {
      setPhoto(undefined)
    } else {
      setModalVisible(true)
    }
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleFinish = () => {
    navigation.navigate("my-documents", { documents })
  }

  const handleSubmit = () => {
    if (!isBusinnes) {
      navigation.navigate("wait", {
        headerTitle: t("trust_stickers"),
        title: t("we_have_received_your_information"),
        descr: t("we_will_verify_the_information_descr"),
        startHours: 2,
        endHours: 4,
        documents,
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
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <DmView>
        <HeaderOnboarding
          title={t("trust_stickers")}
          isChevron
          className="px-[12]"
        />
        <DmView className="mt-[35] items-center">
          {!isBusinnes ? (
            <HealthIcon width={78} height={78} />
          ) : (
            <CheckBlue width={80} height={80} />
          )}
        </DmView>
        <DmView className="px-[14]">
          <DmText className="mt-[22] text-20 leading-[24px] font-custom600 text-center">
            {t(
              isBusinnes ? "verified_business_seal" : "good_health_certificate"
            )}
          </DmText>
          <TitleRegistrationFlow
            descr={t(
              isBusinnes
                ? "verified_company_is_a_seal_added_to_your_profile_descr"
                : "the_health_certificate_is_one_of_the_important_documents_descr"
            )}
            classNameDescr="mt-[18] text-13 leading-[20px]"
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
                : "providing_this_document_will_grant_you_descr"
            )}
            classNameDescr="text-13 leading-[20px]"
            className={clsx("mt-[14]", isBusinnes && "mt-[28]")}
          />
          <TitleRegistrationFlow
            title={t("setup_fee")}
            classNameTitle="text-14 leading-[18px]"
            descr={t("number_EGP_inclusive_of_VAT", {
              number: isBusinnes ? 500 : 100,
            })}
            classNameDescr="text-13 leading-[20px]"
            className={clsx("mt-[14]", isBusinnes && "mt-[24]")}
          />
          <TitleRegistrationFlow
            title={t("accepted_payments")}
            classNameTitle="text-14 leading-[18px]"
            className={clsx("mt-[14]", isBusinnes && "mt-[24]")}
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

          {!isBusinnes && (
            <UploadLicenseComponent
              className="mt-[15]"
              photoUrl={photo?.path || ""}
              onPress={handleOpenModal}
            />
          )}
        </DmView>
      </DmView>
      {(!!photo || isBusinnes) && (
        <ActionBtn
          title={t(isBusinnes ? "request_for_a_visit" : "make_payment")}
          onPress={handleSubmit}
          className="mx-[20] rounded-5"
          textClassName="text-13 leading-[16px] font-custom600"
        />
      )}
      <SelectDoPhotoModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        selectedPhoto={photo}
        setSelectedPhoto={setPhoto}
        isPdf
      />
    </SafeAreaView>
  )
}

export default MyDocumentsHealthScreen

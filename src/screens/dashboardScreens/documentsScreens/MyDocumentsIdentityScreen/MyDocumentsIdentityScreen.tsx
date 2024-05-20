import React, { useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import HeaderOnboarding from "components/HeaderOnboarding"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import ModalFullScreen from "components/ModalFullScreen"
import HandIdIcon from "assets/icons/id-on-hand.svg"

type Props = RootStackScreenProps<"my-documents-identity">

const MyDocumentsIdentityScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isModalVisible, setModalVisible] = useState(false)
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleContinue = () => {
    navigation.navigate("my-documents-id")
  }

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
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
          title={t("identity_verification")}
          isChevron
          className="px-[15]"
        />
        <TitleRegistrationFlow
          className="mt-[19] px-[14]"
          title={t("lets_activate_your_account")}
          descr={t("to_activate_your_account_descr")}
          classNameTitle="text-20 leading-[24px]"
          classNameDescr="text-17 leading-[30px]"
        />
        <DmView className="mt-[28] px-[14] pr-[28] items-center">
          <HandIdIcon />
        </DmView>
      </DmView>
      <DmView className="px-[15]">
        <DmView onPress={handleOpenModal}>
          <DmText className="text-17 leading-[20px] underline font-custom600 text-center">
            {t("why_do_we_need_your_ID")}
          </DmText>
        </DmView>
        <ActionBtn
          title={t("continue")}
          onPress={handleContinue}
          className="mt-[25] h-[47] rounded-5"
          textClassName="text-13 leading-[16px] font-custom600"
        />
      </DmView>
      <ModalFullScreen isVisible={isModalVisible} onClose={handleCloseModal}>
        {/* @TO DO */}
        <DmView className="mt-[33] px-[14]">
          <DmText className="text-17 leading-[20px] font-custom600">
            {t("why_do_we_need_your_id")}
          </DmText>
          <DmText className="mt-[10] text-13 leading-[20px] font-custom400">
            {t("at_tappler_we_prioritize_trust_and_safety_within_descr")}
          </DmText>
          <TitleRegistrationFlow
            title={t("identity_confirmation")}
            classNameTitle="text-14 leading-[20px]"
            descr={t("verifying_the_identity_of_professionals_descr")}
            classNameDescr="mt-[-5]  text-13 leading-[20px] font-custom400"
          />
          <TitleRegistrationFlow
            title={t("enhanced_security")}
            classNameTitle="text-14 leading-[20px]"
            descr={t("identity_verification_adds_an_extra_descr")}
            classNameDescr="mt-[-5]  text-13 leading-[20px] font-custom400"
          />
          <TitleRegistrationFlow
            title={t("your_privacy_protection")}
            classNameTitle="text-14 leading-[20px]"
            descr={t("we_understand_the_sensitivity_descr")}
            classNameDescr="mt-[-5]  text-13 leading-[20px] font-custom400"
          />
          <TitleRegistrationFlow
            title={t("in_person_id_verification")}
            classNameTitle="text-14 leading-[20px]"
            descr={t("in_some_cases_we_reserve_the_rights")}
            classNameDescr="mt-[-5] text-13 leading-[20px] font-custom400"
          />
        </DmView>
      </ModalFullScreen>
    </SafeAreaView>
  )
}

export default MyDocumentsIdentityScreen

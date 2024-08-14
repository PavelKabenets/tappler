import React, { useState } from "react"

// Components
import { ActionBtn, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import MyAccountChangePasswordComponent from "components/MyAccountChangePasswordComponent"
import MainModal from "components/MainModal"
import VerifySuccessModal from "components/VerifySuccessModal"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"

type Props = RootStackScreenProps<"my-account-change-password">

const MyAccountChangePasswordScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      change_password: "",
      new_password: "",
      confirm_password: "",
    },
  })
  const newPassword = watch("new_password")
  const confirmPassword = watch("confirm_password")
  // Global Store
  // Variables
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const [isModalPasswordVisible, setModalPasswordVisible] = useState(false)
  const handleModalOpen = () => {
    setModalPasswordVisible(false)
    setTimeout(() => {
      setShowModal(true)
    }, 400)
  }
  const handleModalClose = () => {
    setShowModal(false)
    navigation.navigate("my-account")
  }
  const handleOpenModalPassword = () => {
    setModalPasswordVisible(true)
  }
  const handleHideModalPassword = () => {
    setModalPasswordVisible(false)
  }
  const handleCloseModalPassword = () => {
    setModalPasswordVisible(false)
    navigation.navigate("my-account-reset-password")
  }
  // Refs
  // Methods
  // Handlers
  const handleGoMyAccountResetPassword = () => {
    navigation.navigate("my-account-reset-password")
  }
  // Hooks
  // Listeners
  // Render Methods
  const passwordsMatch = newPassword === confirmPassword
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        isChevron
        className="px-[15]"
        title={t("change_password")}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <MyAccountChangePasswordComponent
          control={control}
          name="current_password"
          onPress={handleGoMyAccountResetPassword}
          title={t("current_password")}
          subtitle={t("enter_your_current_password")}
          descr={t("forgot_password")}
        />
        <MyAccountChangePasswordComponent
          control={control}
          name="new_password"
          title={t("type_the_new_password")}
          subtitle={t("password_must_be_6_characters_long")}
        />
        <MyAccountChangePasswordComponent
          control={control}
          name="confirm_password"
          title={t("re_enter_the_new_password")}
          subtitle={t("password_must_match_the_selected_new_password")}
        />
        <DmView className="px-[54] pt-[45] pb-[45]">
          <ActionBtn
            disable={!isValid || !passwordsMatch}
            onPress={handleOpenModalPassword}
            textClassName={clsx(
              "text-13 leading-[16px] font-custom500",
              (!isValid || !passwordsMatch) && "text-grey10 font-400"
            )}
            className={clsx("h-[41]")}
            title={t("change_password")}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <MainModal
        isVisible={isModalPasswordVisible}
        Icon={<DmView className="w-[46] h-[46] bg-grey" />}
        onClose={handleHideModalPassword}
        title={t("incorrect_password")}
        className="px-[25] pt-[31] pb-[36]"
        classNameTitle="mt-[10] text-20 leading-[27px] font-custom600"
        classNameDescr="mt-[10] pb-[20] text-13 leading-[20px] font-custom400"
        descr={t("the_password_you_entered_does_not_match_our_records")}
      >
        <ActionBtn
          onPress={handleCloseModalPassword}
          title={t("reset_password")}
          className="h-[41] w-full border-1 border-red3 bg-white"
          textClassName="text-13 leading-[16px] font-custom600 text-black"
        />
        <ActionBtn
          onPress={handleModalOpen}
          title={t("try_again")}
          className="h-[41] w-full mt-[17]"
          textClassName="text-13 leading-[16px] font-custom600"
        />
      </MainModal>
      <VerifySuccessModal
        textSuccess={t("password_changed")}
        isVisible={showModal}
        title={t("your_password_changed_successfully")}
        classNameTitle="mt-[0] mb-[15] leading-[20] font-custom400"
        onClose={handleModalClose}
      />
    </SafeAreaView>
  )
}

export default MyAccountChangePasswordScreen

import React, { useState } from "react"

// Components
import { ActionBtn, DmAuthInput, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useForm, Controller } from "react-hook-form"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/arrow-back.svg"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import { I18nManager } from "react-native"
import { useAuthResetNewMutation } from "services/api"
import BigCheckIcon from "assets/icons/check-mark-big.svg"
import MainModal from "components/MainModal"
import { returnErrorMessageArr } from "utils/returnErrorMessage"
import { ErrorSignUpEmailType } from "types"
import CloseIconBig from "assets/icons/cancel-big.svg"

type Props = RootStackScreenProps<"password-change">

const PasswordChangeScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const infoData = route.params
  // State
  const [isModalVisible, setModalVisible] = useState(false)
  const [responseError, setResponseError] = useState("")

  const {
    control,
    formState: { errors, isValid },
    trigger,
    handleSubmit,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  })

  const [isLoading, setLoading] = useState(false)
  // Global Store
  // Variables
  const { t, i18n } = useTranslation()
  const [setNewPassword] = useAuthResetNewMutation()
  // Refs
  // Methods
  // Handlers
  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    if (!responseError) {
      setTimeout(() => {
        navigation.replace("sign-in-email")
      }, 500)
    }
    setResponseError("")
  }

  const onSubmit = async () => {
    try {
      setLoading(true)
      await setNewPassword({
        ...infoData,
        password: getValues("password"),
        lang: i18n.language,
      }).unwrap()
    } catch (e) {
      console.log("New Password Error: ", e)
      setResponseError(returnErrorMessageArr(e as ErrorSignUpEmailType)[0])
    } finally {
      setModalVisible(true)
      setLoading(false)
    }
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="pl-[19] pr-[38] flex-1 bg-white">
      <DmView
        className="mt-[24] flex-row justify-start"
        onPress={navigation.goBack}
        hitSlop={HIT_SLOP_DEFAULT}
      >
        <DmView className={clsx(I18nManager.isRTL && "rotate-[180deg]")}>
          <CloseIcon width={16} height={16} />
        </DmView>
      </DmView>
      <DmText className="mt-[85] text-16 leading-[25px] font-custom600">
        {t("enter_new_password")}
      </DmText>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: t("required_error") },
        }}
        render={({ field: { value, onChange } }) => (
          <DmAuthInput
            value={value}
            placeholder={t("your_new_password")}
            onChangeText={(val) => {
              onChange(val)
            }}
            wrapperClassName="mt-[8]"
            className="mt-[20]"
            secureTextEntry
            error={errors.password?.message}
          />
        )}
        name="password"
      />
      {/* @TO DO */}
      <Controller
        control={control}
        rules={{
          validate: {
            function: (value, formValues) =>
              value === formValues.password || t("repeat_error"),
          },
        }}
        render={({ field: { value, onChange } }) => (
          <DmAuthInput
            value={value}
            placeholder={t("confirm_new_password")}
            secureTextEntry
            onChangeText={(val) => {
              onChange(val)
              trigger("repeatPassword")
            }}
            wrapperClassName="mt-[8]"
            error={errors.repeatPassword?.message}
          />
        )}
        name="repeatPassword"
      />
      {watch("password").length < 6 && (
        <DmText className="mt-[20] text-12 leading-[15px] text-red font-custom400">
          {t("password_must_be_at_least_6_characters")}
        </DmText>
      )}
      <DmView className="pl-[19] items-center w-full">
        <ActionBtn
          title={t("change_password")}
          textClassName="font-custom600 text-13 leading-[16px]"
          className="w-full mt-[30] h-[41]"
          onPress={() => handleSubmit(onSubmit)()}
          isLoading={isLoading}
          disable={
            isLoading ||
            !isValid ||
            watch("password").length < 6 ||
            watch("repeatPassword").length < 6
          }
        />
      </DmView>
      <MainModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        title={t(responseError ? "error" : "password_changed")}
        descr={responseError || t("your_password_changed_successfully_descr")}
        Icon={responseError ? <CloseIconBig /> : <BigCheckIcon />}
        onPress={handleCloseModal}
        titleBtn={t("OK")}
        classNameBtn="mt-[26] h-[41]"
        classNameActionBtnText="text-13 leading-[16px] font-custom600"
        classNameTitle="mt-[16] text-16 leading-[19px]"
        classNameDescr="text-13 leading-[20px] mx-[20]"
      />
    </SafeAreaView>
  )
}

export default PasswordChangeScreen

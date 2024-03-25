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
import HeaderOnboarding from "components/HeaderOnboarding"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import MainModal from "components/MainModal"
import CheckMarkBig from "assets/icons/check-mark-big.svg"

type Props = RootStackScreenProps<"request-adding-service">

const RequestAddingServiceScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isModalVisible, setModalVisible] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
    },
  })
  // Global Store
  // Variables
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  // @TO DO
  const onSubmit = () => {
    handleOpenModal()
  }

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const hadnleCloseModal = () => {
    setModalVisible(false)
    navigation.goBack()
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={t("request_for_adding_service")}
        className="px-[20]"
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        enableOnAndroid
      >
        <DmView>
          <DmText className="mx-[14] text-12 leading-[20px] font-custom400">
            {t("if_you_cannot_find_the_services_descr")}
          </DmText>
          <DmView className="mt-[20]">
            <Controller
              control={control}
              rules={{
                required: { value: true, message: t("required_error") },
              }}
              render={({ field: { value, onChange } }) => (
                <DmAuthInput
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("your_name")}
                  wrapperClassName="ml-[20]"
                  containerClassName="mr-[37]"
                  error={errors.name?.message}
                  errorClassName="mx-[24]"
                />
              )}
              name="name"
            />
            <Controller
              control={control}
              rules={{
                required: { value: true, message: t("required_error") },
              }}
              render={({ field: { value, onChange } }) => (
                <DmAuthInput
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("your_mobile_number")}
                  wrapperClassName="ml-[20]"
                  containerClassName="mt-[14] mr-[37]"
                  keyboardType="numeric"
                  error={errors.phone?.message}
                  errorClassName="mx-[24]"
                />
              )}
              name="phone"
            />
            <Controller
              control={control}
              rules={{
                required: { value: true, message: t("required_error") },
              }}
              render={({ field: { value, onChange } }) => (
                <DmAuthInput
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("your_email_address")}
                  wrapperClassName="ml-[20]"
                  containerClassName="mt-[14] mr-[37]"
                  error={errors.email?.message}
                  errorClassName="mx-[24]"
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={{
                required: { value: true, message: t("required_error") },
              }}
              render={({ field: { value, onChange } }) => (
                <DmAuthInput
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("requested_service")}
                  wrapperClassName="mx-[20]"
                  containerClassName="mt-[14]"
                  multiline
                  error={errors.service?.message}
                  errorClassName="mx-[24]"
                />
              )}
              name="service"
            />
          </DmView>
        </DmView>
        <ActionBtn
          title={t("send")}
          onPress={() => handleSubmit(onSubmit)()}
          className="mt-[24] rounded-5 mx-[20]"
          textClassName="text-13 leading-[16px] font-custom600"
        />
      </KeyboardAwareScrollView>
      <MainModal
        isVisible={isModalVisible}
        onClose={hadnleCloseModal}
        title={t("we_received_your_request")}
        descr={t("we_will_let_you_know_when_the_service_become_available")}
        Icon={<CheckMarkBig />}
        classNameModal="px-[35]"
        className="pt-[23] px-[27]"
        classNameDescr="mt-[4] leading-[20px]"
        classNameTitle="mt-[12]"
        isCloseBtn
      />
    </SafeAreaView>
  )
}

export default RequestAddingServiceScreen

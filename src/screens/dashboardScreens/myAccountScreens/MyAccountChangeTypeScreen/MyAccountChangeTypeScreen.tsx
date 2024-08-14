import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmChecbox, DmInput, DmText, DmView } from "components/UI"
import HeaderOnboarding from "components/HeaderOnboarding"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import MainModal from "components/MainModal"
// Hooks & Redux
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import { useTypedSelector } from "store"
// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

// Libs & Utils

// Styles & Assets
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"

type Props = RootStackScreenProps<"my-account-change-type">

interface FormData {
  business: string
}

const MyAccountChangeTypeScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useTypedSelector((store) => store.auth)
  // Props
  // State
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      business: user?.businessName || "",
    },
  })
  const businessValue = watch("business")
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    setShowErrorMessage(false)
  }, [businessValue])
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleSave = (data: FormData) => {
    navigation.navigate("my-account")
  }
  const handleOpenModal = () => {
    setModalVisible(true)
  }
  const handleHideModal = () => {
    setModalVisible(false)
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
      className="flex-1 bg-white"
    >
      <HeaderOnboarding
        onBackComponent={<CloseIcon />}
        className="px-[15] border-b-1 border-grey4"
        title={t("change_account_type")}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <DmView className="px-[15] py-[20]">
          <DmText className="text-15 leading-[19px] font-custom600">
            {t("business_name")}
          </DmText>
          <DmText className="mt-[7] mb-[5] text-12 leading-[15px] font-custom400">
            {t("enter_the_business_name")}
          </DmText>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <DmInput
                className="h-[55]"
                inputClassName="text-13 leading-[16px] text-black font-custom500"
                value={value}
                onChangeText={(text) => {
                  onChange(text)
                }}
                placeholder={t("business_name")}
              />
            )}
            name="business"
          />
        </DmView>
        <DmView className="px-[20] pt-[17] border-t-1 border-grey4">
          <ActionBtn
            textClassName="text-13 leading-[16px] font-custom600"
            className="h-[47] rounded-5"
            title={businessValue ? t("update_account_type") : t("continue")}
            onPress={handleOpenModal}
            disable={!isValid}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <MainModal
        isVisible={modalVisible}
        isBtnsTwo
        classNameBtns="mt-[28] h-[40]"
        onClose={handleHideModal}
        title={t("important_note")}
        className="px-[5] pt-[18] pb-[25]"
        classNameTitle="mt-[5] text-15 leading-[19px] font-custom700"
        classNameDescr="mt-[10] text-13 leading-[20px] font-custom400"
        titleBtn={t("yes")}
        titleBtnSecond={t("cancel")}
        classNameSecondBtnText="text-black"
        classNameBtnsWrapper="mx-[40]"
        classNameBtn="mt-[28]"
        onPress={handleSubmit(handleSave)}
        descr={t("you_need_to_activate_the_business_account_descr")}
      />
    </SafeAreaView>
  )
}

export default MyAccountChangeTypeScreen

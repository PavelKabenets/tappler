import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmChecbox, DmInput, DmText, DmView } from "components/UI"
import HeaderOnboarding from "components/HeaderOnboarding"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
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
import MainModal from "components/MainModal"

type Props = RootStackScreenProps<"my-account-type">

interface FormData {
  ptoType: "individual" | "company"
}

const MyAccountTypeScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useTypedSelector((store) => store.auth)
  // Props
  // State
  const initialType = user?.proType
  const [isTypeChanged, setIsTypeChanged] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      ptoType: user?.proType,
    },
  })

  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleSave = (data: FormData) => {
    navigation.goBack()
  }
  const handleOpenModal = () => {
    setModalVisible(true)
  }
  const handleHideModal = () => {
    setModalVisible(false)
  }
  // Hooks
  useEffect(() => {
    const subscription = watch((value) => {
      setIsTypeChanged(value.ptoType !== initialType)
    })
    return () => subscription.unsubscribe()
  }, [watch, initialType])
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
      className="flex-1 bg-white"
    >
      <HeaderOnboarding
        isChevron
        className="px-[15] border-b-1 border-grey4"
        title={t("account_type")}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <DmView className="px-[15] pt-[29]">
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <DmChecbox
                  isChecked={value === "individual"}
                  onPress={() => onChange("individual")}
                  title={t("individual")}
                  className="pb-[20]"
                  textClassName="text-15 leading-[19px] font-custom400 text-black"
                />
                <DmChecbox
                  isChecked={value === "company"}
                  onPress={() => {
                    if (value !== "company") {
                      onChange("company")
                      navigation.navigate("my-account-change-type")
                    }
                  }}
                  title={t("business")}
                  className="pb-[20]"
                  textClassName="text-15 leading-[19px] font-custom400 text-black"
                />
              </>
            )}
            name="ptoType"
          />
        </DmView>
        {isTypeChanged && (
          <DmView className="px-[20] pt-[17] border-t-1 border-grey4">
            <ActionBtn
              textClassName="text-13 leading-[16px] font-custom600"
              className="h-[47] rounded-5"
              title={t("update_account_type")}
              onPress={handleOpenModal}
              disable={!isValid}
            />
          </DmView>
        )}
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
        descr={t("if_you_change_your_account_type_to_individual_descr")}
      />
    </SafeAreaView>
  )
}

export default MyAccountTypeScreen

import React, { useEffect, useState } from "react"
// Components
import { ActionBtn, ActionBtnSmall, DmInput, DmView } from "components/UI"
import ExampleModal from "components/ExampleModal"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import { Keyboard } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// Hooks & Redux
import { useForm, Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useTypedSelector } from "store"
// Helpers & Types
import { ResultFlowDataType } from "types"
// Libs & Utils

// Styles & Assets
import styles from "./styles"
import colors from "styles/colors"
import CloseIcon from "assets/icons/close.svg"
import { RootStackScreenProps } from "navigation/types"

type Props = RootStackScreenProps<"my-profile-about-me">

const MyProfileAboutMeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { profileParams } = route.params
  const [isExampleModalVisible, setExampleModalVisible] = useState(false)
  const { user } = useTypedSelector((store) => store.auth)
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      aboutMe: user?.informationAbout,
    },
  })

  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const handleSave = () => {
    navigation.navigate("my-profile", {
      profileParams: {
        ...profileParams,
        informationAbout: getValues("aboutMe"),
      },
    })
  }

  const handleSeeExample = () => {
    setExampleModalVisible(true)
    Keyboard.dismiss()
  }

  const handleCloseExample = () => {
    setExampleModalVisible(false)
    navigation.navigate("my-profile", { profileParams })
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <HeaderOnboarding className="px-[15]" onBackComponent={<CloseIcon />} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <DmView className="pb-[28] mt-[24] px-[14] flex-1 justify-between">
          <DmView>
            <TitleRegistrationFlow
              title={
                user?.proType === "company"
                  ? t("information_about_your_business")
                  : t("information_about_you")
              }
              descr={t("information_about_you_descr")}
              classNameDescr="leading-[20px]"
            />
            <DmView className="mt-[23] items-center">
              <ActionBtnSmall
                title={t("see_examples")}
                onPress={handleSeeExample}
              />
            </DmView>
            <TitleRegistrationFlow
              className="mt-[20]"
              title={t("important_note")}
              descr={t("phone_numbers_or_emails_descr")}
              classNameTitle="text-13 leading-[16px] text-red"
              classNameDescr="font-custom500 leading-[20px]"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <DmInput
                  className="mt-[20]"
                  value={value}
                  onChangeText={onChange}
                  placeholder={
                    user?.proType === "company"
                      ? t("information_about_business")
                      : t("type_the_information_about_you_here")
                  }
                  maxLength={299}
                  placeholderTextColor={colors.grey11}
                  multiline
                />
              )}
              name="aboutMe"
            />
          </DmView>
          <ExampleModal
            isVisible={isExampleModalVisible}
            onClose={handleCloseExample}
          />
        </DmView>
        <DmView className="px-[20] pt-[17]">
          <ActionBtn
            textClassName="text-13 leading-[16px] font-custom600"
            className="h-[47] rounded-5"
            title={t("save")}
            onPress={handleSubmit(handleSave)}
            disable={!isValid}
          />
        </DmView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default MyProfileAboutMeScreen

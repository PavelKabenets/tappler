import React from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"

type Props = RootStackScreenProps<"welcome">

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  // Global Store
  // Variables
  const { i18n } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleSubmit = (lng: "en" | "ar") => {
    i18n.changeLanguage(lng)
    navigation.navigate("features")
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 justify-center items-center px-[33] bg-white">
      <DmText className="font-sans700 text-18">الرجاء اختيار اللغة</DmText>
      <DmText className="mt-[11] font-montserrat700 text-18 leading-[22px]">
        Please Select Your Language
      </DmText>
      <DmView className="mt-[21] w-full flex-row items-center justify-between">
        <ActionBtn
          className="mr-[10] flex-1"
          onPress={() => handleSubmit("en")}
          textClassName="font-montserrat500"
          title="English"
        />
        <ActionBtn
          className="ml-[10] flex-1"
          // @TO DO
          textClassName="font-sans500 font-medium"
          onPress={() => handleSubmit("ar")}
          title="عربي"
        />
      </DmView>
      <DmText className="mt-[32] text-13 text-grey font-sans500 font-medium">
        يمكنك تغيير اللغة في أي وقت بالذهاب الى “الإعدادات”
      </DmText>
      <DmText className="mt-[10] text-grey text-12 font-montserrat400">
        You can change the language later from “Settings”
      </DmText>
    </SafeAreaView>
  )
}

export default WelcomeScreen

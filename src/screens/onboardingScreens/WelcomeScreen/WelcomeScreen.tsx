import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import RNRestart from "react-native-restart"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { setCurrentScreen, setLanguage } from "store/auth/slice"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import { ActivityIndicator, I18nManager } from "react-native"
import colors from "styles/colors"
import { useTypedSelector } from "store"

type Props = RootStackScreenProps<"welcome">

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isLoading, setLoading] = useState(false)
  const { currentScreen } = useTypedSelector((store) => store.auth)
  // Global Store
  // Variables
  const dispatch = useDispatch()
  const { i18n, t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleSubmit = (lng: "en" | "ar") => {
    dispatch(setLanguage(lng))
    setLoading(true)
    dispatch(setCurrentScreen("features"))
    setTimeout(() => {
      RNRestart.restart()
    }, 100)
  }

  useEffect(() => {
    if (currentScreen) {
      dispatch(setCurrentScreen(undefined))
    }
  }, [])
  // Hooks
  // Listeners
  // Render Methods32

  return (
    <SafeAreaView className="flex-1 justify-center items-center px-[33] bg-white">
      {isLoading && <ActivityIndicator color={colors.red} />}
      {!isLoading && (
        <>
          <DmText className="font-sans700 text-18 leading-[31px] text-center">
            الرجاء اختيار اللغة
          </DmText>
          <DmText className="mt-[11] font-montserrat600 text-18 leading-[22px] text-center">
            Please Select Your Language
          </DmText>
          <DmView
            className={clsx(
              "mt-[21] w-full flex-row items-center justify-between",
              I18nManager.isRTL && "flex-row-reverse"
            )}
          >
            <ActionBtn
              className={clsx(
                "mr-[10] flex-1",
                I18nManager.isRTL && "ml-[10] mr-[0]"
              )}
              onPress={() => handleSubmit("en")}
              textClassName="font-montserrat500"
              title="English"
            />
            <ActionBtn
              className={clsx(
                "ml-[10] flex-1",
                I18nManager.isRTL && "mr-[10] ml-[0]"
              )}
              textClassName={clsx(
                "font-sans700",
                !I18nManager.isRTL && "leading-[25px]"
              )}
              onPress={() => {
                handleSubmit("ar")
              }}
              title="عربي"
            />
          </DmView>
          <DmText className="mt-[32] text-13 text-grey font-sans400 leading-[22px] text-center">
            يمكنك تغيير اللغة في أي وقت بالذهاب الى “الإعدادات”
          </DmText>
          <DmText className="mt-[10] text-grey text-12 font-montserrat400 text-center">
            You can change the language later from “Settings”
          </DmText>
        </>
      )}
    </SafeAreaView>
  )
}

export default WelcomeScreen

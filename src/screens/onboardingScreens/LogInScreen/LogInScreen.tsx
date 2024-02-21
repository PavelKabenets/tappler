import React, { useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import OnboardingFooter from "components/OnboardingFooter"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { ScrollView } from "react-native"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"

type Props = RootStackScreenProps<"log-in">

const LogInScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  // State
  const viewType = route.params?.viewType
  const [view, setView] = useState<"sign-in" | "sign-up">(viewType || "sign-in")
  // Global Store
  // Variables
  const { t, i18n } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleChangeLanguage = (lng: "en" | "ar") => {
    i18n.changeLanguage(lng)
  }

  const handleEmailPress = () => {
    // @TO DO
    navigation.navigate(view === "sign-in" ? "sign-in-email" : "sign-up-email")
  }
  // @TO DO
  const handleGooglePress = () => {
    //
  }
  // @TO DO
  const handleFacebookPress = () => {
    //
  }
  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleChangeViewType = () => {
    if (view === "sign-in") {
      setView("sign-up")
    } else {
      setView("sign-in")
    }
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 pt-[17] bg-white">
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <DmView>
          <DmView className="px-[22] flex-row justify-between items-center">
            {/* @TO DO */}
            <DmView style={styles.goBackEmpty} onPress={handleGoBack} />
            <DmView
              onPress={() =>
                i18n.language === "en"
                  ? handleChangeLanguage("ar")
                  : handleChangeLanguage("en")
              }
            >
              {i18n.language === "en" && (
                <DmText className="font-sans700 text-16 text-red">عربي</DmText>
              )}
              {i18n.language === "ar" && (
                <DmText className="font-montserrat700 text-16 text-red">
                  English
                </DmText>
              )}
            </DmView>
          </DmView>
          <DmView className="mt-[31]">
            <DmView className="px-[22] flex-row items-center justify-center">
              {/* @TO DO */}
              <DmView style={styles.logoEmpty} />
              <DmText className="ml-[10] font-custom600 text-16 text-center">
                {t("welcome_to_tappler_pro")}
              </DmText>
            </DmView>
            <DmView className="mt-[29] px-[16] items-center">
              <DmView style={styles.bigIconEmpty} />
            </DmView>
            <DmView className="mt-[23] px-[22]">
              <DmText className="font-custom600 text-17 text-center">
                {view === "sign-in"
                  ? t("log_in_to_your_account")
                  : t("create_an_account")}
              </DmText>
              <DmText className="text-center text-13 font-custom400">
                {view === "sign-in"
                  ? t("choose_one_of_the_following_to_signin")
                  : t("choose_one_of_the_following_to_sign_up")}
              </DmText>
              {/* @TO DO */}
              <ActionBtn
                Icon={<DmView style={styles.socialEmpty} />}
                title={
                  view === "sign-in"
                    ? t("sign_in_with_your_email")
                    : t("sign_up_with_your_email")
                }
                variant="white"
                className="mt-[14] rounded-10"
                textClassName="text-13"
                onPress={handleEmailPress}
              />
              {/* @TO DO */}
              <ActionBtn
                Icon={<DmView style={styles.socialEmpty} />}
                title={
                  view === "sign-in"
                    ? t("sign_in_with_facebook")
                    : t("sign_up_with_facebook")
                }
                variant="white"
                className="mt-[10] rounded-10"
                textClassName="text-13"
                onPress={handleFacebookPress}
              />
              {/* @TO DO */}
              <ActionBtn
                Icon={<DmView style={styles.socialEmpty} />}
                title={
                  view === "sign-in"
                    ? t("sign_in_with_google")
                    : t("sign_up_with_google")
                }
                variant="white"
                className="mt-[10] rounded-10"
                textClassName="text-13"
                onPress={handleGooglePress}
              />
              <ActionBtn
                Icon={<DmView style={styles.socialEmpty} />}
                title={
                  view === "sign-in"
                    ? t("dont_have_an_account")
                    : t("already_have_an_account")
                }
                descr={
                  view === "sign-in" ? t("create_an_account") : t("log_in")
                }
                variant="white"
                className="mt-[10] rounded-10"
                textClassName="text-13"
                onPress={handleChangeViewType}
              />
            </DmView>
          </DmView>
        </DmView>
        <OnboardingFooter />
      </ScrollView>
    </SafeAreaView>
  )
}

export default LogInScreen

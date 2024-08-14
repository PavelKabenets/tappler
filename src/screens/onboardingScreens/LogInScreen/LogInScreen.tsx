import React, { useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import OnboardingFooter from "components/OnboardingFooter"
import { ActivityIndicator, I18nManager, Image } from "react-native"
import RNRestart from "react-native-restart"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { ScrollView } from "react-native"
import { useDispatch } from "react-redux"
import { setCurrentScreen, setLanguage } from "store/auth/slice"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils
import { GoogleSignin } from "@react-native-google-signin/google-signin"

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import ArrowLeft from "assets/icons/arrow-back.svg"
import LogoIcon from "assets/icons/logo.svg"
import img from "assets/images/auth.png"
import EmailIcon from "assets/icons/email.svg"
import FacebookIcon from "assets/icons/facebook.svg"
import GoogleIcon from "assets/icons/google.svg"
import colors from "styles/colors"
import {
  useLazyGetProsQuery,
  usePostSocialGoogleProviderMutation,
  useSingInGoogleMutation,
} from "services/api"
import { useTypedSelector } from "store"

type Props = RootStackScreenProps<"log-in">

const LogInScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  // State
  const viewType = route.params?.viewType
  const [view, setView] = useState<"sign-in" | "sign-up">(viewType || "sign-in")
  const [isLoading, setLoading] = useState(false)

  const { token } = useTypedSelector((store) => store.auth)
  // Global Store
  // Variables
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const [getPros] = useLazyGetProsQuery()
  const [authGoogle] = useSingInGoogleMutation()
  const [socialProvider] = usePostSocialGoogleProviderMutation()
  // Refs
  // Methods
  // Handlers
  const handleChangeLanguage = () => {
    dispatch(setLanguage(i18n.language === "en" ? "ar" : "en"))
    dispatch(setCurrentScreen("log-in"))
    setLoading(true)
    setTimeout(() => {
      RNRestart.restart()
    }, 100)
  }

  const handleEmailPress = () => {
    // @TO DO
    navigation.navigate(view === "sign-in" ? "sign-in-email" : "sign-up-email")
  }
  // @TO DO
  const handleGooglePress = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn()

      try {
        await socialProvider({
          idToken: idToken as string,
        }).unwrap()
      } catch (e) {
        console.log("Sign Up Error: ", e)
      }

      await authGoogle({
        idToken: idToken as string,
        userType: "pro",
      })

      const res = await getPros().unwrap()
      navigation.reset({
        index: 0,
        routes: [{ name: "dashboard", params: { userParams: res } }],
      })
    } catch (e) {
      console.log("Google Sign IN er", e)
    }
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
    <SafeAreaView
      className={clsx(
        "flex-1 pt-[17] bg-white",
        isLoading && "items-center justify-center"
      )}
    >
      {isLoading && <ActivityIndicator color={colors.red} />}
      {!isLoading && (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <DmView>
              <DmView className="px-[22] flex-row justify-between items-center">
                {navigation.canGoBack() && (
                  <DmView
                    onPress={handleGoBack}
                    className={I18nManager.isRTL ? "rotate-[180deg]" : ""}
                  >
                    <ArrowLeft />
                  </DmView>
                )}
                {!navigation.canGoBack() && <DmView className="w-[1]" />}
                <DmView onPress={handleChangeLanguage}>
                  {i18n.language === "en" && (
                    <DmText className="font-sans700 text-16 leading-[29px] text-red">
                      عربي
                    </DmText>
                  )}
                  {i18n.language === "ar" && (
                    <DmText className="font-montserrat700 leading-[25px] text-16 text-red">
                      English
                    </DmText>
                  )}
                </DmView>
              </DmView>
              <DmView className="mt-[31]">
                <DmView className="px-[22] flex-row items-center justify-center">
                  <LogoIcon />
                  <DmText className="ml-[10] font-custom600 text-16 leading-[19px] text-center">
                    {t("welcome_to_tappler_pro")}
                  </DmText>
                </DmView>
                <DmView className="mt-[29] px-[16] items-center">
                  <Image source={img} style={styles.bigIconEmpty} />
                </DmView>
                <DmView className="mt-[23] px-[22]">
                  <DmText className="font-custom600 text-17 leading-[20px] text-center">
                    {view === "sign-in"
                      ? t("log_in_to_your_account")
                      : t("create_an_account")}
                  </DmText>
                  <DmText className="text-center text-13 leading-[16px] font-custom400">
                    {view === "sign-in"
                      ? t("choose_one_of_the_following_to_signin")
                      : t("choose_one_of_the_following_to_sign_up")}
                  </DmText>
                  <ActionBtn
                    Icon={<EmailIcon />}
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
                  <ActionBtn
                    Icon={<FacebookIcon />}
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
                  <ActionBtn
                    Icon={<GoogleIcon />}
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
        </>
      )}
    </SafeAreaView>
  )
}

export default LogInScreen

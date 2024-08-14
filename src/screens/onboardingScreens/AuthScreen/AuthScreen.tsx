import React, { useEffect } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import { Image } from "react-native"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useGetServicesQuery } from "services/api"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import img from "assets/images/auth.png"
import { useDispatch } from "react-redux"
import { setLogout } from "store/auth/slice"
import { useTypedSelector } from "store"

type Props = RootStackScreenProps<"auth">

const AuthScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  // Global Store
  const { isLogout } = useTypedSelector((store) => store.auth)
  useGetServicesQuery()
  // Variables
  const { t } = useTranslation()
  const dispatch = useDispatch()
  // Refs
  // Methods
  // Handlers
  const handleGoSignUpScreen = () => {
    navigation.navigate("sign-up")
  }
  const handleGoLogInScreen = () => {
    navigation.navigate("log-in")
  }

  useEffect(() => {
    if (isLogout) {
      setTimeout(() => {
        dispatch(setLogout(false))
      }, 6000)
    }
  }, [isLogout])
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 pt-[99] pb-[32] px-[24] justify-between bg-white">
      <DmView>
        <DmView className="items-center">
          <Image source={img} style={styles.img} />
        </DmView>
        <DmText className="mt-[8] px-[4] text-center font-custom400">
          {t("create_an_account_to_join_descr")}
        </DmText>
      </DmView>
      <DmView>
        <ActionBtn
          title={t("login")}
          onPress={handleGoLogInScreen}
          className="rounded-5 h-[47]"
          textClassName="uppercase text-13 font-custom400"
          variant="white"
        />
        <ActionBtn
          title={t("create_free_account")}
          onPress={handleGoSignUpScreen}
          className="mt-[10] rounded-5 h-[47]"
          textClassName="uppercase text-15 font-custom500"
        />
      </DmView>
    </SafeAreaView>
  )
}

export default AuthScreen

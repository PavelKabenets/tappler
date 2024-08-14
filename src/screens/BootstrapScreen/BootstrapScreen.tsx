import React, { useEffect } from "react"

// Components
import Navigator from "navigation/Navigator"
import { PersistGate } from "redux-persist/integration/react"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useTypedSelector, persistor } from "store"

// Helpers & Types

// Libs & Utils
import Geocoder from "react-native-geocoding"
import "moment/locale/ar"


// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import { I18nManager } from "react-native"
import moment from "moment"

const BootstrapScreen = (): JSX.Element => {
  // Props
  // State
  // Global Store
  const {
    isAuth,
    isRegistrationFlowComleted,
    language,
    isNotificationsAllowed,
  } = useTypedSelector((store) => store.auth)

  const { i18n } = useTranslation()

  Geocoder.init("AIzaSyC3IxRtQFQr36vxzrlUnxU0WfEnjz_4uRw", {
    language: i18n.language,
  })
  // Variables
  // Methods

  // Handlers
  // Hooks
  useEffect(() => {
    i18n.changeLanguage(language)
    I18nManager.forceRTL(i18n.language === "ar")
    moment.locale(language)
  }, [language])


  // Listeners

  // Render Methods

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Navigator
        isAuth={!!isAuth}
        isRegistrationFlowComleted={!!isRegistrationFlowComleted}
      />
    </PersistGate>
  )
}

export default BootstrapScreen

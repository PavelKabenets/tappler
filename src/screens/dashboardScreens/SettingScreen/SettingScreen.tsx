import React, { useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import { I18nManager } from "react-native"
import SettingsItem from "components/SettingsItem"
import SettingLogoutModal from "components/SettingLogoutModal"
import SettingsChangeLanguageModal from "components/SettingsChangeLanguageModal"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { logout, setLoadingModalVisible } from "store/auth/slice"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import GoBackIcon from "assets/icons/chevron-left.svg"
import colors from "styles/colors"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import IdCardIcon from "assets/icons/id-card-setting.svg"
import MyAccountIcon from "assets/icons/account.svg"
import MyPerfomansIcon from "assets/icons/performance.svg"
import MyUpdatesIcon from "assets/icons/analytics.svg"
import MyNotificationsIcon from "assets/icons/notification.svg"
import PaymentIcon from "assets/icons/payment.svg"
import VacantionIcon from "assets/icons/vacation-setting.svg"
import GlobusIcon from "assets/icons/language.svg"
import HelpIcon from "assets/icons/help.svg"
import AboutAppIcon from "assets/icons/app.svg"
import LogOutIcon from "assets/icons/sign-out.svg"

type Props = RootStackScreenProps<"setting">

const SettingScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isLogoutModalVisible, setLogOutModalVisible] = useState(false)
  const [isChangeLanguageModalVisible, setChageLanguageModalVisible] =
    useState(false)
  // Global Store
  // Variables
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  // Refs
  // Methods
  // Handlers
  const handleOpenModalLogOutModal = () => {
    setLogOutModalVisible(true)
  }

  const handleCloseModalLogOutModal = () => {
    setLogOutModalVisible(false)
  }

  const handleCloseChangeLanguageModal = () => {
    setChageLanguageModalVisible(false)
  }

  const handleLogOut = () => {
    dispatch(logout())
  }

  const handleGoProfile = () => {
    //
  }

  const handleGoMyAccount = () => {
    //
  }

  const handleGoMyPerfomance = () => {
    navigation.navigate("my-perfomance")
  }

  const handleMyUpgrades = () => {
    //
  }

  const handleGoNotifications = () => {
    navigation.navigate("notifications")
  }

  const handleGoPayment = () => {
    //
  }

  const handleToggleVacantionMode = () => {
    //
  }

  const handleGoChangeLanguage = () => {
    setChageLanguageModalVisible(true)
  }

  const handleGoHelp = () => {
    //
  }

  const handleGoAbout = () => {
    //
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderLanguageText = () => {
    switch (i18n.language) {
      case "en":
        return t("english")
      case "ar":
        return t("arabic")
    }
  }

  return (
    <SafeAreaView className="flex-1 pt-[21] bg-white">
      <DmView
        className="items-start px-[14]"
        onPress={navigation.goBack}
        hitSlop={HIT_SLOP_DEFAULT}
      >
        <DmView className={clsx(I18nManager.isRTL && "rotate-[180deg]")}>
          <GoBackIcon color={colors.red} strokeWidth={2} />
        </DmView>
      </DmView>
      <DmView className="px-[24]">
        <DmText className="mt-[35] text-25 leading-[30] font-custom600">
          {t("settings")}
        </DmText>
      </DmView>
      <DmView className="mt-[7] pr-[24]">
        <SettingsItem
          Icon={<IdCardIcon />}
          title={t("my_profile")}
          onPress={handleGoProfile}
        />
        <SettingsItem
          Icon={<MyAccountIcon />}
          title={t("my_account")}
          onPress={handleGoMyAccount}
        />
        <SettingsItem
          Icon={<MyPerfomansIcon />}
          title={t("my_performance")}
          onPress={handleGoMyPerfomance}
        />
        <SettingsItem
          Icon={<MyUpdatesIcon />}
          title={t("my_upgrades")}
          onPress={handleMyUpgrades}
        />
        <SettingsItem
          Icon={<MyNotificationsIcon />}
          title={t("notifications")}
          onPress={handleGoNotifications}
        />
        <SettingsItem
          Icon={<PaymentIcon />}
          title={t("payment_details")}
          onPress={handleGoPayment}
        />
        <SettingsItem
          Icon={<VacantionIcon />}
          title={t("vacation_mode")}
          onPress={handleToggleVacantionMode}
        />
        <SettingsItem
          Icon={<GlobusIcon />}
          title={t("language")}
          onPress={handleGoChangeLanguage}
          titleChevron={renderLanguageText()}
        />
        <SettingsItem
          Icon={<HelpIcon />}
          title={t("help")}
          onPress={handleGoHelp}
        />
        <SettingsItem
          Icon={<AboutAppIcon />}
          title={t("about_app")}
          onPress={handleGoAbout}
        />
        <SettingsItem
          Icon={<LogOutIcon />}
          title={t("sign_out")}
          mode={"none"}
          textVariant="red"
          className="border-0"
          onPress={handleOpenModalLogOutModal}
        />
      </DmView>
      <SettingsChangeLanguageModal
        isVisible={isChangeLanguageModalVisible}
        onClose={handleCloseChangeLanguageModal}
      />
      <SettingLogoutModal
        isVisible={isLogoutModalVisible}
        onClose={handleCloseModalLogOutModal}
        onPress={handleLogOut}
      />
    </SafeAreaView>
  )
}

export default SettingScreen

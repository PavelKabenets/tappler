import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "navigation/types"

import styles from "./styles"
import SubscriptionEmptyIcon from "assets/icons/subscription-empty.svg"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import clsx from "clsx"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import SettingsItem from "components/SettingsItem"

interface Props {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "account-upgrades",
    undefined
  >
}

const UtilitiesView: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const handleViewProfile = () => {
    //
  }

  const handleWatchVideos = () => {
    //
  }

  const handleUpgradeOptions = () => {
    //
  }

  const handleUpgradeHistory = () => {
    //
  }

  const handleTermsConditions = () => {
    //
  }

  const handleChatWithUs = () => {
    //
  }

  return (
    <DmView className="mt-[21] flex-1">
      <TitleRegistrationFlow
        title={t("upgrade_utilities")}
        descr={t("review_your_current_descr")}
        classNameDescr="mt-[1] text-11"
        className="px-[14]"
      />
      <DmView className="mr-[14]">
        <SettingsItem
          title={t("view_my_profile")}
          className="pl-[14]"
          onPress={handleViewProfile}
        />
        <SettingsItem
          title={t("watch_upgrade_videos")}
          className="pl-[14]"
          onPress={handleWatchVideos}
        />
        <SettingsItem
          title={t("upgrade_options")}
          className="pl-[14]"
          onPress={handleUpgradeOptions}
        />
        <SettingsItem
          title={t("upgrades_history")}
          className="pl-[14]"
          onPress={handleUpgradeOptions}
        />
        <SettingsItem
          title={t("terms_conditions")}
          className="pl-[14]"
          onPress={handleTermsConditions}
        />
        <SettingsItem
          title={t("chat_with_us")}
          className="pl-[14]"
          onPress={handleChatWithUs}
        />
      </DmView>
    </DmView>
  )
}

export default UtilitiesView

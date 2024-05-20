import React from "react"

// Components
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import NotificationsSwitchComponent from "components/NotificationsSwitchComponent"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"

type Props = RootStackScreenProps<"home">

const NotificationsScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  // Global Store
  // Variables
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        className="px-[15]"
        title={t("notifications")}
        isChevron
      />
      <NotificationsSwitchComponent
        title={t("new_service_leads")}
        subtitle={t("new_service_leads_subtitle")}
      />
      <NotificationsSwitchComponent
        title={t("new_messages")}
        subtitle={t("new_messages_subtitle")}
      />
      <NotificationsSwitchComponent
        title={t("tappler_notification")}
        subtitle={t("tappler_notification_subtitle")}
      />
      <NotificationsSwitchComponent
        title={t("new_opportunities")}
        subtitle={t("new_opportunities_subtitle")}
      />
      <NotificationsSwitchComponent
        title={t("sms_notifications")}
        subtitle={t("sms_notifications_subtitle")}
      />
    </SafeAreaView>
  )
}

export default NotificationsScreen

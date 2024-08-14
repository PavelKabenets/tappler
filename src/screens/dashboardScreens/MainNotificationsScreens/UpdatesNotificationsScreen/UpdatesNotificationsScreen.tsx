import React, { useEffect } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import { Image } from "react-native"
// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import { useTypedSelector } from "store"
import { usePatchNotificationsMutation } from "services/api"

type Props = RootStackScreenProps<"updates-notifications">

const UpdatesNotificationsScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { notifications } = route.params
  // State
  // Global Store
  const { user } = useTypedSelector((store) => store.auth)
  const [patchNotifications] = usePatchNotificationsMutation()
  // Variables
  const { t } = useTranslation()
  // Refs
  // Methods
  const onMessageRead = async () => {
    try {
      if (!notifications.readAt) {
        await patchNotifications(notifications.id).unwrap()
      }
    } catch (e) {
      console.log("Patch Notifications Error: ", e)
    }
  }
  // Handlers
  // Hooks
  useEffect(() => {
    onMessageRead()
  }, [])
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        className="px-[15]"
        title={t("notifications")}
        isChevron
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* {notifications.image && (
          <Image
            source={{
              uri:
                typeof notifications.image === "string"
                  ? notifications.image
                  : notifications.image.path,
            }}
            style={{ width: "100%", height: 180 }}
          />
        )} */}
        <DmView className="pl-[15] pr-[36]">
          <DmText className="mt-[22] text-16 leading-[25px] font-custom600">
            {notifications.title}
          </DmText>
          {/* {notifications.job_number && (
            <DmText className="mt-[13] text-13 leading-[16px] font-custom400">
              {notifications.job_number}
            </DmText>
          )} */}
          <DmText
            className={clsx(
              "mt-[17] text-13 leading-[22px] font-sans700 text-red"
              // !!notifications.job_number && "mt-[9]"
            )}
          >
            {t("hello")}, {user?.registeredName}
          </DmText>
          <DmText className="mt-[10] text-11 leading-[19px] font-sans400">
            {notifications.body}
          </DmText>
          <DmText className="mt-[12] text-11 leading-[25px] font-custom600">
            {notifications.data.job.customer.firstName +
              " " +
              notifications.data.job.customer.lastName}
          </DmText>
        </DmView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default UpdatesNotificationsScreen

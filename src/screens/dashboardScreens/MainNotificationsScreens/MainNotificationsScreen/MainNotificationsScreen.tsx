import React, { useEffect } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import NotificationsComponent from "components/NotificationsComponent/NotificationsComponent"
import { FlatList } from "react-native"
// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import {
  mockMainNotificationsData,
  MockMainNotificationsDataItemType,
} from "data/mockData"
// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import {
  useGetNotitficationsQuery,
  usePatchNotificationsMutation,
} from "services/api"
import { NotificationsItemType } from "types"
import { useIsFocused } from "@react-navigation/native"

type Props = RootStackScreenProps<"main-notifications">

const MainNotificationsScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  // Global Store
  // Variables
  const { t } = useTranslation()
  const { data, refetch } = useGetNotitficationsQuery({ page: 1 })
  const [patchNotitfication] = usePatchNotificationsMutation()
  const isFocused = useIsFocused()

  // Refs
  // Methods
  // Handlers
  const handleGoNotificationsDetail = async (item: NotificationsItemType) => {
    if (!item.readAt) {
      try {
        await patchNotitfication(item.id).unwrap()
      } catch (e) {
        console.log("Error Patch Notifications: ", e)
      }
    }
    navigation.navigate("updates-notifications", { notifications: item })
  }
  // Hooks
  useEffect(() => {
    if (isFocused) {
      refetch()
    }
  }, [isFocused])
  // Listeners
  // Render Methods
  const renderListItem = ({ item }: { item: NotificationsItemType }) => {
    return (
      <NotificationsComponent
        item={item}
        isSelected={!item.readAt}
        onPress={() => handleGoNotificationsDetail(item)}
      />
    )
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        className="px-[15]"
        title={t("notifications")}
        isChevron
      />
      <FlatList data={data?.data} renderItem={renderListItem} />
    </SafeAreaView>
  )
}

export default MainNotificationsScreen

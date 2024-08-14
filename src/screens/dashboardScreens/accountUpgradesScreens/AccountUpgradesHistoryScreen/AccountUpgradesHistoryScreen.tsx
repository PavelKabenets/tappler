import React, { useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import AccountUpgradesHistoryComponent from "components/AccountUpgradesHistoryComponent"
import { FlatList } from "react-native"
// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import {
  MockSubscriptionDetailsDataItemType,
  mockSubscriptionDetailsData,
} from "data/mockData"
// Libs & Utils
import moment from "moment"
// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"

type Props = RootStackScreenProps<"account-upgrades-history">

const AccountUpgradesHistoryScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  // State
  // Global Store
  const subscription = mockSubscriptionDetailsData[0]
  // Variables
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleGoAccountUpgradesViewDetailsScreen = () => {
    navigation.navigate("account-upgrades-view-details", {
      subscription: mockSubscriptionDetailsData[0],
    })
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({
    item,
  }: {
    item: MockSubscriptionDetailsDataItemType
  }) => {
    return (
      <AccountUpgradesHistoryComponent
        onPress={handleGoAccountUpgradesViewDetailsScreen}
        item={item}
      />
    )
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={t("upgrades_history")}
        isChevron
        className="px-[19]"
      />
      <FlatList
        data={mockSubscriptionDetailsData}
        renderItem={renderListItem}
      />
    </SafeAreaView>
  )
}

export default AccountUpgradesHistoryScreen

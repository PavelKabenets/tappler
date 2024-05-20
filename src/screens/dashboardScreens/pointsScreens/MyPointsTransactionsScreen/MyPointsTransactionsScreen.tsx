import React, { useMemo, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import HeaderOnboarding from "components/HeaderOnboarding"
import AnimatedSelectCategory from "components/AnimatedSelectCategory"
import { FlatList } from "react-native"
import { MyPointsActivityItemMockType, mockMyPointsData } from "data/mockData"
import MyPointsActivityItem from "components/MyPointsActivityItem"

type Props = RootStackScreenProps<"my-points-transactions">

const MyPointsTransactionsScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [activeView, setActiveView] = useState(0)
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const filteredData = useMemo(() => {
    if (activeView === 1) {
      return mockMyPointsData.filter((item) => item.cost > 0)
    }

    if (activeView === 2) {
      return mockMyPointsData.filter((item) => item.cost <= 0)
    }

    return mockMyPointsData
  }, [mockMyPointsData, activeView])
  // Refs
  // Methods
  // Handlers
  const handleChangeSelected = (item: number) => {
    setActiveView(item)
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({ item }: { item: MyPointsActivityItemMockType }) => {
    return <MyPointsActivityItem item={item} />
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <HeaderOnboarding
        title={t("transactions_history")}
        className="px-[15] pb-[29] border-0"
        isChevron
      />
      <AnimatedSelectCategory
        categories={[t("all"), t("purchased"), t("spent")]}
        setSelectedCategory={handleChangeSelected}
      />
      <DmView className="pl-[16] pr-[5] flex-1">
        <FlatList
          data={filteredData}
          renderItem={renderListItem}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: insets.bottom + 24,
          }}
        />
      </DmView>
    </SafeAreaView>
  )
}

export default MyPointsTransactionsScreen

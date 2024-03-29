import React, { useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import {
  MockAllServicesItemType,
  MockAllServicesSubItemType,
  mockAllServicesData,
} from "data/mockData"

import AllServicesItem from "components/AllServicesItem"
import AllServicesSubItem from "components/AllServicesSubItem"
import HeaderOnboarding from "components/HeaderOnboarding"
import { FlatList, ScrollView } from "react-native"
import AllServicesModal from "components/AllServicesModal"

type Props = RootStackScreenProps<"all-services">

const AllServicesScreen: React.FC<Props> = ({ navigation }) => {
  const [isSearchModalVisible, setSearchModalVisible] = useState(false)
  const { t } = useTranslation()
  const handleItemPress = (item: MockAllServicesItemType) => {
    navigation.navigate("service-detail", { service: item })
  }

  // @TO DO
  const handleSearchPress = () => {
    setSearchModalVisible(true)
  }

  const hadnleCloseModal = () => {
    setSearchModalVisible(false)
  }

  // @TO DO
  const renderListItem = ({ item }: { item: MockAllServicesItemType }) => {
    return <AllServicesItem item={item} onPress={handleItemPress} />
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* @TO DO */}
      <HeaderOnboarding
        title={t("new_account")}
        className="px-[20]"
        Icon={<DmView className="w-[16] h-[16] bg-grey" />}
        onPressIcon={handleSearchPress}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <FlatList
          data={mockAllServicesData}
          renderItem={renderListItem}
          scrollEnabled={false}
        />
      </ScrollView>
      <AllServicesModal
        isVisible={isSearchModalVisible}
        onClose={hadnleCloseModal}
      />
    </SafeAreaView>
  )
}

export default AllServicesScreen

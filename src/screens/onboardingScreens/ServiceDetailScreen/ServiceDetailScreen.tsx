import React, { useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import { ScrollView } from "react-native"
import { FlatList } from "react-native"
import AllServicesSubItem from "components/AllServicesSubItem"
import ServiceDetailModal from "components/ServiceDetailModal"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { MockAllServicesSubItemType } from "data/mockData"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"

type Props = RootStackScreenProps<"service-detail">

const ServiceDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  // State
  const [isDetailModalVisible, setDetailModalVisible] = useState(false)
  // Global Store
  // Variables
  const { t } = useTranslation()
  const { service } = route.params
  // Refs
  // Methods
  // Handlers
  const handleSubItemPress = (item: MockAllServicesSubItemType) => {
    navigation.navigate("sign-up", { subItem: item })
  }

  const handleOpenDetailModal = () => {
    setDetailModalVisible(true)
  }

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false)
  }
  // Hooks
  // Listeners
  // Render Methods
  // @TO DO
  const renderListSubItem = ({
    item,
  }: {
    item: MockAllServicesSubItemType
  }) => {
    return (
      <>
        <AllServicesSubItem
          item={item}
          onPress={handleSubItemPress}
          onPressDetail={handleOpenDetailModal}
        />
        <ServiceDetailModal
          isVisible={isDetailModalVisible}
          onClose={handleCloseDetailModal}
          title={item.title}
          descr={item.descr}
        />
      </>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* @TO DO */}
      <HeaderOnboarding
        title={service?.title}
        className="px-[20]"
        Icon={<DmView className="w-[16] h-[16] bg-grey" />}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <FlatList
          data={service.subItems}
          renderItem={renderListSubItem}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ServiceDetailScreen

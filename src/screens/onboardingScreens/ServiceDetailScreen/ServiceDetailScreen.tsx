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
import { useDispatch } from "react-redux"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import { SubCategoryType } from "types"
import { setSelectedCategoriesId } from "store/auth/slice"

type Props = RootStackScreenProps<"service-detail">

const ServiceDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  // State
  const [isDetailModalVisible, setDetailModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<SubCategoryType>()
  // Global Store
  // Variables
  const { t } = useTranslation()
  const { service } = route.params
  const dispatch = useDispatch()
  // Refs
  // Methods
  // Handlers
  const handleSubItemPress = (item: SubCategoryType) => {
    navigation.navigate("sign-up", { subItem: item })
    dispatch(setSelectedCategoriesId([item?.id]))
  }

  const handleOpenDetailModal = (item: SubCategoryType) => {
    setSelectedItem(item)
    setDetailModalVisible(true)
  }

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false)
  }
  // Hooks
  // Listeners
  // Render Methods
  // @TO DO
  const renderListSubItem = ({ item }: { item: SubCategoryType }) => {
    return (
      <>
        <AllServicesSubItem
          item={item}
          onPress={handleSubItemPress}
          onPressDetail={handleOpenDetailModal}
        />
      </>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding title={service?.name} className="px-[20]" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <FlatList
          data={service.categories}
          renderItem={renderListSubItem}
          scrollEnabled={false}
        />
      </ScrollView>
      <ServiceDetailModal
        isVisible={isDetailModalVisible}
        onClose={handleCloseDetailModal}
        title={selectedItem?.name || ""}
        // @TO DO - descr
        descr={selectedItem?.descriptionForPros || ""}
      />
    </SafeAreaView>
  )
}

export default ServiceDetailScreen

import React, { useEffect, useLayoutEffect, useState } from "react"

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
import {
  MyServiceDetailCategorySelectType,
  ServiceCategoryType,
  SubCategoryType,
} from "types"
import { setCurrentScreen, setSelectedCategoriesId, setWaitAMomentModalPossibleVisible } from "store/auth/slice"
import { ProsServicesCategoriesResponse } from "services"
import {
  useCreateProsServiceCategoriesMutation,
  useLazyProsServiceCategoriesQuery,
} from "services/api"

type Props = RootStackScreenProps<"service-detail">

const ServiceDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const type = (route.params as MyServiceDetailCategorySelectType)?.type
  const myServicesCategoriesData = (
    route.params as MyServiceDetailCategorySelectType
  )?.myServicesCategoriesData
  const { service } = route.params
  // State
  const [isDetailModalVisible, setDetailModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<SubCategoryType>()
  const [isLoading, setLoading] = useState(false)

  // Global Store
  // Variables
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [createServiceCategory] = useCreateProsServiceCategoriesMutation()
  // Refs
  // Methods

  const isSericeWasAdd = (id: number) => {
    const allServicesId = myServicesCategoriesData?.map(
      (item) => item.serviceCategory.id
    )

    return allServicesId?.includes(id)
  }
  // Handlers
  const handleSubItemPress = (item: SubCategoryType) => {
    if (!type) {
      navigation.navigate("sign-up", { subItem: item })
      dispatch(setSelectedCategoriesId([item.id]))
    }

    if (type === "my-service") {
      handleOpenDetailModal(item)
    }
  }

  const handleOpenDetailModal = (item: SubCategoryType) => {
    setSelectedItem(item)
    setDetailModalVisible(true)
  }

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false)
  }

  const handleAddToMyServices = async () => {
    if (selectedItem && type === "my-service") {
      setLoading(true)
      try {
        const res = await createServiceCategory({
          serviceCategoryId: selectedItem.id,
        }).unwrap()
        dispatch(setWaitAMomentModalPossibleVisible(false))
        handleCloseDetailModal()
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [
              { name: "dashboard" },
              { name: "my-services" },
              {
                name: "my-services-detail",
                params: { service: res },
              },
            ],
          })
        }, 400)
      } catch (e) {
        console.log("Create My Service Error: ", e)
      } finally {
        setLoading(false)
      }
    }
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
          onPress={isSericeWasAdd(item.id) ? undefined : handleSubItemPress}
          onPressDetail={
            isSericeWasAdd(item.id) ? undefined : handleOpenDetailModal
          }
          isCheckHide={type === "my-service"}
          descr={
            type === "my-service"
              ? t(isSericeWasAdd(item.id) ? "added" : "plus_add")
              : undefined
          }
          classNameDescr={clsx(
            "text-11 leading-[14px] font-custom500",
            isSericeWasAdd(item.id) && "text-black"
          )}
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
        type={type}
        isLoading={isLoading}
        onPress={type === "my-service" ? handleAddToMyServices : undefined}
        // @TO DO - descr
        descr={selectedItem?.descriptionForPros || ""}
      />
    </SafeAreaView>
  )
}

export default ServiceDetailScreen

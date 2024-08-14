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
import HeaderOnboarding from "components/HeaderOnboarding"
import { useProsServiceCategoriesQuery } from "services/api"
import { ActivityIndicator, FlatList } from "react-native"
import { SubCategoryType } from "types"
import AllServicesSubItem from "components/AllServicesSubItem"
import { ProsServicesCategoriesResponse } from "services"
import PlusIcon from "assets/icons/plus.svg"
import colors from "styles/colors"
import MainModal from "components/MainModal"
import AddPlusTitleComponent from "components/AddPlusTitleComponent"

type Props = RootStackScreenProps<"my-services">

const MyServicesScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  // Global Store
  // Variables
  const { data, isFetching } = useProsServiceCategoriesQuery()
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handlePressItem = (item: SubCategoryType) => {
    if (data) {
      navigation.navigate("my-services-detail", {
        service: data?.filter(
          (fItem) => fItem.serviceCategory.id === item.id
        )[0],
      })
    }
  }

  const handleOpenDetailModal = (item: SubCategoryType) => {
    //
  }

  const handleAdd = () => {
    navigation.navigate("all-services", {
      type: "my-service",
      myServicesCategoriesData: data,
    })
  }

  // Hooks
  // Listeners
  // Render Methods

  const renderListItem = ({
    item,
  }: {
    item: ProsServicesCategoriesResponse
  }) => {
    return (
      <AllServicesSubItem
        item={item.serviceCategory}
        onPress={handlePressItem}
        onPressDetail={handleOpenDetailModal}
        status={item.status}
      />
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={t("my_services")}
        isChevron
        className="px-[12]"
      />
      {isFetching && (
        <DmView className="mt-[14]">
          <ActivityIndicator color={colors.red} />
        </DmView>
      )}
      <FlatList
        data={data}
        renderItem={renderListItem}
        ListFooterComponent={
          <AddPlusTitleComponent title={t("add_service")} onPress={handleAdd} />
        }
      />
    </SafeAreaView>
  )
}

export default MyServicesScreen

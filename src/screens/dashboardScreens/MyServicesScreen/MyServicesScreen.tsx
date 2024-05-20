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
import MaximumIcon from "assets/icons/maximum.svg"
import AddPlusTitleComponent from "components/AddPlusTitleComponent"

type Props = RootStackScreenProps<"my-services">

const MyServicesScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isMaxModalVisible, setMaxModalVisible] = useState(false)
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

  const handleCloseMaxModal = () => {
    setMaxModalVisible(false)
  }

  const handleOpenMaxModal = () => {
    setMaxModalVisible(true)
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
          <AddPlusTitleComponent
            title={t("add_service")}
            onPress={
              !!data?.length && data?.length >= 3
                ? handleOpenMaxModal
                : handleAdd
            }
          />
        }
      />
      <MainModal
        isVisible={isMaxModalVisible}
        descr={t("you_have_reached_the_maximum", { number: 3 })}
        onClose={handleCloseMaxModal}
        className="pt-[42] px-[59]"
        classNameDescr="mt-[24] text-13 leading-[20px] font-custom500"
        classNameCloseBtn="mt-[26] mx-[16]"
        isCloseBtn
        Icon={<MaximumIcon />}
      />
    </SafeAreaView>
  )
}

export default MyServicesScreen

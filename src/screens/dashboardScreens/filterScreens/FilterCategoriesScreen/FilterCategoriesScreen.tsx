import React from "react"

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
import {
  useGetServicesQuery,
  useProsServiceCategoriesQuery,
} from "services/api"
import { ActivityIndicator, FlatList } from "react-native"
import { ServiceCategoryType, SubCategoryType } from "types"
import FilterItem from "components/FilterItem"
import colors from "styles/colors"

type Props = RootStackScreenProps<"filter-categories">

const FilterCategoriesScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { selectedCategory, isLeads } = route.params
  // State
  // Global Store
  // Variables
  const { data: categoryData, isFetching } = useProsServiceCategoriesQuery()

  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleItemPress = (item: SubCategoryType | undefined) => {
    navigation.navigate("filter", {
      selectedCategory: item,
      prevScreen: "filter-categories",
      isLeads,
    })
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({ item }: { item: SubCategoryType }) => {
    return (
      <FilterItem
        title={item.name}
        onPress={() => handleItemPress(item)}
        classNameTitle="font-custom500"
        isSelected={selectedCategory?.id === item.id}
      />
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding isChevron className="px-[12px] border-0" />
      {isFetching && (
        <DmView className="py-[14] items-center">
          <ActivityIndicator color={colors.red} />
        </DmView>
      )}
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={categoryData?.map((item) => item.serviceCategory)}
        renderItem={renderListItem}
        ListHeaderComponent={
          <FilterItem
            title={t("all_categories")}
            isSelected={!selectedCategory?.id}
            onPress={() => handleItemPress(undefined)}
            classNameTitle="font-custom500"
          />
        }
      />
    </SafeAreaView>
  )
}

export default FilterCategoriesScreen

import React, { useState } from "react"

// Components
import { DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { MockSearchItemType, mockGovornorateSearchData } from "data/mockData"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import colors from "styles/colors"
import { FlatList, ScrollView } from "react-native"
import FilterItem from "components/FilterItem"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

type Props = RootStackScreenProps<"filter-cities">

const FilterCitiesScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const selectedCity = route.params?.selectedAddress
  // State
  const [filterValue, setFilterValue] = useState("")
  // Global Store
  // Variables
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleItemPress = (item: MockSearchItemType | undefined) => {
    navigation.navigate("filter", {
      selectedAddress: item,
      prevScreen: "filter-cities",
    })
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({ item }: { item: MockSearchItemType }) => {
    return (
      <FilterItem
        title={t(item.name)}
        onPress={() => handleItemPress(item)}
        classNameTitle="font-custom500"
        isSelected={selectedCity?.id === item.id}
      />
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={false}
      >
        <HeaderOnboarding isChevron className="px-[12px] border-0" />
        <DmView className="pb-[17] border-b-0.2 border-b-grey31 ">
          <DmInput
            placeholder={t("search_city")}
            isAnimText={false}
            className="bg-grey26 mx-[20] px-[23]"
            placeholderTextColor={colors.grey2}
            inputClassName="font-custom500"
            value={filterValue}
            onChangeText={setFilterValue}
          />
        </DmView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <FlatList
            data={mockGovornorateSearchData.filter((item) =>
              t(item.name).toLowerCase().includes(filterValue.toLowerCase())
            )}
            renderItem={renderListItem}
            scrollEnabled={false}
            ListHeaderComponent={
              <FilterItem
                title={t("all_cities")}
                isSelected={!selectedCity?.id}
                onPress={() => handleItemPress(undefined)}
                classNameTitle="font-custom500"
              />
            }
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default FilterCitiesScreen

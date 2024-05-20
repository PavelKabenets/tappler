import React, { useEffect, useState } from "react"

import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import FilterModalItem from "components/FilterItem"
import FilterItem from "components/FilterItem"
import { ActivityIndicator, FlatList, Keyboard, ScrollView } from "react-native"

import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { useDebounce } from "use-debounce"
import { useGetServicesQuery } from "services/api"

import { MockSearchItemType, mockGovornorateSearchData } from "data/mockData"
import { RootStackScreenProps } from "navigation/types"
import { ServiceCategoryType, SubCategoryType } from "types"

import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import colors from "styles/colors"
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from "react-native-keyboard-aware-scroll-view"
import { isSmallPhone } from "helpers/helpers"

type Props = RootStackScreenProps<"filter">

const FilterScreen: React.FC<Props> = ({ route, navigation }) => {
  const selectedCategoryParams = route.params?.selectedCategory
  const selectedAddressParams = route.params?.selectedAddress
  const prevScreen = route.params?.prevScreen

  const [selectedCategory, setSelectedCategory] = useState(
    selectedCategoryParams
  )
  const [selectedAddress, setSelectedAddress] = useState<
    MockSearchItemType | undefined
  >(selectedAddressParams)
  const [searchValue, setSearchValue] = useState("")
  const [debauncedText] = useDebounce(searchValue, 300)

  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const { data: categoryData, isFetching } = useGetServicesQuery(debauncedText)

  const handleGoCategoriesScreen = () => {
    navigation.navigate("filter-categories", { selectedCategory })
  }

  const handleGoCitiesScreen = () => {
    navigation.navigate("filter-cities", { selectedAddress })
  }

  const handleReset = () => {
    setSearchValue("")
    setSelectedAddress(undefined)
    setSelectedCategory(undefined)
  }

  const handleSelectSearchItem = (item: SubCategoryType) => {
    setSearchValue("")
    setSelectedCategory(item)
    setTimeout(() => {
      Keyboard.dismiss()
    }, 100)
  }

  // @TO DO
  const handleSubmit = () => {
    navigation.goBack()
  }

  useEffect(() => {
    if (prevScreen === "filter-categories") {
      setSelectedCategory(selectedCategoryParams)
    }
  }, [selectedCategoryParams])

  useEffect(() => {
    if (prevScreen === "filter-cities") {
      setSelectedAddress(selectedAddressParams)
    }
  }, [selectedAddressParams])

  const renderListItem = ({ item }: { item: SubCategoryType }) => {
    return (
      <FilterItem
        title={item.name}
        onPress={() => handleSelectSearchItem(item)}
        classNameTitle="font-custom500"
        isSelected={selectedCategory?.id === item.id}
      />
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <DmView
        className="mt-[17] flex-1 justify-between"
        style={{
          paddingBottom:
            insets.bottom > 45 ? insets.bottom - (insets.bottom - 45) : 45,
        }}
      >
        <DmView className="flex-1">
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 27 }}
            style={{ flexGrow: 0 }}
            scrollEnabled={false}
          >
            <DmView className="pl-[20] pr-[24] flex-row items-center justify-between">
              <DmView className="flex-[0.3]" onPress={navigation.goBack}>
                <CloseIcon />
              </DmView>
              <DmText className="flex-1 text-16 leading-[19px] font-custom600 text-center">
                {t("filters")}
              </DmText>
              <DmView className="flex-[0.3]" onPress={handleReset}>
                <DmText className="text-13 leading-[16px] font-custom600 text-red text-right">
                  {t("reset")}
                </DmText>
              </DmView>
            </DmView>
          </KeyboardAwareScrollView>
          <DmView>
            <FilterModalItem
              title={t("category")}
              titleChevron={selectedCategory?.name}
              onPress={handleGoCategoriesScreen}
              isChevronVisible
            />
            <FilterModalItem
              title={t("city")}
              onPress={handleGoCitiesScreen}
              titleChevron={
                selectedAddress?.name ? t(selectedAddress?.name) : undefined
              }
              isChevronVisible
            />
          </DmView>
          <KeyboardAwareScrollView
            scrollEnabled={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingHorizontal: 24,
              marginTop: 28,
            }}
            style={{ flexGrow: 0 }}
          >
            <DmView>
              <DmText className=" text-13 leading-[16px] font-custom600">
                {t("keyword")}
              </DmText>
              <DmInput
                placeholder={t("search_city")}
                isAnimText={false}
                className="my-[17] border-grey24 border-0.3"
                inputClassName="font-custom400"
                value={searchValue}
                onChangeText={setSearchValue}
              />
            </DmView>
          </KeyboardAwareScrollView>
          <DmView className="flex-1">
            <KeyboardAwareFlatList
              data={searchValue ? categoryData?.data : []}
              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={renderListItem}
              keyboardShouldPersistTaps="handled"
              keyExtractor={(item) => String(item.id)}
              extraScrollHeight={isSmallPhone ? -70 : -50}
              ListHeaderComponent={
                isFetching && !!searchValue ? (
                  <DmView className="pb-[14]">
                    <ActivityIndicator color={colors.red} />
                  </DmView>
                ) : null
              }
              ListEmptyComponent={
                !isFetching && !categoryData?.data && !!debauncedText ? (
                  <DmText className="text-13 leading-[17px] font-custom400 text-center text-red">
                    {t("nothing_found")}
                  </DmText>
                ) : null
              }
            />
          </DmView>
        </DmView>
        <DmView className="pt-[17] px-[20] border-grey31 border-0.2">
          <ActionBtn
            title={t("show_number_results", { number: 0 })}
            className="rounded-4"
            textClassName="text-13 leading-[16px] font-custom600"
            onPress={handleSubmit}
          />
        </DmView>
      </DmView>
    </SafeAreaView>
  )
}

export default FilterScreen

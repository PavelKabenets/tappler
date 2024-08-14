import React, { useEffect, useState } from "react"

import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import FilterModalItem from "components/FilterItem"
import FilterItem from "components/FilterItem"
import {
  ActivityIndicator,
  FlatList,
  I18nManager,
  Keyboard,
  ScrollView,
} from "react-native"

import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { useDebounce } from "use-debounce"
import {
  useGetServicesQuery,
  useLazyGetJobsQuery,
  useLazyGetLeadsQuery,
} from "services/api"

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
import CustomDatePicker from "components/CustomDatePicker"
import moment from "moment"

type Props = RootStackScreenProps<"filter">

const FilterScreen: React.FC<Props> = ({ route, navigation }) => {
  const selectedCategoryParams = route.params?.selectedCategory
  const selectedAddressParams = route.params?.selectedAddress
  const startDate = route.params?.startDate
  const endDate = route.params?.endDate
  const keyword = route.params?.keyword
  const prevScreen = route.params?.prevScreen
  const isLeads = route.params?.isLeads

  const [selectedCategory, setSelectedCategory] = useState(
    selectedCategoryParams
  )
  const [selectedAddress, setSelectedAddress] = useState<
    MockSearchItemType | undefined
  >(selectedAddressParams)
  const [isDatePicker1Open, setDatePicker1Open] = useState(false)
  const [isDatePicker2Open, setDatePicker2Open] = useState(false)
  const [date1, setDate1] = useState<Date | undefined>(
    startDate ? moment(startDate).toDate() : undefined
  )
  const [date2, setDate2] = useState<Date | undefined>(
    endDate ? moment(endDate).toDate() : undefined
  )
  const [isReset, setReset] = useState(false)

  const [searchValue, setSearchValue] = useState(keyword || "")
  const [total, setTotal] = useState(0)
  const [debauncedText] = useDebounce(searchValue, 300)

  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const [getJobs] = useLazyGetJobsQuery()
  const [getLeads] = useLazyGetLeadsQuery()

  const onTotal = async () => {
    try {
      if (isLeads) {
        const res = await getLeads({
          page: 1,
          startDate: date1 ? moment(date1).format("YYYY-MM-DD") : undefined,
          endDate: date2 ? moment(date2).format("YYYY-MM-DD") : undefined,
          categoryId: selectedCategory?.id,
          city: t(selectedAddress?.name || ""),
          keywords: debauncedText,
        }).unwrap()
        setTotal(res.total)
      } else {
        const res = await getJobs({
          page: 1,
          categoryId: selectedCategory?.id,
          city: t(selectedAddress?.name || ""),
          keywords: debauncedText,
        }).unwrap()
        setTotal(res.total)
      }
    } catch (e) {
      console.log("Get Total Error: ", e)
    }
  }

  const handleGoCategoriesScreen = () => {
    navigation.navigate("filter-categories", {
      selectedCategory,
      isLeads,
    })
  }

  const handleGoCitiesScreen = () => {
    navigation.navigate("filter-cities", { selectedAddress, isLeads })
  }

  const handleReset = () => {
    setSearchValue(() => "")
    setSelectedAddress(() => undefined)
    setSelectedCategory(() => undefined)
    setDate1(() => undefined)
    setDate2(() => undefined)
    setReset(true)
  }

  const handleSelectSearchItem = (item: SubCategoryType) => {
    setSearchValue("")
    setSelectedCategory(item)
    setTimeout(() => {
      Keyboard.dismiss()
    }, 100)
  }

  const handleSubmit = () => {
    if (isLeads) {
      navigation.navigate("leads", {
        selectedCategory,
        selectedAddress,
        startDate: date1 ? moment(date1).toISOString() : undefined,
        endDate: date2 ? moment(date2).toISOString() : undefined,
        keyword: searchValue,
      })
    } else {
      navigation.navigate("opportunities", {
        selectedCategory,
        selectedAddress,
        keyword: searchValue,
      })
    }
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

  useEffect(() => {
    if (isReset) {
      handleSubmit()
      setReset(false)
    }
  }, [isReset])

  useEffect(() => {
    onTotal()
  }, [selectedAddress, selectedCategory, debauncedText, date1, date2])

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
              paddingRight: 24,
              marginTop: 28,
            }}
            style={{ flexGrow: 0 }}
          >
            {isLeads && (
              <DmView className="pl-[24] pb-[28] mb-[28] border-b-0.2 border-b-grey31">
                <DmText className=" text-13 leading-[16px] font-custom600">
                  {t("posted_between")}
                </DmText>
                <DmView className="mt-[17] flex-row items-center">
                  <DmInput
                    placeholder={t("enter_date")}
                    classNamePlaceholder="text-center"
                    className="h-[38] flex-1"
                    classNameOnPressWrapper="items-center"
                    isAnimText={false}
                    value={
                      date1
                        ? moment(date1).format(
                            I18nManager.isRTL ? "YYYY/MM/DD" : "DD/MM/YYYY"
                          )
                        : ""
                    }
                    onPress={() => setDatePicker1Open(true)}
                  />
                  <DmText className="px-[10] text-13 leading-[16px] font-custom600 lowercase">
                    {t("to")}
                  </DmText>
                  <DmInput
                    placeholder={t("enter_date")}
                    classNamePlaceholder="text-center"
                    className="h-[38] flex-1"
                    classNameOnPressWrapper="items-center"
                    isAnimText={false}
                    value={
                      date2
                        ? moment(date2).format(
                            I18nManager.isRTL ? "YYYY/MM/DD" : "DD/MM/YYYY"
                          )
                        : ""
                    }
                    onPress={() => setDatePicker2Open(true)}
                  />
                </DmView>
              </DmView>
            )}
            <DmView className="pl-[24]">
              <DmText className=" text-13 leading-[16px] font-custom600">
                {t("keyword")}
              </DmText>
              <DmInput
                placeholder={t("search_keyword")}
                isAnimText={false}
                className="my-[17] border-grey24 border-0.3"
                inputClassName="font-custom400"
                value={searchValue}
                onChangeText={setSearchValue}
              />
            </DmView>
          </KeyboardAwareScrollView>
        </DmView>
        <DmView className="pt-[17] px-[20] border-t-grey31 border-t-0.2">
          <ActionBtn
            title={t("show_number_results", { number: total })}
            className="rounded-4"
            textClassName="text-13 leading-[16px] font-custom600"
            onPress={handleSubmit}
          />
        </DmView>
      </DmView>
      <CustomDatePicker
        open={isDatePicker1Open}
        modal
        mode="date"
        date={date1 || new Date()}
        onConfirm={(date) => {
          if (isDatePicker1Open) {
            setDate1(date)
            setDatePicker1Open(false)
          }
        }}
        onCancel={() => {
          setDatePicker1Open(false)
        }}
      />
      <CustomDatePicker
        open={isDatePicker2Open}
        modal
        mode="date"
        minimumDate={date1}
        date={date2 || new Date()}
        onConfirm={(date) => {
          if (isDatePicker2Open) {
            setDate2(date)
            setDatePicker2Open(false)
          }
        }}
        onCancel={() => {
          setDatePicker2Open(false)
        }}
      />
    </SafeAreaView>
  )
}

export default FilterScreen

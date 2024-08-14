import React, { useEffect, useRef, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderDashboard from "components/HeaderDashboard"
import { Shadow } from "react-native-shadow-2"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { hexToRGBA } from "helpers/helpers"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import colors from "styles/colors"
import FilterIcon from "assets/icons/filter.svg"
import SortIcon from "assets/icons/sort.svg"
import DeleteOpportunityModal from "components/DeleteOpportunityModal"
import SortModal from "components/SortModal"
import { useTypedSelector } from "store"
import { useGetLeadsQuery, useLazyGetLeadsQuery } from "services/api"
import OpportunityItem from "components/OpportunityItem"
import { JobType } from "types"
import { GetJobsResponse } from "services"
import { ActivityIndicator, FlatList } from "react-native"
import moment from "moment"

type Props = RootStackScreenProps<"leads">

const LeadsScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const filterParams = route.params
  // State
  const [isSortModalVisible, setSortModalVisible] = useState(false)
  const [sortType, setSortType] = useState<"ASC" | "DESC" | "nearest_to_me">(
    "ASC"
  )
  const [jobsData, setJobsData] = useState<GetJobsResponse>()
  const [page, setPage] = useState(0)
  const [targetJob, setTargetJob] = useState<JobType>()
  const { isShowDeleteOpportunitiesModal, jobsIgnoredIds } = useTypedSelector(
    (store) => store.auth
  )
  const flatListRef = useRef<FlatList>(null)
  // Global Store
  // Variables
  const { t } = useTranslation()
  const [getJobs, { isFetching }] = useLazyGetLeadsQuery()

  // Refs
  // Methods
  const onGetJobsData = async () => {
    if (
      !isFetching &&
      (jobsData ? jobsData?.data?.length < jobsData?.total : true)
    ) {
      try {
        const res = await getJobs({
          page: page + 1,
          sort: sortType,
          startDate: filterParams?.startDate
            ? moment(filterParams?.startDate).format("YYYY-MM-DD")
            : undefined,
          endDate: filterParams?.endDate
            ? moment(filterParams?.endDate).format("YYYY-MM-DD")
            : undefined,
          categoryId: filterParams?.selectedCategory?.id,
          city: t(filterParams?.selectedAddress?.name || ""),
          keywords: filterParams?.keyword,
        }).unwrap()
        setPage(res.page)
        if (!jobsData) {
          setJobsData(res)
        } else {
          setJobsData({
            ...jobsData,
            ...res,
            data: [...jobsData.data, ...res.data],
          })
        }
      } catch (e) {
        console.log("Get Jobs Error", e)
      }
    }
  }
  // Handlers
  const handleOpenSortModal = () => {
    setSortModalVisible(true)
  }

  const handleCloseSortModal = () => {
    setSortModalVisible(false)
  }

  const handleOpenFilter = () => {
    navigation.navigate("filter", { isLeads: true, ...filterParams })
  }

  const handleListItemPress = (item: JobType) => {
    // navigation.navigate("opportunity-detail", { job: item })
  }

  // Hooks
  useEffect(() => {
    setPage(0)
    setJobsData(undefined)
  }, [sortType, filterParams])

  useEffect(() => {
    onGetJobsData()
  }, [])

  useEffect(() => {
    if (jobsData === undefined) {
      onGetJobsData()
    }
  }, [jobsData])

  // Listeners
  // Render Methods
  const renderListItem = ({ item }: { item: JobType }) => {
    return (
      <OpportunityItem
        item={item}
        onPress={() => handleListItemPress(item)}
        isLead
      />
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <HeaderDashboard title={t("leads")} />
      <DmView className="mt-[12] mx-[16] h-[44] px-[12] rounded-10 flex-row items-center justify-between bg-grey48">
        <DmView className="flex-row items-center">
          <DmView className="w-[21] h-[15] bg-grey" />
          <DmText className="ml-[12] text-13 leading-[16px] font-custom600 text-grey30">
            {t("archived")}
          </DmText>
        </DmView>
        <DmText className="text-13 leading-[16px] font-custom600 text-grey30">
          0
        </DmText>
      </DmView>
      <Shadow
        startColor={hexToRGBA(colors.grey4, 0.1)}
        style={{ width: "100%" }}
        distance={3}
        sides={{ bottom: true, start: false, end: false, top: false }}
      >
        <DmView className="bg-white py-[16] pl-[12] pr-[25] flex-row justify-end">
          <DmView className="flex-row items-center">
            <DmView
              className="mx-[27] flex-row items-center"
              onPress={handleOpenSortModal}
            >
              <SortIcon />
              <DmText className="ml-[4] text-12 leading-[15px] font-custom600">
                {t("sort")}
              </DmText>
            </DmView>
            <DmView
              className="flex-row items-center"
              onPress={handleOpenFilter}
            >
              <FilterIcon />
              <DmText className="ml-[4] text-12 leading-[15px] font-custom600">
                {t("filter")}
              </DmText>
            </DmView>
          </DmView>
        </DmView>
      </Shadow>
      <FlatList
        ref={flatListRef}
        data={jobsData?.data}
        renderItem={renderListItem}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 15 }}
        onEndReached={onGetJobsData}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isFetching ? (
            <DmView className="py-[14]">
              <ActivityIndicator color={colors.red} />
            </DmView>
          ) : null
        }
      />
      <SortModal
        isVisible={isSortModalVisible}
        onClose={handleCloseSortModal}
        selectedType={sortType}
        setSelectedType={setSortType}
      />
    </SafeAreaView>
  )
}

export default LeadsScreen

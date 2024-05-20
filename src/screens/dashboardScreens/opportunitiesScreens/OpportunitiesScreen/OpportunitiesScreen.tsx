import React, { useEffect, useMemo, useRef, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderDashboard from "components/HeaderDashboard"
import FilterModal from "screens/dashboardScreens/filterScreens/FilterScreen"
import SortModal from "components/SortModal"
import OppourtunitiesModal from "components/OppourtunitiesModal"
import { Shadow } from "react-native-shadow-2"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useLazyGetJobsQuery } from "services/api"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { hexToRGBA } from "helpers/helpers"
import { GetJobsResponse } from "services"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import FilterIcon from "assets/icons/filter.svg"
import SortIcon from "assets/icons/sort.svg"
import BulbIcon from "assets/icons/bulb-yellow.svg"
import colors from "styles/colors"
import { ActivityIndicator, FlatList } from "react-native"
import { JobType } from "types"
import OpportunityItem from "components/OpportunityItem"
import { useIsFocused } from "@react-navigation/native"
import DeleteOpportunityModal from "components/DeleteOpportunityModal"
import { useTypedSelector } from "store"
import { useDispatch } from "react-redux"
import { addIgnoredJob } from "store/auth/slice"

type Props = RootStackScreenProps<"opportunities">

const OpportunitiesScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isSortModalVisible, setSortModalVisible] = useState(false)
  const [infoModalVisible, setInfoModalVisible] = useState(false)
  const [isDeleteOpporunitiesModalVisible, setDeleteOpporunitiesModalVisible] =
    useState(false)

  const [jobsData, setJobsData] = useState<GetJobsResponse>()
  const [page, setPage] = useState(0)
  const [sortType, setSortType] = useState<"ASC" | "DESC" | "nearest_to_me">(
    "ASC"
  )
  const [targetJob, setTargetJob] = useState<JobType>()
  const { isShowDeleteOpportunitiesModal, jobsIgnoredIds } = useTypedSelector(
    (store) => store.auth
  )

  const flatListRef = useRef<FlatList>(null)
  // Global Store
  // Variables
  const [getJobs, { isFetching }] = useLazyGetJobsQuery()
  const { t } = useTranslation()
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  const filteredData = useMemo(() => {
    return jobsData?.data?.filter((item) => !jobsIgnoredIds?.includes(item.id))
  }, [jobsIgnoredIds, jobsData])
  // Refs
  // Methods
  // Handlers
  const handleOpenFilter = () => {
    navigation.navigate("filter")
  }

  const handleOpenSortModal = () => {
    setSortModalVisible(true)
  }

  const handleCloseSortModal = () => {
    setSortModalVisible(false)
  }

  const handleOpenInfoModal = () => {
    setInfoModalVisible(true)
  }

  const handleCloseInfoModal = () => {
    setInfoModalVisible(false)
  }

  const handleListItemPress = (item: JobType) => {
    navigation.navigate("opportunity-detail", { job: item })
  }

  const onGetJobsData = async () => {
    if (
      !isFetching &&
      (jobsData ? jobsData?.data?.length < jobsData?.total : true)
    ) {
      try {
        const res = await getJobs({ page: page + 1, sort: sortType }).unwrap()
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

  const handleOpenDeleteOpportunitiesModal = (item: JobType) => {
    setTargetJob(item)
    if (isShowDeleteOpportunitiesModal) {
      setDeleteOpporunitiesModalVisible(true)
    } else {
      dispatch(addIgnoredJob(item.id))
    }
  }

  const handleCloseDeleteOpportunitiesModal = () => {
    setDeleteOpporunitiesModalVisible(false)
  }

  // Hooks
  useEffect(() => {
    onGetJobsData()
  }, [])

  useEffect(() => {
    setPage(0)
    setJobsData(undefined)
  }, [sortType])

  useEffect(() => {
    if (isFocused) {
      flatListRef?.current?.scrollToOffset({ offset: 0, animated: true })
    }
  }, [isFocused])
  // Listeners
  // Render Methods
  const renderListItem = ({ item }: { item: JobType }) => {
    return (
      <OpportunityItem
        item={item}
        onNotInterestPress={() => handleOpenDeleteOpportunitiesModal(item)}
        onPress={() => handleListItemPress(item)}
      />
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <HeaderDashboard title={t("opportunities")} />
      <Shadow
        startColor={hexToRGBA(colors.grey4, 0.1)}
        style={{ width: "100%" }}
        distance={3}
        sides={{ bottom: true, start: false, end: false, top: false }}
      >
        <DmView className="bg-white py-[16] pl-[12] pr-[25] flex-row justify-between">
          <DmView
            className="flex-1 flex-row items-center"
            onPress={handleOpenInfoModal}
          >
            <BulbIcon />
            <DmText className="ml-[4] text-13 leading-[16px] font-custom500">
              {t("what_are_opportunities")}
            </DmText>
          </DmView>
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
        data={filteredData}
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
      <OppourtunitiesModal
        isVisible={infoModalVisible}
        onClose={handleCloseInfoModal}
      />
      {!!targetJob && (
        <DeleteOpportunityModal
          onClose={handleCloseDeleteOpportunitiesModal}
          isVisible={isDeleteOpporunitiesModalVisible}
          item={targetJob}
        />
      )}
    </SafeAreaView>
  )
}

export default OpportunitiesScreen

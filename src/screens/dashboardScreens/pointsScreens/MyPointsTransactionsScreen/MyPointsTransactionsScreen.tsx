import React, { useEffect, useMemo, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import HeaderOnboarding from "components/HeaderOnboarding"
import AnimatedSelectCategory from "components/AnimatedSelectCategory"
import { ActivityIndicator, FlatList } from "react-native"
import { MyPointsActivityItemMockType, mockMyPointsData } from "data/mockData"
import MyPointsActivityItem from "components/MyPointsActivityItem"
import { PointsTransactionsHistoryType } from "types"
import { GetPointsHistoryResponse } from "services"
import { useLazyGetPointsHistoryQuery } from "services/api"
import colors from "styles/colors"

type Props = RootStackScreenProps<"my-points-transactions">

const MyPointsTransactionsScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { data } = route.params
  // State
  const [activeView, setActiveView] = useState(0)
  const [pointsHistoryData, setPointsHistoryData] = useState(data)
  const [pointsHistoryPurchasedData, setPointsHistoryPurchasedData] =
    useState<GetPointsHistoryResponse>()
  const [pointsHistorySpentData, setPointsHistorySpentData] =
    useState<GetPointsHistoryResponse>()
  const [prevPointsHistoryData, setPrevPointsHistoryData] =
    useState<GetPointsHistoryResponse>()
  const [prevPointsPurchasedHistoryData, setPrevPointsPurchasedHistoryData] =
    useState<GetPointsHistoryResponse>()
  const [prevPointsSpentHistoryData, setPrevPointsSpentHistoryData] =
    useState<GetPointsHistoryResponse>()
  const [page, setPage] = useState(data?.page || 1)
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const [getPoins, { isFetching }] = useLazyGetPointsHistoryQuery()
  const [getPoinsPurchased, { isFetching: isFetchingPurchased }] =
    useLazyGetPointsHistoryQuery()
  const [getPoinsSpent, { isFetching: isFetchingSpent }] =
    useLazyGetPointsHistoryQuery()

  const filteredData = useMemo(() => {
    if (activeView === 1) {
      return pointsHistoryPurchasedData?.data
    }

    if (activeView === 2) {
      return pointsHistorySpentData?.data
    }

    return pointsHistoryData?.data
  }, [pointsHistoryData, activeView])
  // Refs
  // Methods
  const onUnionpointsHistoryData = (
    response: GetPointsHistoryResponse,
    currnetData: GetPointsHistoryResponse | undefined,
    setData: React.Dispatch<
      React.SetStateAction<GetPointsHistoryResponse | undefined>
    >
  ) => {
    if (currnetData) {
      const unicItems = response.data?.filter(
        (item) => !currnetData.data.includes(item)
      )

      setData({
        page: response.page,
        perPage: response.perPage,
        total: response.total,
        data: [...currnetData.data, ...unicItems],
      })
    } else {
      setData(response)
    }
  }

  const onGetPoinstResponse = async () => {
    try {
      const res = await getPoins({
        page,
      }).unwrap()
      const resPuschased = await getPoinsPurchased({
        page,
      }).unwrap()
      const resSpend = await getPoinsSpent({
        page,
      }).unwrap()
      onUnionpointsHistoryData(res, pointsHistoryData, setPointsHistoryData)
      onUnionpointsHistoryData(
        resSpend,
        pointsHistorySpentData,
        setPointsHistorySpentData
      )
      onUnionpointsHistoryData(
        resPuschased,
        pointsHistoryPurchasedData,
        setPointsHistoryPurchasedData
      )
    } catch (e) {
      console.log("Get Points Error: ", e)
    }
  }

  const endReachedValidation = () => {
    if (activeView === 0) {
      return (
        !isFetching &&
        prevPointsHistoryData?.data.length !== pointsHistoryData?.data.length &&
        pointsHistoryData
      )
    }

    if (activeView === 1) {
      return (
        !isFetchingPurchased &&
        prevPointsPurchasedHistoryData?.data.length !==
          pointsHistoryPurchasedData?.data.length &&
        pointsHistoryPurchasedData
      )
    }

    if (activeView === 2) {
      return (
        !isFetchingPurchased &&
        prevPointsSpentHistoryData?.data.length !==
          pointsHistorySpentData?.data.length &&
        pointsHistorySpentData
      )
    }
  }

  const onEndReached = () => {
    if (endReachedValidation()) {
      setPage((prev) => prev + 1)
      setPrevPointsHistoryData(pointsHistoryData)
      setPrevPointsPurchasedHistoryData(pointsHistoryPurchasedData)
      setPrevPointsSpentHistoryData(pointsHistorySpentData)
    }
  }
  // Handlers
  const handleChangeSelected = (item: number) => {
    setActiveView(item)
  }

  const handleGoBack = () => {
    navigation.navigate("my-points", { data: pointsHistoryData })
  }

  // Hooks
  useEffect(() => {
    onGetPoinstResponse()
  }, [page])
  // Listeners
  // Render Methods
  const renderListItem = ({
    item,
  }: {
    item: PointsTransactionsHistoryType
  }) => {
    return <MyPointsActivityItem item={item} />
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <HeaderOnboarding
        title={t("transactions_history")}
        className="px-[15] pb-[29] border-0"
        isChevron
        onGoBackPress={handleGoBack}
      />
      <AnimatedSelectCategory
        categories={[t("all"), t("purchased"), t("spent")]}
        setSelectedCategory={handleChangeSelected}
      />
      <DmView className="pl-[16] pr-[5] flex-1">
        <FlatList
          data={filteredData}
          renderItem={renderListItem}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: insets.bottom + 24,
          }}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            (isFetching || isFetchingSpent || isFetchingPurchased) ? (
              <ActivityIndicator color={colors.red} className="mt-[12]" />
            ) : null
          }
        />
      </DmView>
    </SafeAreaView>
  )
}

export default MyPointsTransactionsScreen

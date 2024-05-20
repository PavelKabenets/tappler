import React, { useEffect, useMemo, useState } from "react"

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
import CloseIcon from "assets/icons/close.svg"
import SettingsItem from "components/SettingsItem"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import ScoreAccordeon from "components/ScoreAccordeon"
import { ScoreData } from "data/scoreData"
import { ScrollView } from "react-native-gesture-handler"
import RateComponent from "components/RateComponent"
import RateBarComponent from "components/RateBarComponent"
import ReviewComponent from "components/ReviewComponent"
import moment from "moment"
import { ActivityIndicator, FlatList } from "react-native"
import { MockReviewsDataType, reviewsMockData } from "data/mockData"
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import ArrowUp from "assets/icons/arrow-up.svg"
import ArrowDown from "assets/icons/arrow-down.svg"
import colors from "styles/colors"
import { useTypedSelector } from "store"
import { useLazyGetProsReviewMeQuery } from "services/api"
import { ReviewItemType } from "types"
import { MyReviewResponse } from "services"

type Props = RootStackScreenProps<"score-detail">

const ScoreDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { type } = route.params
  // State
  const [data, setData] = useState<MyReviewResponse>()
  const [isFullVisible, setFullVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [resDataLength, setResDataLength] = useState(0)

  const [getMyReviews, { isFetching }] = useLazyGetProsReviewMeQuery()

  const { user } = useTypedSelector((store) => store.auth)

  const animRef = useAnimatedRef()

  const height = useSharedValue(0)
  const translateY = useSharedValue(0)

  // const alwaysShowData = useMemo(() => {
  //   return data.slice(0, 4)
  // }, [data])

  // const toggleData = useMemo(() => {
  //   return data.slice(4)
  // }, [data])

  // Global Store
  // Variables
  const { t } = useTranslation()

  const handleShowMore = async () => {
    try {
      const res = await getMyReviews(currentPage + 1).unwrap()

      setResDataLength(res.data.length)
      setCurrentPage(res.page)

      setData((prev) => ({
        ...res,
        data: [...(prev?.data || []), ...(res.data || [])],
      }))
    } catch (e) {
      console.log("Reviews Errorr: ", e)
    }
  }

  const toggleAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, { duration: 250 }),
        },
      ],
      overflow: "hidden",
      height: withTiming(height.value, { duration: 100 }),
    }
  }, [data])

  useEffect(() => {
    if (!data?.data.length) {
      handleShowMore()
    }
  }, [])
  // Refs
  // Methods
  // Handlers
  // Hooks
  // Listeners
  // Render Methods
  const renderTitle = () => {
    switch (type) {
      case "response":
        return t("your_average_response_time")
      case "views":
        return t("your_profile_views")
    }
  }

  const renderAccrodeonItem = () => {
    switch (type) {
      case "response":
        return ScoreData[0]
      case "views":
        return ScoreData[1]
    }
  }

  const renderScore = () => {
    switch (type) {
      case "response":
        return user?.responseTimeHours || 0
      default:
        return 0
    }
  }

  const renderPeriodsData = () => {
    const result = {
      week: 0,
      month: 0,
      lifeTime: 0,
    }

    switch (type) {
      case "response":
        {
          result.week = user?.responseTimePeriods?.weekResponseTime || 0
          result.month = user?.responseTimePeriods?.monthResponseTime || 0
          result.lifeTime = user?.responseTimePeriods?.lifeTimeResponseTime || 0
        }
        break
    }

    return result
  }

  const handleToggle = () => {
    if (height.value) {
      height.value = 0
      translateY.value = -40
    } else {
      runOnUI(() => {
        if (!!measure(animRef) && !!measure(animRef)?.height) {
          height.value = measure(animRef)!.height
          translateY.value = 0
        }
      })()
    }
    setFullVisible(!isFullVisible)
  }

  const renderListItem = ({
    item,
    index,
  }: {
    item: ReviewItemType
    index: number
  }) => {
    return <ReviewComponent item={item} key={item.id} />
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <DmView
        className="px-[12] my-[16]"
        hitSlop={HIT_SLOP_DEFAULT}
        onPress={navigation.goBack}
      >
        <CloseIcon />
      </DmView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
        {type !== "review" && (
          <DmView className="px-[12] flex-1 bg-white">
            <DmView className="items-center">
              <DmView className="w-[93] h-[93] rounded-full border-1 border-red items-center justify-center">
                <DmText className="text-33 leading-[40px] text-center font-custom500">
                  {renderScore()}
                </DmText>
                {type === "response" && (
                  <DmText className="text-13 leading-[16px] text-center font-custom500">
                    {t("hours")}
                  </DmText>
                )}
              </DmView>
            </DmView>
            <DmText className="mt-[10] text-center font-custom600 text-13 leading-[16px]">
              {renderTitle()}
            </DmText>
            <DmView className="mt-[50] pr-[4]">
              <SettingsItem
                title={t("in_last_days", { number: 7 })}
                mode="none"
                titleChevron={String(renderPeriodsData().week)}
                classNameTitleChevron="text-black"
                className="pl-[0]"
              />
              <SettingsItem
                title={t("in_last_month")}
                mode="none"
                titleChevron={String(renderPeriodsData().month)}
                classNameTitleChevron="text-black"
                className="pl-[0]"
              />
              <SettingsItem
                title={t("lifetime")}
                mode="none"
                titleChevron={String(renderPeriodsData().lifeTime)}
                classNameTitleChevron="text-black"
                className="pl-[0]"
              />
            </DmView>
            <ScoreAccordeon className="mt-[14]" item={renderAccrodeonItem()!} />
          </DmView>
        )}
        {type === "review" && (
          <DmView className="flex-1">
            <DmView className="mt-[4] px-[15]">
              <DmText className="text-24 leadnig-[29px] font-custom500 text-center">
                {user?.reviewScore?.overallScore
                  ? Number(user?.reviewScore?.overallScore).toFixed(1)
                  : 0}{" "}
                {t("of")} 5
              </DmText>
              <>
                <DmText className="mt-[8] text-center text-13 leading-[16px] font-custom500">
                  {t("your_review_score")}
                </DmText>
                <RateComponent
                  rate={Number(
                    Number(user?.reviewScore?.overallScore || 0).toFixed(1)
                  )}
                  className="mt-[22] items-center"
                  reviewsCount={user?.reviewScore?.reviewsCount || 0}
                />
                <RateBarComponent
                  rate={user?.reviewScore?.qualityScore || 0}
                  title={t("quality_and_perfection")}
                  className="mt-[43]"
                />
                <RateBarComponent
                  rate={user?.reviewScore?.completionInTimeScore || 0}
                  title={t("completing_job_on_time")}
                  className="mt-[10]"
                  key={"mock-2"}
                />
                <RateBarComponent
                  rate={user?.reviewScore?.jobAwarenessScore || 0}
                  title={t("knowledge_about_task")}
                  className="mt-[10]"
                />
                <RateBarComponent
                  rate={user?.reviewScore?.honestyScore || 0}
                  title={t("honesty_and_trust")}
                  className="mt-[10]"
                />
                <RateBarComponent
                  rate={user?.reviewScore?.responseTimeScore || 0}
                  title={t("communicating_response")}
                  className="mt-[10]"
                  key={"mock-4"}
                />
              </>
            </DmView>
            <DmView className="mt-[43] px-[5]">
              <>
                <DmText className="ml-[9] text-16 leading-[19px] font-custom600">
                  {t("my_reviews")}
                </DmText>
                {!data?.data.length && !isFetching && (
                  <DmView className="mx-[3.5] mt-[8.5] pl-[9] border-t-grey34 border-t-0.5 py-[5.5]">
                    <DmText className="text-12 leading-[15px] font-custom400">
                      {t("you_do_not_have_any_reviews_yet")}
                    </DmText>
                  </DmView>
                )}
                <FlatList
                  data={data?.data}
                  keyExtractor={(item) => String(item.id)}
                  scrollEnabled={false}
                  renderItem={renderListItem}
                  className="mt-[4] z-20 bg-white"
                  ListFooterComponent={
                    <>
                      {isFetching && (
                        <DmView className="mt-[12] items-center">
                          <ActivityIndicator color={colors.red} />
                        </DmView>
                      )}
                    </>
                  }
                />
              </>
              {/* <Animated.View style={toggleAnim} className="overflow-hidden">
                <Animated.View ref={animRef} className="absolute w-full">
                  <FlatList
                    data={toggleData}
                    keyExtractor={(item) => String(item.id)}
                    scrollEnabled={false}
                    renderItem={renderListItem}
                    className="z-10"
                  />
                </Animated.View>
              </Animated.View> */}
            </DmView>
            {resDataLength === 20 && (
              <DmView
                className="my-[14] flex-row items-center justify-center"
                onPress={handleShowMore}
              >
                {/* {isFullVisible ? (
                    <ArrowUp stroke={colors.red} />
                  ) : (
                    <ArrowDown stroke={colors.red} />
                  )}
                  <DmText className="text-13 leading-[16px] text-red font-custom500">
                    {isFullVisible ? t("hide") : t("see_all")}
                  </DmText> */}
                <ArrowDown stroke={colors.red} />

                <DmText className="text-13 leading-[16px] text-red font-custom500">
                  {t("show_more")}
                </DmText>
              </DmView>
            )}
          </DmView>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ScoreDetailScreen

import React, { useEffect, useLayoutEffect, useMemo, useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { I18nManager, Platform, ScrollView, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderDashboard from "components/HeaderDashboard"
import { Image } from "react-native"
import ScoreComponent from "components/ScoreComponent"
import DashboardCategoryItem from "components/DashboardCategoryItem"

// Hooks & Redux
import { useDispatch } from "react-redux"
import { logout, setWaitAMomentModalPossibleVisible } from "store/auth/slice"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { useTypedSelector } from "store"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import img from "assets/images/auth.png"
import NonAcriveIcon from "assets/icons/non-active-account.svg"
import MyServices from "assets/icons/my-services.svg"
import UpgradeIcon from "assets/icons/upgrade.svg"
import MyDocumentsIcon from "assets/icons/my-documents.svg"
import MyPoints from "assets/icons/points.svg"
import colors from "styles/colors"
import { useFocusEffect, useIsFocused } from "@react-navigation/native"
import ActiveIcon from "assets/icons/active-defence.svg"
import NotificationModal from "components/NotificationModal"
import WaitAMomentModal from "components/WaitAMomentModal"
import {
  SCREEN_HEIGHT,
  isLittlePhone,
  isSmallPhone,
  isSmallPhoneHeight,
} from "helpers/helpers"
import {
  useGetJobsQuery,
  useGetMyDocumentQuery,
  useGetPointsPackagesQuery,
  useGetProsQuery,
  useLazyRefreshTokenQuery,
  useProsServiceCategoriesQuery,
  useResponseTimeQuery,
} from "services/api"
import { API_URL } from "config"
import AccountStatusModal from "components/AccountStatusModal"
import renderStatusIcon from "utils/renderStatusIcon"

type Props = RootStackScreenProps<"home">

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const userParams = route.params?.userParams
  // State
  const [statusBar, setStatusBar] = useState<"light-content" | "dark-content">(
    "light-content"
  )
  const [isNotificationModalVisible, setNotificationModalVisible] =
    useState(false)
  const [isWaitAMomentModalVisible, setWaitAMomentModalVisible] =
    useState(false)
  const [isStatusModalVisible, setStatusModalVisible] = useState(false)
  // Global Store
  // Variables
  const {
    user: stateUser,
    isNotificationRequestWasShowing,
    currentScreen,
    token,
    isWaitAMomentModalPossibleVisible,
    refreshToken,
    isAuth,
    isLogout,
  } = useTypedSelector((store) => store.auth)

  const user = useMemo(() => {
    if (stateUser) {
      return stateUser
    }
    if (userParams) {
      return userParams
    }
    return stateUser
  }, [stateUser, userParams])

  useGetProsQuery()
  useResponseTimeQuery()
  useGetJobsQuery({ page: 1 })
  useGetPointsPackagesQuery(1)
  const { data: documentsData } = useGetMyDocumentQuery()
  const { data: servicesData, refetch } = useProsServiceCategoriesQuery()

  const [refreshTokenRequest] = useLazyRefreshTokenQuery()
  const dispatch = useDispatch()
  const instets = useSafeAreaInsets()
  const isFocused = useIsFocused()
  const insets = useSafeAreaInsets()

  const imgHeight = useMemo(() => {
    if (isSmallPhoneHeight) {
      return SCREEN_HEIGHT / 5.7
    }
    return SCREEN_HEIGHT / 5
  }, [SCREEN_HEIGHT])

  const { t } = useTranslation()
  // Refs
  // Methods
  const onRefreshToken = async () => {
    try {
      if (token && refreshToken) {
        await refreshTokenRequest(token).unwrap()
      }
    } catch (e) {
      console.log("Error Rerfresh: ", e)
    }
  }
  // Handlers
  const handleRersponseTimePress = () => {
    navigation.navigate("score-detail", { type: "response" })
  }

  const handleViewPress = () => {
    navigation.navigate("score-detail", { type: "views" })
  }

  const handleReviewScore = () => {
    navigation.navigate("score-detail", { type: "review" })
  }

  const handleServicesPress = () => {
    navigation.navigate("my-services")
  }

  const handleAccountUpgrade = () => {
    navigation.navigate("account-upgrades")
  }

  const handleMyDocuments = () => {
    navigation.navigate("my-documents", { documents: documentsData })
  }

  const handleMyPoints = () => {
    navigation.navigate("my-points")
  }

  const handleCloseNotificationModal = () => {
    setNotificationModalVisible(false)
  }

  const handleCloseWaitAMomentModal = () => {
    setWaitAMomentModalVisible(false)
  }

  const handleOpenStatusModal = () => {
    setStatusModalVisible(true)
  }

  const handleCloseStatusModal = () => {
    setStatusModalVisible(false)
  }

  // Hooks
  useEffect(() => {
    if (isFocused) {
      setStatusBar("light-content")
    } else {
      setStatusBar("dark-content")
    }
  }, [isFocused])

  useEffect(() => {
    if (!isNotificationRequestWasShowing) {
      setNotificationModalVisible(true)
    }
  }, [isNotificationRequestWasShowing])

  useEffect(() => {
    if (
      user?.accountStatus === "registered" &&
      isNotificationRequestWasShowing &&
      !currentScreen &&
      isWaitAMomentModalPossibleVisible &&
      isAuth &&
      !isLogout
    ) {
      setWaitAMomentModalVisible(true)
    }
    dispatch(setWaitAMomentModalPossibleVisible(true))
  }, [])

  useEffect(() => {
    if (isLogout || !isAuth) {
      setWaitAMomentModalVisible(false)
    }
  }, [isLogout, isAuth])

  useEffect(() => {
    async function refetchFunc() {
      await refetch()
    }

    refetchFunc()
  }, [isFocused])

  // Listeners
  // Render Methods
  return (
    <DmView className="flex-1 bg-white justify-between">
      <DmView className="flex-1">
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle={statusBar}
        />
        <DmView style={{ paddingTop: instets.top }} className="bg-black1">
          <HeaderDashboard />
        </DmView>
        <DmView className="flex-1 justify-around">
          <DmView>
            <DmText
              className={clsx(
                "mt-[12] mx-[24] text-center text-25 leading-[30px] text-black font-custom600",
                I18nManager.isRTL && "mt-[4]"
              )}
              numberOfLines={1}
            >
              {t("hi")} {user?.registeredName?.split(" ")[0]}
            </DmText>
            <DmText
              className={clsx(
                "mt-[4] text-13 leading-[16px] font-custom500 text-grey18 text-center",
                I18nManager.isRTL && "mt-[-4]"
              )}
            >
              {t("account_id")}: {user?.id}
            </DmText>
          </DmView>
          <DmView
            className={clsx(
              "items-center mt-[10] justify-between",
              I18nManager.isRTL && "mt-[0]"
            )}
          >
            <Image
              source={img}
              style={{ height: imgHeight, width: imgHeight * 1.5 }}
            />
          </DmView>
          <ActionBtn
            className="mt-[10] mx-[47] border-0 rounded-5 flex-row-reverse px-[36] h-[41] bg-grey29"
            title={t("account_is_inactive")}
            onPress={handleOpenStatusModal}
            variant="grey"
            textClassName="text-13 leading-[16px] font-custom500 text-black"
            IconNearTitle={renderStatusIcon(user?.accountStatus)}
          />
        </DmView>
      </DmView>
      <DmView>
        <DmView>
          <DmView
            className={clsx("mt-[20] px-[12]", I18nManager.isRTL && "mt-[8]")}
          >
            <DmView className="flex-row items-center justify-between">
              <ScoreComponent
                title={String(user?.responseTimeHours || 0)}
                subTitle={`(${t("hours")})`}
                descr={t("response_time")}
                className="flex-1"
                onPress={handleRersponseTimePress}
              />
              <ScoreComponent
                title="0"
                descr={t("profile_views")}
                className="flex-1 mx-[5]"
                onPress={handleViewPress}
              />
              <ScoreComponent
                title={`${user?.reviewScore?.overallScore.toFixed(1) || 0} ${t("of")} 5`}
                descr={t("review_score")}
                className="flex-1"
                onPress={handleReviewScore}
              />
            </DmView>
          </DmView>
        </DmView>
        <DmView
          className={clsx("my-[10] px-[12] flex-row justify-between flex-wrap")}
        >
          <DashboardCategoryItem
            title={t("my_services")}
            onPress={handleServicesPress}
            descr={t("add_remove_services")}
            Icon={<MyServices />}
            isComplete={servicesData?.some((item) => item.status === "active")}
          />
          <DashboardCategoryItem
            title={t("account_upgrades")}
            onPress={handleAccountUpgrade}
            descr={t("basic_account")}
            Icon={<UpgradeIcon />}
            isComplete
          />
          <DashboardCategoryItem
            title={t("my_documents")}
            className="mt-[10]"
            onPress={handleMyDocuments}
            descr={t("add_view_documents")}
            Icon={<MyDocumentsIcon />}
          />
          <DashboardCategoryItem
            title={t("my_points")}
            className="mt-[10]"
            onPress={handleMyPoints}
            descr={t("you_have_points", { number: 0 })}
            Icon={<MyPoints />}
            isComplete
          />
        </DmView>
      </DmView>

      <NotificationModal
        isVisible={isNotificationModalVisible}
        onClose={handleCloseNotificationModal}
        setWaitAMomentModalVisible={setWaitAMomentModalVisible}
      />
      <WaitAMomentModal
        isVisible={isWaitAMomentModalVisible}
        onClose={handleCloseWaitAMomentModal}
      />
      <AccountStatusModal
        isVisible={isStatusModalVisible}
        onClose={handleCloseStatusModal}
      />
    </DmView>
  )
}

export default HomeScreen

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
  useGetNotitficationsQuery,
  useGetPointsHistoryQuery,
  useGetPointsPackagesQuery,
  useGetProSybscriptionsQuery,
  useGetProductsTrustQuery,
  useGetProsQuery,
  useGetQuotesQuery,
  useLazyGetNotitficationsByIdQuery,
  useLazyRefreshTokenQuery,
  usePostRegisterNotificationsDeviceMutation,
  useProsServiceCategoriesQuery,
  useResponseTimeQuery,
} from "services/api"
import { API_URL } from "config"
import AccountStatusModal from "components/AccountStatusModal"
import renderStatusIcon from "utils/renderStatusIcon"
import { useNetInfoInstance } from "@react-native-community/netinfo"
import messaging from "@react-native-firebase/messaging"
import notifee, { EventType, Notification } from "@notifee/react-native"
import { NotificationsItemType } from "types"

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
    isNotificationsAllowed,
    isOnceServiceAllowed,
    lastDoc,
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

  const { refetch: refetchPro } = useGetProsQuery(undefined, {
    pollingInterval: 60000,
  })
  useGetQuotesQuery({ page: 1 })
  useResponseTimeQuery()
  useGetJobsQuery({ page: 1 })
  useGetPointsPackagesQuery(1)
  useGetPointsHistoryQuery({ page: 1 })
  useGetProductsTrustQuery({ page: 1 })
  useGetProSybscriptionsQuery()
  useGetNotitficationsQuery({ page: 1 })
  const { data: documentsData } = useGetMyDocumentQuery()
  const { data: servicesData, refetch } = useProsServiceCategoriesQuery()

  const [refreshTokenRequest] = useLazyRefreshTokenQuery()
  const dispatch = useDispatch()
  const instets = useSafeAreaInsets()
  const isFocused = useIsFocused()
  const insets = useSafeAreaInsets()
  const {
    netInfo: { type, isConnected },
    refresh,
  } = useNetInfoInstance()
  const [getNotificationById] = useLazyGetNotitficationsByIdQuery()
  const [postDeviceTokenNotif] = usePostRegisterNotificationsDeviceMutation()

  const imgHeight = useMemo(() => {
    if (isSmallPhoneHeight) {
      return SCREEN_HEIGHT / 5.7
    }
    return SCREEN_HEIGHT / 5
  }, [SCREEN_HEIGHT])

  const { t } = useTranslation()
  // Refs
  // Methods
  async function onMessageReceived(message: any) {
    notifee.displayNotification({
      data: {
        id: message.id,
      },
      title: message.title,
      body: message.body,
    })
  }
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
      !isLogout &&
      isConnected
    ) {
      setWaitAMomentModalVisible(true)
    }
    dispatch(setWaitAMomentModalPossibleVisible(true))
  }, [!!isConnected])

  useEffect(() => {
    if (isLogout || !isAuth) {
      setWaitAMomentModalVisible(false)
    }
  }, [isLogout, isAuth])

  useEffect(() => {
    async function refetchFunc() {
      await refetch()
      await refetchPro()
    }

    refetchFunc()
  }, [isFocused])

  const onPressNotification = async (notification: Notification) => {
    navigation.navigate("main-notifications")
  }

  const getFRtoken = async () => {
    try {
      const token = await messaging().getToken()
      const res = await postDeviceTokenNotif({
        registrationToken: token as string,
      }).unwrap()
    } catch (e) {
      console.log("GetFR token er", e)
    }
  }

  useEffect(() => {
    getFRtoken()
  }, [])

  useEffect(() => {
    if (isNotificationsAllowed) {
      return notifee.onForegroundEvent(({ type, detail }) => {
        switch (type) {
          case EventType.DISMISSED:
            console.log("User dismissed notification", detail.notification)
            break
          case EventType.PRESS:
            if (detail.notification) {
              onPressNotification(detail.notification)
            }
            break
        }
      })
    }
  }, [isNotificationsAllowed])

  useEffect(() => {
    if (isNotificationsAllowed) {
      return notifee.onBackgroundEvent(async ({ type, detail }) => {
        const { notification, pressAction } = detail

        // Check if the user pressed the "Mark as read" action
        if (type === EventType.ACTION_PRESS) {
          // Update external API
          if (detail.notification) {
            onPressNotification(detail.notification)
          }
          // Remove the notification
          if (notification?.id) {
            await notifee.cancelNotification(notification?.id)
          }
        }
      })
    }
  }, [isNotificationsAllowed])


  useEffect(() => {
    if (isNotificationsAllowed) {
      messaging().onMessage(onMessageReceived)
      messaging().setBackgroundMessageHandler(onMessageReceived)
    }
  }, [isNotificationsAllowed])

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
            title={
              t("account_is_status") +
              " " +
              t(
                user?.accountStatus !== "active"
                  ? "inactive"
                  : user?.accountStatus || ""
              )
            }
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
                textStyle={{
                  fontSize:
                    String(user?.responseTimeHours || 0).length > 4
                      ? 22 - String(user?.responseTimeHours || 0).length
                      : 22,
                }}
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
            isComplete={isOnceServiceAllowed}
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
            isComplete={user?.accountStatus === "active"}
            btnTitle={t(lastDoc?.status || "")}
            btnVariant={
              lastDoc && lastDoc.status === "rejected"
                ? "yellow"
                : lastDoc && lastDoc?.status === "pending"
                  ? "grey"
                  : undefined
            }
          />
          <DashboardCategoryItem
            title={t("my_points")}
            className="mt-[10]"
            onPress={handleMyPoints}
            descr={t("you_have_points", { number: user?.pointsBalance || 0 })}
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

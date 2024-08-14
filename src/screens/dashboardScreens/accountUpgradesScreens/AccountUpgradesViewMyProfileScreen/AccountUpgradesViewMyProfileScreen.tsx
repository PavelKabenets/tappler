import React from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import DistinctLabelComponent from "components/DistinctLabelComponent"
import AccountUpgradesViewElemComponent from "components/AccountUpgradesViewElemComponent"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import AccountUpgradesViewProfileItem from "components/AccountUpgradesViewProfileItem"
import MyProfileSettingsComponent from "components/MyProfileSettingsComponent"
import MyProfileSettingsCheckboxComponent from "components/MyProfileSettingsCheckboxComponent"
import RateComponent from "components/RateComponent"
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native"
// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useSharedValue } from "react-native-reanimated"
// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { useTypedSelector } from "store"
import { useProsServiceCategoriesQuery } from "services/api"
import { ProsServicesCategoriesResponse } from "services"
// Libs & Utils
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated"
// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import colors from "styles/colors"
import CloseIcon from "assets/icons/close.svg"

type Props = RootStackScreenProps<"view-my-profile">

const AccountUpgradesViewMyProfileScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  // State
  // Global Store
  const { user } = useTypedSelector((store) => store.auth)
  // Variables
  const { data, isFetching } = useProsServiceCategoriesQuery()
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const scrollY = useSharedValue(0)
  // Refs
  // Methods
  // Handlers
  const handleGoBack = () => {
    navigation.goBack()
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({
    item,
  }: {
    item: ProsServicesCategoriesResponse
  }) => {
    return <AccountUpgradesViewProfileItem item={item} />
  }

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y
  }
  const animatedStyle = useAnimatedStyle(() => {
    const heightPersent = interpolate(scrollY.value, [240, 280], [0, 1])
    return {
      maxHeight: heightPersent <= 0 ? 0 : heightPersent * 100,
    }
  })
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
      <Animated.View
        style={[{ zIndex: 3 }, animatedStyle]}
        className="absolute w-full bg-white border-b-0.3 border-grey2 overflow-hidden"
      >
        <Animated.View
          style={[{ paddingTop: insets.top || 35 }]}
          className="pb-[20]"
        >
          <DmView className="flex-row justify-between">
            <DmView className="justify-center px-[15] opacity-0">
              <DmView
                className="left-[3] w-[28] h-[28] rounded-full bg-white items-center justify-center"
                onPress={handleGoBack}
              >
                {<CloseIcon fill={colors.red} />}
              </DmView>
            </DmView>
            <DmView className="justify-between">
              <DmText className="text-14 leading-[18px] font-custom700">
                {t(user?.registeredName || "")}
              </DmText>
              <DmView className="mt-[10]">
                <RateComponent
                  title={`${user?.reviewScore?.overallScore || 0} ${t("of")} 5 (${t("reviews", { number: user?.reviewScore?.reviewsCount || 0 })})`}
                  classNameTitle="font-custom600"
                  rate={user?.reviewScore?.overallScore || 0}
                />
              </DmView>
            </DmView>
            <DmView className="justify-end pr-[30]">
              <DistinctLabelComponent
                title={t("featured")}
                className="w-[91] h-[21] rounded-5 border-0.3 border-grey2"
              />
            </DmView>
          </DmView>
        </Animated.View>
      </Animated.View>
      <DmView
        className="absolute mt-[10] left-[18] w-[28] h-[28] rounded-full bg-white items-center justify-center"
        style={{ top: insets.top || 35, zIndex: 10 }}
        onPress={handleGoBack}
      >
        {<CloseIcon fill={colors.red} />}
      </DmView>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <DmView style={{ zIndex: 5 }} className="absolute w-full h-[275]">
          <Image
            source={{
              uri: user?.profilePhoto,
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </DmView>
        <DmView className="mt-[275] px-[16] py-[12]">
          <DmView>
            <DmText className="text-22 leading-[29px] font-custom700">
              {user?.registeredName}
            </DmText>
          </DmView>
          <DmView className="flex-row mt-[10]">
            <RateComponent
              title={`${user?.reviewScore?.overallScore || 0} ${t("of")} 5 (${t("reviews", { number: user?.reviewScore?.reviewsCount || 0 })})`}
              classNameTitle="font-custom600"
              rate={user?.reviewScore?.overallScore || 0}
            />
            <DmView className="px-[10]">
              <DistinctLabelComponent
                title={t("featured")}
                className="w-[91] h-[21] rounded-5 border-0.3 border-grey2"
              />
            </DmView>
          </DmView>
        </DmView>
        <DmView className="flex-row px-[16] py-[18]">
          <DmView className="flex-row items-center">
            <DmView className="bg-grey w-[20] h-[20] mr-[5]" />
            <DmText className="text-14 leading-[18px] font-custom600">
              {t("individual")}
            </DmText>
          </DmView>
          <DmView className="flex-row mx-[15] items-center">
            <DmView className="bg-grey w-[20] h-[20] mr-[5]" />
            <DmText className="text-14 leading-[18px] font-custom600">
              {t("background_checked")}
            </DmText>
          </DmView>
        </DmView>
        <DmView className="flex-row justify-between w-full bg-pink3 px-[15]">
          <AccountUpgradesViewElemComponent
            className="w-1/3"
            title={t("instant_discounts")}
            Icon={<DmView className="bg-grey w-[25] h-[25]" />}
          />
          <AccountUpgradesViewElemComponent
            className="w-1/3 px-[15]"
            title={t("number_hour_service")}
            Icon={<DmView className="bg-grey w-[25] h-[25]" />}
          />
          <AccountUpgradesViewElemComponent
            className="w-1/3 px-[15]"
            title={t("fast_delivery")}
            Icon={<DmView className="bg-grey w-[25] h-[25]" />}
          />
        </DmView>
        <MyProfileSettingsComponent
          title={t("about_me")}
          className="border-b-0 border-grey53 pt-[11] pb-[15] pl-0 ml-[16]"
          subtitle={user?.informationAbout}
        />
        <DmView className="pt-[11] px-[16] border-t-1 border-grey53 pr-0 mr-[16]">
          <DmText className="text-14 leading-[18px] font-custom600">
            {t("my_services")}
          </DmText>
        </DmView>
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={renderListItem}
        />
        <MyProfileSettingsComponent
          title={t("photos_and_videos_of_my_work")}
          className="pt-[30] pb-[25] px-[0] border-b-0 border-grey53 pr-0 mr-[16]"
          classNameHeader="pl-[15] pr-[19]"
          subtitleArr={user?.photosOfWork}
        />
        <MyProfileSettingsComponent
          title={t("my_qualifications_and_certifications")}
          className="py-[18] border-t-1 border-b-0 border-grey53 pr-0 mr-[16]"
          subtitleArrCredential={undefined}
        />
        <MyProfileSettingsCheckboxComponent
          title={t("working_hours")}
          className="py-[17] border-t-1 border-b-0 border-grey53 pr-0 mr-[16]"
          subtitleArrWorkingHours={user?.hours}
        />
        <MyProfileSettingsCheckboxComponent
          title={t("accepted_payments")}
          className="pt-[15] pb-[13] border-t-1 border-b-0 border-grey53 pr-0 mr-[16]"
          checkIcon
          subtitleArrPayments={user?.paymentMethods}
        />
        <MyProfileSettingsCheckboxComponent
          title={t("my_social_media_accounts")}
          className="pt-[15] pb-[13] border-t-1 border-b-0 border-grey53 pr-0 mr-[16]"
          subtitleArrMedia={undefined}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default AccountUpgradesViewMyProfileScreen

import React, { useEffect, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useTypedSelector } from "store"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import BulbIcon from "assets/icons/bulb-yellow.svg"
import MyPointsCategoryItem from "components/MyPointsCategoryItem"
import { MyPointsActivityItemMockType } from "data/mockData"
import MyPointsActivityItem from "components/MyPointsActivityItem"
import { ActivityIndicator, FlatList } from "react-native"
import { mockMyPointsData } from "data/mockData"
import ModalFullScreen from "components/ModalFullScreen"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import BuyPoinstIcon from "assets/icons/buy-new.svg"
import VoucherIcon from "assets/icons/voucher.svg"
import TransactionsIcon from "assets/icons/transactions.svg"
import {
  useLazyGetPointsHistoryQuery,
  useLazyGetPointsPackagesQuery,
} from "services/api"
import { GetPointsHistoryResponse } from "services"
import { PointsTransactionsHistoryType } from "types"
import colors from "styles/colors"

type Props = RootStackScreenProps<"my-points">

const MyPointsScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const initialData = route.params?.data
  // State
  const [isModalVisible, setModalVisible] = useState(false)
  const [isModalPointsVisible, setModalPointsVisible] = useState(false)
  const [pointsResponse, setPoinstResponse] = useState<
    GetPointsHistoryResponse | undefined
  >(initialData)
  const [prevPointsResponse, setPrevPoinstResponse] = useState<
    GetPointsHistoryResponse | undefined
  >(initialData)
  const [page, setPage] = useState(initialData?.page || 1)
  // Global Store
  const { user } = useTypedSelector((store) => store.auth)
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const [getPoins, { isFetching }] = useLazyGetPointsHistoryQuery()
  // Refs
  // Methods
  const onUnionPointsResponse = (response: GetPointsHistoryResponse) => {
    if (pointsResponse) {
      const unicItems = response.data?.filter(
        (item) => !pointsResponse.data.includes(item)
      )

      setPoinstResponse({
        page: response.page,
        perPage: response.perPage,
        total: response.total,
        data: [...pointsResponse.data, ...unicItems],
      })
    } else {
      setPoinstResponse(response)
    }
  }

  const onGetPoinstResponse = async () => {
    try {
      const res = await getPoins({
        page,
      }).unwrap()
      onUnionPointsResponse(res)
    } catch (e) {
      console.log("Get Points Error: ", e)
    }
  }

  const onEndReached = () => {
    if (
      !isFetching &&
      prevPointsResponse?.data.length !== pointsResponse?.data.length &&
      pointsResponse
    ) {
      setPage((prev) => prev + 1)
      setPrevPoinstResponse(pointsResponse)
    }
  }
  // Handlers
  const handleBuyPointsPress = () => {
    navigation.navigate("my-points-packages")
  }

  const handleVouchersPress = () => {
    navigation.navigate("my-points-vouchers")
  }

  const handleTransactionsPress = () => {
    navigation.navigate("my-points-transactions", { data: pointsResponse })
  }

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }
  const handleOpenModalPoints = () => {
    setModalPointsVisible(true)
  }
  const handleCloseModalPoints = () => {
    setModalPointsVisible(false)
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
    <SafeAreaView className="flex-1 bg-white" edges={[]}>
      <DmView
        className="pb-[43] bg-grey39 rounded-10"
        style={{ paddingTop: insets.top }}
      >
        <HeaderOnboarding
          title={t("points_balance")}
          isChevron
          className="px-[12] border-0 pb-[0]"
        />
        <DmText className="mt-[25] text-40 leading-[49px] font-custom400 text-center">
          {user?.pointsBalance || 0}
        </DmText>
        <DmText className="mt-[5] text-13 leading-[16px] font-custom600 text-center">
          {t("points")}
        </DmText>
      </DmView>
      <DmView
        className="mt-[15] flex-row items-center justify-center"
        onPress={handleOpenModalPoints}
      >
        <BulbIcon />
        <DmView>
          <DmText className="ml-[4] text-13 leading-[16px] font-custom500">
            {t("learn_about_points")}
          </DmText>
        </DmView>
      </DmView>
      <DmView className="mt-[28] flex-row items-center justify-between px-[14]">
        <MyPointsCategoryItem
          Icon={<BuyPoinstIcon />}
          onPress={handleBuyPointsPress}
          title={t("buy_points")}
        />
        <MyPointsCategoryItem
          Icon={<VoucherIcon />}
          onPress={handleVouchersPress}
          title={t("redeem_vouchers")}
        />
        <MyPointsCategoryItem
          Icon={<TransactionsIcon />}
          onPress={handleTransactionsPress}
          title={t("transactions_history")}
        />
      </DmView>
      <DmView className="mt-[40] pl-[14] pr-[5] flex-1">
        <DmText className="text-16 leading-[19px] font-custom600">
          {t("latest_transactions")}
          {"  "}
          <DmText className="text-13 leading-[16px] font-custom400">
            ({t("view_all")})
          </DmText>
        </DmText>
        <FlatList
          data={pointsResponse?.data}
          renderItem={renderListItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 24 + insets.bottom,
            marginTop: 5,
          }}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isFetching ? (
              <ActivityIndicator color={colors.red} className="mt-[12]" />
            ) : null
          }
        />
      </DmView>
      <ModalFullScreen isVisible={isModalVisible} onClose={handleCloseModal}>
        {/* @TO DO */}
        <DmView className="mt-[33] px-[14]">
          <DmText className="text-17 leading-[20px] font-custom600">
            {t("why_do_we_need_your_id")}
          </DmText>
          <DmText className="mt-[10] text-13 leading-[20px] font-custom400">
            {t("at_tappler_we_prioritize_trust_and_safety_within_descr")}
          </DmText>
          <TitleRegistrationFlow
            title={t("identity_confirmation")}
            classNameTitle="text-14 leading-[20px]"
            descr={t("verifying_the_identity_of_professionals_descr")}
            classNameDescr="mt-[-5]  text-13 leading-[20px] font-custom400"
          />
          <TitleRegistrationFlow
            title={t("enhanced_security")}
            classNameTitle="text-14 leading-[20px]"
            descr={t("identity_verification_adds_an_extra_descr")}
            classNameDescr="mt-[-5]  text-13 leading-[20px] font-custom400"
          />
          <TitleRegistrationFlow
            title={t("your_privacy_protection")}
            classNameTitle="text-14 leading-[20px]"
            descr={t("we_understand_the_sensitivity_descr")}
            classNameDescr="mt-[-5]  text-13 leading-[20px] font-custom400"
          />
          <TitleRegistrationFlow
            title={t("in_person_id_verification")}
            classNameTitle="text-14 leading-[20px]"
            descr={t("in_some_cases_we_reserve_the_rights")}
            classNameDescr="mt-[-5] text-13 leading-[20px] font-custom400"
          />
        </DmView>
      </ModalFullScreen>
      <ModalFullScreen
        isVisible={isModalPointsVisible}
        onClose={handleCloseModalPoints}
      >
        <DmView className="mt-[43] items-center">
          <DmView className="w-[220] h-[115] bg-grey" />
          <DmText className="mt-[16] text-16 leading-[19px] font-custom600">
            {t("what_is_points")}
          </DmText>
        </DmView>
        <DmView className="px-[14]">
          <DmText className="mt-[18] text-13 leading-[20px] font-custom400">
            {t("points_are_the_currency_of_the_app_descr")}
          </DmText>
          <TitleRegistrationFlow
            title={t("how_do_i_buy_points")}
            classNameTitle="mt-[15] text-13 leading-[16px]"
            descr={t("buying_points_is_very_easy_descr")}
            classNameDescr="text-13 leading-[20px] font-custom400"
          />
          <TitleRegistrationFlow
            title={t("how_much_one_opportunity_cost")}
            classNameTitle="mt-[15] text-13 leading-[16px]"
            descr={t("opportunities_are_different_in_price_descr")}
            classNameDescr="text-13 leading-[20px] font-custom400"
          />
          <TitleRegistrationFlow
            title={t("if_i_spent_points_on_opportunity")}
            classNameTitle="mt-[10] text-13 leading-[20px]"
            descr={t("we_are_giving_you_a_second_chance_descr")}
            classNameDescr="text-11 leading-[20px] font-custom400"
          />
          <TitleRegistrationFlow
            title={t("does_points_expire")}
            classNameTitle="mt-[15] text-13 leading-[16px]"
            descr={t("no_points_doesnt_expire_descr")}
            classNameDescr="text-13 leading-[20px] font-custom400"
          />
        </DmView>
      </ModalFullScreen>
    </SafeAreaView>
  )
}

export default MyPointsScreen

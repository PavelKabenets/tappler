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
import { FlatList } from "react-native"
import { mockMyPointsData } from "data/mockData"
import ModalFullScreen from "components/ModalFullScreen"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import BuyPoinstIcon from "assets/icons/buy-new.svg"
import VoucherIcon from "assets/icons/voucher.svg"
import TransactionsIcon from "assets/icons/transactions.svg"

type Props = RootStackScreenProps<"my-points">

const MyPointsScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isModalVisible, setModalVisible] = useState(false)
  // const [pointsResponse, setPoinstResponse] = useState<GetPointsResponse>()
  const [page, setPage] = useState(1)
  // Global Store
  const { user } = useTypedSelector((store) => store.auth)
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // const [getPoins, { isFetching }] = useLazyGetPointsQuery()
  // Refs
  // Methods
  // const onUnionPointsResponse = (response: GetPointsResponse) => {
  // if (pointsResponse) {
  //   const unicItems = response.data?.filter(
  //     (item) => !pointsResponse.data.includes(item)
  //   )

  //   setPoinstResponse({
  //     page: response.page,
  //     perPage: response.perPage,
  //     total: response.total,
  //     data: [...pointsResponse.data, ...unicItems],
  //   })
  // } else {
  //   setPoinstResponse(response)
  // }
  // }

  const onGetPoinstResponse = async () => {
    try {
      // const res = await getPoins(page).unwrap()
      // onUnionPointsResponse(res)
    } catch (e) {
      console.log("Get Points Error: ", e)
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
    navigation.navigate("my-points-transactions")
  }

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }
  // Hooks
  useEffect(() => {
    onGetPoinstResponse()
  }, [page])
  // Listeners
  // Render Methods
  const renderListItem = ({ item }: { item: MyPointsActivityItemMockType }) => {
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
        // onPress={handleOpenModal}
      >
        <BulbIcon />
        <DmText className="ml-[4] text-13 leading-[16px] font-custom500">
          {t("learn_about_points")}
        </DmText>
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
          data={mockMyPointsData}
          renderItem={renderListItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 24 + insets.bottom,
            marginTop: 5,
          }}
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
    </SafeAreaView>
  )
}

export default MyPointsScreen

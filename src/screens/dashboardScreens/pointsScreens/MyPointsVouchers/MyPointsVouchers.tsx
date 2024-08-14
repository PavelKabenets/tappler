import React, { useState } from "react"

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
import HeaderOnboarding from "components/HeaderOnboarding"
import { MyPointsVoucherItemMockType } from "data/mockData"
import { mockMyPoinstVouchersData } from "data/mockData"
import MyPointsVoucherItem from "components/MyPointsVoucherItem"
import { FlatList } from "react-native"
import MainModal from "components/MainModal"
import {
  useGetProVouchersAssignmentQuery,
  usePostProVouchersAssignmentMutation,
} from "services/api"
import { VouchersAssignmentType } from "types"

type Props = RootStackScreenProps<"my-points-vouchers">

const MyPointsVouchers: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isModalVisible, setModalVisible] = useState(false)
  // Global Store
  // Variables
  const { t } = useTranslation()
  const { data, isFetching } = useGetProVouchersAssignmentQuery()
  const [postVoucher] = usePostProVouchersAssignmentMutation()
  // Refs
  // Methods
  // Handlers
  const handlePressItem = async (item: VouchersAssignmentType) => {
    try {
      await postVoucher(item.id).unwrap()
      setModalVisible(true)
    } catch (e) {
      console.log("Error Post Vaucher: ", e)
    }
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    navigation.goBack()
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({ item }: { item: VouchersAssignmentType }) => {
    return (
      <MyPointsVoucherItem
        item={item}
        className="mb-[14]"
        onPress={() => handlePressItem(item)}
      />
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={t("vouchers")}
        className="px-[15] pb-[20]"
        isChevron
      />
      <DmView className="mt-[26] px-[18]">
        <DmText className="text-15 leading-[19px] font-custom600">
          {t("available_vouchers")}
        </DmText>
        <DmView className="mt-[14]">
          <FlatList
            data={data?.data}
            renderItem={renderListItem}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          />
        </DmView>
      </DmView>
      <MainModal
        title={t("voucher_claimed")}
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        descr={t("you_have_successfully_redeemed_your_voucher")}
        closeBtnTitle={t("OK")}
        className="pt-[33]"
        classNameTitle="mt-[0] text-17 leading-[22px] font-custom700"
        classNameDescr="mt-[4] text-16 leading-[22px] font-custom500"
        isCloseBtn
      />
    </SafeAreaView>
  )
}

export default MyPointsVouchers

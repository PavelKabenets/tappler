import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "navigation/types"

import styles from "./styles"
import SubscriptionEmptyIcon from "assets/icons/subscription-empty.svg"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import clsx from "clsx"
import { FlatList, Image } from "react-native"
import img from "assets/images/cactus.png"
import { useGetQuotesQuery } from "services/api"
import { QuoteItemType } from "types"
import QuotesItem from "components/QuotesItem"

interface Props {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "account-upgrades",
    undefined
  >
}

const QuotesView: React.FC<Props> = ({ navigation }) => {
  const { data } = useGetQuotesQuery({ page: 1 })
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const renderEmptyListComponent = () => {
    return (
      <DmView className="mt-[44] items-center">
        <Image source={img} style={styles.img} />
        <DmText className="mt-[2] text-11 leading-[14px] font-custom400 text-center">
          {t("you_dont_have_any_quotes")}
        </DmText>
        <DmText className="mt-[9] text-11 leading-[14px] font-custom600 text-center">
          {t("you_must_request_for_an_upgrade_to_receive_a_quote")}
        </DmText>
      </DmView>
    )
  }

  const renderListItem = ({ item }: { item: QuoteItemType }) => {
    return <QuotesItem item={item} onPress={() => null} />
  }

  return (
    <DmView className="flex-1">
      <FlatList
        data={data?.data}
        renderItem={renderListItem}
        ListEmptyComponent={renderEmptyListComponent()}
        contentContainerStyle={styles.flatList}
      />
    </DmView>
  )
}

export default QuotesView

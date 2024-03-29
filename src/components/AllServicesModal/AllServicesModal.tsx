import React, { useState } from "react"

import { DmInput, DmText, DmView } from "components/UI"
import Modal from "react-native-modal"
import { FlatList } from "react-native"

import { useTranslation } from "react-i18next"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"

import {
  MockAllServicesItemType,
  MockAllServicesSubItemType,
  subItems,
} from "data/mockData"

import styles from "./styles"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import colors from "styles/colors"

interface Props {
  isVisible: boolean
  onClose: () => void
}

const AllServicesModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const [filter, setFilter] = useState("")

  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { t } = useTranslation()

  const handleSubItemPress = (item: MockAllServicesSubItemType) => {
    navigation.navigate("sign-up", { subItem: item })
    onClose()
  }

  const renderListItem = ({ item }: { item: MockAllServicesSubItemType }) => {
    return (
      <DmView
        className="py-[17] px-[20] border-b-0.5 border-b-grey5"
        onPress={() => handleSubItemPress(item)}
      >
        <DmText className="font-custom500 text-12">{item.title}</DmText>
      </DmView>
    )
  }

  return (
    <Modal isVisible={isVisible} className="m-[0]">
      <DmView
        className="flex-1 bg-white"
        style={{ paddingBottom: insets.bottom, paddingTop: insets.top }}
      >
        <DmView className="px-[15] mt-[24]">
          {/* @TO DO */}
          <DmView
            className="w-[21] h-[21] bg-grey"
            onPress={onClose}
            hitSlop={HIT_SLOP_DEFAULT}
          />
        </DmView>
        <DmView className="mt-[10] px-[20]">
          {/* @TO DO */}
          <DmInput
            value={filter}
            onChangeText={setFilter}
            placeholder={t("search_service")}
            placeholderTextColor={colors.grey6}
            Icon={<DmView className="w-[16] h-[16] bg-grey" />}
          />
        </DmView>
        {!!filter && <FlatList data={subItems} renderItem={renderListItem} />}
      </DmView>
    </Modal>
  )
}

export default AllServicesModal

import React from "react"

import { DmText, DmView } from "components/UI"

import { MockAllServicesItemType } from "data/mockData"

import styles from "./styles"

// @TO DO
interface Props {
  item: MockAllServicesItemType
  onPress: (item: MockAllServicesItemType) => void
}

const AllServicesItem: React.FC<Props> = ({ item, onPress }) => {
  return (
    <DmView
      className="py-[17] px-[19] border-b-1 border-b-grey8 flex-row items-center justify-between"
      onPress={() => onPress(item)}
    >
      <DmText className="text-12 font-custom500">{item.title}</DmText>
      {/* @TO DO */}
      <DmView className="w-[12] h-[12] bg-grey" />
    </DmView>
  )
}

export default AllServicesItem

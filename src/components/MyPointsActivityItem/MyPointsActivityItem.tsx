import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import { MyPointsActivityItemMockType } from "data/mockData"
import moment from "moment"
import { t } from "i18next"
import clsx from "clsx"

interface Props {
  item: MyPointsActivityItemMockType
}

const MyPointsActivityItem: React.FC<Props> = ({ item }) => {
  return (
    <DmView className="flex-row justify-between items-center py-[18] pr-[17] border-b-1 border-b-grey29">
      <DmView className="flex-[2]">
        <DmText className="text-11 leading-[14px] font-custom600">
          {item.title}
        </DmText>
        <DmText className="mt-[3] text-11 leading-[14px] font-custom400">
          {moment(item.created_at).format("DD/MM/YYYY hh:mmA")}
        </DmText>
      </DmView>
      <DmView className="flex-1">
        <DmText
          className={clsx(
            "text-11 leading-[14px] font-custom400 text-black",
            item.status === "expired" && "text-red",
            item.status === "done" && "opacity-0"
          )}
        >
          {t(item.status)}
        </DmText>
      </DmView>
      <DmView className="flex-1 items-end">
        <DmText
          className={clsx(
            "text-13 leading-[16px] font-custom600 text-green1",
            item.cost < 0 && "text-red",
            item.status === "expired" && "line-through"
          )}
        >
          {item.cost}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default MyPointsActivityItem

import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import { MyPointsVoucherItemMockType } from "data/mockData"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import moment from "moment"
import VoucherIcon from "assets/icons/voucher.svg"

interface Props {
  item: MyPointsVoucherItemMockType
  className?: string
  onPress?: () => void
}

const MyPointsVoucherItem: React.FC<Props> = ({ item, className, onPress }) => {
  const { t } = useTranslation()
  return (
    <DmView
      className={clsx(
        "pl-[9] pr-[19] py-[10] flex-row items-center justify-between rounded-8 border-0.6 border-grey41",
        className
      )}
      onPress={onPress}
    >
      <DmView className="flex-row items-center">
        <VoucherIcon />
        <DmView className="ml-[20]">
          <DmText className="text-13 leading-[16px] font-custom600">
            {item.title}
          </DmText>
          <DmText className="mt-[3] text-13 leading-[16px] font-custom400">
            {t("expires_on")} {item.expired_at}
          </DmText>
        </DmView>
      </DmView>
      <DmView>
        <DmText className="text-13 leading-[16px] font-custom500 text-red">
          {t("claim")}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default MyPointsVoucherItem

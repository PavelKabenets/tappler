import React from "react"

import { DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"
import { MockSubscriptionDetailsDataItemType } from "data/mockData"

import styles from "./styles"
import moment from "moment"

interface Props {
  item: MockSubscriptionDetailsDataItemType
  onPress?: () => void
}

const AccountUpgradesHistoryComponent: React.FC<Props> = ({
  item,
  onPress,
}) => {
  const { t, i18n } = useTranslation()
  const formatDate = (dateString: string, currentLanguage: string) => {
    if (currentLanguage === "ar") {
      return moment(dateString).format("YYYY/MM/DD")
    } else {
      return moment(dateString).format("DD/MM/YYYY")
    }
  }
  return (
    <DmView onPress={onPress} className="border-b-1 border-grey4 py-[27]">
      <DmView className="flex-row justify-between items-center px-[19]">
        <DmView>
          <DmText className="text-13 leading-[16px] font-custom600">
            {formatDate(item.created_at, i18n.language)}
          </DmText>
          <DmText className=" mt-[10] text-13 leading-[16px] font-custom400">
            {t("order_no", { number: item.order_number })}
          </DmText>
        </DmView>
        <DmView>
          <DmText className="text-13 leading-[16px] font-custom600">
            {"-"} {"720"} {t("EGP")}
          </DmText>
        </DmView>
      </DmView>
    </DmView>
  )
}

export default AccountUpgradesHistoryComponent

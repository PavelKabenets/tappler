import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import MainModal from "components/MainModal"
import clsx from "clsx"
import renderStatusTextColor from "utils/renderStatusTextColor"
import renderStatusIcon from "utils/renderStatusIcon"
import { useTranslation } from "react-i18next"

interface Props {
  isVisible: boolean
  onClose: () => void
}

const AccountStatusModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const { t } = useTranslation()
  const renderText = (
    item: "active" | "inactive" | "suspended" | "vacation"
  ) => {
    switch (item) {
      case "active":
        return t("your_account_is_active_descr")
      case "inactive":
        return t("one_or_more_of_the_required_descr")
      case "suspended":
        return t("your_account_is_suspended_descr")
      case "vacation":
        return t("your_account_is_set_to_vacation_descr")
    }
  }
  const renderItem = (
    item: "active" | "inactive" | "suspended" | "vacation"
  ) => {
    return (
      <DmView className={clsx("mb-[5]", item === "vacation" && "mb-[0]")}>
        <DmView className="flex-row">
          <DmView className="flex-[0.4] mr-[10]">
            <DmView className="flex-row items-center justify-end">
              <DmText
                className={clsx("mr-[4] capitalize")}
                style={{ color: renderStatusTextColor(item) }}
              >
                {t(item)}
              </DmText>
              {renderStatusIcon(item)}
            </DmView>
          </DmView>
          <DmText className="flex-1 text-12 leading-[22px] font-custom400">
            {renderText(item)}
          </DmText>
        </DmView>
        {item !== "vacation" && (
          <DmView className="mt-[10] mx-[10] h-[0.5] bg-grey27" />
        )}
      </DmView>
    )
  }
  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      className="px-[10] pt-[24] pb-[38]"
      classNameModal="px-[10]"
      title={t("account_status")}
      classNameTitle="mt-[0] text-18 leading-[22px]"
    >
      <DmView className="mt-[34] ">
        {renderItem("active")}
        {renderItem("inactive")}
        {renderItem("suspended")}
        {renderItem("vacation")}
      </DmView>
    </MainModal>
  )
}

export default AccountStatusModal

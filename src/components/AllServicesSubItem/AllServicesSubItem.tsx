import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"

import styles from "./styles"
import CircleCheckBoxIcon from "assets/icons/circle-checkbox.svg"
import { SubCategoryType } from "types"
import CheckIcon from "assets/icons/check-mark.svg"
import { I18nManager } from "react-native"
import clsx from "clsx"

// @TO DO
interface Props {
  item: SubCategoryType
  onPress?: (item: SubCategoryType) => void
  onPressDetail?: (item: SubCategoryType) => void
  status?: "active" | "inactive" | "pendingInterview"
  isCheckHide?: boolean
  descr?: string
  classNameDescr?: string
}

const AllServicesSubItem: React.FC<Props> = ({
  item,
  onPress,
  onPressDetail,
  status,
  isCheckHide,
  descr,
  classNameDescr,
}) => {
  const { t } = useTranslation()
  return (
    <DmView
      className="py-[14] px-[14] border-b-1 border-b-grey8 flex-row items-center justify-between"
      onPress={onPress ? () => onPress(item) : undefined}
    >
      <DmView className="flex-row items-center flex-1">
        {!status && !isCheckHide && <CircleCheckBoxIcon />}
        <DmText className="ml-[5] text-12 leading-[15px] font-custom500 flex-1">
          {item.name}
        </DmText>
      </DmView>
      {!status && (
        <DmView
          onPress={() => onPressDetail?.(item)}
          hitSlop={HIT_SLOP_DEFAULT}
        >
          <DmText
            className={clsx(
              "ml-[14] font-custom400 text-red text-10 leading-[13px]",
              classNameDescr
            )}
          >
            {descr || t("service_details")}
          </DmText>
        </DmView>
      )}
      {status === "active" && <CheckIcon />}
      {status !== "active" && status && (
        <ActionBtn
          className="h-[24] rounded-10"
          textClassName={clsx(
            "text-11 leading-[14px] font-custom500"
            // I18nManager.isRTL && "mt-[-2]"
          )}
          title={t("incomplete")}
        />
      )}
    </DmView>
  )
}

export default AllServicesSubItem

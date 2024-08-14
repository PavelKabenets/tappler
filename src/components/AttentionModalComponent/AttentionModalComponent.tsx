import React, { useMemo, useState } from "react"

import { DmText } from "components/UI"
import MainModal from "components/MainModal"
import { t } from "i18next"
import moment from "moment"
import styles from "./styles"
import { useTypedSelector } from "store"

interface Props {
  isVisible: boolean
  Icon?: React.ReactNode
  onPress: () => void
  onClose: () => void
}

const AttentionModalComponent: React.FC<Props> = ({
  isVisible,
  Icon,
  onPress,
  onClose,
}) => {
  const { user } = useTypedSelector((store) => store.auth)
  const lastChange = useMemo(() => {
    if (user?.address?.changedAt) {
      return moment().diff(moment(user?.address?.changedAt), "days")
    }
    return null
  }, [moment().days(), user?.address?.changedAt])

  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      title={t("attention")}
      className="px-[5] pt-[18] pb-[25]"
      classNameTitle="mt-[10] text-20 leading-[24px] font-custom600"
      classNameDescr="mt-[10] text-12 leading-[20px] font-custom400"
      titleBtn={t("OK")}
      classNameBtnsWrapper="mx-[40]"
      classNameActionBtnText="text-13 leading-[16] font-custom600"
      classNameBtn="mt-[22]"
      onPress={lastChange !== null && lastChange <= 365 ? onClose : onPress}
      descr={t("you_can_change_your_address_only_number_time_per_year", {
        number: 1,
      })}
    >
      <DmText className="mt-[10] text-12 leading-[20px] font-custom600 text-center">
        {t("last_address_change")}:{" "}
        {user?.address?.changedAt !== null ? (
          <>
            {!lastChange && (
              <DmText className="text-12 leading-[15px] font-custom400">
                {t("less_then")}
                <DmText className="text-12 leading-[20px] font-custom700 capitalize text-red">
                  {" "}
                  {1}{" "}
                </DmText>
                {t("day")}
              </DmText>
            )}
            {!!lastChange && (
              <>
                <DmText className="text-12 leading-[20px] font-custom700 capitalize text-red">
                  {lastChange || 1}{" "}
                </DmText>
                <DmText className="text-12 leading-[15px] font-custom400 capitalize">
                  {lastChange !== 1 ? t("days") : t("day")}{" "}
                  <DmText className="text-12 leading-[15px] font-custom400 lowercase">
                    {t("ago")}
                  </DmText>
                </DmText>
              </>
            )}
          </>
        ) : (
          <DmText className="text-12 leading-[20px] font-custom700 capitalize text-red">
            {t("never")}
          </DmText>
        )}
      </DmText>
    </MainModal>
  )
}

export default AttentionModalComponent

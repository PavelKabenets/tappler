import React, { useEffect, useState } from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import Modal from "react-native-modal"
import DatePicker from "react-native-date-picker"

import { useTranslation } from "react-i18next"

import { BusinessHoursItemType, BusinessHoursItemValueType } from "types"

import moment from "moment"

import styles from "./styles"
import colors from "styles/colors"
import ChevronDown from "assets/icons/chevron-down.svg"
import clsx from "clsx"
import i18n from "locales/i18n"
import { useTypedSelector } from "store"
import "moment/locale/ar"

interface Props {
  isVisible: boolean
  onClose: () => void
  onSubmit: (value: BusinessHoursItemValueType) => void
  item?: BusinessHoursItemType
  onSelectAll?: (value: BusinessHoursItemValueType) => void
}

const BusinessModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onSubmit,
  item,
  onSelectAll,
}) => {
  const [selectedOpen, setSelectedOpen] = useState(
    item?.value.openAt
      ? new Date(moment(item?.value.openAt).toDate())
      : new Date()
  )
  const [selectedClose, setSelectedClose] = useState(
    item?.value.closeAt
      ? new Date(moment(item?.value.closeAt).toDate())
      : new Date()
  )
  const [isOpenModalVisible, setOpenModalVisible] = useState(false)
  const [isCloseModalVisible, setCloseModalVisible] = useState(false)

  const { language } = useTypedSelector((store) => store.auth)

  const { t } = useTranslation()
  const isOpenDateAfter = moment(selectedOpen)
    .locale("en")
    .isAfter(moment(selectedClose).locale("en"))

  useEffect(() => {
    if (isVisible) {
      if (item?.value.openAt) {
        setSelectedOpen(new Date(moment(item?.value.openAt).toDate()))
      }

      if (item?.value.closeAt) {
        setSelectedClose(new Date(moment(item?.value.closeAt).toDate()))
      }
    }
  }, [isVisible])

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      className="m-0 px-[22]"
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      animationInTiming={400}
    >
      <DmView className="bg-white rounded-10 pt-[46] pb-[20] px-[37]">
        <DmText className="text-center text-16 leading-[25px] font-custom500">
          {t("choose_your_working_hours")}
        </DmText>
        <DmView className="mt-[34] flex-row items-center" style={{ zIndex: 3 }}>
          <DmView
            className="pl-[9] pr-[12] flex-row h-[30] items-center justify-between rounded-3 border-1 border-grey2"
            onPress={() => setOpenModalVisible(true)}
            style={styles.item}
          >
            <ChevronDown
              width={20}
              height={20}
              strokeWidth={2}
              color={colors.black}
            />
            <DmText
              className={clsx(
                "text-16 leading-[20px] font-sans400",
                i18n.language !== "ar" && "leading-[26.4px]"
              )}
            >
              {selectedOpen
                ? moment(selectedOpen).format("hh:mmA")
                : moment(moment("10:00", "hh:mm").toISOString()).format(
                    "hh:mmA"
                  )}
            </DmText>
          </DmView>
          <DmText
            className={clsx(
              "mx-[15] text-16 leading-[20px] text-center font-sans400",
              i18n.language !== "ar" && "leading-[26.4px]"
            )}
          >
            {t("to")}
          </DmText>
          <DmView
            className="pl-[9] pr-[12] flex-row h-[30] items-center justify-between rounded-3 border-1 border-grey2"
            onPress={() => setCloseModalVisible(true)}
            style={styles.item}
          >
            <ChevronDown
              width={20}
              height={20}
              strokeWidth={2}
              color={colors.black}
            />
            <DmText
              className={clsx(
                "text-16 leading-[20px] font-sans400",
                i18n.language !== "ar" && "leading-[26.4px]"
              )}
            >
              {selectedClose
                ? moment(selectedClose).format("hh:mmA")
                : moment(moment("10:00", "hh:mm").toISOString()).format(
                    "hh:mmA"
                  )}
            </DmText>
          </DmView>
        </DmView>
        <ActionBtn
          className="mt-[37] z-0"
          title={t("OK")}
          disable={isOpenDateAfter}
          onPress={() =>
            onSubmit({
              openAt: moment(selectedOpen).toISOString(),
              closeAt: moment(selectedClose).toISOString(),
            })
          }
        />
        {onSelectAll && (
          <DmView
            onPress={
              isOpenDateAfter
                ? undefined
                : () =>
                    onSelectAll({
                      openAt: moment(selectedOpen).toISOString(),
                      closeAt: moment(selectedClose).toISOString(),
                    })
            }
          >
            <DmText
              className={clsx(
                "mt-[12] text-center text-15 leading-[20px] font-custom500",
                isOpenDateAfter && "text-grey1"
              )}
            >
              {t("apply_all")}
            </DmText>
          </DmView>
        )}
      </DmView>
      <DatePicker
        locale={language}
        modal
        open={isOpenModalVisible}
        date={selectedOpen}
        mode="time"
        onConfirm={(data) => {
          setOpenModalVisible(false)
          setSelectedOpen(data)
        }}
        onCancel={() => setOpenModalVisible(false)}
        confirmText={t("OK")}
        cancelText={t("cancel")}
        title={t("select_time")}
      />
      <DatePicker
        locale={language}
        modal
        open={isCloseModalVisible}
        date={selectedClose}
        mode="time"
        onConfirm={(data) => {
          setCloseModalVisible(false)
          setSelectedClose(data)
        }}
        onCancel={() => setCloseModalVisible(false)}
        confirmText={t("OK")}
        cancelText={t("cancel")}
        title={t("select_time")}
      />
    </Modal>
  )
}

export default BusinessModal

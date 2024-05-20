import React, { Dispatch, SetStateAction } from "react"

import { DmText, DmView } from "components/UI"
import MainModal from "components/MainModal"

import { useTranslation } from "react-i18next"
import { UseDispatch, useDispatch } from "react-redux"

import styles from "./styles"
import BellIcon from "assets/icons/bell-big.svg"

import {
  PERMISSIONS,
  request,
  requestNotifications,
} from "react-native-permissions"
import { I18nManager, Platform } from "react-native"
import { setNotificationsWasShowing } from "store/auth/slice"
import clsx from "clsx"

interface Props {
  isVisible: boolean
  onClose: () => void
  setWaitAMomentModalVisible: Dispatch<SetStateAction<boolean>>
}

const NotificationModal: React.FC<Props> = ({
  isVisible,
  onClose,
  setWaitAMomentModalVisible,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const handlePress = async () => {
    onClose()
    dispatch(setNotificationsWasShowing(true))
    setTimeout(async () => {
      await requestNotifications(["alert", "sound"])
        .catch((e) => console.log(e))
        .finally(() =>
          setTimeout(() => {
            setWaitAMomentModalVisible(true)
          }, 800)
        )
    }, 400)
  }
  const handleClose = () => {
    dispatch(setNotificationsWasShowing(true))
    onClose()
    setTimeout(() => {
      setWaitAMomentModalVisible(true)
    }, 800)
  }
  return (
    <MainModal
      isVisible={isVisible}
      onClose={handleClose}
      onPressSecond={handleClose}
      title={t("enable_notifications")}
      descr={t("it_is_recommended_to_enable_the_notifications_descr")}
      isBtnsTwo
      titleBtn={t("yes")}
      titleBtnSecond={t("no")}
      classNameTitle="mt-[17]"
      classNameDescr="mt-[5] font-custom400 text-13 leading-[20px]"
      Icon={
        <DmView className={clsx(I18nManager.isRTL ? "ml-[42]" : "mr-[42]")}>
          <BellIcon />
        </DmView>
      }
      classNameBtnsWrapper="mt-[38]"
      classNameBtns="h-[47]"
      className="pb-[45] pt-[48]"
      classNameSecondBtn="border-red"
      classNameSecondBtnText="text-black"
      onPress={handlePress}
    />
  )
}

export default NotificationModal

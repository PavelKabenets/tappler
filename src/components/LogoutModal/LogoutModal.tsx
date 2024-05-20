import React, { useEffect, useState } from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import Modal from "react-native-modal"
import BtnsRentangle from "components/BtnsRentangle"
import MainModal from "components/MainModal"

import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { logout } from "store/auth/slice"
import { useNavigation } from "@react-navigation/native"

import styles from "./styles"
import LogoutIcon from "assets/icons/exit-setup.svg"

interface Props {
  isVisible: boolean
  onClose: () => void
}

const LogoutModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleLogout = () => {
    dispatch(logout())
    onClose()
  }

  return (
    <MainModal
      isVisible={isVisible}
      className="m-0 px-[40] pt-[19] rounded-10"
      classNameModal="px-[38]"
      onClose={onClose}
      title={t("are_you_sure_you_want_to_logout")}
      classNameTitle="mt-[19] text-center text-13 leading-[25px] font-custom500"
      isBtnsTwo
      onPress={handleLogout}
      onPressSecond={onClose}
      titleBtn={t("yes")}
      titleBtnSecond={t("no")}
      classNameBtnsWrapper="mt-[22] px-[4]"
      Icon={<LogoutIcon />}
      classNameBtns="h-[34] font-custom700"
    />
  )
}

export default LogoutModal

import React, { useEffect, useState } from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import Modal from "react-native-modal"

import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { logout } from "store/auth/slice"
import { useNavigation } from "@react-navigation/native"

import styles from "./styles"
import ExitIcon from "assets/icons/exit-setup.svg"

interface Props {
  isVisible: boolean
  onClose: () => void
}

const StopRegistrationModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleLogout = () => {
    dispatch(logout())
    navigation.navigate("auth")
    onClose()
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      className="m-0 px-[22]"
    >
      <DmView className="bg-white rounded-10 py-[28] px-[40]">
        <DmView className="items-center">
          <ExitIcon />
        </DmView>
        <DmText className="mt-[14] text-center text-13 leading-[20px] font-custom500">
          {t("are_you_sure_you_want_to_exit_before_descr")}
        </DmText>
        <DmView className="mt-[39] flex-row items-center justify-between">
          <ActionBtn
            className="flex-1 mr-[5] h-[41] rounded-3 border-black"
            title={t("no")}
            onPress={onClose}
            variant="white"
            textClassName="text-red font-custom600 text-13 leadeing-[16px]"
          />
          <ActionBtn
            className="flex-1 ml-[5] h-[41] rounded-3"
            title={t("yes")}
            onPress={handleLogout}
            textClassName="font-custom600 text-13 leadeing-[16px]"
          />
        </DmView>
      </DmView>
    </Modal>
  )
}

export default StopRegistrationModal

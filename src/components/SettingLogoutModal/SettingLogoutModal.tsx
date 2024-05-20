import React from "react"

import { DmText, DmView } from "components/UI"
import MainModal from "components/MainModal"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import { I18nManager } from "react-native"
import clsx from "clsx"
import Icon from "assets/icons/logout.svg"

interface Props {
  isVisible: boolean
  onClose: () => void
  onPress: () => void
}

const SettingLogoutModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onPress,
}) => {
  const { t } = useTranslation()

  const handlePress = () => {
    onClose()
    setTimeout(() => {
      onPress()
    }, 500)
  }

  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      onPressSecond={onClose}
      title={t("sign_out")}
      descr={t("are_you_sure_you_want_descr")}
      isBtnsTwo
      titleBtn={t("yes")}
      titleBtnSecond={t("no")}
      classNameTitle="mt-[9]"
      classNameDescr="mt-[9] font-custom400 text-13 leading-[20px]"
      Icon={
        <DmView className={clsx(I18nManager.isRTL ? "ml-[18]" : "mr-[18]")}>
          <Icon />
        </DmView>
      }
      classNameBtnsWrapper="mt-[25]"
      classNameBtns="h-[47]"
      className="py-[22] px-[25]"
      classNameSecondBtn="border-red"
      classNameSecondBtnText="text-black"
      onPress={handlePress}
    />
  )
}

export default SettingLogoutModal

import React from "react"

import { DmText, DmView } from "components/UI"
import MainModal from "components/MainModal"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import CloseBigIcon from "assets/icons/cancel-big.svg"

interface Props {
  isVisible: boolean
  onClose: () => void
}

const ErrorModal: React.FC<Props> = ({ onClose, isVisible }) => {
  const { t } = useTranslation()
  // @TO DO
  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      title={t("email_or_password_not_correct")}
      descr={t("we_could_not_log_you_descr")}
      titleBtn={t("re_enter_login_information")}
      onPress={onClose}
      Icon={<CloseBigIcon />}
    />
  )
}

export default ErrorModal

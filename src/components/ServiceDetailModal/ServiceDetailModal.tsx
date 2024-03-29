import React from "react"

import { DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"

import styles from "./styles"
import MainModal from "components/MainModal"

interface Props {
  isVisible: boolean
  onClose: () => void
  title: string
  descr: string
}

const ServiceDetailModal: React.FC<Props> = ({
  isVisible,
  onClose,
  title,
  descr,
}) => {
  const { t } = useTranslation()
  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      onPress={onClose}
      title={title}
      descr={descr}
      titleBtn={t("OK")}
      // @TO DO
      Icon={<DmView className="w-[170] h-[112] bg-grey" />}
      classNameBtn="rounded-5"
      className="px-[12] pt-[30] pb-[30]"
    />
  )
}

export default ServiceDetailModal

import React from "react"

import { DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"
import MainModal from "components/MainModal"

import styles from "./styles"
import DetailIcon from "assets/icons/service-def.svg"
import { I18nManager } from "react-native"

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
      Icon={
        <DmView className={I18nManager.isRTL ? "ml-[32]" : "mr-[32]"}>
          <DetailIcon />
        </DmView>
      }
      classNameBtn="rounded-5"
      className="px-[12] pt-[30] pb-[30]"
    />
  )
}

export default ServiceDetailModal

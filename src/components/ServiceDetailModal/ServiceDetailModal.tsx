import React from "react"

import { DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"
import MainModal from "components/MainModal"

import styles from "./styles"
import DetailIcon from "assets/icons/service-def.svg"
import { I18nManager } from "react-native"
import clsx from "clsx"

interface Props {
  isVisible: boolean
  onClose: () => void
  title: string
  descr: string
  type?: "my-service"
  onPress?: () => void
  isLoading?: boolean
}

const ServiceDetailModal: React.FC<Props> = ({
  isVisible,
  onClose,
  title,
  descr,
  type,
  onPress,
  isLoading,
}) => {
  const { t } = useTranslation()
  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      onPress={onPress || onClose}
      title={title}
      descr={descr}
      isLoading={isLoading}
      titleBtn={t(type === "my-service" ? "add_service" : "OK")}
      isBtnsTwo={type === "my-service"}
      titleBtnSecond={t("cancel")}
      classNameBtns={clsx(type === "my-service" && "mt-[52] h-[41]")}
      classNameSecondBtn={clsx(type === "my-service" && "border-red")}
      classNameSecondBtnText={clsx(type === "my-service" && "text-black")}
      classNameBtnsText={clsx(type === "my-service" && "font-custom500")}
      // @TO DO
      Icon={
        <DmView className={I18nManager.isRTL ? "ml-[32]" : "mr-[32]"}>
          <DetailIcon />
        </DmView>
      }
      classNameBtn="rounded-5"
      className={clsx(
        "px-[12] pt-[30] pb-[30]",
        type === "my-service" && "px-[18]"
      )}
    />
  )
}

export default ServiceDetailModal

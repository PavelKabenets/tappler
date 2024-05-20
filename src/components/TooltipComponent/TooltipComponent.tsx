import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import { TooltipProps } from "rn-tourguide"
import Icon from "assets/icons/hand-guide.svg"
import clsx from "clsx"
import { I18nManager } from "react-native"

const TooltipComponent: React.ComponentType<TooltipProps> = ({
  handleStop,
}) => {
  const { t } = useTranslation()
  return (
    <DmView className="items-center">
      <DmView className={clsx(I18nManager.isRTL && "scale-x-[-1]")}>
        <Icon />
      </DmView>
      <DmText className="mt-[4] text-12 leading-[20px] text-white font-custom500 text-center">
        {t("tap_here_to_add_food_and_drink_items")}
      </DmText>
      <DmView className="mt-[18] w-[150]">
        <ActionBtn
          title={t("got_it")}
          onPress={handleStop}
          className="rounded-3 h-[34]"
        />
      </DmView>
    </DmView>
  )
}

export default TooltipComponent

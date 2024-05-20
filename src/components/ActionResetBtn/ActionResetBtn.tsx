import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"

import styles from "./styles"
import { useTranslation } from "react-i18next"
import clsx from "clsx"

interface Props {
  isResetBtnVisible?: boolean
  onReset?: () => void
  isLoading?: boolean
  onPress?: () => void
  className?: string
  actionBtnDisable?: boolean
}

const ActionResetBtn: React.FC<Props> = ({
  isResetBtnVisible = true,
  onReset,
  isLoading,
  onPress,
  className,
  actionBtnDisable,
}) => {
  const { t } = useTranslation()
  return (
    <DmView
      className={clsx("px-[20] pt-[8] border-t-0.5 border-t-grey5", className)}
    >
      <DmView className={clsx("w-full", "flex-row")}>
        {isResetBtnVisible && (
          <ActionBtn
            title={t("reset")}
            onPress={onReset}
            className="rounded-4 mr-[8] h-[47]"
            variant="bordered"
            textClassName="font-custom600"
            disable={isLoading}
          />
        )}
        <ActionBtn
          title={t("done")}
          onPress={onPress}
          className="rounded-4 flex-1 h-[47]"
          textClassName="font-custom600"
          disable={isLoading || actionBtnDisable}
          isLoading={isLoading}
        />
      </DmView>
    </DmView>
  )
}

export default ActionResetBtn

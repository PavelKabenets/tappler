import React from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import clsx from "clsx"

interface Props {
  title?: string
  className?: string
}

const DistinctLabelComponent: React.FC<Props> = ({ title, className }) => {
  const { t } = useTranslation()
  return (
    <DmView
      className={clsx(
        "w-[54] h-[16] items-center justify-center bg-yellow rounded-2 self-center",
        className
      )}
    >
      {title ? (
        <DmText className="text-12 leading-[15px] font-custom600">
          {title}
        </DmText>
      ) : (
        <DmText className="text-9 leading-[12px] font-custom600">
          {t("distinct")}
        </DmText>
      )}
    </DmView>
  )
}

export default DistinctLabelComponent

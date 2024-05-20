import React from "react"

import { DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"

import styles from "./styles"
import { renderRateText } from "utils/renderRateText"
import { DimensionValue } from "react-native"
import clsx from "clsx"

interface Props {
  rate: number
  title: string
  className?: string
}

const RateBarComponent: React.FC<Props> = ({ title, rate, className }) => {
  const { t } = useTranslation()
  return (
    <DmView
      className={clsx(
        "flex-row items-center justify-between w-full",
        className
      )}
    >
      <DmText className="mr-[20] flex-1 text-12 leading-[15px] font-custom400">
        {title}
      </DmText>
      <DmView className="flex-row items-center flex-1">
        <DmView className="bg-grey14 rounded-full overflow-hidden w-full h-[8] flex-[1.3]">
          <DmView
            className="h-full bg-red rounded-full"
            style={{
              width: (Number(Number(rate) * 100) / 5.0 + "%") as DimensionValue,
            }}
          />
        </DmView>
        <DmText className="ml-[10] flex-1 text-12 leading-[15px] font-custom400">
          {renderRateText(rate, t)}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default RateBarComponent

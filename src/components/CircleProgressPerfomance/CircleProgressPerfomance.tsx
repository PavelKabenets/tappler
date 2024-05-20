import React from "react"

import { DmText, DmView } from "components/UI"
import colors from "styles/colors"
import { useTranslation } from "react-i18next"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import styles from "./styles"

interface Props {
  percentage: number
  tintColor: string
  num: number
  strokeWidth: number
  descr: string
  btnColor: string
}

const CircleProgressPerfomance: React.FC<Props> = ({
  percentage,
  tintColor,
  num,
  strokeWidth,
  descr,
  btnColor,
}) => {
  const { t } = useTranslation()
  const size = 86
  const preFill = (percentage / 100) * 100
  const convertColorToBgClass = (color: string) => {
    switch (color) {
      case colors.red3:
        return colors.red3
      case colors.grey42:
        return colors.grey42
      case colors.orange1:
        return colors.orange1
      default:
        return colors.grey42
    }
  }
  return (
    <DmView className="items-center mb-[40]">
      <DmView className="items-center justify-center">
        <DmView className="absolute w-[96%] h-[96%] border-2 border-grey29 rounded-full" />
        <AnimatedCircularProgress
          size={size}
          width={strokeWidth}
          backgroundWidth={0}
          fill={percentage}
          tintColor={tintColor}
          style={styles.circle}
          rotation={0}
          prefill={preFill}
        >
          {(fill) => (
            <DmText className="text-20 leading-[24px] font-custom700">{`${percentage}%`}</DmText>
          )}
        </AnimatedCircularProgress>
      </DmView>
      <DmView
        className={
          "w-[61] h-[19] rounded-[15px] mt-[5] justify-center items-center"
        }
        style={{ backgroundColor: convertColorToBgClass(btnColor) }}
      >
        <DmText className="text-center font-custom500 text-13 leading-[16px] text-white">
          {num}
        </DmText>
      </DmView>
      <DmView className="mt-[5]">
        <DmText className="text-12 leading-[20px] font-custom600 text-center text-black3">
          {descr}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default CircleProgressPerfomance

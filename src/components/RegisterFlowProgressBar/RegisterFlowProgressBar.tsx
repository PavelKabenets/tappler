import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"

interface Props {
  currentStep: number
  titleCurrentStep: string
}

const totalSteps = 7
const renderStepsCurr = [...new Array(totalSteps)].map((_, idx) => idx + 1)

const RegisterFlowProgressBar: React.FC<Props> = ({
  currentStep,
  titleCurrentStep,
}) => {
  const renderSteps = (item: number) => {
    return (
      <DmView
        key={item}
        style={[styles.item, currentStep === item && styles.activeStepSize]}
        className={clsx(
          "bg-grey rounded-full flex-row items-center justify-center",
          item === currentStep && "bg-red"
        )}
      >
        <DmText className="text-13 leading-[16px] text-white font-custom400">
          {item}
        </DmText>
        {item === currentStep && (
          <DmText className="ml-[5] text-12 text-white font-custom400 flex-1 text-center">
            {titleCurrentStep}
          </DmText>
        )}
      </DmView>
    )
  }
  return (
    <DmView>
      <DmView className="py-[7] mx-[13] flex-row items-center justify-between">
        <DmView className="w-full h-[1] bg-grey2 absolute" />
        {renderStepsCurr.map((item) => renderSteps(item))}
      </DmView>
      <DmView className="h-[1] w-full bg-grey4" />
    </DmView>
  )
}

export default RegisterFlowProgressBar

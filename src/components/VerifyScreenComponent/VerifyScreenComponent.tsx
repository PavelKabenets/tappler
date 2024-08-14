import React, { useState } from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import VerifyCodeInput from "components/VerifyCodeInput"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styles from "./styles"

import clsx from "clsx"

interface Props {
  title: string
  classNameTitle?: string
  subtitle: string
  classNameSubtitle?: string
  subtext: string
  classNameSubtext?: string
  className?: string
  btn: string
  classNameBtn?: string
  time?: string
  descr?: string
  classNameDescr?: string
  onClose?: () => void
  onPress?: () => void
  control: any
  name: string
}

const VerifyScreenComponent: React.FC<Props> = ({
  title,
  classNameTitle,
  subtitle,
  classNameSubtitle,
  subtext,
  classNameSubtext,
  className,
  btn,
  classNameBtn,
  time,
  descr,
  classNameDescr,
  onPress,
  control,
}) => {
  const [inputLength, setInputLength] = useState(0)
  const isButtonDisabled = inputLength !== 4

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <DmView>
        <DmText
          className={clsx(
            "pt-[68] text-20 leading-[24px] font-custom600 text-center",
            classNameTitle
          )}
        >
          {title}
        </DmText>
        <DmText
          className={clsx(
            "text-11 leading-[26px] font-custom400 text-center",
            classNameSubtitle
          )}
        >
          {subtitle}
        </DmText>
        <DmView className={clsx("px-[62] mt-[50]", className)}>
          <DmText
            className={clsx(
              "text-11 leading-[26px] pb-[13] font-custom400 text-red",
              classNameSubtext
            )}
          >
            {subtext}
          </DmText>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <VerifyCodeInput
                initialValue={value}
                setCodeValue={(text) => {
                  setInputLength(text.length)
                  onChange(text)
                }}
              />
            )}
            name="code"
          />
        </DmView>
        <DmView className={clsx("px-[35] pt-[30]", classNameBtn)}>
          <ActionBtn
            onPress={onPress}
            textClassName={`text-13 leading-[16px] font-custom500 ${isButtonDisabled ? "text-grey10 font-custom400" : ""}`}
            className={`h-[44] rounded-10 ${isButtonDisabled ? "bg-grey16" : ""}`}
            title={btn}
          />
        </DmView>
        <DmView className="pt-[30]">
          {time && (
            <DmText className="text-11 leading-[29px] font-custom400 text-center text-grey2">
              {time}
            </DmText>
          )}
          <DmText
            className={clsx(
              "text-11 leading-[29px] font-custom500 text-center text-grey2",
              classNameDescr
            )}
          >
            {descr}
          </DmText>
        </DmView>
      </DmView>
    </KeyboardAwareScrollView>
  )
}

export default VerifyScreenComponent

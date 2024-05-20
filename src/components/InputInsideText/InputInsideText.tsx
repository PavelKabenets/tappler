import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native"
import { useTranslation } from "react-i18next"
import { takeFontStyles } from "helpers/helpers"
import clsx from "clsx"

interface Props extends TextInputProps {
  title: string
  descr?: string
  value?: string
  style?: StyleProp<TextStyle>
  classNameInput?: string
  className?: string
  subTitleComponent?: React.ReactNode
}

const InputInsideText: React.FC<Props> = ({
  title,
  descr,
  value,
  style,
  classNameInput,
  className,
  subTitleComponent,
  ...restProps
}) => {
  const { t, i18n } = useTranslation()
  return (
    <DmView className={className}>
      <DmView className="flex-row items-end">
        <DmText className="text-13 leading-[16px] font-custom400">
          {title}{" "}
        </DmText>
        <DmView className="border-b-1 border-b-grey2">
          <TextInput
            className={clsx(
              "w-[44] h-auto pb-[0]  text-red text-13 leading-[16px]",
              i18n.language === "ar" && "mb-[-3]",
              classNameInput
            )}
            value={value}
            maxLength={5}
            textAlign="center"
            textAlignVertical="bottom"
            keyboardType="numeric"
            returnKeyType={"done"}
            style={[
              takeFontStyles(
                "leading-[16px] font-custom600 " + classNameInput,
                i18n.language
              ),
              style,
            ]}
            {...restProps}
          />
        </DmView>
        {!subTitleComponent && (
          <DmText className="text-13 leading-[16px] font-custom600">
            {" "}
            {t("EGP")}
          </DmText>
        )}
        {subTitleComponent && subTitleComponent}
      </DmView>
      {!!descr && (
        <DmText className="mt-[8] text-13 leading-[16px] font-custom400">
          {descr}
        </DmText>
      )}
    </DmView>
  )
}

export default InputInsideText

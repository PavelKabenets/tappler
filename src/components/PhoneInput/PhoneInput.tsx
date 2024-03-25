import React from "react"

import { DmText, DmView } from "components/UI"
import { TextInputProps, I18nManager } from "react-native"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import clsx from "clsx"
import FlagIcon from "assets/icons/flag-egypt.svg"
import ChevronDownIcon from "assets/icons/chevron-down.svg"
import colors from "styles/colors"
import { TextInput } from "react-native-gesture-handler"
import { takeFontFamily } from "helpers/helpers"

interface Props extends TextInputProps {
  value?: string
  className?: string
}

const PhoneInput: React.FC<Props> = ({ value, className, ...restProps }) => {
  const { i18n } = useTranslation()
  return (
    <DmView
      className={clsx(
        "flex-row items-center pb-[4] border-b-1 border-grey7",
        I18nManager.isRTL && "flex-row-reverse",
        className
      )}
    >
      <DmView
        className={clsx(
          "flex-row items-center border-r-1 border-r-grey7 pr-[7]",
          I18nManager.isRTL &&
            "flex-row-reverse border-r-0 border-l-1 border-l-grey7"
        )}
      >
        <FlagIcon />
        <DmText
          className={clsx(
            "ml-[10] mr-[2] text-20 font-custom700 leading-[24px]",
            I18nManager.isRTL && "ml-[2] mr-[10]"
          )}
        >
          +20
        </DmText>
        <ChevronDownIcon
          stroke={colors.grey7}
          width={18}
          height={18}
          strokeWidth={3}
        />
      </DmView>
      <TextInput
        value={value}
        className={clsx(
          "ml-[8] flex-1 h-[60] text-20 text-black",
          I18nManager.isRTL && "ml-[0] mr-[8]"
        )}
        style={[
          I18nManager.isRTL && { textAlign: "left", writingDirection: "rtl" },
          takeFontFamily("font-custom400 leading-[25px]", i18n.language),
        ]}
        keyboardType="numeric"
        {...restProps}
      />
    </DmView>
  )
}

export default PhoneInput

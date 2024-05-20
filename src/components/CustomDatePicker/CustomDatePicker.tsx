import React from "react"

import { DmText } from "components/UI"

import styles from "./styles"
import DatePicker, { DatePickerProps } from "react-native-date-picker"
import { useTranslation } from "react-i18next"
import { useTypedSelector } from "store"

type Props = DatePickerProps

const CustomDatePicker: React.FC<Props> = ({ ...restProps }) => {
  const { language } = useTypedSelector((store) => store.auth)
  const { t } = useTranslation()
  return (
    <DatePicker
      locale={language}
      confirmText={t("OK")}
      cancelText={t("cancel")}
      title={t("select_time")}
      {...restProps}
    />
  )
}

export default CustomDatePicker

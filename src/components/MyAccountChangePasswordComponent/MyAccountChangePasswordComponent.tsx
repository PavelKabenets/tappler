import React, { useState } from "react"

import { DmInput, DmText, DmView } from "components/UI"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import styles from "./styles"

interface Props {
  title: string
  subtitle: string
  descr?: string
  onPress?: () => void
  control: any
  name: string
}

const MyAccountChangePasswordComponent: React.FC<Props> = ({
  title,
  subtitle,
  descr,
  onPress,
  control,
  name,
}) => {
  const { t } = useTranslation()

  return (
    <DmView>
      <DmText className="pt-[20] px-[15] pb-[5] text-14 leading-[18px] font-custom600 text-black">
        {title}
      </DmText>
      <DmView className="px-[15] flex-row pb-[10]">
        <DmText className="text-12 leading-[15px] font-custom400 text-grey2">
          {subtitle}
        </DmText>
        <DmView onPress={onPress}>
          <DmText className="text-12 leading-[15px] font-custom400 text-red ml-[15]">
            {descr}
          </DmText>
        </DmView>
      </DmView>
      <DmView className="px-[15]">
        <Controller
          control={control}
          rules={{ required: true, minLength: 6 }}
          render={({ field: { value, onChange } }) => (
            <DmInput
              secureTextEntry
              isAnimText={false}
              className="h-[41] w-full bg-white1"
              inputClassName="text-15 leading-[19px] text-black"
              value={value}
              onChangeText={onChange}
            />
          )}
          name={name}
        />
      </DmView>
    </DmView>
  )
}

export default MyAccountChangePasswordComponent

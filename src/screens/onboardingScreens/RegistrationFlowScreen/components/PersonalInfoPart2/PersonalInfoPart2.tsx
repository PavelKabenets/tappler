import React, { useEffect, useLayoutEffect, useState } from "react"

import { ActionBtn, ActionBtnSmall, DmInput, DmView } from "components/UI"
import { Keyboard } from "react-native"

import { useForm, Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"

import { ResultFlowDataType } from "types"

import styles from "./styles"
import colors from "styles/colors"
import ExampleModal from "components/ExampleModal"

interface Props {
  result: ResultFlowDataType
  onChangeResult: (obj: ResultFlowDataType) => void
  step: number
}

const PersonalInfoPart2: React.FC<Props> = ({
  onChangeResult,
  result,
  step,
}) => {
  const [isExampleModalVisible, setExampleModalVisible] = useState(false)

  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      aboutMe: "",
    },
  })

  const { t } = useTranslation()

  const handleSeeExample = () => {
    setExampleModalVisible(true)
    Keyboard.dismiss()
  }

  const handleCloseExample = () => {
    setExampleModalVisible(false)
  }

  useLayoutEffect(() => {
    onChangeResult({ isValid })
  }, [isValid])

  useEffect(() => {
    return () => {
      onChangeResult({ aboutMe: getValues("aboutMe") })
    }
  }, [watch("aboutMe")])

  useEffect(() => {
    if (step === 2) {
      setValue("aboutMe", result?.aboutMe || "", {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    }
  }, [step])

  return (
    <DmView className="pb-[28] mt-[24] px-[14] flex-1 justify-between">
      <DmView>
        <TitleRegistrationFlow
          title={
            result?.accoutType === "company"
              ? t("information_about_your_business")
              : t("information_about_you")
          }
          descr={t("information_about_you_descr")}
          classNameDescr="leading-[20px]"
        />
        <DmView className="mt-[23] items-center">
          <ActionBtnSmall
            title={t("see_examples")}
            onPress={handleSeeExample}
          />
        </DmView>
        <TitleRegistrationFlow
          className="mt-[20]"
          title={t("important_note")}
          descr={t("phone_numbers_or_emails_descr")}
          classNameTitle="text-13 leading-[16px] text-red"
          classNameDescr="font-custom500 leading-[20px]"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <DmInput
              className="mt-[20]"
              value={value}
              onChangeText={onChange}
              placeholder={
                result?.accoutType === "company"
                  ? t("information_about_business")
                  : t("type_the_information_about_you_here")
              }
              maxLength={299}
              placeholderTextColor={colors.grey11}
              multiline
            />
          )}
          name="aboutMe"
        />
      </DmView>
      <ExampleModal
        isVisible={isExampleModalVisible}
        onClose={handleCloseExample}
      />
    </DmView>
  )
}

export default PersonalInfoPart2

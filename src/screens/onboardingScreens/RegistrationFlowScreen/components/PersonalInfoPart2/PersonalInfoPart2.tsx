import React, { useEffect, useState } from "react"

import { ActionBtn, ActionBtnSmall, DmInput, DmView } from "components/UI"

import { useForm, Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"

import { ResultFlowDataType } from "types"

import styles from "./styles"
import colors from "styles/colors"
import ExampleModal from "components/ExampleModal"

interface Props {
  result: ResultFlowDataType
  onNextStep: () => void
  onChangeResult: (obj: ResultFlowDataType) => void
  step: number
}

const PersonalInfoPart2: React.FC<Props> = ({
  onNextStep,
  onChangeResult,
  result,
  step,
}) => {
  const [isExampleModalVisible, setExampleModalVisible] = useState(false)

  const {
    control,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      aboutMe: "",
    },
  })

  const { t } = useTranslation()

  const handleSubmitSecondStep = () => {
    onChangeResult({ aboutMe: getValues("aboutMe") })
    onNextStep()
  }

  const handleSeeExample = () => {
    setExampleModalVisible(true)
  }

  const handleCloseExample = () => {
    setExampleModalVisible(false)
  }

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
    <DmView className="mt-[24] px-[14] flex-1 justify-between">
      <DmView>
        <TitleRegistrationFlow
          title={t("information_about_you")}
          descr={t("information_about_you_descr")}
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
          classNameDescr="font-custom500"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <DmInput
              label={t("about_me")}
              className="mt-[20]"
              value={value}
              onChangeText={onChange}
              placeholder={t("type_the_information_about_you_here")}
              placeholderTextColor={colors.grey11}
              multiline
            />
          )}
          name="aboutMe"
        />
      </DmView>
      <ActionBtn
        className="rounded-5 mt-[27]"
        title={t("next") + " - " + t("profile_photo")}
        onPress={handleSubmitSecondStep}
        disable={!isValid}
      />
      <ExampleModal
        isVisible={isExampleModalVisible}
        onClose={handleCloseExample}
      />
    </DmView>
  )
}

export default PersonalInfoPart2

import React, { useEffect, useState } from "react"

import { ActionBtn, DmChecbox, DmInput, DmText, DmView } from "components/UI"

import { useForm, Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

import styles from "./styles"
import colors from "styles/colors"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import GovornorateModal from "components/GovornorateModal"
import { GovernorateItemType, ResultFlowDataType } from "types"
import SelectCityModal from "components/SelectCityModal"

interface Props {
  result: ResultFlowDataType
  onNextStep: () => void
  onChangeResult: (obj: ResultFlowDataType) => void
  step: number
}

type FormValuesType = {
  firstName: string
  lastName: string
  address: string
  city: string
  governorate: string
  gender: string
}

const PersonalInfo: React.FC<Props> = ({
  onChangeResult,
  onNextStep,
  result,
  step,
}) => {
  const [isSelectCityModalVisible, setSelectCityModalVisible] = useState(false)

  const {
    control,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<FormValuesType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      governorate: "",
      gender: "",
    },
  })

  const { t } = useTranslation()

  const onSetValuesFromResult = (result: ResultFlowDataType) => {
    const data = result?.personalInfo as Partial<FormValuesType>
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        setValue(key as keyof FormValuesType, value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        })
      })
    }
  }

  const handleOpenSelectModal = () => {
    setSelectCityModalVisible(true)
  }

  // @TO DO
  const hadnleChangeCity = () => {
    handleOpenSelectModal()
  }

  // @TO DO
  const handleChangeGovernorate = () => {
    handleOpenSelectModal()
  }

  const hadnleSubmitFirstStep = () => {
    onNextStep()
    onChangeResult({
      personalInfo: {
        firstName: getValues("firstName"),
        lastName: getValues("lastName"),
        address: getValues("address"),
        city: getValues("city"),
        governorate: getValues("governorate"),
        gender: getValues("gender"),
      },
    })
  }

  const handleCloseSelectModal = () => {
    setSelectCityModalVisible(false)
  }

  const handleSubmitModal = ({
    governorate,
    city,
  }: {
    governorate: GovernorateItemType
    city: string
  }) => {
    setValue("city", city, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
    setValue("governorate", governorate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
    handleCloseSelectModal()
  }

  const handleSelectGender = (type: "male" | "female") => {
    if (getValues("gender") === type) {
      setValue("gender", "", {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    } else {
      setValue("gender", type, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    }
  }

  useEffect(() => {
    if (step === 1) {
      onSetValuesFromResult(result)
    }
  }, [step])

  return (
    <DmView className="mt-[24] px-[14] flex-1 justify-between">
      <DmView>
        <TitleRegistrationFlow
          title={t("your_name")}
          descr={t("type_your_first_and_last_name_descr")}
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <DmInput
              label={t("first_name")}
              className="mt-[15]"
              value={value}
              onChangeText={onChange}
              placeholder={t("enter_your_first_name")}
              placeholderTextColor={colors.grey11}
            />
          )}
          name="firstName"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <DmInput
              label={t("last_name")}
              className="mt-[10]"
              value={value}
              onChangeText={onChange}
              placeholder={t("enter_your_last_name")}
              placeholderTextColor={colors.grey11}
            />
          )}
          name="lastName"
        />
        {/* @TO DO */}

        <TitleRegistrationFlow
          className="mt-[15]"
          title={t("your_address")}
          descr={t("your_address_will_not_be_descr")}
          classNameDescr="text-grey2"
          Icon={<DmView className="w-[16] h-[16] bg-grey" />}
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <DmInput
              label={t("address")}
              className="mt-[15]"
              value={value}
              onChangeText={onChange}
              placeholder={t("enter_your_street_address")}
              placeholderTextColor={colors.grey11}
            />
          )}
          name="address"
        />
        <DmView className="mt-[10] flex-row items-center justify-between">
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DmInput
                label={t("city")}
                className="flex-1 mr-[5]"
                value={t(value)}
                placeholder={t("enter_your_city")}
                placeholderTextColor={colors.grey11}
                onPress={hadnleChangeCity}
              />
            )}
            name="city"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DmInput
                label={t("governorate")}
                className="ml-[5] flex-1"
                value={t(value)}
                placeholder={t("enter_governorate")}
                placeholderTextColor={colors.grey11}
                onPress={handleChangeGovernorate}
              />
            )}
            name="governorate"
          />
        </DmView>
        <TitleRegistrationFlow
          title={t("gender")}
          descr={t("select_your_gender")}
          className="mt-[30]"
        />
        <DmView className="mt-[11] flex-row items-center w-full">
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value } }) => (
              <>
                <DmChecbox
                  title={t("male")}
                  onPress={() => handleSelectGender("male")}
                  isChecked={value === "male"}
                  className="flex-[0.23]"
                />
                <DmChecbox
                  title={t("female")}
                  onPress={() => handleSelectGender("female")}
                  isChecked={value === "female"}
                  className="flex-[0.3]"
                />
              </>
            )}
            name="gender"
          />
        </DmView>
      </DmView>
      <ActionBtn
        className="rounded-5 mt-[27]"
        title={t("next") + " - " + t("information_about_you")}
        onPress={hadnleSubmitFirstStep}
        disable={!isValid}
      />
      <SelectCityModal
        isVisible={isSelectCityModalVisible}
        onClose={handleCloseSelectModal}
        onSubmit={handleSubmitModal}
      />
    </DmView>
  )
}

export default PersonalInfo

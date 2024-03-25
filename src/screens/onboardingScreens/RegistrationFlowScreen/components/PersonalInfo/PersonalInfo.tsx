import React, { useEffect, useLayoutEffect, useState } from "react"

import { ActionBtn, DmChecbox, DmInput, DmText, DmView } from "components/UI"
import { Keyboard } from "react-native"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import GovornorateModal from "components/GovornorateModal"
import SelectCityModal from "components/SelectCityModal"

import { useForm, Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { GovernorateItemType, ResultFlowDataType } from "types"

import styles from "./styles"
import colors from "styles/colors"
import LockIcon from "assets/icons/lock.svg"
import MainModal from "components/MainModal"
import clsx from "clsx"
import i18n from "locales/i18n"

interface Props {
  result: ResultFlowDataType
  onChangeResult: (obj: ResultFlowDataType) => void
  step: number
  onScrollToBottom: () => void
}

type FormValuesType = {
  firstName: string
  lastName: string
  address: string
  city: string
  governorate: string
  gender: string
  businessName?: string
}

const fieldsToWatch: (keyof FormValuesType)[] = [
  "firstName",
  "lastName",
  "address",
  "city",
  "governorate",
  "gender",
  "businessName",
]

const PersonalInfo: React.FC<Props> = ({
  onChangeResult,
  result,
  step,
  onScrollToBottom,
}) => {
  const [isSelectCityModalVisible, setSelectCityModalVisible] = useState(false)
  const [coords, setCoords] = useState<{ lat: number; lon: number }>()
  const [isBusinessModalVisible, setBusinessModalVisible] = useState(false)

  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm<FormValuesType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      governorate: "",
      gender: "",
      businessName: "",
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
      setCoords(result?.personalInfo?.coords)
    }
  }

  const handleOpenSelectModal = () => {
    setSelectCityModalVisible(true)
    Keyboard.dismiss()
  }

  const hadnleChangeCity = () => {
    handleOpenSelectModal()
  }

  const handleOpenBusinessModal = () => {
    setBusinessModalVisible(true)
  }

  const handleCloseBusinessModal = () => {
    setBusinessModalVisible(false)
  }

  const handleCloseSelectModal = () => {
    setSelectCityModalVisible(false)
  }

  const handleSubmitModal = ({
    governorate,
    city,
    coords,
  }: {
    governorate: GovernorateItemType
    city: string
    coords: {
      lat: number
      lon: number
    }
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
    setCoords(coords)
    handleCloseSelectModal()
    // setTimeout(() => {
    //   onScrollToBottom()
    // }, 500)
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

  useEffect(() => {
    if (result?.accoutType === "company" && !getValues("businessName")) {
      handleOpenBusinessModal()
    }
  }, [])

  useLayoutEffect(() => {
    onChangeResult({
      isValid,
    })
  }, [isValid])

  useEffect(
    () => {
      onChangeResult({
        personalInfo: {
          firstName: getValues("firstName"),
          lastName: getValues("lastName"),
          address: getValues("address"),
          city: getValues("city"),
          governorate: getValues("governorate"),
          gender: getValues("gender"),
          coords,
          businessName: getValues("businessName"),
        },
      })
    },
    fieldsToWatch.map((field) => watch(field))
  )
  return (
    <DmView className="pb-[28] mt-[5] px-[14] flex-1 justify-between">
      <DmView>
        {result?.accoutType === "company" && (
          <>
            <TitleRegistrationFlow
              title={t("business_name")}
              descr={t("this_name_will_appear_to_customers")}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <DmInput
                  className="mt-[5]"
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("business_name")}
                  placeholderTextColor={colors.grey11}
                />
              )}
              name="businessName"
            />
          </>
        )}
        <TitleRegistrationFlow
          className={clsx(
            result?.accoutType === "company" && "mt-[13]",
            result?.accoutType === "company" &&
              i18n.language === "ar" &&
              "mt-[5]"
          )}
          title={t("your_name")}
          descr={t("type_your_first_and_last_name_descr")}
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <DmInput
              label={t("first_name")}
              className="mt-[5]"
              value={value}
              onChangeText={onChange}
              placeholder={t("first_name")}
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
              className="mt-[5]"
              value={value}
              onChangeText={onChange}
              placeholder={t("last_name")}
              placeholderTextColor={colors.grey11}
            />
          )}
          name="lastName"
        />

        <TitleRegistrationFlow
          className={clsx("mt-[13]", i18n.language === "ar" && "mt-[5]")}
          title={t(
            result?.accoutType === "company"
              ? "business_address"
              : "your_address"
          )}
          descr={t(
            result?.accoutType === "company"
              ? "provide_your_detailed_business_address"
              : "your_address_will_not_be_descr"
          )}
          classNameDescr="text-grey2"
          Icon={result?.accoutType !== "company" && <LockIcon />}
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <DmInput
              className="mt-[5]"
              value={value}
              onChangeText={onChange}
              placeholder={t("street_address")}
              placeholderTextColor={colors.grey11}
            />
          )}
          name="address"
        />
        <DmView className="mt-[5] flex-row items-center justify-between">
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DmInput
                label={t("city")}
                className="flex-1 mr-[5]"
                value={t(value)}
                placeholder={t("city")}
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
                placeholder={t("governorate")}
                placeholderTextColor={colors.grey11}
                editable={false}
                inputClassName="text-black"
              />
            )}
            name="governorate"
          />
        </DmView>
        <TitleRegistrationFlow
          title={t("gender")}
          descr={t("select_your_gender")}
          className={clsx("mt-[13]", i18n.language === "ar" && "mt-[5]")}
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
                />
                <DmChecbox
                  title={t("female")}
                  onPress={() => handleSelectGender("female")}
                  isChecked={value === "female"}
                  className="ml-[20]"
                />
              </>
            )}
            name="gender"
          />
        </DmView>
      </DmView>

      <SelectCityModal
        isVisible={isSelectCityModalVisible}
        onClose={handleCloseSelectModal}
        onSubmit={handleSubmitModal}
      />
      <MainModal
        isVisible={isBusinessModalVisible}
        onClose={handleCloseBusinessModal}
        title={t("attention")}
        descr={t("only_the_owner_can_register")}
        titleBtn={t("OK")}
        onPress={handleCloseBusinessModal}
        classNameDescr="mx-[8] mt-[10] leading-[20px] font-custom500"
        classNameTitle="mt-[0] text-15 leading-[27px] font-custom700"
        className="pt-[45] px-[39]"
        classNameBtn="h-[41] mt-[19]"
        classNameActionBtnText="text-11"
        classNameModal="px-[19]"
      />
    </DmView>
  )
}

export default PersonalInfo

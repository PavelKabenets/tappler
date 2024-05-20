import React, { useEffect, useLayoutEffect, useState } from "react"

import {
  ActionBtn,
  DmAuthInput,
  DmChecbox,
  DmText,
  DmView,
} from "components/UI"
import Modal from "react-native-modal"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { FoodOptionChoiceType, FoodOptionType } from "types"
import { useTranslation } from "react-i18next"
import AddPlusTitleComponent from "components/AddPlusTitleComponent"
import { isBigPhone } from "helpers/helpers"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import TrashIcon from "assets/icons/trash-red.svg"
import clsx from "clsx"

interface Props {
  isVisible: boolean
  onClose: () => void
  currentOption?: FoodOptionType
  setCurrentOption: (item: FoodOptionType) => void
  onAdd: (item: FoodOptionType) => void
  onDelete: (index: number) => void
}

type DefaultValuesType = {
  name: string
  isRequired: boolean
  minQty: string | number
  maxQty: string | number
  choices: FoodOptionChoiceType[]
}

const CreateFoodMenuOptionModal: React.FC<Props> = ({
  isVisible,
  onClose,
  currentOption,
  setCurrentOption,
  onAdd,
  onDelete,
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    reset,
    watch,
    trigger,
    resetField,
    formState: { isValid, errors },
  } = useForm<DefaultValuesType>({
    defaultValues: {
      name: "",
      isRequired: false,
      minQty: "",
      maxQty: "",
    },
  })

  const [isRequiredVisible, setRequiredVisible] = useState(
    false || !!currentOption
  )

  const { fields, append, replace, remove } = useFieldArray({
    control,
    name: "choices",
  })

  const handleChangeMustChoose = (val: boolean) => {
    setValue("isRequired", val)
    setRequiredVisible(true)
    trigger("minQty")
    trigger("maxQty")
  }

  const handleAdd = () => {
    append({
      name: "",
      price: "",
      discountPrice: "",
    })
  }

  const handleDeleteOption = () => {
    if (currentOption?.index !== undefined) {
      onDelete(currentOption?.index)
      onClose()
    }
  }

  const handleDeleteItem = (id: number) => {
    remove(id)
  }

  const onSubmit = () => {
    if (currentOption) {
      setCurrentOption({
        name: getValues("name"),
        isRequired: getValues("isRequired"),
        maxQty: Number(getValues("maxQty")),
        minQty: Number(getValues("minQty")),
        choices: getValues("choices").map((item) => ({
          ...item,
          price: Number(item.price),
          discountPrice: Number(item.discountPrice),
        })),
      })
    } else {
      onAdd({
        name: getValues("name"),
        isRequired: getValues("isRequired"),
        maxQty: Number(String(getValues("maxQty"))),
        minQty: Number(String(getValues("minQty"))),
        choices: getValues("choices").map((item) => ({
          ...item,
          price: Number(item.price),
          discountPrice: Number(item.discountPrice),
        })),
      })
    }
    onClose()
  }

  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  useEffect(() => {
    if (!currentOption) {
      setValue("name", "")
      setValue("choices", [
        {
          name: "",
          price: "",
          discountPrice: "",
        },
      ])
      setValue("isRequired", false)
      setValue("maxQty", "")
    }
  }, [isVisible])

  useEffect(() => {
    if (!watch("isRequired") && isRequiredVisible) {
      setValue("minQty", "0", { shouldValidate: true })
    } else if (!Number(watch("minQty"))) {
      setValue("minQty", "", { shouldValidate: true })
    }
    if (watch("isRequired") && isRequiredVisible) {
      setValue("minQty", "1", { shouldValidate: true })
    }
  }, [isVisible, isRequiredVisible])

  useEffect(() => {
    if (isVisible && currentOption) {
      reset(currentOption)
      setRequiredVisible(true)
    }
    if (!isVisible) {
      setRequiredVisible(false)
    }
  }, [isVisible])

  useEffect(() => {
    if (!watch("isRequired") && isRequiredVisible) {
      setValue("minQty", "0", { shouldValidate: true })
    } else if (!Number(watch("minQty"))) {
      setValue("minQty", "", { shouldValidate: true })
    }
    if (watch("isRequired") && isRequiredVisible) {
      setValue("minQty", "1", { shouldValidate: true })
    }
  }, [watch("isRequired"), isRequiredVisible])

  useEffect(() => {
    trigger("maxQty")
    trigger("minQty")
  }, [watch("choices")])

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      className="m-0"
      style={{ paddingTop: insets.top }}
    >
      <DmView
        className="bg-white flex-1 rounded-t-10"
        style={{
          paddingBottom:
            insets.bottom > 45 ? insets.bottom - (insets.bottom - 45) : 45,
        }}
      >
        <DmView className="flex-1">
          <DmView className="mt-[23] px-[14] pr-[18] flex-row items-center justify-between">
            <DmView onPress={onClose} hitSlop={HIT_SLOP_DEFAULT}>
              <CloseIcon />
            </DmView>
            <DmView
              onPress={currentOption ? handleDeleteOption : undefined}
              hitSlop={HIT_SLOP_DEFAULT}
            >
              {!!currentOption && <TrashIcon />}
              {!currentOption && (
                <DmText className="text-11 leading-[14px] font-custom500 text-red">
                  {t("need_help")}
                </DmText>
              )}
            </DmView>
          </DmView>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-between",
            }}
          >
            <DmView className="flex-1">
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DmView className="mt-[20]">
                    <DmAuthInput
                      placeholder={t("examples_are_protein_descr")}
                      label={t("option_name")}
                      value={value}
                      editable={!currentOption}
                      wrapperClassName="ml-[14]"
                      containerClassName="mr-[14.5]"
                      inputClassName={clsx(
                        "h-[50]",
                        currentOption && "text-16 leading-[19px]"
                      )}
                      onChangeText={onChange}
                      isBorderVisible={!currentOption}
                      translateYStartPos={7}
                    />
                  </DmView>
                )}
                name="name"
              />
              <Controller
                control={control}
                render={({ field: { value } }) => (
                  <DmView
                    className={clsx(
                      "px-[14] py-[24] flex-row items-center border-b-0.5 border-grey1",
                      currentOption && "mt-[16]"
                    )}
                  >
                    <DmText className="text-11 leading-[14] font-custom700">
                      {t("required")}?
                    </DmText>
                    <DmView className="ml-[10] items-center flex-row">
                      <DmChecbox
                        title={t("yes")}
                        isChecked={value && isRequiredVisible}
                        textClassName="text-13 leading-[16px] font-custom400"
                        onPress={() => {
                          handleChangeMustChoose(true)
                        }}
                      />
                      <DmChecbox
                        className="ml-[30]"
                        title={t("no_its_optional")}
                        isChecked={!value && isRequiredVisible}
                        textClassName="text-13 leading-[16px] font-custom400"
                        onPress={() => handleChangeMustChoose(false)}
                      />
                    </DmView>
                  </DmView>
                )}
                name="isRequired"
              />
              <DmView className="mt-[20] mr-[12] flex-row border-b-0.5 border-grey1">
                <Controller
                  rules={{
                    required: true,
                    validate: {
                      function: (value, formValues) => {
                        if (
                          Number(formValues.choices?.length) < Number(value)
                        ) {
                          return false || value == 0
                        }

                        return true
                      },
                    },
                  }}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DmView className="flex-1">
                      <DmAuthInput
                        placeholder={t("enter_minimum_qty")}
                        keyboardType="numeric"
                        label={t("minimum_qty")}
                        allTextAlign="center"
                        editable={watch("isRequired") || !isRequiredVisible}
                        value={value.toString()}
                        wrapperClassName="ml-[14]"
                        containerClassName="mr-[14.5]"
                        inputClassName="h-[50] text-11 leading-[14px]"
                        placeholderClassName="text-11 leading-[14px]"
                        onChangeText={(val) => {
                          onChange(val)
                          trigger("minQty")
                          trigger("maxQty")
                        }}
                        isBorderVisible={false}
                        error={errors.minQty?.type || ""}
                        placeholderSize={11}
                        translateYStartPos={7}
                        onlyTextError
                      />
                    </DmView>
                  )}
                  name="minQty"
                />
                <Controller
                  rules={{
                    required: true,
                    validate: {
                      function: (value, formValues) => {
                        if (
                          Number(formValues.choices?.length) < Number(value)
                        ) {
                          return false || value == 0
                        }

                        return Number(value) >= Number(formValues.minQty)
                      },
                    },
                  }}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DmView className="flex-1">
                      <DmAuthInput
                        placeholder={t("enter_maximum_qty")}
                        placeholderClassName="text-11 leading-[14px]"
                        keyboardType="numeric"
                        label={t("maximum_qty")}
                        value={value.toString()}
                        inputClassName="h-[50] text-11 leading-[16px]"
                        allTextAlign="center"
                        onChangeText={(val) => {
                          onChange(val)
                          trigger("maxQty")
                        }}
                        error={errors.maxQty?.type || ""}
                        containerClassName="mr-[14.5]"
                        isBorderVisible={false}
                        placeholderSize={11}
                        onlyTextError
                        translateYStartPos={7}
                      />
                    </DmView>
                  )}
                  name="maxQty"
                />
              </DmView>
              <DmView>
                {fields.map((item, idx) => {
                  return (
                    <DmView
                      key={item.id}
                      className="mt-[20] mr-[16] flex-row border-b-0.5 border-grey1 items-center"
                    >
                      <Controller
                        rules={{ required: true }}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <DmView className="flex-1">
                            <DmView className="w-[140]">
                              <DmAuthInput
                                placeholder={t("enter_option_name")}
                                label={t("item_name")}
                                value={value}
                                wrapperClassName="ml-[14]"
                                containerClassName="mr-[14.5]"
                                inputClassName="h-[50] text-11 text-12 leading-[16px]"
                                onChangeText={onChange}
                                placeholderClassName="text-11 leading-[14px]"
                                isBorderVisible={false}
                                placeholderSize={11}
                                translateYStartPos={7}
                                style={{ textAlign: "auto" }}
                              />
                            </DmView>
                          </DmView>
                        )}
                        name={`choices.${idx}.name`}
                      />
                      <DmView className="flex-[1.3] flex-row">
                        <Controller
                          rules={{ required: true }}
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <DmView className="flex-1">
                              <DmAuthInput
                                placeholder={t("enter_price")}
                                label={t("price_EGP")}
                                keyboardType="numeric"
                                value={value.toString()}
                                placeholderClassName="text-11 leading-[14px]"
                                containerClassName="mr-[14.5]"
                                inputClassName="h-[50] text-11 leading-[16px]"
                                allTextAlign="center"
                                onChangeText={onChange}
                                translateYStartPos={7}
                                placeholderSize={11}
                                isBorderVisible={false}
                              />
                            </DmView>
                          )}
                          name={`choices.${idx}.price`}
                        />
                        <Controller
                          rules={{ required: true }}
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <DmView className="flex-1">
                              <DmAuthInput
                                placeholder={t("enter_price")}
                                label={t("sale_price")}
                                value={value?.toString()}
                                inputClassName="h-[50] text-11 leading-[16px]"
                                allTextAlign="center"
                                translateYStartPos={7}
                                onChangeText={onChange}
                                placeholderClassName="text-11 leading-[14px]"
                                placeholderSize={11}
                                keyboardType="numeric"
                                isBorderVisible={false}
                              />
                            </DmView>
                          )}
                          name={`choices.${idx}.discountPrice`}
                        />
                      </DmView>
                      {watch("choices").length > 1 && (
                        <DmView
                          className="mt-[-16]"
                          onPress={() => handleDeleteItem(idx)}
                        >
                          <TrashIcon />
                        </DmView>
                      )}
                    </DmView>
                  )
                })}
              </DmView>
              <AddPlusTitleComponent
                title={t("add_options")}
                className="py-[21.5] mr-[14.5]"
                onPress={handleAdd}
              />
            </DmView>
            <DmView className="px-[20] pt-[14]">
              <ActionBtn
                title={t("save")}
                className="rounded-5 h-[47]"
                disable={!isValid || !isRequiredVisible}
                onPress={() => handleSubmit(onSubmit)()}
                textClassName="text-13 leading-[16px] font-custom600"
              />
            </DmView>
          </KeyboardAwareScrollView>
        </DmView>
      </DmView>
    </Modal>
  )
}

export default CreateFoodMenuOptionModal

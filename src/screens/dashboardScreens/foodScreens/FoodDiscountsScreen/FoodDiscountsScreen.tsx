import React, { useEffect, useMemo, useState } from "react"

// Components
import { ActionBtn, DmChecbox, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Controller, useForm } from "react-hook-form"
import HeaderOnboarding from "components/HeaderOnboarding"
import InputInsideText from "components/InputInsideText"
import { usePatchProsServiceCategoriesFoodDiscountsMutation } from "services/api"
import { DiscountsConfigType } from "services"

type Props = RootStackScreenProps<"food-discounts">

const FoodDiscountsScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { service } = route.params
  // State
  const [isLoading, setLoading] = useState(false)
  const [freeDeliveruValue, setFreeDeliveryValue] = useState("")

  const [isDiscountChecked, setDiscoutChecked] = useState(
    !!(
      service.menu !== null &&
      service.menu.totalOrderValueDiscountThreshold &&
      service.menu.totalOrderValueDiscountRate
    )
  )
  const [isDeliveryChecked, setDeliveryChecked] = useState(
    !!(service.menu !== null && service.menu.freeDeliveryThreshold)
  )

  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      totalValue: "",
      discount: "",
    },
  })
  // Global Store
  // Variables
  const [patchDiscounts] = usePatchProsServiceCategoriesFoodDiscountsMutation()

  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const isDisable = () => {
    if (freeDeliveruValue && isDiscountChecked) {
      if (freeDeliveruValue && watch("discount") && watch("totalValue")) {
        return false
      }
      return true
    }
    if (isDeliveryChecked) {
      if (freeDeliveruValue) {
        return false
      }
      return true
    }

    if (isDiscountChecked) {
      if (watch("discount") && watch("totalValue")) {
        return false
      }
      return true
    }
    return false
  }
  // Refs
  // Methods
  // Handlers
  const handleChangePercents = (val: string) => {
    if (Number(val) <= 100) {
      setValue("discount", val, { shouldValidate: true, shouldTouch: true })
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const obj: DiscountsConfigType = {}
      if (isDeliveryChecked) {
        obj.freeDeliveryThreshold = Number(freeDeliveruValue)
      } else {
        obj.freeDeliveryThreshold = null
      }

      if (isDiscountChecked) {
        obj.totalOrderValueDiscountRate = Number(getValues("discount"))
        obj.totalOrderValueDiscountThreshold = Number(getValues("totalValue"))
      } else {
        obj.totalOrderValueDiscountRate = null
        obj.totalOrderValueDiscountThreshold = null
      }
      const res = await patchDiscounts({
        serviceId: service.serviceCategory.id,
        discountsConfig: obj,
      }).unwrap()
      navigation.navigate("service-setup-food", { service: res })
    } catch (e) {
      console.log("Patch Discounts Error: ", e)
    } finally {
      setLoading(false)
    }
  }
  // Hooks
  useEffect(() => {
    if (
      service.menu !== null &&
      service.menu.totalOrderValueDiscountThreshold &&
      service.menu.totalOrderValueDiscountRate
    ) {
      setValue(
        "totalValue",
        service.menu?.totalOrderValueDiscountThreshold?.toString() || "",
        { shouldValidate: true, shouldDirty: false, shouldTouch: false }
      )
      setValue(
        "discount",
        service.menu?.totalOrderValueDiscountRate?.toString() || "",
        { shouldValidate: true, shouldDirty: false, shouldTouch: false }
      )
    }
    if (service.menu !== null && service.menu.freeDeliveryThreshold) {
      setDeliveryChecked(true)
      setFreeDeliveryValue(
        service.menu?.freeDeliveryThreshold?.toString() || ""
      )
    }
  }, [])

  useEffect(() => {
    if (watch("discount") && watch("totalValue")) {
      setDiscoutChecked(true)
    }

    if (freeDeliveruValue) {
      setDeliveryChecked(true)
    }
  }, [watch("discount"), watch("totalValue"), freeDeliveruValue])

  useEffect(() => {
    if (!isDeliveryChecked) {
      setFreeDeliveryValue("")
    }

    if (!isDiscountChecked) {
      setValue("discount", "")
      setValue("totalValue", "")
    }
  }, [isDeliveryChecked, isDiscountChecked])
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <KeyboardAwareScrollView
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderOnboarding
          title={service.serviceCategory.name}
          isChevron
          className="px-[12]"
        />
        <DmText className="mx-[20] mt-[20] text-16 leading-[19px] font-custom600">
          {t("what_discount_you_offer")}
        </DmText>
        <DmView className="mt-[27] px-[14]">
          <DmChecbox
            title={t("discount_on_total_order_value")}
            variant="square"
            textClassName="text-14 leading-[18px] font-custom600 flex-1"
            onPress={() => setDiscoutChecked((prev) => !prev)}
            isChecked={isDiscountChecked}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <InputInsideText
                className="mt-[10]"
                title={t("if_the_total_order_value_is")}
                value={value}
                onChangeText={onChange}
                returnKeyType="done"
                subTitleComponent={
                  <DmText className="text-13 leading-[16px] font-custom600">
                    {" "}
                    {t("EGP")}{" "}
                    <DmText className="text-13 leading-[16px] font-custom400">
                      {t("or_more")}
                    </DmText>
                  </DmText>
                }
              />
            )}
            name="totalValue"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <InputInsideText
                className="mt-[10]"
                title={t("the_discount_rate_is")}
                returnKeyType="done"
                value={value}
                onChangeText={(val) => handleChangePercents(val)}
                subTitleComponent={
                  <DmText className="text-13 leading-[16px] font-custom600">
                    {" "}
                    %
                  </DmText>
                }
              />
            )}
            name="discount"
          />
          <DmChecbox
            title={t("free_delivery")}
            variant="square"
            className="mt-[42.5]"
            textClassName="text-14 leading-[18px] font-custom600 flex-1"
            onPress={() => setDeliveryChecked((prev) => !prev)}
            isChecked={isDeliveryChecked}
          />
          <InputInsideText
            className="mt-[10]"
            title={t("if_the_total_order_value_is")}
            returnKeyType="done"
            value={freeDeliveruValue}
            onChangeText={setFreeDeliveryValue}
            subTitleComponent={
              <DmText className="text-13 leading-[16px] font-custom600">
                {" "}
                {t("EGP")}{" "}
                <DmText className="text-13 leading-[16px] font-custom400">
                  {t("or_more")}
                </DmText>
              </DmText>
            }
          />
        </DmView>
      </KeyboardAwareScrollView>
      <ActionBtn
        className="mx-[20] rounded-5"
        title={t("save")}
        textClassName="text-13 leading-[16px] font-custom500"
        onPress={handleSubmit}
        isLoading={isLoading}
        disable={isLoading || isDisable()}
      />
    </SafeAreaView>
  )
}

export default FoodDiscountsScreen

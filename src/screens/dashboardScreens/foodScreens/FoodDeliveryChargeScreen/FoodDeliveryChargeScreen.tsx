import React, { useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import InputInsideText from "components/InputInsideText"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { usePatchProsServiceCategoriesFoodDeliveryChargeMutation } from "services/api"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"

type Props = RootStackScreenProps<"food-delivery-charge">

const FoodDeliveryChargeScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { service } = route.params
  // State
  const [inputValue, setInputValue] = useState(
    service.menu?.deliveryCharge !== null
      ? service.menu?.deliveryCharge.toString()
      : ""
  )
  const [isLoading, setLoading] = useState(false)
  // Global Store
  // Variables
  const [patchDeliveryCharge] =
    usePatchProsServiceCategoriesFoodDeliveryChargeMutation()

  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = await patchDeliveryCharge({
        serviceId: service.serviceCategory.id,
        deliveryCharge: Number(inputValue),
      }).unwrap()
      navigation.navigate("service-setup-food", { service: res })
    } catch (e) {
      console.log("Patch Delivery Charge Error: ", e)
    } finally {
      setLoading(false)
    }
  }
  // Hooks
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
          className="px-[12]"
          isChevron
          title={t("pickup_and_delivery")}
        />
        <InputInsideText
          className="mt-[38] px-[20]"
          title={t("the_delivery_charge_is")}
          descr={t("enter_number_if_you_are_offering_free_delivery", {
            number: 0,
          })}
          value={inputValue}
          returnKeyType="done"
          onChangeText={setInputValue}
        />
      </KeyboardAwareScrollView>
      {!!inputValue && (
        <ActionBtn
          className="mx-[20] rounded-5"
          title={t("save")}
          textClassName="text-13 leading-[16px] font-custom500"
          onPress={handleSubmit}
          isLoading={isLoading}
          disable={isLoading}
        />
      )}
    </SafeAreaView>
  )
}

export default FoodDeliveryChargeScreen

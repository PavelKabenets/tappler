import React from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import MyServiceDetailItem from "components/MyServiceDetailItem"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import FoodIcon from "assets/icons/food-categories.svg"
import MenuIcon from "assets/icons/menu.svg"
import DeliveryIcon from "assets/icons/delivery.svg"
import DiscountsIcon from "assets/icons/discount.svg"

type Props = RootStackScreenProps<"service-setup-food">

const ServiceSetupFoodScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { service } = route.params

  // State
  // Global Store
  // Variables
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleGoFoodCategory = () => {
    navigation.navigate("food-category", { service })
  }

  const handleGoFoodMenu = () => {
    navigation.navigate("food-menu", { service })
  }

  const handleGoDeliveryChargeScreen = () => {
    navigation.navigate("food-delivery-charge", { service })
  }

  const handleGoDiscountsScreen = () => {
    navigation.navigate("food-discounts", { service })
  }

  const handleGoBack = () => {
    navigation.navigate("my-services-detail", { service })
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={t("service_setup")}
        isChevron
        className="px-[12]"
        onGoBackPress={handleGoBack}
      />
      <DmView className="mt-[20]">
        <MyServiceDetailItem
          title={t("food_category")}
          descr={t("choose_the_food_category_for_your_food_menu")}
          Icon={<FoodIcon />}
          titleBtn={t("incomplete")}
          onPress={handleGoFoodCategory}
          isDoneIconVisible={!!service.menu?.foodCategories.length}
        />
        <MyServiceDetailItem
          title={t("food_menu")}
          descr={t("food_items_that_you_offer_to_your_customers")}
          Icon={<MenuIcon />}
          titleBtn={t("incomplete")}
          onPress={handleGoFoodMenu}
          isDoneIconVisible={!!service.menu?.menuSections?.length}
        />
        <MyServiceDetailItem
          title={t("delivery_charge")}
          descr={t("food_items_that_you_offer_to_your_customers")}
          Icon={<DeliveryIcon />}
          titleBtn={t("incomplete")}
          onPress={handleGoDeliveryChargeScreen}
          isDoneIconVisible={
            service.menu?.deliveryCharge !== null &&
            !Number.isNaN(Number(service.menu?.deliveryCharge))
          }
        />
        <MyServiceDetailItem
          title={t("discounts")}
          descr={t("if_you_are_offering_discounts_descr")}
          Icon={<DiscountsIcon />}
          subTitle={`(${t("optional")})`}
          btnVariant="white"
          classNameBtn="border-red"
          onPress={handleGoDiscountsScreen}
        />
      </DmView>
    </SafeAreaView>
  )
}

export default ServiceSetupFoodScreen

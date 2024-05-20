import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmChecbox, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import Slider from "@react-native-community/slider"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import HeaderOnboarding from "components/HeaderOnboarding"
import { PlaceOfServiceType } from "types"
import MapView, { Circle } from "react-native-maps"
import { useTypedSelector } from "store"
import { SCREEN_WIDTH, hexToRGBA } from "helpers/helpers"
import colors from "styles/colors"
import Animated, {
  FlipInEasyY,
  SlideInDown,
  SlideInUp,
} from "react-native-reanimated"

type Props = RootStackScreenProps<"delivery-radius">

const DeliveryRadiusScreen: React.FC<Props> = ({ route, navigation }) => {
  const { placeOfService, service } = route.params
  // Props
  // State
  const [sliderValue, setSliderValue] = useState(
    placeOfService?.deliveryRadius || 10
  )
  const [isChecked, setChecked] = useState(false)
  // Global Store
  const { user } = useTypedSelector((store) => store.auth)
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const hanldeGoBack = () => {
    navigation.navigate("place-of-services", { service, placeOfService })
  }

  const handleSliderChangeValue = (val: number) => {
    if (val === 101) {
      setSliderValue(999)
    } else {
      setSliderValue(val)
    }
    if (!isChecked) {
      setChecked(true)
    }
    if (val === 0) {
      setChecked(false)
    }
  }

  const toggleCheck = () => {
    setChecked((prev) => !prev)
  }

  const hadnleSubmit = () => {
    const res = { ...placeOfService, deliveryRadius: sliderValue }
    navigation.navigate("place-of-services", { service, placeOfService: res })
  }
  // Hooks
  useEffect(() => {
    if (placeOfService?.deliveryRadius) {
      setSliderValue(placeOfService.deliveryRadius)
      setChecked(true)
    }
  }, [])
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <DmView>
        <HeaderOnboarding
          title={t("place_of_service")}
          className="px-[14]"
          isChevron
          onGoBackPress={hanldeGoBack}
        />
        <DmView className="h-[171]">
          <MapView
            className="flex-1"
            provider="google"
            initialRegion={{
              latitude:
                placeOfService?.pickupAddress?.latitude ||
                user?.address?.latitude ||
                0,
              longitude:
                placeOfService?.pickupAddress?.longitude ||
                user?.address?.longitude ||
                0,
              latitudeDelta: 0.0922 / 0.1,
              longitudeDelta: 0.0421 / 0.1,
            }}
          >
            <Circle
              center={{
                latitude:
                  placeOfService?.pickupAddress?.latitude ||
                  user?.address?.latitude ||
                  0,
                longitude:
                  placeOfService?.pickupAddress?.longitude ||
                  user?.address?.longitude ||
                  0,
              }}
              radius={1000 * sliderValue}
              fillColor="rgba(255, 0, 0, 0.2)"
              strokeColor="rgba(255, 0, 0, 0.2)"
              strokeWidth={2}
            />
          </MapView>
        </DmView>
        <DmView className="mt-[13]">
          <DmText className="text-13 leading-[16px] font-custom600 text-center">
            {t("your_location")}:{" "}
            <DmText className="text-13 leading-[16px] font-custom400">
              {placeOfService?.pickupAddress?.city || user?.address?.city}
            </DmText>
          </DmText>
          <DmText className="mt-[20] mx-[11] text-18 leading-[25px] font-custom600">
            {t("place_of_service")}
          </DmText>
          <DmChecbox
            variant="square"
            className="mt-[11] px-[14]"
            onPress={toggleCheck}
            isChecked={isChecked}
          >
            <DmText className="flex-1 text-13 leading-[16px] font-custom400">
              {t("i_provide_my_service_within")}
              <DmText className="text-13 leading-[16px] font-custom600 text-red">
                {" "}
                {sliderValue !== 101 && sliderValue !== 999
                  ? sliderValue
                  : t("no_limit")}{" "}
              </DmText>
              {t("km_of_my_location")}
            </DmText>
          </DmChecbox>
          <DmView className="mt-[14] items-center">
            <Slider
              style={styles.slider}
              minimumValue={1}
              step={1}
              value={sliderValue}
              onValueChange={handleSliderChangeValue}
              maximumValue={101}
              minimumTrackTintColor={
                !isChecked ? hexToRGBA(colors.red, 0.4) : colors.red
              }
              maximumTrackTintColor={colors.grey25}
            />
          </DmView>
        </DmView>
      </DmView>
      {isChecked && (
        <ActionBtn
          title={t("save")}
          className="mx-[20] rounded-5"
          onPress={hadnleSubmit}
        />
      )}
    </SafeAreaView>
  )
}

export default DeliveryRadiusScreen

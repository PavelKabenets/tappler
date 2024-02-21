import React, { useRef, useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import Carousel from "react-native-reanimated-carousel"
import Dots from "react-native-dots-pagination"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "helpers/helpers"
import { featuresCarouselData } from "data/featuresData"
import { FeaturesCarouselItemType } from "types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import colors from "styles/colors"

type Props = RootStackScreenProps<"features">

const FeaturesScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [active, setActive] = useState(0)

  const carouselRef = useRef<any>(null)
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleGoAuth = () => {
    navigation.navigate("auth")
  }
  const handlePressNext = () => {
    if (carouselIndex < 2) {
      setCarouselIndex((prev) => prev + 1)
    } else {
      handleGoAuth()
      setCarouselIndex(0)
    }
    carouselRef?.current?.next()
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderCarouselItem = ({ item }: { item: FeaturesCarouselItemType }) => {
    return (
      <DmView className="justify-between flex-1">
        <DmView>
          <DmView onPress={handleGoAuth}>
            <DmText className="text-right mr-[42] text-13 text-red font-custom600">
              {t("skip")}
            </DmText>
          </DmView>
          <DmView className="mt-[20]">
            {/* @TO DO */}
            {!item.img && <DmView style={styles.emptyImg} />}
          </DmView>
          <DmView className="px-[25]">
            <DmText className="text-center font-custom600 text-25">
              {t(item.title)}
            </DmText>
            <DmText className="mt-[11] font-custom400 text-13 text-center">
              {t(item.description)}
            </DmText>
          </DmView>
        </DmView>
        <DmView className="px-[30]">
          <Dots
            length={3}
            active={active}
            passiveDotWidth={10}
            passiveDotHeight={10}
            activeDotWidth={10}
            activeDotHeight={10}
            marginHorizontal={7.5}
            activeColor={colors.red}
            passiveColor={colors.grey1}
          />
          <ActionBtn
            title={carouselIndex === 2 ? t("start_using_tappler") : t("next")}
            className="mt-[15] rounded-15"
            onPress={handlePressNext}
          />
        </DmView>
      </DmView>
    )
  }

  return (
    <SafeAreaView className="flex-1 pt-[14] bg-white">
      <Carousel
        ref={carouselRef}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT - insets.top - insets.bottom - 48}
        data={featuresCarouselData}
        renderItem={renderCarouselItem}
        onProgressChange={(val) =>
          setActive(Math.ceil(Math.abs(Math.ceil(val)) / SCREEN_WIDTH))
        }
        enabled={false}
      />
    </SafeAreaView>
  )
}

export default FeaturesScreen

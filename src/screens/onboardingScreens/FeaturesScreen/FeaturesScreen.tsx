import React, { useEffect, useLayoutEffect, useRef, useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import Carousel from "react-native-reanimated-carousel"
import Dots from "react-native-dots-pagination"
import { I18nManager, Image, Platform } from "react-native"

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
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"

type Props = RootStackScreenProps<"features">

const FeaturesScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    if (I18nManager.isRTL) {
      setCarouselIndex(2)
      setActive(2)
    }
  }, [I18nManager.isRTL])

  const carouselRef = useRef<any>(null)
  // Global Store
  // Variables
  const { t, i18n } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleGoAuth = () => {
    navigation.navigate("auth")
  }

  useEffect(() => {
    if (I18nManager.isRTL) {
      carouselRef.current?.next({ count: 2, animated: false })
    }
  }, [I18nManager])

  const handlePressNext = () => {
    if (
      (carouselIndex !== 2 && !I18nManager.isRTL) ||
      (I18nManager.isRTL && carouselIndex !== 0)
    ) {
      if (!I18nManager.isRTL) {
        carouselRef?.current?.next()
      } else {
        carouselRef?.current?.prev()
      }
    } else {
      handleGoAuth()
    }
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderCarouselItem = ({ item }: { item: FeaturesCarouselItemType }) => {
    return (
      <DmView className={clsx("justify-between flex-1")}>
        <DmView>
          <DmView
            className={clsx("mt-[20]", i18n.language === "ar" && "mt-[10]")}
          >
            {item.img && <Image source={item.img} style={styles.img} />}
            {!item.img && <DmView style={styles.emptyImg} />}
          </DmView>
          <DmView className="px-[25]">
            <DmText className="text-center font-custom600 text-25 leading-[30px]">
              {t(item.title)}
            </DmText>
            <DmText
              className={clsx(
                "mt-[11] font-custom400 text-13 text-center leading-[22px]",
                i18n.language === "ar" && "mt-[0]"
              )}
            >
              {t(item.description)}
            </DmText>
          </DmView>
        </DmView>
      </DmView>
    )
  }

  return (
    <SafeAreaView className="flex-1 pt-[14] pb-[45] bg-white justify-between">
      <DmView onPress={handleGoAuth} hitSlop={HIT_SLOP_DEFAULT}>
        <DmText className="text-right mr-[42] text-13 text-red font-custom600">
          {t("skip")}
        </DmText>
      </DmView>
      <DmView className="mt-[14] flex-1">
        <Carousel
          loop={false}
          ref={carouselRef}
          width={SCREEN_WIDTH}
          data={
            I18nManager.isRTL
              ? featuresCarouselData.map((item) => item).reverse()
              : featuresCarouselData
          }
          renderItem={renderCarouselItem}
          onProgressChange={(val) => {
            setActive(Math.round(Math.abs(val) / SCREEN_WIDTH))
            setCarouselIndex(Math.round(Math.abs(val) / SCREEN_WIDTH))
          }}
        />
      </DmView>
      <DmView className="px-[30]">
        <DmView className={I18nManager.isRTL ? " scale-x-[-1]" : ""}>
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
        </DmView>
        <ActionBtn
          title={
            (carouselIndex > 1 && !I18nManager.isRTL) ||
            (I18nManager.isRTL && carouselIndex < 1)
              ? t("start_using_tappler")
              : t("next")
          }
          className={clsx("mt-[15] h-[47] rounded-15")}
          onPress={handlePressNext}
        />
      </DmView>
    </SafeAreaView>
  )
}

export default FeaturesScreen

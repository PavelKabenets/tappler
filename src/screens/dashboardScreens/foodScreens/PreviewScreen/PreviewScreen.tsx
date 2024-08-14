import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmChecbox, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Shadow } from "react-native-shadow-2"
import {
  Dimensions,
  FlatList,
  I18nManager,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native"
// Hooks & Redux
import { useTranslation } from "react-i18next"
import { Controller, useFieldArray, useForm } from "react-hook-form"
// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { FoodOptionChoiceType, FoodOptionType, MenuSectionType } from "types"
import { hexToRGBA } from "helpers/helpers"
// Libs & Utils
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"
// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import colors from "styles/colors"
import CloseIcon from "assets/icons/close.svg"
import PlusIcon from "assets/icons/plus.svg"
import MinusIcon from "assets/icons/minus.svg"

type Props = RootStackScreenProps<"preview">

type FormValuesType = {
  menuOptions?: FoodOptionType[]
}

const PreviewScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { menuItem } = route.params
  // State
  const { control, setValue, watch } = useForm<FormValuesType>()
  const [count, setCount] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const [isAnyOptionSelected, setIsAnyOptionSelected] = useState(false)
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const scrollY = useSharedValue(0)
  const { width: screenWidth } = Dimensions.get("window")
  // Refs
  // Methods
  const calculateTotalPrice = () => {
    const selectedOptions = watch("menuOptions") || []

    const endPrice = selectedOptions.reduce((sum, option) => {
      option.choices.forEach((choice) => {
        sum += Number(choice.discountPrice) || Number(choice.price) || 0
      })
      return sum
    }, 0)

    setTotalPrice(endPrice)
  }
  const updateIsAnyOptionSelected = () => {
    const selectedOptions = watch("menuOptions") || []
    setIsAnyOptionSelected(selectedOptions.length > 0)
  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      calculateTotalPrice()
      updateIsAnyOptionSelected()
    })
    return () => subscription.unsubscribe()
  }, [watch])
  // Handlers
  const handleIncrease = () => {
    if (count < 3) {
      setCount(count + 1)
    }
  }

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }
  const handleGoBack = () => {
    navigation.goBack()
  }
  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y
  }
  const animatedStyle = useAnimatedStyle(() => {
    const heightPersent = interpolate(scrollY.value, [240, 280], [0, 1])
    return {
      maxHeight: heightPersent <= 0 ? 0 : heightPersent * 100,
    }
  })
  // Hooks
  // Listeners
  // Render Methods
  const renderText = (min: number, max: number, isRequired: boolean) => {
    if (isRequired) {
      if (min !== max && min !== 0) {
        if (min === 1) {
          return t("choose_up_to_number", { number: max })
        } else {
          return t("choose_min_number_max_number1", {
            min,
            max,
          })
        }
      } else {
        return t("choose_number", { number: max })
      }
    } else {
      if (max > 1) {
        return t("choose_up_to_number", { number: max })
      } else {
        return t("choose_number", { number: max })
      }
    }
  }

  const renderListItem = ({ item }: { item: FoodOptionType }) => {
    const handlePressItem = (
      mItem: FoodOptionChoiceType,
      min: number,
      max: number
    ) => {
      const currentData = watch("menuOptions")?.filter(
        (fItem) => fItem.id === item.id
      ).length
        ? watch("menuOptions")?.filter((fItem) => fItem.id === item.id)[0]
        : undefined
      if (
        !watch("menuOptions")
          ?.map((item) => item.id)
          .flat()
          .includes(item.id)
      ) {
        const newData = [
          ...watch("menuOptions") || [],
          { ...item, choices: [...currentData?.choices || [], mItem] },
        ]
        setValue("menuOptions", newData, {
          shouldValidate: true,
          shouldTouch: true,
        })
      } else {
        const newData = [
          ...watch("menuOptions")?.map((mapItem) => {
            if (mapItem.id === currentData?.id) {
              if (mapItem.choices.length < max) {
                return {
                  ...item,
                  choices: currentData?.choices
                    .map((item) => item.id)
                    .includes(mItem.id)
                    ? currentData?.choices.filter(
                        (choiceItem) => choiceItem.id !== mItem.id
                      )
                    : [...currentData?.choices || [], mItem],
                }
              } else {
                return {
                  ...item,
                  choices: currentData?.choices
                    .map((item) => item.id)
                    .includes(mItem.id)
                    ? currentData?.choices.filter(
                        (choiceItem) => choiceItem.id !== mItem.id
                      )
                    : [
                        ...currentData?.choices.filter(
                          (_, idx) => idx !== 0
                        ) || [],
                        mItem,
                      ],
                }
              }
            }
            return mapItem
          }) || [],
        ]

        setValue("menuOptions", newData, {
          shouldValidate: true,
          shouldTouch: true,
        })
      }
      calculateTotalPrice()
    }

    return (
      <DmView className="mt-[16.5]">
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => (
            <>
              <DmView className="flex-row items-center justify-between">
                <DmText className="text-14 leading-[18px] font-custom600">
                  {item.name}
                </DmText>
                <DmView
                  className={clsx(
                    "py-[3] px-[15] rounded-14 bg-pink1",
                    !item.isRequired && "bg-grey36"
                  )}
                >
                  <DmText
                    className={clsx(
                      "text-11 leading-[16px] font-custom400 text-red",
                      !item.isRequired && "text-black"
                    )}
                  >
                    {t(item.isRequired ? "required" : "optional")}
                  </DmText>
                </DmView>
              </DmView>
              <DmText className="mt-[10] mb-[14] text-11 leading-[14px] font-custom400 text-grey2">
                {renderText(
                  Number(item.minQty),
                  Number(item.maxQty),
                  item.isRequired
                )}
              </DmText>
              {item.choices.map((mItem, idx) => {
                return (
                  <DmView
                    key={idx}
                    className={clsx(
                      "mt-[14] flex-row items-center justify-between",
                      idx === 0 && "mt-[0]"
                    )}
                  >
                    <DmText
                      className={clsx(
                        "flex-1 text-13 leading-[16px] font-custom400"
                      )}
                    >
                      {mItem.name}
                    </DmText>
                    <DmView className="flex-row items-center">
                      {!!mItem.price && (
                        <>
                          {!!mItem.discountPrice && (
                            <DmText className="mx-[10] text-13 leading-[16px] font-custom400 text-red">
                              + {mItem.discountPrice} {t("EGP")}
                            </DmText>
                          )}
                          <DmText
                            className={clsx(
                              "text-13 leading-[16px] font-custom400",
                              mItem.discountPrice && "line-through"
                            )}
                          >
                            + {mItem.price} {t("EGP")}
                          </DmText>
                        </>
                      )}
                      <DmChecbox
                        className="ml-[10]"
                        variant={Number(item.maxQty) > 1 ? "square" : "circle"}
                        isChecked={value
                          ?.map((item) => item.choices.map((item) => item.id))
                          .flat()
                          .includes(mItem.id)}
                        onPress={() =>
                          handlePressItem(
                            mItem,
                            item.minQty as number,
                            item.maxQty as number
                          )
                        }
                      />
                    </DmView>
                  </DmView>
                )
              })}
            </>
          )}
          name="menuOptions"
        />
      </DmView>
    )
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      edges={["bottom"]}
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <Animated.View
        style={[{ zIndex: 3 }, animatedStyle]}
        className="absolute w-full bg-white border-b-0.3 border-grey2 overflow-hidden"
      >
        <Animated.View
          style={[{ paddingTop: insets.top || 35 }]}
          className="pb-[20]"
        >
          <DmView className="flex-row items-center">
            <DmView className="justify-center px-[15] opacity-0">
              <DmView
                className="left-[3] w-[28] h-[28] rounded-full bg-white items-center justify-center"
                onPress={handleGoBack}
              >
                {<CloseIcon fill={colors.red} />}
              </DmView>
            </DmView>
            <DmView className="pt-[13]">
              <DmText className="text-14 leading-[18px] font-custom700">
                {t(menuItem.name)}
              </DmText>
            </DmView>
          </DmView>
        </Animated.View>
      </Animated.View>
      <DmView
        className="absolute mt-[10] left-[18] w-[28] h-[28] rounded-full bg-white items-center justify-center"
        style={{ top: insets.top || 35, zIndex: 10 }}
        onPress={handleGoBack}
      >
        {<CloseIcon fill={colors.red} />}
      </DmView>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 14 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <DmView>
          <ImageBackground
            className="justify-between pb-[4]"
            source={{ uri: menuItem?.photo || undefined }}
            style={{
              paddingTop: insets.top + 11,
              paddingHorizontal: 8,
              height: 286,
            }}
          />
        </DmView>
        <DmView className="px-[14]">
          <DmText className="text-18 leading-[22px] font-custom600 mt-[16]">
            {t(menuItem.name)}
          </DmText>
          <DmView className="mt-[8] flex-row items-center">
            {!!menuItem?.discountPrice && (
              <DmText className={clsx("text-18 leading-[22px] font-custom500")}>
                {menuItem?.discountPrice} {t("EGP")}
              </DmText>
            )}
            <DmText
              className={clsx(
                "text-18 leading-[22px] font-custom500",
                menuItem?.discountPrice &&
                  "ml-[17] text-grey2 font-custom400 line-through"
              )}
            >
              {menuItem.price} {t("EGP")}
            </DmText>
          </DmView>
          <DmText className="my-[8] text-13 leading-[20px] font-custom400">
            {menuItem.description}
          </DmText>
        </DmView>
        {menuItem.isPreOrderOnly && (
          <DmView className="flex-row items-center py-[9] px-[14] border-t-grey35 border-b-grey35 border-t-0.5 border-b-0.5">
            <ActionBtn
              title={t("pre_order")}
              className="h-[20] self-auto bg-red2 rounded-4"
              textClassName="text-11 leading-[14px] font-custom700 text-white"
            />
            <DmText className="flex-1 ml-[7] text-14 leading-[18px] font-custom600">
              {t("item_prepared_on_order_only")}
            </DmText>
          </DmView>
        )}
        <FlatList
          data={menuItem.options}
          renderItem={renderListItem}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 14 }}
        />
      </KeyboardAwareScrollView>
      <Shadow
        style={{ borderRadius: 1 }}
        distance={1}
        startColor={hexToRGBA(colors.grey51, 0.1)}
        offset={[0, -1]}
      >
        <DmView
          style={{ width: screenWidth }}
          className="bg-white px-[28] w-[400]"
        >
          <DmView className="mt-[24] flex-row items-center justify-center">
            <DmView
              onPress={count > 0 ? handleDecrease : undefined}
              className={clsx(
                "items-center justify-center w-[23] h-[23] border-1 rounded-full"
              )}
            >
              {<MinusIcon />}
            </DmView>
            <DmText className="px-[32] text-17 leading-[21px] font-custom700">
              {count}
            </DmText>
            <DmView
              onPress={count < 3 ? handleIncrease : undefined}
              className="items-center justify-center w-[23] h-[23] border-1 border-red rounded-full"
            >
              {<PlusIcon color={colors.red} />}
            </DmView>
          </DmView>
          <ActionBtn
            disable={count === 0 || !isAnyOptionSelected}
            title={t("add_to_cart_for_egp_count", {
              price: (totalPrice * count).toFixed(2),
            })}
            className="mt-[23] h-[41]"
            textClassName="text-13 leading-[16px] font-custom600"
          />
        </DmView>
      </Shadow>
    </SafeAreaView>
  )
}

export default PreviewScreen

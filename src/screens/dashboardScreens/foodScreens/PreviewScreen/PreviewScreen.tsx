import React from "react"

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
import { FlatList, I18nManager, ImageBackground } from "react-native"
import CloseIcon from "assets/icons/close.svg"
import colors from "styles/colors"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { FoodOptionType } from "types"

type Props = RootStackScreenProps<"preview">

const PreviewScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { menuItem } = route.params
  // State
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  // Hooks
  // Listeners
  // Render Methods
  const renderText = (min: number, max: number, isRequired: boolean) => {
    if (isRequired) {
      if (min <= 1) {
        return t("choose_up_to_number", { number: max })
      }
      if (min !== max) {
        return t("choose_min_number_max_number1", { number: min, number1: max })
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
    return (
      <DmView className="mt-[16.5]">
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
                className={clsx("flex-1 text-13 leading-[16px] font-custom400")}
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
                />
              </DmView>
            </DmView>
          )
        })}
      </DmView>
    )
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      edges={["bottom"]}
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 14 }}
      >
        <DmView>
          <ImageBackground
            className="justify-between pb-[4]"
            source={{ uri: menuItem?.photo || undefined }}
            resizeMode="stretch"
            style={{
              paddingTop: insets.top + 11,
              paddingHorizontal: 8,
              height: 286,
            }}
          >
            <DmView
              className={clsx(
                "w-[31] h-[31] bg-white rounded-full items-center justify-center",
                I18nManager.isRTL && "scale-x-[-1]"
              )}
              onPress={navigation.goBack}
            >
              <CloseIcon />
            </DmView>
          </ImageBackground>
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
    </SafeAreaView>
  )
}

export default PreviewScreen

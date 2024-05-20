import React, { useRef, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import HeaderOnboarding from "components/HeaderOnboarding"
import { FlatList } from "react-native-gesture-handler"
import { MenuItemType, MenuSectionType } from "types"
import { Shadow } from "react-native-shadow-2"
import { hexToRGBA } from "helpers/helpers"
import colors from "styles/colors"
import FoodMenuSectionMenuItem from "components/FoodMenuSectionMenuItem"
import { LayoutChangeEvent } from "react-native"
import { useTypedSelector } from "store"

type Props = RootStackScreenProps<"food-menu-store">

const FoodMenuStoreScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { service } = route.params
  // State
  const flatListRef = useRef<FlatList>(null)
  const { user } = useTypedSelector((store) => store.auth)
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleGoPreview = (item: MenuItemType) => {
    navigation.navigate("preview", { menuItem: item })
  }

  const handlePressHeaderFlatListItem = (idx: number) => {
    flatListRef.current?.scrollToIndex({ index: idx, animated: true })
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({
    item,
    index,
  }: {
    item: MenuSectionType
    index: number
  }) => {
    if (!item.menuItems.length) {
      return null
    }
    return (
      <DmView
        className="mx-[16]"
        onPress={() => handlePressHeaderFlatListItem(index)}
      >
        <DmText className="text-13 leading-[16px] font-custom500">
          {item.title}
        </DmText>
      </DmView>
    )
  }

  const renderMenuListItem = ({
    item,
    index,
  }: {
    item: MenuSectionType
    index: number
  }) => {
    if (!item.menuItems.length) {
      return null
    }
    return (
      <DmView className="mb-[36.5]">
        <DmText className="mb-[34] px-[14] text-20 leading-[24px] font-custom600">
          {item.title}
        </DmText>
        <DmView>
          {item.menuItems.map((mapItem) => {
            return (
              <FoodMenuSectionMenuItem
                key={mapItem.id}
                item={mapItem}
                onPress={
                  mapItem.inStock ? () => handleGoPreview(mapItem) : undefined
                }
                inStore
              />
            )
          })}
        </DmView>
      </DmView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <HeaderOnboarding
        className="px-[12] border-b-0.2"
        isChevron
        title={t("food_menu")}
        subTitle={user?.businessName}
        onGoBackPress={() => navigation.navigate("food-menu", { service })}
      />
      <DmView className="flex-1">
        <Shadow
          startColor={hexToRGBA(colors.grey4, 0.1)}
          style={{ width: "100%" }}
          distance={3}
          sides={{ bottom: true, start: false, end: false, top: false }}
        >
          <FlatList
            data={service.menu?.menuSections}
            renderItem={renderListItem}
            horizontal
            contentContainerStyle={{
              paddingVertical: 9,
              backgroundColor: colors.white,
            }}
          />
        </Shadow>
        <FlatList
          ref={flatListRef}
          data={service.menu?.menuSections}
          renderItem={renderMenuListItem}
          showsVerticalScrollIndicator={false}
          className="mt-[10]"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40 + insets.bottom,
          }}
        />
      </DmView>
    </SafeAreaView>
  )
}

export default FoodMenuStoreScreen

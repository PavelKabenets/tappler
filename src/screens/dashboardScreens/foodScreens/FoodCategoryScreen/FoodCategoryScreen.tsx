import React, { useState } from "react"

// Components
import { ActionBtn, DmChecbox, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { usePatchProsServiceCategoriesFoodCategoriesMutation } from "services/api"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import { FlatList } from "react-native"
import foodCategoriesData from "data/foodCategoriesData"

type Props = RootStackScreenProps<"food-category">

const FoodCategoryScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { service } = route.params
  // State
  const [isLoading, setLoading] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    service?.menu?.foodCategories.length ? service.menu.foodCategories : []
  )
  // Global Store
  // Variables
  const [patchCategories] =
    usePatchProsServiceCategoriesFoodCategoriesMutation()

  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = await patchCategories({
        serviceId: service.serviceCategory.id,
        foodCategories: selectedCategories,
      }).unwrap()
      navigation.navigate("service-setup-food", { service: res })
    } catch (e) {
      console.log("Patch Categories Error: ", e)
    } finally {
      setLoading(false)
    }
  }

  const handlePressItem = (item: string) => {
    if (selectedCategories.includes(item)) {
      return setSelectedCategories((prev) =>
        prev.filter((fItem) => fItem !== item)
      )
    }

    return setSelectedCategories((prev) => [...prev, item])
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <DmChecbox
        className={clsx(
          "pl-[16] py-[15] mr-[14] border-t-1 border-grey33",
          index === 0 && "border-t-0"
        )}
        onPress={() => handlePressItem(item)}
        title={t(item)}
        variant="square"
        isChecked={selectedCategories.includes(item)}
        textClassName="flex-1 text-13 leading-[16px] font-custom400"
      />
    )
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <DmView className="flex-1">
        <HeaderOnboarding
          title={t("food_category")}
          isChevron
          className="px-[12]"
        />
        <DmText className="mx-[14] mt-[20] text-16 leading-[25px] font-custom600">
          {t("choose_food_category_number", { number: 3 })}
        </DmText>
        <DmView className="flex-1 mt-[20]">
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={foodCategoriesData}
            renderItem={renderListItem}
            showsVerticalScrollIndicator={false}
          />
        </DmView>
      </DmView>
      <ActionBtn
        onPress={handleSubmit}
        title={t("save")}
        className="mx-[20] mt-[14] rounded-5"
        isLoading={isLoading}
        textClassName={clsx(
          "text-13 leading-[16px] font-custom500",
          (isLoading ||
            selectedCategories.length > 3 || !selectedCategories.length) &&
            "text-grey13"
        )}
        disable={
          isLoading ||
          selectedCategories.length > 3 || !selectedCategories.length
        }
      />
    </SafeAreaView>
  )
}

export default FoodCategoryScreen

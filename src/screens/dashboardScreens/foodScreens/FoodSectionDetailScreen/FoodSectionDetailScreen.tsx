import React, { useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import HeaderOnboarding from "components/HeaderOnboarding"
import { FlatList } from "react-native"
import { MenuItemType } from "types"
import FoodScreenEmptyComponent from "components/FoodScreenEmptyComponent"
import AddPlusTitleComponent from "components/AddPlusTitleComponent"
import CreateMenuSectionModal from "components/CreateMenuSectionModal"
import FoodBigIcon from "assets/icons/menu-section.svg"
import FoodMenuSectionMenuItem from "components/FoodMenuSectionMenuItem"
import FoodMenuItemOptionsModal from "components/FoodMenuItemOptionsModal"

type Props = RootStackScreenProps<"food-section-detail">

const FoodSectionDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { service, currentSection } = route.params
  // State
  const [isOptionModalVisible, setOptionModalVisible] = useState(false)
  const [targetItem, setTargetItem] = useState<MenuItemType>()
  // Global Store
  // Variables
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleCreateNewItem = () => {
    navigation.navigate("food-section-menu-detail", {
      service,
      menuItem: undefined,
      currentSection,
    })
  }

  const handleGoBack = () => {
    navigation.navigate("food-menu", { service })
  }

  const handleOpenOptionModal = (item: MenuItemType) => {
    setOptionModalVisible(true)
    setTargetItem(item)
  }

  const handleCloseOptionModal = () => {
    setOptionModalVisible(false)
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({ item }: { item: MenuItemType }) => {
    return (
      <FoodMenuSectionMenuItem item={item} onPress={handleOpenOptionModal} />
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={currentSection.title}
        isChevron
        className="px-[12]"
        onGoBackPress={handleGoBack}
      />
      <FlatList
        data={currentSection.menuItems}
        renderItem={renderListItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <FoodScreenEmptyComponent
            title={t("add_food_item")}
            descr={t("add_food_and_drink_items_to_this_section")}
            btnTitle={`+ ${t("add")}`}
            Icon={<FoodBigIcon />}
            onPress={handleCreateNewItem}
          />
        }
        ListFooterComponent={
          currentSection?.menuItems?.length ? (
            <AddPlusTitleComponent
              className="py-[27]"
              title={t("add_food_or_drink_item")}
              onPress={handleCreateNewItem}
            />
          ) : null
        }
      />
      {targetItem && (
        <FoodMenuItemOptionsModal
          isVisible={isOptionModalVisible}
          onClose={handleCloseOptionModal}
          item={targetItem}
          service={service}
          currentSection={currentSection}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  )
}

export default FoodSectionDetailScreen

import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import {
  TourGuideProvider, // Main provider
  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from "rn-tourguide"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import HeaderOnboarding from "components/HeaderOnboarding"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { FlatList } from "react-native"
import FoodScreenEmptyComponent from "components/FoodScreenEmptyComponent"
import CreateMenuSectionModal from "components/CreateMenuSectionModal"
import { MenuItemType, MenuSectionType } from "types"
import {
  useCreateProsMenuSectionMutation,
  useDeleteProsServicesCategoriesMenuSectionMutation,
} from "services/api"
import FoodMenuSectionsItem from "components/FoodMenuSectionsItem"
import AddPlusTitleComponent from "components/AddPlusTitleComponent"
import MenuBigIcon from "assets/icons/menu-big.svg"
import MainModal from "components/MainModal"
import { useIsFocused } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { setFoodMenuGuideShows } from "store/auth/slice"
import { useTypedSelector } from "store"

type Props = RootStackScreenProps<"food-menu">

const FoodMenuScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { service } = route.params
  // State
  const [currentService, setCurrentService] = useState(service)
  const [isCreateSectionModalVisible, setCreateSectionModalVisible] =
    useState(false)
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
  const [targetItem, setTargetItem] = useState<MenuSectionType>()
  const [isLoading, setLoading] = useState(false)
  const [isTourActive, setTourActive] = useState(false)
  // Global Store
  const { isFoodMenuGuideShows } = useTypedSelector((store) => store.auth)
  // Variables
  const { t } = useTranslation()
  const [createSection] = useCreateProsMenuSectionMutation()
  const [deleteSection] = useDeleteProsServicesCategoriesMenuSectionMutation()
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
  } = useTourGuideController()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleOpenCreateSectionModal = () => {
    setCreateSectionModalVisible(true)
  }

  const handleCloseCreateSectionModal = () => {
    setCreateSectionModalVisible(false)
  }

  const handleDelete = (item: MenuSectionType) => {
    setTargetItem(item)
    setDeleteModalVisible(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false)
  }

  const handleGoBack = () => {
    stop()
    navigation.navigate("service-setup-food", { service: currentService })
  }

  const onDelete = async () => {
    if (targetItem) {
      setLoading(true)
      try {
        const res = await deleteSection({
          serviceId: currentService.serviceCategory.id,
          sectionId: targetItem?.id,
        }).unwrap()
        setCurrentService(res)
        handleCloseDeleteModal()
      } catch (e) {
        console.log("Delete Section Error: ", e)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleCreateService = async (name: string) => {
    try {
      const res = await createSection({
        serviceId: currentService.serviceCategory.id,
        title: name,
      }).unwrap()
      setCurrentService((prev) => {
        return {
          ...prev,
          menu: res.menu,
        }
      })
    } catch (e) {
      console.log("Error Create Menu Service: ", e)
    } finally {
      handleCloseCreateSectionModal()
    }
  }

  const handlePressSection = (section: MenuSectionType) => {
    stop()
    navigation.navigate("food-section-detail", {
      service: currentService,
      currentSection: section,
    })
  }

  const handleGoMenuStoreScreen = () => {
    navigation.navigate("food-menu-store", { service: currentService })
  }
  // Hooks
  useEffect(() => {
    if (eventEmitter) {
      const handleOnStart = () => {
        setTourActive(true)
        dispatch(setFoodMenuGuideShows(true))
      }
      const handleOnStop = () => {
        setTourActive(false)
      }
      eventEmitter.on("start", handleOnStart)
      eventEmitter.on("stop", handleOnStop)

      return () => {
        eventEmitter.off("start", handleOnStart)
        eventEmitter.off("stop", handleOnStop)
      }
    }
  }, [])

  useEffect(() => {
    if (
      canStart &&
      currentService.menu?.menuSections.length === 1 &&
      currentService.menu.menuSections[0].menuItems.length === 0 &&
      !isFoodMenuGuideShows
    ) {
      start()
    }
  }, [canStart, currentService.menu?.menuSections.length])

  useEffect(() => {
    if (isFocused) {
      setCurrentService(service)
    }
  }, [isFocused])
  // Listeners
  // Render Methods
  const renderListItem = ({
    item,
    index,
  }: {
    item: MenuSectionType
    index: number
  }) => {
    if (index === 0) {
      return (
        <TourGuideZone zone={0}>
          <FoodMenuSectionsItem
            onDelete={handleDelete}
            item={item}
            onPress={handlePressSection}
          />
        </TourGuideZone>
      )
    }
    return (
      <FoodMenuSectionsItem
        onDelete={handleDelete}
        item={item}
        onPress={handlePressSection}
      />
    )
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <DmView pointerEvents={isTourActive ? "box-only" : "auto"}>
        <HeaderOnboarding
          title={t("food_menu")}
          isChevron
          className="px-[12]"
          onGoBackPress={handleGoBack}
        />
      </DmView>

      <FlatList
        data={currentService?.menu?.menuSections.map((item) => item).reverse()}
        renderItem={renderListItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <FoodScreenEmptyComponent
            title={t("add_menu_sections")}
            descr={t("add_menu_sections_descr")}
            btnTitle={`+ ${t("add")}`}
            Icon={<MenuBigIcon />}
            onPress={handleOpenCreateSectionModal}
          />
        }
        scrollEnabled={!isTourActive}
        ListFooterComponent={
          currentService?.menu?.menuSections.length ? (
            <DmView pointerEvents={isTourActive ? "box-only" : "auto"}>
              <AddPlusTitleComponent
                className="py-[27]"
                title={t("add_new_section")}
                onPress={handleOpenCreateSectionModal}
              />
            </DmView>
          ) : null
        }
      />
      <CreateMenuSectionModal
        isVisible={isCreateSectionModalVisible}
        onClose={handleCloseCreateSectionModal}
        onSubmit={handleCreateService}
      />
      <MainModal
        isVisible={isDeleteModalVisible}
        onClose={handleCloseDeleteModal}
        title={t("delete_menu_section")}
        descr={t("all_items_under_this_section_descr")}
        isBtnsTwo
        isLoading={isLoading}
        onPress={onDelete}
        className="pt-[39] px-[33] pb-[30]"
        classNameBtns="h-[30]"
        classNameBtnsWrapper="mt-[20] mx-[35]"
        classNameTitle="mt-[0] text-16 leading-[25px] font-custom700"
        classNameBtnsText="text-13 leading-[16px] font-custom500"
        classNameDescr="mt-[9] text-13 leading-[25px] font-custom400"
      />

      {!!currentService?.menu?.menuSections.reduce(
        (sum, curr) => curr.menuItems.length + sum,
        0
      ) && (
        <DmView
          className="mx-[20] items-center justify-center"
          onPress={handleGoMenuStoreScreen}
        >
          <ActionBtn
            title={t("view_menu")}
            className="rounded-5 w-full"
            textClassName="text-13 leading-[16px] font-custom600"
          />
          <DmText className="absolute left-[13] text-13 leading-[16px] font-custom500 text-white text-center">
            {String(
              currentService?.menu?.menuSections.reduce(
                (sum, curr) => curr.menuItems.length + sum,
                0
              ) || 0
            ) + "\n"}
            {t("items")}
          </DmText>
        </DmView>
      )}
    </SafeAreaView>
  )
}

export default FoodMenuScreen

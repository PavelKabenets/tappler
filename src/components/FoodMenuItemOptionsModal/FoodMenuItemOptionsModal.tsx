import React, { useState } from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import MainModal from "components/MainModal"
import { MenuItemType, MenuSectionType } from "types"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import TrashIcon from "assets/icons/trash-red.svg"
import { useTranslation } from "react-i18next"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ProsServicesCategoriesResponse } from "services"
import {
  useDeleteProsServicesCategoriesMenuSectionItemMutation,
  usePatchProsServicesCategoriesMenuSectionItemMutation,
} from "services/api"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "navigation/types"
import EditIcon from "assets/icons/edit-pencil-note.svg"
import OutOfStoke from "assets/icons/out-of-stock.svg"
import DoneIcon from "assets/icons/check-mark.svg"
import PreviewIcon from "assets/icons/preview.svg"

interface Props {
  item: MenuItemType
  service: ProsServicesCategoriesResponse
  currentSection: MenuSectionType
  isVisible: boolean
  onClose: () => void
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "food-section-detail",
    undefined
  >
}

const FoodMenuItemOptionsModal: React.FC<Props> = ({
  item,
  isVisible,
  onClose,
  service,
  currentSection,
  navigation,
}) => {
  const [isLoading, setLoading] = useState(false)

  const { t } = useTranslation()
  const [deleteMenuItem] =
    useDeleteProsServicesCategoriesMenuSectionItemMutation()
  const [patchMenuItem] =
    usePatchProsServicesCategoriesMenuSectionItemMutation()

  const handleEditPress = () => {
    onClose()
    setTimeout(() => {
      navigation.navigate("food-section-menu-detail", {
        service,
        currentSection,
        menuItem: item,
      })
    }, 500)
  }

  const handlePreview = () => {
    onClose()
    setTimeout(() => {
      navigation.navigate("preview", {
        menuItem: item,
      })
    }, 500)
  }

  const handleInStoke = async () => {
    try {
      setLoading(true)
      const res = await patchMenuItem({
        id: item.id,
        inStock: !item.inStock,
        serviceId: service.serviceCategory.id,
        sectionId: currentSection.id,
      }).unwrap()
      navigation.setParams({
        service: res,
        currentSection:
          res.menu?.menuSections.filter(
            (item) => item.id === currentSection.id
          )[0] || currentSection,
      })
      onClose()
    } catch (e) {
      console.log("Patch Menu Item Error: ", e)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setLoading(true)
      const res = await deleteMenuItem({
        sectionId: currentSection.id,
        serviceId: service.serviceCategory.id,
        menuItemId: item.id,
      }).unwrap()
      navigation.setParams({
        service: res,
        currentSection:
          res.menu?.menuSections.filter(
            (item) => item.id === currentSection.id
          )[0] || currentSection,
      })
      onClose()
    } catch (e) {
      console.log("Delete Menu Item Error: ", e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      className="px-[0] pb-[0]"
      classNameModal="p-0 m-0 justify-end"
    >
      <DmView style={{ paddingBottom: 45 }}>
        <TitleRegistrationFlow
          className="pb-[25] pl-[14] pr-[0] mr-[28]"
          classNameTitle="text-14 leading-[21px]"
          classNameDescr="mt-[4] text-13 leading-[21px]"
          title={t("preview")}
          descr={t("preview_as_the_customers_see_it")}
          onPress={handlePreview}
          IconRight={<PreviewIcon />}
        />
        <TitleRegistrationFlow
          className="border-t-grey33 border-t-0.5 py-[25] pl-[14] pr-[0] mr-[28]"
          classNameTitle="text-14 leading-[21px]"
          classNameDescr="mt-[4] text-13 leading-[21px]"
          title={t("edit")}
          descr={t("make_changes_to_your_item")}
          onPress={handleEditPress}
          IconRight={<EditIcon />}
        />
        <TitleRegistrationFlow
          className="border-t-grey33 border-t-0.5 py-[25] pl-[14] pr-[0] mr-[28]"
          classNameTitle="text-14 leading-[21px]"
          classNameDescr="mt-[4] text-13 leading-[21px]"
          title={t(item.inStock ? "mark_item_out_stock" : "mark_item_in_stock")}
          descr={t("enable_or_disable_item_temporary")}
          onPress={handleInStoke}
          IconRight={
            item.inStock ? <OutOfStoke /> : <DoneIcon width={22} height={22} />
          }
        />
        <TitleRegistrationFlow
          className="border-t-grey33 border-t-0.5 pt-[25] pl-[14] pr-[0] mr-[28]"
          classNameTitle="text-14 leading-[21px]"
          classNameDescr="mt-[4] text-13 leading-[21px]"
          title={t("delete")}
          descr={t("remove_this_item_permanently")}
          IconRight={<TrashIcon />}
          onPress={isLoading ? undefined : handleDelete}
        />
      </DmView>
    </MainModal>
  )
}

export default FoodMenuItemOptionsModal

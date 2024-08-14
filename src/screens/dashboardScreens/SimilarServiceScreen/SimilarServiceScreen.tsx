import React, { useState } from "react"

import { DmText, DmView } from "components/UI"
import Modal from "react-native-modal"

import {
  GetSimilarServicesResponse,
  ProsServicesCategoriesResponse,
} from "services"

import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import {
  useCreateProsServiceCategoriesMutation,
  useGetSimilarServicesQuery,
  useProsServiceCategoriesQuery,
} from "services/api"
import AllServicesSubItem from "components/AllServicesSubItem"
import { ActivityIndicator, FlatList } from "react-native"
import { useTranslation } from "react-i18next"
import clsx from "clsx"
import { SubCategoryType } from "types"
import ServiceDetailModal from "components/ServiceDetailModal"
import { useDispatch } from "react-redux"
import { setWaitAMomentModalPossibleVisible } from "store/auth/slice"
import { RootStackScreenProps } from "navigation/types"
import colors from "styles/colors"
import MainModal from "components/MainModal"
import MaximumIcon from "assets/icons/maximum.svg"

type Props = RootStackScreenProps<"similar-service">

const SimilarServiceScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id, serviceId } = route.params

  const [isDetailModalVisible, setDetailModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<SubCategoryType>()
  const [isLoading, setLoading] = useState(false)
  const [isMaxModalVisible, setMaxModalVisible] = useState(false)
  const { data: prosCategories } = useProsServiceCategoriesQuery()

  const { data: myServicesData } = useProsServiceCategoriesQuery()
  const { data, isFetching } = useGetSimilarServicesQuery({
    id,
    serviceId,
  })

  const isServiceWasAdd = (id: number) => {
    return myServicesData?.map((item) => item.serviceCategory.id).includes(id)
  }

  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [createServiceCategory] = useCreateProsServiceCategoriesMutation()

  const handleOpenDetailModal = (item: SubCategoryType) => {
    setSelectedItem(item)
    setDetailModalVisible(true)
  }

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false)
  }

  const handleAddToMyServices = async () => {
    if (prosCategories?.length && prosCategories.length >= 3) {
      handleCloseDetailModal()
      setTimeout(() => {
        handleOpenMaxModal()
      }, 400)
    } else {
      if (selectedItem) {
        setLoading(true)
        try {
          const res = await createServiceCategory({
            serviceCategoryId: selectedItem.id,
          }).unwrap()
          dispatch(setWaitAMomentModalPossibleVisible(false))
          handleCloseDetailModal()
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "dashboard" }, { name: "my-services" }],
            })
          }, 400)
        } catch (e) {
          console.log("Create My Service Error: ", e)
        } finally {
          setLoading(false)
        }
      }
    }
  }

  const handleCloseMaxModal = () => {
    setMaxModalVisible(false)
  }

  const handleOpenMaxModal = () => {
    setMaxModalVisible(true)
  }

  const renderListItem = ({ item }: { item: SubCategoryType }) => {
    return (
      <AllServicesSubItem
        item={item}
        onPress={isServiceWasAdd(item.id) ? undefined : handleOpenDetailModal}
        onPressDetail={
          isServiceWasAdd(item.id) ? undefined : handleOpenDetailModal
        }
        isCheckHide
        descr={t(isServiceWasAdd(item.id) ? "added" : "plus_add")}
        classNameDescr={clsx(
          "text-11 leading-[14px] font-custom500 py-[9]",
          isServiceWasAdd(item.id) && "text-black"
        )}
      />
    )
  }
  return (
    <SafeAreaView className="flex-1 bg-white pt-[15]">
      <DmView
        className="w-[25] h-[25] items-center justify-center mx-[12]"
        onPress={navigation.goBack}
      >
        <CloseIcon />
      </DmView>
      <DmView className="mt-[9] flex-1">
        {isFetching && (
          <DmView className="pb-[9]">
            <ActivityIndicator color={colors.red} />
          </DmView>
        )}
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          data={data?.data}
          renderItem={renderListItem}
          ListEmptyComponent={
            <DmView className="flex-1 items-center justify-center">
              <DmText className="text-14 leading-[18px] font-custom400 text-red">
                {t("there_are_no_such_services_yet")}
              </DmText>
            </DmView>
          }
        />
      </DmView>
      <ServiceDetailModal
        isVisible={isDetailModalVisible}
        onClose={handleCloseDetailModal}
        title={selectedItem?.name || ""}
        type="my-service"
        isLoading={isLoading}
        onPress={handleAddToMyServices}
        // @TO DO - descr
        descr={selectedItem?.descriptionForPros || ""}
      />
      <MainModal
        isVisible={isMaxModalVisible}
        descr={t("you_have_reached_the_maximum", { number: 3 })}
        onClose={handleCloseMaxModal}
        className="pt-[42] px-[59]"
        classNameDescr="mt-[24] text-13 leading-[20px] font-custom500"
        classNameCloseBtn="mt-[26] mx-[16]"
        isCloseBtn
        Icon={<MaximumIcon />}
      />
    </SafeAreaView>
  )
}

export default SimilarServiceScreen

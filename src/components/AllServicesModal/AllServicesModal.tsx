import React, { useMemo, useState } from "react"

import { DmInput, DmText, DmView } from "components/UI"
import Modal from "react-native-modal"
import { FlatList, I18nManager } from "react-native"

import { useTranslation } from "react-i18next"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"

import {
  MockAllServicesItemType,
  MockAllServicesSubItemType,
  subItems,
} from "data/mockData"

import styles from "./styles"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import colors from "styles/colors"
import RedSearch from "assets/icons/search-red.svg"
import CloseIcon from "assets/icons/close.svg"
import { ServiceCategoryType, SubCategoryType } from "types"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import {
  useCreateProsServiceCategoriesMutation,
  useGetServicesQuery,
  useProsServiceCategoriesQuery,
} from "services/api"
import { useDebounce } from "use-debounce"
import { ProsServicesCategoriesResponse } from "services"
import { useDispatch } from "react-redux"
import { setWaitAMomentModalPossibleVisible } from "store/auth/slice"

interface Props {
  isVisible: boolean
  onClose: () => void
  myServicesCategoriesData?: ProsServicesCategoriesResponse[]
  type?: "my-service"
  onOpenDetailModal?: (item: SubCategoryType) => void
}

const AllServicesModal: React.FC<Props> = ({
  isVisible,
  onClose,
  myServicesCategoriesData,
  type,
  onOpenDetailModal,
}) => {
  const [filter, setFilter] = useState("")
  const [debounce] = useDebounce(filter, 300)

  const { data: dataResponse, isFetching } = useGetServicesQuery(debounce)

  const data = useMemo(() => {
    return dataResponse?.data
  }, [dataResponse])
  const dispatch = useDispatch()

  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { t } = useTranslation()
  const [addService] = useCreateProsServiceCategoriesMutation()
  const { data: prosData } = useProsServiceCategoriesQuery()

  const categories = useMemo(() => {
    return data?.map((item) => ({
      ...item,
      type: "category",
    })) as (ServiceCategoryType & { type?: "category" | "subCategory" })[]
  }, [data])

  const subCategories = useMemo(() => {
    return data
      ?.map((item) => item.categories)
      .flat()
      ?.map((item) => ({ ...item, type: "subCategory" }))
      .flat() as (SubCategoryType & {
      type?: "category" | "subCategory"
    })[]
  }, [data])

  const filteredData = useMemo(() => {
    return [...categories || [], ...subCategories || []].filter((item) => {
      if (item.type === "category") {
        return item.name.toLowerCase().includes(debounce.toLowerCase())
      }

      return (
        (item as SubCategoryType).keywords
          .toLowerCase()
          .includes(debounce.toLowerCase()) ||
        (item as SubCategoryType).name
          .toLowerCase()
          .includes(debounce.toLowerCase())
      )
    })
  }, [data, filter, subCategories])

  const handleSubItemPress = async (
    item:
      | (SubCategoryType & {
          type?: "category" | "subCategory"
        })
      | (ServiceCategoryType & { type?: "category" | "subCategory" })
  ) => {
    if (item.type === "category") {
      navigation.navigate("service-detail", {
        service: item as ServiceCategoryType,
        type,
        myServicesCategoriesData,
      })
    } else {
      if (type === "my-service") {
        try {
          onClose()
          dispatch(setWaitAMomentModalPossibleVisible(false))
          setTimeout(() => {
            if (onOpenDetailModal) {
              onOpenDetailModal(item as SubCategoryType)
            }
          }, 600)
        } catch (e) {
          console.log("Error add Service: ", e)
        }
      } else {
        if (item.type === "subCategory") {
          navigation.navigate("sign-up", { subItem: item as SubCategoryType })
        }
      }
    }

    onClose()
  }

  const renderListItem = ({
    item,
  }: {
    item:
      | (SubCategoryType & {
          type?: "category" | "subCategory"
        })
      | (ServiceCategoryType & { type?: "category" | "subCategory" })
  }) => {
    const isIncluded = prosData
      ?.map((mItem) => mItem?.serviceCategory.id)
      .includes(item.id)
    return (
      <DmView
        className="py-[17] px-[20] border-b-0.5 border-b-grey5 flex-row justify-between items-center"
        onPress={isIncluded ? undefined : () => handleSubItemPress(item)}
      >
        <DmText className="font-custom500 text-12 leading-[15px]">
          {item.name}
        </DmText>
        {item.type === "subCategory" ? 
          (isIncluded ? (
            <DmText className="ml-[14] font-custom400 text-10 leading-[13px]">
              {t("added")}
            </DmText>
          ) :
            (<DmText className="ml-[14] font-custom400 text-10 leading-[13px] text-red">
              {t("plus_add")}
            </DmText>
          ))
         : null}
      </DmView>
    )
  }

  return (
    <Modal isVisible={isVisible} className="m-[0]">
      <DmView
        className="flex-1 bg-white"
        style={{ paddingBottom: insets.bottom, paddingTop: insets.top }}
      >
        <DmView className="px-[15] mt-[24]">
          <DmView
            className="w-[21] h-[21] items-center justify-center"
            onPress={onClose}
            hitSlop={HIT_SLOP_DEFAULT}
          >
            <CloseIcon />
          </DmView>
        </DmView>
        <DmView className="mt-[10] px-[20]">
          <DmInput
            value={filter}
            onChangeText={setFilter}
            placeholder={t("search_service")}
            placeholderTextColor={colors.grey6}
            Icon={<RedSearch />}
            isAnimText={false}
          />
        </DmView>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
        >
          {!!filter && (
            <FlatList
              keyboardShouldPersistTaps="always"
              data={filteredData}
              keyExtractor={(item, index) => String(index)}
              renderItem={renderListItem}
              scrollEnabled={false}
            />
          )}
          {/* {data?.filter((item) =>
              item.name.toLowerCase().includes(filter.toLowerCase())
            ).map((item) => {
              return <DmView key={item.id}>{renderListItem({item})}</DmView>
            })} */}
        </KeyboardAwareScrollView>
      </DmView>
    </Modal>
  )
}

export default AllServicesModal

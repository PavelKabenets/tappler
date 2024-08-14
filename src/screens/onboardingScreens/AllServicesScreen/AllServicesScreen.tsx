import React, { useLayoutEffect, useMemo, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import AllServicesItem from "components/AllServicesItem"
import AllServicesSubItem from "components/AllServicesSubItem"
import HeaderOnboarding from "components/HeaderOnboarding"
import { ActivityIndicator, FlatList, ScrollView } from "react-native"
import AllServicesModal from "components/AllServicesModal"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import {
  useCreateProsServiceCategoriesMutation,
  useGetServicesQuery,
  useLazyProsServiceCategoriesQuery,
  useProsServiceCategoriesQuery,
} from "services/api"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { ServiceCategoryType, SubCategoryType } from "types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import SearchRedIcon from "assets/icons/search-red.svg"
import CloseIcon from "assets/icons/close.svg"
import colors from "styles/colors"
import { ProsServicesCategoriesResponse } from "services"
import ServiceDetailModal from "components/ServiceDetailModal"
import { useDispatch } from "react-redux"
import { setWaitAMomentModalPossibleVisible } from "store/auth/slice"
import MainModal from "components/MainModal"
import MaximumIcon from "assets/icons/maximum.svg"

type Props = RootStackScreenProps<"all-services">

const AllServicesScreen: React.FC<Props> = ({ route, navigation }) => {
  const type = route.params?.type

  const myServicesCategoriesDataParams = route.params?.myServicesCategoriesData

  const [isSearchModalVisible, setSearchModalVisible] = useState(false)
  const [isDetailModalVisible, setDetailModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<SubCategoryType>()
  const [isLoading, setLoading] = useState(false)
  const [isMaxModalVisible, setMaxModalVisible] = useState(false)

  const [myServicesCategoriesData, setMyServicesCategoriesData] = useState<
    ProsServicesCategoriesResponse[]
  >(myServicesCategoriesDataParams || [])

  const [getProsCategories] = useLazyProsServiceCategoriesQuery()
  const [createServiceCategory] = useCreateProsServiceCategoriesMutation()

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data: prosCategories } = useProsServiceCategoriesQuery()

  const insets = useSafeAreaInsets()

  const getMyCategories = async () => {
    try {
      const res = await getProsCategories().unwrap()
      setMyServicesCategoriesData(res)
    } catch (e) {
      console.log("Error Get Pros Categories: ", e)
    }
  }

  const handleItemPress = (item: ServiceCategoryType) => {
    navigation.navigate("service-detail", {
      service: item,
      type,
      myServicesCategoriesData,
    })
  }

  const handleCloseMaxModal = () => {
    setMaxModalVisible(false)
  }

  const handleOpenMaxModal = () => {
    setMaxModalVisible(true)
  }

  const { data, isFetching } = useGetServicesQuery()

  const handleAddToMyServices = async () => {
    if (prosCategories?.length && prosCategories.length >= 3) {
      handleCloseDetailModal()
      setTimeout(() => {
        handleOpenMaxModal()
      }, 400)
    } else {
      if (selectedItem && type === "my-service") {
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
              routes: [
                { name: "dashboard" },
                { name: "my-services" },
                {
                  name: "my-services-detail",
                  params: { service: res, isFirstOpen: true },
                },
              ],
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

  const handleSearchPress = () => {
    setSearchModalVisible(true)
  }

  const hadnleCloseModal = () => {
    setSearchModalVisible(false)
  }

  const handleGoRequestAddingService = () => {
    navigation.navigate("request-adding-service")
  }

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false)
  }

  const handleOpenDetailModal = (item: SubCategoryType) => {
    setDetailModalVisible(true)
    setSelectedItem(item)
  }

  useLayoutEffect(() => {
    if (type === "my-service") {
      getMyCategories()
    }
  }, [type])

  const renderListItem = ({ item }: { item: ServiceCategoryType }) => {
    return <AllServicesItem item={item} onPress={handleItemPress} />
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={t(type === "my-service" ? "service_category" : "new_account")}
        className="px-[20]"
        Icon={<SearchRedIcon />}
        onPressIcon={handleSearchPress}
        onBackComponent={<CloseIcon />}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollView,
          { marginBottom: insets.bottom > 30 ? 0 : 30 - insets.bottom },
        ]}
      >
        {isFetching && (
          <DmView className="mt-[14]">
            <ActivityIndicator color={colors.red} />
          </DmView>
        )}
        <FlatList
          data={data?.data}
          renderItem={renderListItem}
          scrollEnabled={false}
          ListFooterComponent={
            !isFetching ? (
              <AllServicesItem
                item={{
                  name: t("dont_see_your_service_tap_here"),
                  id: 12312399999,
                  categories: [],
                }}
                variant="red"
                className="border-b-0"
                onPress={handleGoRequestAddingService}
              />
            ) : null
          }
        />
      </ScrollView>
      <AllServicesModal
        isVisible={isSearchModalVisible}
        onClose={hadnleCloseModal}
        myServicesCategoriesData={myServicesCategoriesData}
        type={type}
        onOpenDetailModal={handleOpenDetailModal}
      />
      <ServiceDetailModal
        isVisible={isDetailModalVisible}
        onClose={handleCloseDetailModal}
        title={selectedItem?.name || ""}
        type={type}
        isLoading={isLoading}
        onPress={type === "my-service" ? handleAddToMyServices : undefined}
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

export default AllServicesScreen

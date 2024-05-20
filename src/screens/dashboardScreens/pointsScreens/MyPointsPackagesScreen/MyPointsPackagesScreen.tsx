import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmChecbox, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import PaymentMethodModal from "components/PaymentMethodModal"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { packagesData } from "data/myPointsData"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import {
  useLazyGetPointsPackagesQuery,
  usePostPointsPackagesMutation,
} from "services/api"
import { GetPointsPackagesResponse } from "services"
import { FlatList } from "react-native"
import { PointsItemPackagesType } from "types"
import moment from "moment"

type Props = RootStackScreenProps<"my-points-packages">

const MyPointsPackagesScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [selectedPackage, setSelectedPackage] =
    useState<PointsItemPackagesType>()
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false)
  const [packagesResponse, setPackageResponse] =
    useState<GetPointsPackagesResponse>()
  const [endReachedData, setEndReachedData] =
    useState<GetPointsPackagesResponse>()
  const [page, setPage] = useState(1)
  const [isLoading, setLoading] = useState(false)
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const [getPackages, { isFetching }] = useLazyGetPointsPackagesQuery()
  const [postPakage] = usePostPointsPackagesMutation()
  // Refs
  // Methods
  const onUnionPakagesData = (response: GetPointsPackagesResponse) => {
    if (packagesResponse) {
      const unicItems = response.data.filter(
        (item) => !packagesResponse.data.includes(item)
      )

      setPackageResponse({ ...response, data: unicItems })
    } else {
      setPackageResponse(response)
    }
  }

  const onGetPakages = async () => {
    try {
      const res = await getPackages(page).unwrap()

      onUnionPakagesData(res)
    } catch (e) {
      console.log("Get Packages Error: ", e)
    }
  }

  const onEndReached = () => {
    if (
      endReachedData?.data.length !== packagesResponse?.data.length &&
      !isFetching
    ) {
      setPage((prev) => prev + 1)
      setEndReachedData(packagesResponse)
    }
  }
  // Handlers
  const handleSelectItem = (item: PointsItemPackagesType) => {
    setSelectedPackage(item)
  }

  const handleOpenPaymentModal = () => {
    setPaymentModalVisible(true)
  }

  const handleClosePaymentModalVisible = () => {
    setPaymentModalVisible(false)
  }

  const handlePostPackage = async () => {
    if (selectedPackage) {
      setLoading(true)
      try {
        await postPakage({
          pointsAmount: selectedPackage.pointsAmount,
          price: selectedPackage.price,
          description: selectedPackage.description,
          startDate: moment(selectedPackage.startDate).format("YYYY-MM-DD"),
          expirationDate: moment(selectedPackage.expirationDate).format(
            "YYYY-MM-DD"
          ),
        }).unwrap()
        handleOpenPaymentModal()
      } catch (e) {
        console.log("Post Package Error: ", e)
      } finally {
        setLoading(false)
      }
    }
  }
  // Hooks
  useEffect(() => {
    onGetPakages()
  }, [page])
  // Listeners
  // Render Methods
  const renderListItem = ({ item }: { item: PointsItemPackagesType }) => {
    return (
      <DmView className="mb-[17] flex-row items-center">
        <DmChecbox
          className="flex-[1.2]"
          textClassName="text-13 leeading-[16px] font-custom400"
          isChecked={selectedPackage?.id === item.id}
          title={t(
            item.pointsAmount > 1
              ? "number_points_for_pricenumber_EGP"
              : "number_point_for_pricenumber_EGP",
            { number: item.pointsAmount, pricenumber: item.price }
          )}
        />
        {item.price && (
          <DmView className="flex-1">
            <DmView className="bg-pink2 px-[8] py-[3] self-start rounded-full">
              <DmText className="text-11 leading-[14px] font-custom400">
                {t("save_number_EGP", { number: item.saving })}
              </DmText>
            </DmView>
          </DmView>
        )}
      </DmView>
    )
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      style={{
        paddingBottom: insets.bottom > 41 ? insets.bottom : 41 - insets.bottom,
      }}
    >
      <DmView>
        <HeaderOnboarding
          title={t("packages")}
          className="px-[15] pb-[10]"
          isChevron
        />
        <DmView className="px-[14] mt-[18]">
          <DmText className="text-20 leading-[24px] font-custom600">
            {t("choose_a_package")}
          </DmText>
          <DmView className="mt-[17]">
            <FlatList
              data={packagesResponse?.data}
              renderItem={renderListItem}
              contentContainerStyle={{ flexGrow: 1 }}
              onEndReached={onEndReached}
              scrollEventThrottle={16}
            />
          </DmView>
        </DmView>
      </DmView>
      {!!selectedPackage && (
        <ActionBtn
          textClassName="text-13 leading-[16px] font-custom600"
          isIconRight
          onPress={handlePostPackage}
          isLoading={isLoading}
          disable={isLoading}
          className="mx-[15] h-[51] rounded-0 px-[11]"
          title={t("make_payment")}
          Icon={
            <DmText className="text-13 leading-[16px] font-custom500 text-white">
              {selectedPackage?.price} {t("EGP")}
            </DmText>
          }
        />
      )}
      <PaymentMethodModal
        isVisible={isPaymentModalVisible}
        onClose={handleClosePaymentModalVisible}
      />
    </SafeAreaView>
  )
}

export default MyPointsPackagesScreen
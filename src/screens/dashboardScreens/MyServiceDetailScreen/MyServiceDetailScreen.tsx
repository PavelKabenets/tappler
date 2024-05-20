import React, { useEffect, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import MyServicesStatusModal from "components/MyServicesStatusModal"
import StatusPinMessage from "components/StatusPinMessage"
import MyServiceDetailItem from "components/MyServiceDetailItem"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import {
  api,
  useDeleteProsServiceCategoriesMutation,
  useGetSimilarServicesQuery,
  useLazyProsServiceCategoriesQuery,
  useProsServiceCategoriesQuery,
} from "services/api"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import TrashRedIcon from "assets/icons/trash-red.svg"
import InfoWhiteIcon from "assets/icons/info-white-small.svg"
import GeoIcon from "assets/icons/location-box-black.svg"
import SettingIcon from "assets/icons/settings.svg"
import BinocularsIcon from "assets/icons/binoculars.svg"
import MicroIcon from "assets/icons/interview.svg"
import { useDispatch } from "react-redux"
import renderStatusTextColor from "utils/renderStatusTextColor"
import MainModal from "components/MainModal"

type Props = RootStackScreenProps<"my-services-detail">

const MyServiceDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { service } = route.params
  // State
  const [isStatusModalVisible, setStatusModalVisible] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)

  // Global Store
  // Variables
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [deleteService] = useDeleteProsServiceCategoriesMutation()
  useGetSimilarServicesQuery({
    id: service.serviceCategory.id,
    serviceId: service.serviceCategory.serviceId,
  })
  const [getCategory] = useLazyProsServiceCategoriesQuery()
  // Refs
  // Methods
  // Handlers
  const handleDelete = async () => {
    try {
      setLoading(true)
      await deleteService({
        serviceCategoryId: service.serviceCategory.id,
      }).unwrap()
      await getCategory().unwrap()
      navigation.goBack()
    } catch (e) {
      console.log("Delete Error: ", e)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenSatatusModal = () => {
    setStatusModalVisible(true)
  }

  const handleCloseSatatusModal = () => {
    setStatusModalVisible(false)
  }

  const handleGoPlaceOfServiceScreen = () => {
    navigation.navigate("place-of-services", {
      service,
    })
  }

  const handleGoSimilarServices = () => {
    navigation.navigate("similar-service", {
      id: service.serviceCategory.id,
      serviceId: service.serviceCategory.serviceId,
    })
  }

  const handleGoServiceSetup = () => {
    if (service.serviceCategory.hasMenu) {
      navigation.navigate("service-setup-food", {
        service,
      })
    } else {
      navigation.navigate("service-setup", {
        service,
      })
    }
  }

  const handleOpenDeleteModal = () => {
    setDeleteModalVisible(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false)
  }

  const handleGoInterview = () => {
    navigation.navigate("interview", { service })
  }

  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={service.serviceCategory.name}
        isChevron
        className="px-[12] pr-[20] pb-[18]"
        Icon={<TrashRedIcon />}
        onPressIcon={handleOpenDeleteModal}
        headerClassName="items-start"
        isRightIconDisable={isLoading}
      >
        <DmView
          className="flex-row items-center"
          onPress={handleOpenSatatusModal}
        >
          <DmText className="text-13 leading-[16px] font-custom400 ">
            {t("status")}:{" "}
            <DmText
              className="text-red capitalize"
              style={{ color: renderStatusTextColor(service.status) }}
            >
              {t(service.status)}
            </DmText>
          </DmText>
          <DmView className="ml-[5]">
            <InfoWhiteIcon />
          </DmView>
        </DmView>
      </HeaderOnboarding>
      {service.status !== "active" && <StatusPinMessage status={"inactive"} />}
      <DmText className="mt-[18] mx-[12] text-18 leading-[22px] font-custom600">
        {t("service_settings")}
      </DmText>
      <MyServiceDetailItem
        title={t("place_of_service")}
        descr={t("where_do_you_provide_your_services")}
        Icon={<GeoIcon />}
        titleBtn={!service?.placeOfService[0] ? t("incomplete") : ""}
        isDoneIconVisible={!!service?.placeOfService[0]}
        onPress={handleGoPlaceOfServiceScreen}
      />
      <MyServiceDetailItem
        title={t("service_setup")}
        descr={t("information_about_your_service")}
        Icon={<SettingIcon />}
        titleBtn={!service.questionsAnswers.length ? t("incomplete") : ""}
        onPress={handleGoServiceSetup}
        isDoneIconVisible={
          service.serviceCategory.hasMenu
            ? service.menu?.menuSections.some(
                (item) => !!item.menuItems.length
              ) &&
              !!service.menu?.foodCategories.length &&
              service.menu?.deliveryCharge !== null
            : !!service.questionsAnswers.length
        }
      />
      {service.status === "pendingInterview" && (
        <MyServiceDetailItem
          title={t("interview")}
          descr={t("your_skills_must_be_verified_by_tappler_team")}
          Icon={<MicroIcon />}
          onPress={handleGoInterview}
          titleBtn={t("incomplete")}
        />
      )}
      <MyServiceDetailItem
        title={t("similar_services")}
        descr={t("discover_similar_services_that_you_offer")}
        Icon={<BinocularsIcon />}
        onPress={handleGoSimilarServices}
        titleBtn={t("discover")}
        btnVariant="white"
        classNameBtn="border-red"
      />
      <MyServicesStatusModal
        isVisible={isStatusModalVisible}
        onClose={handleCloseSatatusModal}
      />
      <MainModal
        isVisible={isDeleteModalVisible}
        onClose={handleCloseDeleteModal}
        title={t("delete_service")}
        descr={t("are_you_sure_you_want_to_delete_descr")}
        isBtnsTwo
        isLoading={isLoading}
        onPress={handleDelete}
        className="pt-[34] px-[55] pb-[17]"
        classNameBtns="h-[38]"
        classNameBtnsWrapper="mt-[20]"
        classNameTitle="mt-[0] text-20 leading-[25px] font-custom700"
        classNameBtnsText="text-13 leading-[16px] font-custom600"
        classNameDescr="text-13 leading-[20px] font-custom500"
      />
    </SafeAreaView>
  )
}

export default MyServiceDetailScreen

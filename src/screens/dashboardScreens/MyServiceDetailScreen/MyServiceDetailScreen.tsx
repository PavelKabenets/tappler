import React, { useEffect, useMemo, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import MyServicesStatusModal from "components/MyServicesStatusModal"
import StatusPinMessage from "components/StatusPinMessage"
import MyServiceDetailItem from "components/MyServiceDetailItem"
import MainModal from "components/MainModal"
// Hooks & Redux
import { useTranslation } from "react-i18next"
import {
  api,
  useDeleteProsServiceCategoriesMutation,
  useGetProsServiceByIdQuery,
  useGetServiceStatusQuery,
  useGetSimilarServicesQuery,
  useLazyProsServiceCategoriesQuery,
  usePostRegisterNotificationsDeviceMutation,
} from "services/api"
import { useDispatch } from "react-redux"
// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils
import renderStatusTextColor from "utils/renderStatusTextColor"
// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import TrashRedIcon from "assets/icons/trash-red.svg"
import InfoWhiteIcon from "assets/icons/info-white-small.svg"
import GeoIcon from "assets/icons/location-box-black.svg"
import SettingIcon from "assets/icons/settings.svg"
import BinocularsIcon from "assets/icons/binoculars.svg"
import MicroIcon from "assets/icons/interview.svg"
import DocumentsIcon from "assets/icons/documents.svg"
import EducationIcon from "assets/icons/education.svg"
import { ActivityIndicator } from "react-native"
import colors from "styles/colors"
import { ProAdditionalDocumentsType } from "types"
import { getUniqueAdditionalDocuments } from "utils/getUnicDocuments"

type Props = RootStackScreenProps<"my-services-detail">

const MyServiceDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { service } = route.params
  const isFirstOpen = route.params?.isFirstOpen
  // State
  const [isStatusModalVisible, setStatusModalVisible] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
  const [isReviewedModalVisible, setReviewedModalVisible] = useState(false)
  const [isRequestModalVisible, setRequestModalVisible] = useState(false)
  const [isInterviewCompletedModalVisible, setInterviewCompletedModalVisible] =
    useState(false)

  // Global Store
  // Variables
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data } = useGetProsServiceByIdQuery(service.serviceCategory.id, {
    pollingInterval: 60000,
  })

  const [deleteService] = useDeleteProsServiceCategoriesMutation()
  useGetSimilarServicesQuery({
    id: service.serviceCategory.id,
    serviceId: service.serviceCategory.serviceId,
  })
  const [getCategory] = useLazyProsServiceCategoriesQuery()
  const { data: interviewData, isFetching } = useGetServiceStatusQuery(
    service.serviceCategory.id
  )
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

  const handleOpenRequestModal = () => {
    setRequestModalVisible(true)
  }

  const handleCloseRequestModal = () => {
    setRequestModalVisible(false)
  }

  const handleOpenInterviewDoneModal = () => {
    setInterviewCompletedModalVisible(true)
  }

  const handleCloseInterviewDoneModal = () => {
    setInterviewCompletedModalVisible(false)
  }

  const handleGoPlaceOfServiceScreen = () => {
    navigation.navigate("place-of-services", {
      service,
    })
  }

  const additionaDocumentStatus = useMemo(() => {
    if (!service?.proAdditionalDocuments?.length) {
      return "incomplete"
    }

    const uniqItems = getUniqueAdditionalDocuments(
      service.proAdditionalDocuments
    )

    return uniqItems.some((item) => item.proDocument.status === "rejected")
      ? "rejected"
      : uniqItems.every((item) => item.proDocument.status === "approved")
        ? "approved"
        : uniqItems.length
          ? "pending"
          : "incomplete"
  }, [service?.proAdditionalDocuments])

  const interviewStatus = useMemo(() => {
    if (interviewData?.length) {
      const res =
        interviewData.map((item) => item).pop()?.status || "incomplete"
      return res === "new" ? "pending" : res
    }

    return "incomplete"
  }, [interviewData])

  const handleGoUploadPhotosScreen = () => {
    navigation.navigate("my-service-detail-photos", { service })
  }

  const handleGoRequiredDocumentsScreen = () => {
    if (additionaDocumentStatus === "incomplete") {
      return navigation.navigate("my-service-detail-documents", { service })
    }
    if (additionaDocumentStatus !== "pending") {
      navigation.navigate("my-service-detail-documents-status", { service })
    }
    if (additionaDocumentStatus === "pending") {
      setReviewedModalVisible(true)
    }
  }

  const handleGoQualificationCredentialsScreen = () => {
    navigation.navigate("my-service-qualification-credentials", { service })
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
    if (interviewStatus === "pending") {
      return handleOpenRequestModal()
    }

    if (interviewStatus === "passed") {
      return handleOpenInterviewDoneModal()
    }
    if (service.status !== "pendingInterview") {
      navigation.navigate("interview", { service })
    }
  }

  const handleCloseReviewedModal = () => {
    setReviewedModalVisible(false)
  }

  // Hooks
  useEffect(() => {
    if (data) {
      navigation.setParams({ service: data })
    }
  }, [data])
  // Listeners
  // Render Methods
  return (
    <SafeAreaView className="flex-1 bg-white">
      {isFetching && !isFirstOpen && (
        <DmView className="flex-1 items-center justify-center">
          <ActivityIndicator color={colors.red} />
        </DmView>
      )}
      {(!isFetching || isFirstOpen) && (
        <>
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
          {service.status !== "active" && (
            <StatusPinMessage status={"inactive"} />
          )}
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
          {service.serviceCategory.interviewRequired && (
            <MyServiceDetailItem
              title={t("interview")}
              descr={t("your_skills_must_be_verified_by_tappler_team")}
              Icon={<MicroIcon />}
              onPress={handleGoInterview}
              titleBtn={t(interviewStatus)}
              btnVariant={
                interviewStatus === "pending" ||
                service.status === "pendingInterview"
                  ? "grey"
                  : interviewStatus === "failed"
                    ? "yellow"
                    : undefined
              }
              isDoneIconVisible={interviewStatus === "passed"}
            />
          )}
          {!!service.serviceCategory.additionalDocuments?.length && (
            <MyServiceDetailItem
              title={t("required_documents")}
              descr={t("submit_the_documents_required_for_this_service")}
              Icon={<DocumentsIcon />}
              titleBtn={
                additionaDocumentStatus === "pending"
                  ? t("pending")
                  : t(additionaDocumentStatus)
              }
              btnVariant={
                additionaDocumentStatus === "pending"
                  ? "grey"
                  : additionaDocumentStatus === "rejected"
                    ? "yellow"
                    : undefined
              }
              isDoneIconVisible={additionaDocumentStatus === "approved"}
              onPress={handleGoRequiredDocumentsScreen}
            />
          )}
          {/* {service.serviceCategory.locationPhotoRequired && (
        <MyServiceDetailItem
          title={t("photos")}
          descr={t("submit_photo")}
          Icon={<DmView className="bg-grey w-[17] h-[22]" />}
          titleBtn={!service?.placeOfService[0] ? t("incomplete") : ""}
          isDoneIconVisible={!!service?.placeOfService[0]}
          onPress={handleGoUploadPhotosScreen}
        />
      )} */}
          {service.serviceCategory.hasMenu && (
            <MyServiceDetailItem
              title={t("qualification_credentials")}
              descr={t("upload_copy_of_your_certificates_or_courses")}
              Icon={<EducationIcon />}
              subTitle={`(${t("optional")})`}
              classNameSubtitle="text-13 leading-[16] font-custom400 text-grey54"
              isDoneIconVisible={!!service?.placeOfService[0]}
              onPress={handleGoQualificationCredentialsScreen}
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
          <MainModal
            isVisible={isReviewedModalVisible}
            onClose={handleCloseReviewedModal}
            title={t("your_request_is_being_reviewed")}
            descr={t("we_are_reviewing_the_documents_that_you_sent_descr")}
            className="pt-[35] pb-[21] px-[21]"
            classNameTitle="mt-[0] text-16 leading-[19px]"
            classNameDescr="mx-[30] text-13 leading-[18px] font-custom400"
            titleBtn={t("close")}
            onPress={handleCloseReviewedModal}
            classNameBtn="mt-[22]"
            classNameActionBtnText="text-13 leading-[16px] font-custom600"
          />
          <MainModal
            isVisible={isRequestModalVisible}
            onClose={handleCloseRequestModal}
            title={t("your_request_is_being_reviewed")}
            descr={t("please_expect_a_response_as_soon_as_possible")}
            className="pt-[35] pb-[21] px-[21]"
            classNameTitle="mt-[0] text-16 leading-[19px]"
            classNameDescr="text-13 leading-[18px] font-custom400"
            titleBtn={t("close")}
            onPress={handleCloseRequestModal}
            classNameBtn="mt-[22]"
            classNameActionBtnText="text-13 leading-[16px] font-custom600"
          />
          <MainModal
            isVisible={isInterviewCompletedModalVisible}
            onClose={handleCloseInterviewDoneModal}
            title={t("interview_completed")}
            descr={t("you_have_passed_the_quality_interview_for_this_service")}
            className="pt-[35] pb-[21] px-[21]"
            classNameTitle="mt-[0] text-16 leading-[19px]"
            classNameDescr="mx-[30] text-13 leading-[18px] font-custom400"
            titleBtn={t("close")}
            onPress={handleCloseInterviewDoneModal}
            classNameBtn="mt-[22]"
            classNameActionBtnText="text-13 leading-[16px] font-custom600"
          />
        </>
      )}
    </SafeAreaView>
  )
}

export default MyServiceDetailScreen

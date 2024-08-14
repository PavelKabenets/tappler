import React, { useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import SelectDoPhotoModal from "components/SelectDoPhotoModal"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// Hooks & Redux
import { useTranslation } from "react-i18next"
// Helpers & Types
import { ImageOrVideo } from "react-native-image-crop-picker"
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CheckIcon from "assets/icons/check-mark.svg"
import UploadDocumentIcon from "assets/icons/upload-documents.svg"
import {
  usePostProAdditionalDocumentsMutation,
  usePostProfilePhotoMutation,
} from "services/api"
import { useTypedSelector } from "store"
import { Alert, FlatList } from "react-native"
import TrashIcon from "assets/icons/trash-red.svg"
import { AdditionalDocumentType } from "types"
import { ProsServicesCategoriesResponse } from "services"
import MainModal from "components/MainModal"

type Props = RootStackScreenProps<"my-service-detail-documents">

const MyServiceDetailDocumentsScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  const { service } = route.params
  const { user } = useTypedSelector((store) => store.auth)
  // State
  const [isModalVisible, setModalVisible] = useState(false)
  const [documents, setDocuments] =
    useState<(ImageOrVideo & { id: number })[]>()
  const [isLoading, setLoading] = useState(false)
  const [targetId, setTargetId] = useState<number>()
  const [isMaxSizeModalVisible, setMaxSizeModalVisible] = useState(false)
  // Global Store
  // Variables
  const [postImg] = usePostProfilePhotoMutation()
  const [postDocument] = usePostProAdditionalDocumentsMutation()
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  // Refs
  // Methods
  // Handlers
  const handleOpenModal = (id: number) => {
    setTargetId(id)
    setModalVisible(true)
  }
  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleOpenMaxSizeModal = () => {
    setMaxSizeModalVisible(true)
  }

  const handleCloseMaxSizeModal = () => {
    setMaxSizeModalVisible(false)
  }

  const handleDeleteDocument = (id: number) => {
    setDocuments((prev) => prev?.filter((fItem) => fItem.id !== id))
  }

  const handleSelectPhoto = (file: ImageOrVideo) => {
    if (Math.ceil(file.size / (1024 * 1024)) <= 10) {
      if (targetId) {
        setDocuments((prev) => [...prev || [], { ...file, id: targetId }])
      }
    } else {
      handleOpenMaxSizeModal()
    }
  }

  const handleSave = async () => {
    if (documents?.length) {
      try {
        setLoading(true)
        let response: ProsServicesCategoriesResponse
        await Promise.all(
          documents.map(async (item) => {
            const documentImg = await postImg(item).unwrap()
            response = await postDocument({
              additionalDocumentId: item.id,
              files: [documentImg.storageKey],
              serviceCategoryId: service.serviceCategory.id,
            }).unwrap()
          })
        )

        navigation.navigate("wait", {
          title: t("document_received"),
          descr: t(
            "we_will_review_the_document_and_if_approved_your_service_will_be_activated"
          ),
          startHours: 2,
          endHours: 4,
          noneBorder: true,
          text13: true,
          onPressBack: () =>
            navigation.navigate("my-services-detail", { service: response }),
        })
      } catch (e) {
        console.log("Upload Photo Error: ", e)
      } finally {
        setLoading(false)
      }
    } else {
      Alert.alert(
        "Addtional Documents Empty",
        "Additional doc from backend is empty for this service"
      )
    }
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({ item }: { item: AdditionalDocumentType }) => {
    return (
      <>
        <DmView className="mt-[20] px-[18]">
          <DmView className="flex-row items-center">
            <DmView className="bg-red w-[8] h-[8] rounded-full" />
            <DmText className="mx-[8] text-13 leading-[20px] font-custom600">
              {item.documentTitle}
            </DmText>
          </DmView>
          <DmText className="text-13 leading-[20px] font-custom400">
            {t(
              "the_file_must_be_in_pdf_format_in_good_quality_with_a_maximum_size_of_5_mb"
            )}
          </DmText>
        </DmView>
        {!documents?.map((mItem) => mItem.id).includes(item.id) ? (
          <ActionBtn
            onPress={() => handleOpenModal(item.id)}
            IconNearTitle={<UploadDocumentIcon />}
            className="mx-[14] h-[47] mt-[30] rounded-5"
            variant="bordered"
            textClassName="mx-[9] text-13 leading-[16px] font-custom400 text-black"
            title={t("upload_document")}
            reverseItems
          />
        ) : (
          <DmView
            className="mt-[30] mx-[14] pl-[15] pr-[22] flex-row items-center justify-between bg-pink rounded-5 border-0.5 border-red h-[47]"
            onPress={() => handleDeleteDocument(item.id)}
          >
            <DmView className="flex-row items-center">
              <CheckIcon />
              <DmText className="mx-[11] text-13 leading-[16px] font-custom500">
                {item.documentTitle}
              </DmText>
            </DmView>
            <TrashIcon />
          </DmView>
        )}
      </>
    )
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <HeaderOnboarding isChevron className="border-b-0 px-[14]" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <DmView>
          <DmText className="mt-[5] px-[18] text-22 leading-[30px] font-custom700">
            {t("upload_documents")}:
          </DmText>
          <DmText className="mt-[4] px-[18] text-13 leading-[20px] font-custom400">
            {t("the_following_documents_are_required_to_activate_this_service")}
            :
          </DmText>
          <FlatList
            data={service.serviceCategory.additionalDocuments}
            renderItem={renderListItem}
            scrollEnabled={false}
          />
        </DmView>
        <DmView className="px-[16]">
          <ActionBtn
            disable={
              documents?.length !==
                service.serviceCategory.additionalDocuments?.length || isLoading
            }
            isLoading={isLoading}
            onPress={handleSave}
            textClassName="text-13 leading-[16px] font-custom500"
            className="h-[47] rounded-0"
            title={t("submit_for_review")}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <SelectDoPhotoModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setSelectedPhoto={handleSelectPhoto}
        isPdfOnly
      />
      <MainModal
        isVisible={isMaxSizeModalVisible}
        onClose={handleCloseMaxSizeModal}
        title={t("your_file_is_too_big")}
        classNameTitle="mt-[0]"
        descr={t("the_maximum_allowed_file_size_is_10MB")}
        classNameDescr="font-custom400 text-14 leading-[17px]"
        titleBtn={t("close")}
        onPress={handleCloseMaxSizeModal}
        classNameActionBtnText="text-13 leading-[16px] font-custom600"
        className="pb-[18] pt-[40]"
        classNameBtn="mt-[24]"
      />
    </SafeAreaView>
  )
}

export default MyServiceDetailDocumentsScreen

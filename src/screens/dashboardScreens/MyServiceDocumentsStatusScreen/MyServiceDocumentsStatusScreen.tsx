import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import MainModal from "components/MainModal"
import { Alert, FlatList, I18nManager, ListRenderItemInfo } from "react-native"
// Hooks & Redux
import { useTranslation } from "react-i18next"
// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { AdditionalDocumentType, ProAdditionalDocumentsType } from "types"
// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CheckCircleGreenIcon from "assets/icons/check-circle-green.svg"
import BigCheckedIcon from "assets/icons/check-mark-big.svg"
import { getUniqueAdditionalDocuments } from "utils/getUnicDocuments"
import { useGetProsServiceByIdQuery } from "services/api"

type Props = RootStackScreenProps<"my-service-detail-documents-status">

const MyServiceDocumentsStatusScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  const { service } = route.params
  // State
  const [isModalVisible, setModalVisible] = useState(false)
  const [targetId, setTargetId] = useState<number>()
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const { data } = useGetProsServiceByIdQuery(service.serviceCategory.id, {
    pollingInterval: 60000,
  })

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

  const handleGoResubmitDocumentsScreen = (
    item: ProAdditionalDocumentsType
  ) => {
    navigation.navigate("my-service-resubmit-screen", {
      service,
      document: item,
    })
  }
  // Hooks
  useEffect(() => {
    if (data) {
      navigation.setParams({ service: data })
    }
  }, [data])
  // Listeners
  // Render Methods
  const renderListItem = ({
    item,
    index,
  }: ListRenderItemInfo<ProAdditionalDocumentsType>) => {
    const isLastItem =
      index === (service.serviceCategory.additionalDocuments?.length ?? 0) - 1
    const documentStatus =
      service?.proAdditionalDocuments &&
      service.proAdditionalDocuments.length > 0
        ? item?.proDocument.status
        : undefined

    return (
      <>
        <DmView
          onPress={() => {
            if (documentStatus === "approved") {
              handleOpenModal(item.id)
            } else if (documentStatus === "rejected") {
              handleGoResubmitDocumentsScreen(item)
            }
          }}
          className={clsx("px-[18]", {
            "border-t-0.5 border-grey14": index >= 1,
          })}
        >
          <DmView className="my-[20] flex-row items-center">
            <DmView className="bg-red rounded-full w-[8] h-[8]" />
            <DmText className="ml-[8] mr-[23] text-13 leading-[29px] font-custom600">
              {t(item.additionalDocument.documentTitle)}
            </DmText>
            {documentStatus === "approved" && <CheckCircleGreenIcon />}
            {documentStatus === "rejected" && (
              <ActionBtn
                title={t("rejected")}
                variant="yellow"
                className={clsx("h-[22]")}
                textClassName={clsx(
                  I18nManager.isRTL && "mt-[-2]",
                  "text-10 leading-[13px] font-custom500"
                )}
              />
            )}
            {documentStatus === "pending" && (
              <ActionBtn
                title={t("pending")}
                variant="grey"
                className={clsx("h-[22]")}
                textClassName={clsx(
                  I18nManager.isRTL && "mt-[-2]",
                  "text-10 leading-[13px] font-custom500"
                )}
              />
            )}
          </DmView>
        </DmView>
      </>
    )
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <HeaderOnboarding isChevron className="border-b-0 px-[14]" />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <DmView className="px-[18]">
          <DmText className="mt-[5] text-22 leading-[30px] font-custom700">
            {t("service_documents")}:
          </DmText>
          <DmText className="mt-[4] text-13 leading-[20px] font-custom400">
            {t("the_following_documents_are_required_to_activate_this_service")}
            :
          </DmText>
        </DmView>
        <DmView>
          <FlatList
            data={getUniqueAdditionalDocuments(service.proAdditionalDocuments!)}
            renderItem={renderListItem}
            scrollEnabled={false}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <MainModal
        classNameModal="px-[24]"
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        Icon={<BigCheckedIcon />}
        descr={t("the_service_document_is_on_file")}
        classNameDescr="mt-[14] font-custom500 text-13 leading-[27px]"
        titleBtn={t("close")}
        onPress={handleCloseModal}
        classNameActionBtnText="text-13 leading-[16px] font-custom600"
        className="pt-[40]"
        classNameBtn="mt-[17]"
      />
    </SafeAreaView>
  )
}

export default MyServiceDocumentsStatusScreen

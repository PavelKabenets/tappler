import React, { useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import SelectDoPhotoModal from "components/SelectDoPhotoModal"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import SelectPhotosItem from "components/SelectPhotosItem"
import { FlatList } from "react-native"
// Hooks & Redux
import { useTranslation } from "react-i18next"
// Helpers & Types
import { ImageOrVideo } from "react-native-image-crop-picker"
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CameraIcon from "assets/icons/camera.svg"

type Props = RootStackScreenProps<"my-service-detail-photos">

const MyServiceDetailPhotosScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  const { service } = route.params
  // State
  const [isPhotoModalVisible, setPhotoModalVisible] = useState(false)
  const [photo, setPhoto] = useState<ImageOrVideo>()
  const [selectedPhotos, setSelectedPhotos] =
    useState<(ImageOrVideo | string)[]>()
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleClosePhotoModal = () => {
    setPhotoModalVisible(false)
  }
  const handleImgButtonPress = async () => {
    setPhotoModalVisible(true)
  }
  const handleDelete = (idx: number) => {
    setSelectedPhotos((prev) => prev?.filter((_, index) => idx !== index))
  }
  const handleSave = () => {
    navigation.navigate("wait", {
      title: t("document_received"),
      descr: t(
        "we_will_review_the_document_and_if_approved_your_service_will_be_activated"
      ),
      startHours: 2,
      endHours: 4,
      noneBorder: true,
      text13: true,
      onPressBack: () => navigation.navigate("my-services-detail", { service }),
    })
  }
  const onChangePhoto = (photo: ImageOrVideo | ImageOrVideo[] | undefined) => {
    if (Array.isArray(photo)) {
      setSelectedPhotos((prev) =>
        [...prev || [], ...photo].filter((_, index) => index < 6)
      )
    } else {
      if (photo) {
        setSelectedPhotos((prev) => [...(prev || []), photo])
      }
    }
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({
    item,
    index,
  }: {
    item: ImageOrVideo | string
    index: number
  }) => {
    return (
      <DmView onPress={() => handleDelete(index)}>
        {typeof item !== "string" && (
          <SelectPhotosItem
            item={item}
            resizeMode="cover"
            wrapperClassName={clsx(
              "mx-[15]",
              (index + 1) % 3 === 0 && "mx-[0]",
              (index + 3) % 3 === 0 && "mx-[0]"
            )}
          />
        )}
        {typeof item === "string" && (
          <SelectPhotosItem
            photoUrl={item}
            resizeMode="cover"
            wrapperClassName={clsx(
              "mx-[15]",
              (index + 1) % 3 === 0 && "mx-[0]",
              (index + 3) % 3 === 0 && "mx-[0]"
            )}
          />
        )}
      </DmView>
    )
  }

  const photosWithFooter = [...selectedPhotos || [], { isFooter: true }]

  const renderItem = ({
    item,
    index,
  }: {
    item: ImageOrVideo | { isFooter: boolean } | string
    index: number
  }) => {
    if (
      typeof item !== "string" &&
      "isFooter" in item &&
      (selectedPhotos?.length || 0) < 6
    ) {
      return (
        <DmView
          className={clsx(
            "px-[13] justify-center items-center border-0.3 border-black rounded-10",
            "mx-[15]",
            (index + 1) % 3 === 0 && "mx-[0]",
            (index + 3) % 3 === 0 && "mx-[0]"
          )}
          onPress={handleImgButtonPress}
          style={styles.item}
        >
          <CameraIcon width={40} height={40} />
          <DmText className="mt-[5] text-8 leading-[10px] text-center font-custom500">
            {t("upload_photos")}
          </DmText>
        </DmView>
      )
    }
    if (!(typeof item !== "string" && "isFooter" in item)) {
      return renderListItem({ item, index })
    }
    return null
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
            {t("upload_photos")}:
          </DmText>
          <DmText className="mt-[4] px-[18] text-13 leading-[20px] font-custom400">
            {t("the_following_documents_are_required_to_activate_this_service")}
            :
          </DmText>
          <DmView className="mt-[20] px-[18]">
            <DmView className="flex-row items-center">
              <DmView className="bg-red w-[8] h-[8] rounded-full" />
              <DmText className="mx-[8] text-13 leading-[20px] font-custom600">
                {t("personal_trainer_related_certificate")}
              </DmText>
            </DmView>
            <DmText className="text-13 leading-[20px] font-custom400">
              {t(
                "the_file_must_be_in_pdf_format_in_good_quality_with_a_maximum_size_of_5_mb"
              )}
            </DmText>
          </DmView>
          <DmView>
            <FlatList
              data={photosWithFooter}
              renderItem={renderItem}
              numColumns={3}
              scrollEnabled={false}
              contentContainerStyle={styles.contentContainerStyle}
              columnWrapperStyle={{ flex: 1 }}
            />
          </DmView>
        </DmView>
        <DmView className="px-[16]">
          <ActionBtn
            disable={!selectedPhotos || selectedPhotos.length === 0}
            onPress={handleSave}
            textClassName="text-13 leading-[16px] font-custom500"
            className="h-[47] rounded-0"
            title={t("submit_for_review")}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <SelectDoPhotoModal
        isVisible={isPhotoModalVisible}
        onClose={handleClosePhotoModal}
        selectedPhoto={photo}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setSelectedPhoto={onChangePhoto}
        isMultiple
        maxPhotos={6 - (selectedPhotos?.length || 0)}
        isPdf
      />
    </SafeAreaView>
  )
}

export default MyServiceDetailPhotosScreen

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
import SelectUploadPhotosComponent from "components/SelectUploadPhotosComponent"
import UploadPhotosComponent from "components/UploadPhotosComponent"

type Props = RootStackScreenProps<"my-service-qualification-credentials">

const MyServiceQualificationCredentialsScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  const { service } = route.params
  // State
  const [isPhotoModalVisible, setPhotoModalVisible] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(
    null
  )
  const [selectedPhotos, setSelectedPhotos] = useState<(ImageOrVideo | null)[]>([null, null, null])

  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleClosePhotoModal = () => {
    setPhotoModalVisible(false)
    setCurrentPhotoIndex(null)
  }
  const handleImgButtonPress = async (index: number) => {
    setPhotoModalVisible(true)
    setCurrentPhotoIndex(index)
  }
  const handleDelete = (idx: number) => {
    setSelectedPhotos((prev) =>
      prev.map((photo, index) => index === idx ? null : photo)
    )
  }
  const handleSave = () => {
    navigation.navigate("wait", {
      headerTitle: t("business_identity"),
      isBorder: true,
      title: t("we_have_received_your_information"),
      descr: t("we_will_verify_the_information_descr"),
      startHours: 4,
      endHours: 24,
      noneBorder: true,
      text13: true,
      onPressBack: () => navigation.navigate("my-services-detail", { service }),
    })
  }
  const onChangePhoto = (photo: ImageOrVideo | ImageOrVideo[] | undefined) => {
    if (Array.isArray(photo)) {
      const [firstPhoto] = photo
      photo = firstPhoto
    }
    if (photo && currentPhotoIndex !== null) {
      setSelectedPhotos((prev) =>
        prev.map((p, index) => index === currentPhotoIndex ? photo : p)
      )
      handleClosePhotoModal()
    }
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({
    item,
    index,
  }: {
    item: ImageOrVideo | null
    index: number
  }) => {
    return item ? (
      <SelectUploadPhotosComponent
        item={item}
        index={index}
        onDelete={() => handleDelete(index)}
      />
    ) : (
      <UploadPhotosComponent
        index={index}
        onPress={handleImgButtonPress}
        text={t("upload_photos")}
      />
    )
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <HeaderOnboarding
        isChevron
        className="px-[14]"
        title={t("place_of_service")}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <DmView className="mt-[20] px-[14]">
          <DmView>
            <DmText className="text-20 leading-[24px] font-custom600">
              {t("qualification_credentials")}
            </DmText>
          </DmView>
          <DmView>
            <DmText className="mt-[10] text-13 leading-[20px] font-custom400">
              {t(
                "qualification_credentials_are_essential_for_professionals_descr"
              )}
            </DmText>
          </DmView>
          <DmView>
            <DmView className="mt-[33]">
              <DmText className="text-15 leading-[19px] font-custom600">
                {t("upload_up_to_count_photos", { number: 3 })}
              </DmText>
            </DmView>
            <DmView>
              <FlatList
                data={selectedPhotos}
                renderItem={renderListItem}
                numColumns={3}
                scrollEnabled={false}
                contentContainerStyle={styles.contentContainerStyle}
                columnWrapperStyle={{ flex: 1 }}
                keyExtractor={(_, index) => index.toString()}
              />
            </DmView>
          </DmView>
        </DmView>
        <DmView className="px-[20]">
          <ActionBtn
            disable={selectedPhotos.every((photo) => photo === null)}
            onPress={handleSave}
            textClassName="text-13 leading-[16px] font-custom600"
            className="h-[47] rounded-5"
            title={t("upload")}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <SelectDoPhotoModal
        isVisible={isPhotoModalVisible}
        onClose={handleClosePhotoModal}
        selectedPhoto={selectedPhotos[currentPhotoIndex ?? 0] || undefined}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setSelectedPhoto={onChangePhoto}
        isMultiple={false}
        maxPhotos={1}
        isPdf
      />
    </SafeAreaView>
  )
}

export default MyServiceQualificationCredentialsScreen

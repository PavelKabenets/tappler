import React, { useLayoutEffect, useState } from "react"
// Components
import { useForm } from "react-hook-form"
import { ActionBtn, DmText, DmView } from "components/UI"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import SelectPhotosItem from "components/SelectPhotosItem"
import HeaderOnboarding from "components/HeaderOnboarding"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import SelectDoPhotoModal from "components/SelectDoPhotoModal"
// Hooks & Redux
import { useTypedSelector } from "store"
import { useTranslation } from "react-i18next"
import { photosData } from "data/registrationFlowData"
// Helpers & Types
import { FlatList } from "react-native"
import { RootStackScreenProps } from "navigation/types"
import { ImageOrVideo } from "react-native-image-crop-picker"
// Libs & Utils
// Styles & Assets
import styles from "./styles"
import clsx from "clsx"
import CloseIcon from "assets/icons/close.svg"
import CameraIcon from "assets/icons/camera.svg"

import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

type Props = RootStackScreenProps<"my-profile-photos-of-works">

interface FormData {
  photos: (string | ImageOrVideo)[]
}

const MyProfilePhotosOfMyWorksScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const { profileParams } = route.params
  const { user } = useTypedSelector((store) => store.auth)
  const [selectedPhotos, setSelectedPhotos] =
    useState<(ImageOrVideo | string)[]>()

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm<FormData>({
    defaultValues: {
      photos: user?.photosOfWork,
    },
  })

  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const [photo, setPhoto] = useState<ImageOrVideo>()
  const [isModalVisible, setModalVisible] = useState(false)

  const handleSave = () => {
    navigation.navigate("my-profile", {
      profileParams: { ...profileParams, photosOfWorks: selectedPhotos },
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
  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleImgButtonPress = async () => {
    setModalVisible(true)
  }

  const handleDelete = (idx: number) => {
    setSelectedPhotos((prev) => prev?.filter((_, index) => idx !== index))
  }

  useLayoutEffect(() => {
    setSelectedPhotos(profileParams?.photosOfWorks)
  }, [profileParams?.photosOfWorks])

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
      <HeaderOnboarding
        className="px-[15] border-0"
        title={t("profile_settings")}
        onBackComponent={<CloseIcon />}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <DmView className="mb-[48] mt-[24] flex-1">
          <DmView>
            <DmView className="px-[14]">
              <TitleRegistrationFlow
                title={t("photos_of_your_work")}
                descr={t("pictures_are_one_of_the_descr")}
                classNameDescr="leading-[20px]"
                descrRight={`(${t("optional")})`}
              />
              <TitleRegistrationFlow
                className="mt-[15]"
                title={t("some_helpful_tips")}
                classNameTitle="text-13 leading-[16px]"
                descrArray={photosData}
              />
              <TitleRegistrationFlow
                className="mt-[15]"
                title={t("important_note")}
                classNameTitle="text-13 leading-[16px] text-red"
                descr={t(
                  "promotional_photos_are_not_allowed_and_will_be_deleted"
                )}
              />
            </DmView>
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
        <DmView className="px-[20] pt-[17]">
          <ActionBtn
            textClassName="text-13 leading-[16px] font-custom600"
            className="h-[47] rounded-5"
            title={t("save")}
            onPress={handleSubmit(handleSave)}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <SelectDoPhotoModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        selectedPhoto={photo}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setSelectedPhoto={onChangePhoto}
        isMultiple
        maxPhotos={6 - (selectedPhotos?.length || 0)}
      />
    </SafeAreaView>
  )
}

export default MyProfilePhotosOfMyWorksScreen

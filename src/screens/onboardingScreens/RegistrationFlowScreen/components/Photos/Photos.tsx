import React, { useEffect, useLayoutEffect, useState } from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker"
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"

import { ResultFlowDataType } from "types"
import { photosData } from "data/registrationFlowData"

import styles from "./styles"
import CameraIcon from "assets/icons/camera.svg"
import { FlatList, Platform } from "react-native"
import SelectPhotosItem from "components/SelectPhotosItem"
import clsx from "clsx"
import { openAlert } from "utils/goSettigsAlert"

interface Props {
  result: ResultFlowDataType
  onChangeResult: (obj: ResultFlowDataType) => void
  onScrollToBottom: () => void
  step: number
}

const Photos: React.FC<Props> = ({
  onChangeResult,
  result,
  step,
  onScrollToBottom,
}) => {
  const [selectedPhotos, setSelectedPhotos] = useState<ImageOrVideo[]>()
  const [permission, setPermission] = useState("")

  const { t } = useTranslation()

  const handleImgButtonPress = async () => {
    let permissionRequest = await request(
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.IOS.PHOTO_LIBRARY
    )

    if (permissionRequest === "unavailable") {
      permissionRequest = await request(
        Platform.OS === "android"
          ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          : PERMISSIONS.IOS.PHOTO_LIBRARY
      )
    }

    if (
      permissionRequest === RESULTS.GRANTED ||
      permissionRequest === RESULTS.LIMITED
    ) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        multiple: true,
        compressImageQuality: 0.3,
        compressImageFormat: "jpeg",
        maxFiles: 6 - (selectedPhotos?.length || 0),
      }).then((images) => {
        setSelectedPhotos((prev) =>
          prev?.length
            ? [...prev, ...images.map((item) => item)].filter(
                (_, idx) => idx < 6
              )
            : images.map((item) => item).filter((_, idx) => idx < 6)
        )
        setTimeout(() => {
          onScrollToBottom()
        }, 100)
      })
    } else if (
      (permissionRequest === "blocked" || permissionRequest === "denied") &&
      permission === "blocked"
    ) {
      openAlert({
        title: t("permission_denied"),
        descr: t("please_grant_permission_descr"),
        btnText: t("settings"),
        cancelText: t("cancel"),
      })
    }
    setPermission(permissionRequest)
  }

  const handleItemPress = (item: ImageOrVideo) => {
    setSelectedPhotos((prev) =>
      prev?.filter((filtelrItem) => filtelrItem.path !== item.path)
    )
  }

  const handleDelete = (idx: number) => {
    setSelectedPhotos((prev) => prev?.filter((_, index) => idx !== index))
  }

  useEffect(() => {
    if (result?.photos) {
      setSelectedPhotos(result.photos)
    }
  }, [step === 6])

  useLayoutEffect(() => {
    onChangeResult({ isValid: !!selectedPhotos?.length })
  }, [selectedPhotos])

  useEffect(() => {
    return () => {
      onChangeResult({ photos: selectedPhotos })
    }
  }, [selectedPhotos])

  const renderListItem = ({
    item,
    index,
  }: {
    item: ImageOrVideo
    index: number
  }) => {
    return (
      <DmView onPress={() => handleDelete(index)}>
        <SelectPhotosItem
          item={item}
          resizeMode="cover"
          wrapperClassName={clsx(
            "mx-[15]",
            (index + 1) % 3 === 0 && "mx-[0]",
            (index + 3) % 3 === 0 && "mx-[0]"
          )}
        />
      </DmView>
    )
  }

  const photosWithFooter = [...selectedPhotos || [], { isFooter: true }]

  const renderItem = ({
    item,
    index,
  }: {
    item: ImageOrVideo | { isFooter: boolean }
    index: number
  }) => {
    if ("isFooter" in item && (selectedPhotos?.length || 0) < 6) {
      return (
        <DmView
          className={clsx(
            "px-[13] justify-center items-center border-1 border-grey31 rounded-10",
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
    if (!("isFooter" in item)) {
      return renderListItem({ item, index })
    }
    return null
  }

  return (
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
            descr={t("promotional_photos_are_not_allowed_and_will_be_deleted")}
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
  )
}

export default Photos

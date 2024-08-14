import React, { Dispatch, SetStateAction, useEffect, useState } from "react"

import { ActionBtn, DmText, DmView } from "components/UI"

import styles from "./styles"
import MainModal from "components/MainModal"
import {
  useCheckCameraPermissions,
  useCheckGallery,
  useRequestCameraPermissions,
  useRequestGallery,
} from "hooks/permissionHooks"
import { useTranslation } from "react-i18next"
import { openAlert } from "utils/goSettigsAlert"
import ImageCropPicker, { ImageOrVideo } from "react-native-image-crop-picker"
import { useFocusEffect } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { pick, types } from "react-native-document-picker"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import CameraRedIcon from "assets/icons/camera-red.svg"
import GalleryIcon from "assets/icons/gallery.svg"
import ChooseFile from "assets/icons/trade-license.svg"
import clsx from "clsx"

interface Props {
  isVisible: boolean
  onClose: () => void
  selectedPhoto?: ImageOrVideo | ImageOrVideo[]
  setSelectedPhoto:
    | Dispatch<SetStateAction<ImageOrVideo | undefined>>
    | Dispatch<SetStateAction<ImageOrVideo[] | undefined>>
  cropTitle?: string
  isMultiple?: boolean
  isPdf?: boolean
  cropping?: boolean
  width?: number
  height?: number
  maxPhotos?: number
  isPdfOnly?: boolean
}

const SelectDoPhotoModal: React.FC<Props> = ({
  isVisible,
  onClose,
  setSelectedPhoto,
  selectedPhoto,
  cropTitle,
  isMultiple = false,
  cropping = true,
  isPdf,
  width = 400,
  height = 400,
  maxPhotos,
  isPdfOnly,
}) => {
  const [isCameraPermissionGranded, setCameraPermissionGranded] = useState(true)
  const [isGalleryPermissionGranded, setGalleryPermissionGranded] =
    useState(true)

  const requestCameraPermission = useRequestCameraPermissions
  const requestGallery = useRequestGallery
  const checkCameraPermission = useCheckCameraPermissions
  const checkGalleryPermission = useCheckGallery

  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const onCameraRequest = async () => {
    onClose()

    if (!isCameraPermissionGranded) {
      setTimeout(() => {
        openAlert({
          title: t("permission_denied"),
          descr: t("please_grant_permission_descr"),
          btnText: t("settings"),
          cancelText: t("cancel"),
        })
      }, 400)
    }
    if (isCameraPermissionGranded) {
      const res = await requestCameraPermission()

      if (res) {
        setCameraPermissionGranded(true)
        setTimeout(() => {
          ImageCropPicker.openCamera({
            width,
            height,
            cropping: false,
          }).then((image) => {
            setSelectedPhoto(
              image as SetStateAction<ImageOrVideo | undefined> &
                SetStateAction<ImageOrVideo[] | undefined>
            )
          })
        }, 400)
      } else {
        setCameraPermissionGranded(false)
      }
    }
  }

  const onGaleryRequest = async () => {
    onClose()

    if (!isGalleryPermissionGranded) {
      setTimeout(() => {
        openAlert({
          title: t("permission_denied"),
          descr: t("please_grant_permission_descr"),
          btnText: t("settings"),
          cancelText: t("cancel"),
        })
      }, 400)
    }

    if (isGalleryPermissionGranded) {
      const res = await requestGallery()

      if (res) {
        setGalleryPermissionGranded(true)
        setTimeout(() => {
          ImageCropPicker.openPicker({
            width,
            height,
            cropping,
            multiple: isMultiple,
            cropperToolbarTitle: cropTitle,
            maxFiles: maxPhotos,
          }).then((image: unknown) => {
            if (isMultiple) {
              setSelectedPhoto(
                (image as ImageOrVideo[]).map((item) => item) as SetStateAction<
                  ImageOrVideo | undefined
                > &
                  SetStateAction<ImageOrVideo[] | undefined>
              )
            } else {
              setSelectedPhoto(
                image as ImageOrVideo as SetStateAction<
                  ImageOrVideo | undefined
                > &
                  SetStateAction<ImageOrVideo[] | undefined>
              )
            }
          })
        }, 700)
      } else {
        setGalleryPermissionGranded(false)
      }
    }
  }

  const docPicker = async () => {
    onClose()
    await setTimeout(async () => {
      try {
        const [result] = await pick({
          mode: "open",
          type: [types.pdf],
        })

        const res = {
          mime: result.type,
          filename: result.name,
          path: result.uri,
          size: result.size
        } as Partial<ImageOrVideo>

        setSelectedPhoto(
          res as SetStateAction<ImageOrVideo | undefined> &
            SetStateAction<ImageOrVideo[] | undefined>
        )
      } catch (e) {
        console.log("Doc error", e)
      }
    }, 500)
  }

  useEffect(() => {
    if (isVisible) {
      const asyncFunc = async () => {
        if (!isGalleryPermissionGranded) {
          const resGallery = await checkGalleryPermission()

          if (resGallery) {
            setGalleryPermissionGranded(true)
          }
        }
        if (!isCameraPermissionGranded) {
          const resCamera = await checkCameraPermission()

          if (resCamera) {
            setCameraPermissionGranded(true)
          }
        }
      }
      asyncFunc()
    }
  }, [isVisible])

  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      descrOutSide={t(
        isPdf
          ? "choose_one_of_the_following_descr"
          : "choose_one_of_the_following_photo_descr"
      )}
      titleOutSide={t(isPdf ? "upload_document" : "upload_photo")}
      classNameModal="px-[0] flex-1 justify-end"
      className="pr-[30] pt-[25] pb-[0] pl-[0]"
      classNameWrapperHight="rounded-b-0"
    >
      <DmView
        style={{
          paddingBottom:
            insets.bottom > 24
              ? insets.bottom - (insets.bottom - 24)
              : 24 - insets.bottom,
        }}
      >
        {!isPdfOnly && (
          <>
            <TitleRegistrationFlow
              className="pl-[14] pb-[28]"
              title={t("take_a_photo")}
              descr={t("take_a_photo_by_your_phone")}
              IconRight={<CameraRedIcon />}
              onPress={onCameraRequest}
            />
            <TitleRegistrationFlow
              className={clsx(
                "pl-[14] py-[28] border-t-1 border-grey32",
                isPdf && "border-b-1"
              )}
              title={t("photos_gallery")}
              descr={t("choose_a_photo_from_your_photos_gallery")}
              IconRight={<GalleryIcon />}
              onPress={onGaleryRequest}
            />
          </>
        )}
        {(isPdf || isPdfOnly) && (
          <TitleRegistrationFlow
            descr={t("upload_PDF_file")}
            className={clsx("pl-[14] py-[28]", isPdfOnly && "pt-[0]")}
            title={t("choose_file")}
            IconRight={<ChooseFile />}
            onPress={docPicker}
          />
        )}
      </DmView>
    </MainModal>
  )
}

export default SelectDoPhotoModal

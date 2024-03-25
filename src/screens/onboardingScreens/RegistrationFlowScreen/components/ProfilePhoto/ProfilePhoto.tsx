import React, { useEffect, useLayoutEffect, useState } from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"
import { Image, Platform } from "react-native"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import ImagePicker from "react-native-image-crop-picker"
import { request, PERMISSIONS, RESULTS } from "react-native-permissions"

import { ResultFlowDataType } from "types"

import styles from "./styles"
import {
  profileCompanyPhotoData,
  profilePhotoData,
} from "data/registrationFlowData"
import CameraIcon from "assets/icons/camera.svg"
import photo1 from "assets/images/photo1.png"
import photo2 from "assets/images/photo2.png"
import photo3 from "assets/images/photo3.png"
import photo4 from "assets/images/photo4.png"
import photob1 from "assets/images/photob1.png"
import photob2 from "assets/images/photob2.png"
import photob3 from "assets/images/photob3.png"
import photob4 from "assets/images/photob4.png"
import CloseIcon from "assets/icons/close.svg"
import { openAlert } from "utils/goSettigsAlert"
import clsx from "clsx"

interface Props {
  result: ResultFlowDataType
  onChangeResult: (obj: ResultFlowDataType) => void
  step: number
}

const ProfilePhoto: React.FC<Props> = ({ onChangeResult, result, step }) => {
  const [selectedPhoto, setSelectedPhoto] = useState("")
  const [permission, setPermission] = useState("")

  const { t, i18n } = useTranslation()

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
        cropping: true,
        cropperToolbarTitle: t("profile_photo"),
      }).then((image) => {
        setSelectedPhoto(image.path)
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

  useEffect(() => {
    if (result?.profilePhoto) {
      setSelectedPhoto(result.profilePhoto)
    }
  }, [step === 3])

  useLayoutEffect(() => {
    onChangeResult({ isValid: !!selectedPhoto })
  }, [selectedPhoto])

  useEffect(() => {
    return () => {
      onChangeResult({ profilePhoto: selectedPhoto })
    }
  }, [selectedPhoto])

  return (
    <DmView
      className={clsx(
        "pb-[16] mt-[19] px-[14] flex-1 justify-between",
        i18n.language === "ar" && "mt-[5]"
      )}
    >
      <DmView>
        <TitleRegistrationFlow
          title={t("profile_photo")}
          descr={t(
            result?.accoutType === "company"
              ? "the_profile_photo_is_the_first_descr"
              : "the_profile_photo_the_descr"
          )}
        />
        <TitleRegistrationFlow
          className={clsx("mt-[19]", i18n.language === "ar" && "mt-[5]")}
          title={t("some_helpful_tips")}
          classNameTitle="text-13 leading-[16px]"
          descrArray={
            result?.accoutType === "company"
              ? profileCompanyPhotoData
              : profilePhotoData
          }
        />
        <DmView
          className={clsx(
            "mt-[32] items-center",
            i18n.language === "ar" && "mt-[27]"
          )}
        >
          <DmView className="self-center">
            <DmView
              className="border-0.3 border-black rounded-10 items-center justify-center overflow-hidden"
              style={!selectedPhoto ? styles.photoBtn : styles.activePhoto}
              onPress={handleImgButtonPress}
            >
              {!selectedPhoto && (
                <DmView
                  className="pt-[24] pb-[18] px-[13] items-center"
                  onPress={handleImgButtonPress}
                >
                  <CameraIcon />
                  <DmText className="mt-[10] text-11 text-center font-custom600">
                    {t("upload_profile_photo")}
                  </DmText>
                </DmView>
              )}
              {!!selectedPhoto && (
                <DmView onPress={handleImgButtonPress}>
                  <Image
                    source={{ uri: selectedPhoto }}
                    style={styles.activePhoto}
                  />
                </DmView>
              )}
            </DmView>
            {!!selectedPhoto && (
              <DmView
                onPress={() => setSelectedPhoto("")}
                className="absolute top-[-11] right-[-11] bg-white w-[20] h-[20] items-center justify-center rounded-full border-0.5"
              >
                <CloseIcon width={8} height={8} />
              </DmView>
            )}
          </DmView>
        </DmView>
      </DmView>
      {!selectedPhoto && (
        <DmView>
          <DmText className="mt-[28] text-13 leading-[16px] font-custom600 text-center">
            {t(
              result?.accoutType === "company"
                ? "examples_of_business_profile_photos"
                : "good_photo_examples"
            )}
          </DmText>
          <DmView className="mt-[6] flex-row justify-between items-center">
            <Image
              source={result?.accoutType === "company" ? photob2 : photo4}
              style={styles.examplePhoto}
            />
            <Image
              source={result?.accoutType === "company" ? photob1 : photo3}
              style={styles.examplePhoto}
            />
            <Image
              source={result?.accoutType === "company" ? photob4 : photo1}
              style={styles.examplePhoto}
            />
            <Image
              source={result?.accoutType === "company" ? photob3 : photo2}
              style={styles.examplePhoto}
            />
          </DmView>
        </DmView>
      )}
    </DmView>
  )
}

export default ProfilePhoto

import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import SelfieIcon from "assets/icons/selfie.svg"
import SelfieFrameIcon from "assets/icons/selfie-frame.svg"
import { Image } from "react-native"
import {
  usePostDocumentMutation,
  usePostProfilePhotoMutation,
} from "services/api"

type Props = RootStackScreenProps<"my-documents-selfie">

const MyDocumentsSelfieScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { idDocumentData, frontPhoto, backPhoto, selfiePhoto } = route.params
  // State
  const [params, setParams] = useState({
    idDocumentData,
    frontPhoto,
    backPhoto,
    selfiePhoto,
  })
  const [isLoading, setLoading] = useState(false)
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const [postImg] = usePostProfilePhotoMutation()
  const [postDoc] = usePostDocumentMutation()
  // Refs
  // Methods
  // Handlers
  const handlePressPhoto = () => {
    if (params.selfiePhoto) {
      return setParams((prev) => ({ ...prev, selfiePhoto: undefined }))
    }
    navigation.navigate("camera", { type: "selfie" })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const frontImg = await postImg(params.frontPhoto).unwrap()
      const backImg = await postImg(params.backPhoto).unwrap()
      const selfie = await postImg(params.selfiePhoto).unwrap()

      const res = await postDoc({
        type: "id",
        idDocumentData: params.idDocumentData,
        files: [
          {
            assignment: "id.front",
            fileKey: frontImg.storageKey,
          },
          {
            assignment: "id.back",
            fileKey: backImg.storageKey,
          },
          {
            assignment: "id.selfie",
            fileKey: selfie.storageKey,
          },
        ],
      }).unwrap()
      navigation.navigate("wait", {
        endHours: 12,
        headerTitle: t("identity_verification"),
        descr: t("we_will_verify_the_information"),
        documents: Array.isArray(res) ? res : [res],
      })
    } catch (e) {
      console.log("Upload Document Error: ", e)
    } finally {
      setLoading(false)
    }
  }
  // Hooks
  useEffect(() => {
    if (selfiePhoto) {
      setParams((prev) => ({ ...prev, selfiePhoto }))
    }
  }, [selfiePhoto])

  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between "
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <DmView>
        <HeaderOnboarding
          className="px-[23] border-b-0 pb-[0]"
          onBackComponent={<CloseIcon />}
        />
        <TitleRegistrationFlow
          title={t("your_selfie_photo")}
          className="px-[14] mt-[34] text-20 leading-[24px] "
          descr={t("take_a_selfie_photo_and_make")}
          classNameDescr="mt-[6] text-13 leading-[20px] font-custom400"
        />
        <DmView
          className="mt-[69] items-center justify-center"
          onPress={handlePressPhoto}
        >
          {!params.selfiePhoto && (
            <>
              <DmView className="absulute">
                <SelfieFrameIcon />
              </DmView>
              <DmView className="absolute">
                <SelfieIcon />
              </DmView>
            </>
          )}
          {params.selfiePhoto && (
            <Image
              source={{ uri: params.selfiePhoto }}
              style={{ width: 176, height: 192 }}
              resizeMode="cover"
            />
          )}
        </DmView>
        {!params.selfiePhoto && (
          <DmText className="mt-[12] text-13 leading-[16px] font-custom500 text-center">
            {t("tap_on_the_photo_to_start")}
          </DmText>
        )}
      </DmView>
      {params.selfiePhoto && (
        <ActionBtn
          title={t("continue")}
          className="mx-[14] mt-[8] rounded-5"
          textClassName="text-13 leading-[16px] font-custom600"
          onPress={handleSubmit}
          disable={!params.selfiePhoto || isLoading}
          isLoading={isLoading}
        />
      )}
    </SafeAreaView>
  )
}

export default MyDocumentsSelfieScreen

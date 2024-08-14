import React, { useState } from "react"
// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import SelectDoPhotoModal from "components/SelectDoPhotoModal"
import { Image } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// Hooks & Redux
import { useTypedSelector } from "store"
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
// Helpers & Types
import { ImageOrVideo } from "react-native-image-crop-picker"
import { RootStackScreenProps } from "navigation/types"
// Libs & Utils

// Styles & Assets
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import CameraIcon from "assets/icons/camera.svg"
import { MediaTypeCredentials } from "types"

type Props = RootStackScreenProps<"my-profile-choose-account-type">

interface FormData {
  credential?: string
}

const MyProfileQualificationCredentialsScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  // State
  const { profileParams } = route.params
  const [photo, setPhoto] = useState<ImageOrVideo>()
  const [isModalVisible, setModalVisible] = useState(false)
  const { user } = useTypedSelector((store) => store.auth)
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      credential: "",
    },
  })

  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const handleSave = () => {
    if (getValues("credential") && photo) {
      navigation.navigate("my-profile", {
        profileParams: {
          ...profileParams,
          credential: [
            ...profileParams?.credential || [],
            { credential: getValues("credential"), photo },
          ],
        },
      })
    }
  }

  const handleImgPress = () => {
    setModalVisible(true)
  }
  const handleCloseModal = () => {
    setModalVisible(false)
  }
  const handleDeleteImg = () => {
    setPhoto(undefined)
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <HeaderOnboarding
        className="px-[15] border-0"
        onBackComponent={<CloseIcon />}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <DmView className="mt-[11] px-[15]">
          <DmText className="text-20 leading-[24px] font-custom600">
            {t("qualification_credentials")}
          </DmText>
          <DmText className="text-13 leading-[17px] font-custom400 mt-[2]">
            {t("provide_information_regarding_your_credentials")}
          </DmText>
          <DmText className="text-13 leading-[17px] font-custom600 mt-[16]">
            {t("credential_name")}
          </DmText>
          <DmView className="pt-[6]">
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <DmInput
                  className="h-[47]"
                  isAnimText={false}
                  value={value}
                  placeholder={t("example_certified_personal_trainer_etc")}
                  inputClassName="text-13 leading-[16px] font-custom400"
                  classNamePlaceholder="text-13 leading-[15px] font-custom400"
                  onChangeText={onChange}
                />
              )}
              name="credential"
            />
          </DmView>
          <DmView className="my-[20] overflow-hidden">
            {!photo && (
              <DmView
                onPress={handleImgPress}
                className="my-[44] mx-[77] justify-center border-1 rounded-10 border-black items-center py-[21]"
              >
                <DmView>{<CameraIcon />}</DmView>
                <DmText className="text-11 leading-[14px] font-custom600 mt-[15]">
                  {t("credential_photo")}
                </DmText>
              </DmView>
            )}
            {photo && (
              <DmView className="mt-[15] ml-[77] mr-[70]">
                <DmView
                  onPress={handleDeleteImg}
                  className="absolute top-[-15] right-[-15] w-[29] h-[29] rounded-full border-1 border-grey2 bg-white items-center z-10 justify-center"
                >
                  <CloseIcon />
                </DmView>
                <Image
                  source={{ uri: photo.path }}
                  style={{ width: 231, height: 188 }}
                />
              </DmView>
            )}
          </DmView>
        </DmView>
        <DmView className="px-[20]">
          <ActionBtn
            textClassName="text-13 leading-[16px] font-custom600"
            className="h-[47] rounded-5"
            title={t("save")}
            onPress={() => handleSubmit(handleSave)()}
            disable={!isValid}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <SelectDoPhotoModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        selectedPhoto={photo}
        setSelectedPhoto={setPhoto}
        isPdf
      />
    </SafeAreaView>
  )
}

export default MyProfileQualificationCredentialsScreen

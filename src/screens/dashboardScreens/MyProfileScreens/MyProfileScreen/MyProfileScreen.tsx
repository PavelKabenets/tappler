import React, { useState } from "react"
// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import HeaderOnboarding from "components/HeaderOnboarding"
import MyProfileSettingsComponent from "components/MyProfileSettingsComponent"
import MyProfileSettingsCheckboxComponent from "components/MyProfileSettingsCheckboxComponent"
import SelectDoPhotoModal from "components/SelectDoPhotoModal"
import MainModal from "components/MainModal"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { Shadow } from "react-native-shadow-2"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useTypedSelector } from "store"
// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { hexToRGBA } from "helpers/helpers"
import { ImageOrVideo } from "react-native-image-crop-picker"
// Libs & Utils
// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import colors from "styles/colors"
import {
  usePatchProsMutation,
  usePostMultiPhotoMutation,
  usePostProfilePhotoMutation,
} from "services/api"
import { PostProfilePhotoResponse } from "services"

type Props = RootStackScreenProps<"my-profile">

const MyProfileScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { profileParams } = route.params

  // State
  const [isModalSaveDataVisible, setModalSaveDataVisible] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [photo, setPhoto] = useState<ImageOrVideo>()
  const [isModalVisible, setModalVisible] = useState(false)
  // Global Store
  const { user } = useTypedSelector((store) => store.auth)

  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const [patchPros] = usePatchProsMutation()
  const [postProfilePhoto] = usePostProfilePhotoMutation()
  const [postMultiPhoto] = usePostMultiPhotoMutation()
  // Refs
  // Methods
  // Handlers
  const handleGoProfilePhotoScreen = () => {
    setModalVisible(true)
  }
  const handleGoChooseAccountTypeScreen = () => {
    navigation.navigate("my-profile-choose-account-type", { profileParams })
  }
  const handleGoAboutMeScreen = () => {
    navigation.navigate("my-profile-about-me", { profileParams })
  }
  const handleGoPhotosOfMyWorksScreen = () => {
    navigation.navigate("my-profile-photos-of-works", { profileParams })
  }
  const handleGoProfileBusinessHoursScreen = () => {
    navigation.navigate("my-profile-business-hours", { profileParams })
  }
  const handleGoProfilePaymentsMethodsScreen = () => {
    navigation.navigate("my-profile-payments-methods", { profileParams })
  }
  const handleGoProfileSocialMediaLinksScreen = () => {
    navigation.navigate("my-profile-social-media-links", { profileParams })
  }
  const handleGoProfileQualificationCredentialsScreen = () => {
    navigation.navigate("my-profile-qualification-credentials", {
      profileParams,
    })
  }
  const handleOpenModalSaveData = () => {
    if (hasChanges) {
      setModalSaveDataVisible(true)
    } else {
      navigation.goBack()
    }
  }

  const handleHideModalSaveData = () => {
    setModalSaveDataVisible(false)
  }
  const handleCloseModalSaveData = () => {
    setModalSaveDataVisible(false)
    navigation.navigate("setting")
  }
  const handleCloseModal = () => {
    setModalVisible(false)
  }
  const handleDeleteImg = (indexToDelete: number) => {
    navigation.setParams({
      profileParams: {
        ...profileParams,
        credential: profileParams?.credential?.filter(
          (_, index) => index !== indexToDelete
        ),
      },
    })
  }

  const handleSubmit = async () => {
    try {
      let resPhoto
      if (photo) {
        resPhoto = await postProfilePhoto(photo).unwrap()
      }

      let resPhotos: PostProfilePhotoResponse[] = []

      if (profileParams.photosOfWorks) {
        resPhotos = await postMultiPhoto(
          profileParams?.photosOfWorks.filter(
            (item) => typeof item !== "string"
          ) as ImageOrVideo[]
        ).unwrap()
      }

      await patchPros({
        businessName: profileParams.businessName,
        proType: profileParams.proType,
        paymentMethods: profileParams.payment,
        photosOfWork: resPhotos?.map((item) => item.storageKey),
        profilePhoto:
          resPhoto?.storageKey || user?.profilePhoto?.split("/").pop(),
        informationAbout: profileParams.informationAbout,
      }).unwrap()
      navigation.goBack()
    } catch (e) {
      console.log("Patch Pros Error: ", e)
    }
  }
  // Listeners
  // Render Methods
  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <HeaderOnboarding
        className="px-[15]"
        isChevron
        title={t("profile_settings")}
        // isRightIconDisable={true}
        Icon={
          <DmText className="text-13 leading-[16px] font-custom600 text-red">
            {t("save")}
          </DmText>
        }
        onGoBackPress={handleOpenModalSaveData}
        onPressIcon={handleSubmit}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <MyProfileSettingsComponent
          className="pt-[12] pb-[20]"
          title={t("profile_photo")}
          photo
          currentPhoto={photo}
          onPress={handleGoProfilePhotoScreen}
        />

        <MyProfileSettingsComponent
          title={t("profile_type")}
          subtitle={profileParams?.proType}
          Icon={true}
          onPress={handleGoChooseAccountTypeScreen}
        />
        <MyProfileSettingsComponent
          title={t("about_me")}
          className="pt-[16] pb-[40]"
          subtitle={profileParams?.informationAbout}
          Icon={true}
          onPress={handleGoAboutMeScreen}
        />
        <MyProfileSettingsComponent
          title={t("photos_of_my_work")}
          className="py-[17] px-[0]"
          classNameHeader="pl-[15] pr-[19]"
          subtitleArr={profileParams?.photosOfWorks}
          Icon={true}
          onPress={handleGoPhotosOfMyWorksScreen}
        />
        <MyProfileSettingsCheckboxComponent
          title={t("business_hours")}
          className="pb-[15]"
          subtitleArrHours={profileParams?.hours}
          Icon
          onPress={handleGoProfileBusinessHoursScreen}
        />
        <MyProfileSettingsCheckboxComponent
          title={t("payment_methods")}
          className="pt-[20] pb-[33]"
          checkIcon
          subtitleArr={profileParams?.payment}
          Icon
          onPress={handleGoProfilePaymentsMethodsScreen}
        />
        <MyProfileSettingsCheckboxComponent
          title={t("social_media_links")}
          className="py-[12]"
          subtitleArrMedia={profileParams?.media}
          Icon
          onPress={handleGoProfileSocialMediaLinksScreen}
        />
        <MyProfileSettingsComponent
          title={t("qualification_credentials")}
          className="border-b-0 pt-[11] pb-[13]"
          subtitle={t("add_copies_of_your_license_or_certifications")}
          subtitleArrCredential={profileParams?.credential}
          Btn
          onDeleteImg={handleDeleteImg}
          onPress={handleGoProfileQualificationCredentialsScreen}
        />
      </KeyboardAwareScrollView>
      <DmView className="items-center">
        <DmView className="absolute bottom-[45]">
          <Shadow
            style={{ borderRadius: 5 }}
            distance={6}
            startColor={hexToRGBA(colors.grey46, 0.1)}
            offset={[0, 3]}
          >
            <ActionBtn
              className="h-[42] rounded-5 px-[40]"
              title={t("view_profile")}
              textClassName="text-13 leading-[21px] font-custom600"
            />
          </Shadow>
        </DmView>
      </DmView>
      <MainModal
        isVisible={isModalSaveDataVisible}
        title={t("unsaved_changes")}
        className="px-[5] pt-[39] pb-[37]"
        classNameTitle="mt-[0] text-20 leading-[29px] font-custom600"
        classNameDescr="mt-[5] mx-[61] text-13 leading-[20px] font-custom500"
        isBtnsTwo
        classNameBtns="mt-[26] h-[40]"
        titleBtn={t("save")}
        titleBtnSecond={t("discard")}
        classNameBtnsWrapper="mx-[38]"
        onPress={handleHideModalSaveData}
        onClose={handleCloseModalSaveData}
        descr={t("do_you_want_to_save_the_changes_to_your_profile")}
      />
      <SelectDoPhotoModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        selectedPhoto={photo}
        setSelectedPhoto={setPhoto}
      />
    </SafeAreaView>
  )
}

export default MyProfileScreen

import React from "react"
// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import MyProfileMediaLinksComponent from "components/MyProfileMediaLinksComponent"

// Hooks & Redux
import { useTypedSelector } from "store"
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"

// Helpers & Types
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { RootStackScreenProps } from "navigation/types"
import { MediaType } from "types"
// Libs & Utils

// Styles & Assets
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import FacebookIcon from "assets/icons/facebook-logo.svg"
import InstagramIcon from "assets/icons/instagram.svg"
import LinkedInIcon from "assets/icons/linkedin.svg"
import TikTokIcon from "assets/icons/tiktok.svg"
import WebsiteIcon from "assets/icons/website.svg"
import colors from "styles/colors"

type Props = RootStackScreenProps<"my-profile-social-media-links">

interface FormData {
  facebook?: string
  instagram?: string
  linkedin?: string
  tiktok?: string
  website?: string
}

const MyProfileSocialMediaLinksScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const { profileParams } = route.params
  const { user } = useTypedSelector((store) => store.auth)
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm<FormData>({
    defaultValues: {
      facebook:
        profileParams?.media?.filter((item) => item.media === "facebook")[0]
          ?.link || "",
      instagram:
        profileParams?.media?.filter((item) => item.media === "instagram")[0]
          ?.link || "",
      linkedin:
        profileParams?.media?.filter((item) => item.media === "linkedin")[0]
          ?.link || "",
      tiktok:
        profileParams?.media?.filter((item) => item.media === "tiktok")[0]
          ?.link || "",
      website:
        profileParams?.media?.filter((item) => item.media === "website")[0]
          ?.link || "",
    },
  })

  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const handleSave = (data: FormData) => {
    const updatedMedia = [
      { media: "facebook", link: data.facebook },
      { media: "instagram", link: data.instagram },
      { media: "linkedin", link: data.linkedin },
      { media: "tiktok", link: data.tiktok },
      { media: "website", link: data.website },
    ].filter((item) => item.link !== "")
    navigation.navigate("my-profile", {
      profileParams: { ...profileParams, media: updatedMedia as MediaType[] },
    })
  }

  const isAnyFieldFilled = !!(
    watch("facebook") ||
    watch("instagram") ||
    watch("linkedin") ||
    watch("tiktok") ||
    watch("website")
  )

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
        <DmView className="flex-1">
          <DmView className="mt-[19] px-[15] flex-row items-center">
            <DmText className="text-14 leading-[18px] font-custom600">
              {t("my_social_media_links")}
            </DmText>
            <DmText className="mx-[10] text-14 leading-[23px] text-red">{`(${t("optional")})`}</DmText>
          </DmView>
          <DmView className="px-[15]">
            <DmView>
              <Controller
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DmInput
                    isAnimText={false}
                    IconRight={
                      <MyProfileMediaLinksComponent
                        title={t("facebook")}
                        Icon={<FacebookIcon fill={colors.grey45} />}
                      />
                    }
                    className="h-[47] w-full mt-[15]"
                    inputClassName="text-13 leading-[16px] font-custom500"
                    value={value}
                    onChangeText={(text) => {
                      onChange(text)
                    }}
                  />
                )}
                name="facebook"
              />
            </DmView>
            <DmView>
              <Controller
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DmInput
                    isAnimText={false}
                    IconRight={
                      <MyProfileMediaLinksComponent
                        title={t("instagram")}
                        Icon={<InstagramIcon fill={colors.grey45} />}
                      />
                    }
                    className="h-[47] w-full mt-[15]"
                    inputClassName="text-13 leading-[16px] font-custom500"
                    value={value}
                    onChangeText={(text) => {
                      onChange(text)
                    }}
                  />
                )}
                name="instagram"
              />
            </DmView>
            <DmView>
              <Controller
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DmInput
                    isAnimText={false}
                    IconRight={
                      <MyProfileMediaLinksComponent
                        title={t("linkedin")}
                        Icon={<LinkedInIcon fill={colors.grey45} />}
                      />
                    }
                    className="h-[47] w-full mt-[15]"
                    inputClassName="text-13 leading-[16px] font-custom500"
                    value={value}
                    onChangeText={(text) => {
                      onChange(text)
                    }}
                  />
                )}
                name="linkedin"
              />
            </DmView>
            <DmView>
              <Controller
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DmInput
                    isAnimText={false}
                    IconRight={
                      <MyProfileMediaLinksComponent
                        title={t("tiktok")}
                        Icon={<TikTokIcon fill={colors.grey45} />}
                      />
                    }
                    className="h-[47] w-full mt-[15]"
                    inputClassName="text-13 leading-[16px] font-custom500"
                    value={value}
                    onChangeText={(text) => {
                      onChange(text)
                    }}
                  />
                )}
                name="tiktok"
              />
            </DmView>
            <DmView>
              <Controller
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DmInput
                    isAnimText={false}
                    IconRight={
                      <MyProfileMediaLinksComponent
                        title={t("website")}
                        Icon={<WebsiteIcon fill={colors.grey45} />}
                      />
                    }
                    className="h-[47] w-full mt-[15]"
                    inputClassName="text-13 leading-[16px] font-custom500"
                    value={value}
                    onChangeText={(text) => {
                      onChange(text)
                    }}
                  />
                )}
                name="website"
              />
            </DmView>
          </DmView>
        </DmView>
        <DmView className="px-[20] pt-[15]">
          <ActionBtn
            textClassName="text-13 leading-[16px] font-custom600"
            className="h-[47] rounded-5"
            title={t("save")}
            onPress={handleSubmit(handleSave)}
            disable={!isAnyFieldFilled}
          />
        </DmView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default MyProfileSocialMediaLinksScreen

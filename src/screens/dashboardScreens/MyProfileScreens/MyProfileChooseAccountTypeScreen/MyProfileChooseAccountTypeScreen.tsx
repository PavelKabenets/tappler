import React, { useState } from "react"
// Components
import { ActionBtn, DmChecbox, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import SelectDoPhotoModal from "components/SelectDoPhotoModal"
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
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import CheckIcon from "assets/icons/check-mark.svg"

type Props = RootStackScreenProps<"my-profile-choose-account-type">

interface FormData {
  business_name: string
  trade_license_number: string
  registration_or_renewal: string
  accountType: "individual" | "company"
}

const MyProfileChooseAccountTypeScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
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
    reset,
  } = useForm<FormData>({
    defaultValues: {
      accountType: profileParams?.proType,
      business_name: profileParams?.businessName,
      trade_license_number: profileParams?.tradeLicenseNumber,
      registration_or_renewal: profileParams?.registrationOrRenewal,
    },
  })
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const handleButtonClick = () => {
    // setIsFirstButtonActive(!isFirstButtonActive)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    // setIsFirstButtonActive(!isFirstButtonActive)
    setModalVisible(false)
  }
  const handleSave = () => {
    navigation.navigate("my-profile", {profileParams: {...profileParams, proType: getValues("accountType")}})
  }
  const handleClear = () => {
    setPhoto(undefined)
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <HeaderOnboarding
        className="px-[15]"
        title={t("profile_type")}
        onBackComponent={<CloseIcon />}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <DmView className="mt-[33] pl-[12] pr-[33]">
          <DmText className="text-18 leading-[22px] font-custom600">
            {t("choose_your_profile_type")}
          </DmText>
          <DmText className="text-15 leading-[22px] font-custom400 text-red mt-[14]">
            {t("important_information")}
          </DmText>
          <DmText className="text-15 leading-[22px] font-custom400 mt-[5]">
            {t(
              "if_you_change_your_profile_type_you_will_lose_all_your_reviews"
            )}
          </DmText>
          <DmView className="pt-[33] flex-between">
            <Controller
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <DmChecbox
                    isChecked={value === "individual"}
                    onPress={() => onChange("individual")}
                    title={t("individual")}
                    className="pb-[20]"
                    textClassName="text-15 leading-[19px] font-custom400"
                  />
                  <DmChecbox
                    isChecked={value === "company"}
                    onPress={() => onChange("company")}
                    title={t("business")}
                    textClassName="text-15 leading-[19px] font-custom400"
                  />
                </>
              )}
              name="accountType"
            />
          </DmView>
        </DmView>
        {watch("accountType") === "company" && (
          <DmView className="flex-1 pt-[26] pl-[12] pr-[33]">
            <DmText className="text-18 leading-[22px] font-custom600">
              {t("business_information")}
            </DmText>
            <DmView className="pt-[10]">
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DmInput
                    value={value}
                    onChangeText={onChange}
                    label={t("business_name")}
                    inputClassName={clsx(
                      "text-17 leading-[20px]",
                      !!value && "text-13 leading-[16px]"
                    )}
                    className="h-[63] w-full mb-[10]"
                    staticPlaceholder={t("enter_your_business_name")}
                    isAnimText={false}
                  />
                )}
                name="business_name"
              />
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DmInput
                    value={value}
                    onChangeText={onChange}
                    label={t("trade_license_number")}
                    inputClassName={clsx(
                      "text-13 leading-[16px]",
                      !!value && "text-13 leading-[16px]"
                    )}
                    className="h-[63] w-full mb-[10]"
                    staticPlaceholder={t("enter_trade_license_number")}
                    isAnimText={false}
                  />
                )}
                name="trade_license_number"
              />
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DmInput
                    value={value}
                    onChangeText={onChange}
                    label={t("registration_or_renewal")}
                    inputClassName={clsx(
                      "text-13 leading-[16px]",
                      !!value && "text-13 leading-[16px]"
                    )}
                    className="h-[63] w-full mb-[16]"
                    staticPlaceholder={t("enter_issue_date")}
                    isAnimText={false}
                  />
                )}
                name="registration_or_renewal"
              />
            </DmView>
            <DmView
              className="h-[54] bg-grey33 border-1 border-grey47 rounded-5 justify-center"
              onPress={handleButtonClick}
            >
              {!photo ? (
                <DmView className="flex-row px-[16] items-center">
                  <DmView className="w-[28] h-[32] bg-grey" />
                  <DmView className="px-[12]">
                    <DmText className="text-13 leading-[16px] font-custom600">
                      {t("upload_trade_license")}
                    </DmText>
                  </DmView>
                </DmView>
              ) : (
                <DmView className="flex-row pl-[16] pr-[13] items-center justify-between">
                  <DmView className="flex-row items-center">
                    <DmView>
                      <CheckIcon width={27} height={22} />
                    </DmView>
                    <DmText className="px-[13] text-13 leading-[16px] font-custom600">
                      {t("document_uploaded")}
                    </DmText>
                  </DmView>
                  <DmView
                    onPress={handleClear}
                    className="flex-row items-center"
                  >
                    <DmView>{<CloseIcon />}</DmView>
                    <DmText className="ml-[5] text-13 leading-[16px] text-red">
                      {t("delete")}
                    </DmText>
                  </DmView>
                </DmView>
              )}
            </DmView>
          </DmView>
        )}
        {(watch("accountType") === "individual" || photo) && (
          <DmView className="px-[20] pt-[17] border-t-1 border-grey4">
            <ActionBtn
              textClassName="text-13 leading-[16px] font-custom600"
              className="h-[47] rounded-5"
              title={t("save")}
              onPress={() => handleSubmit(handleSave)()}
              disable={!isValid}
            />
          </DmView>
        )}
      </KeyboardAwareScrollView>
      <SelectDoPhotoModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        selectedPhoto={photo}
        setSelectedPhoto={(photo: React.SetStateAction<ImageOrVideo | undefined>) => {
          setPhoto(photo)
          setModalVisible(false)
        }}
        isPdf
      />
    </SafeAreaView>
  )
}

export default MyProfileChooseAccountTypeScreen

import React from "react"

// Components
import { ActionBtn, DmChecbox, DmInput, DmText, DmView } from "components/UI"
import HeaderOnboarding from "components/HeaderOnboarding"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
// Hooks & Redux
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import { useTypedSelector } from "store"
// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

// Libs & Utils

// Styles & Assets
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"

type Props = RootStackScreenProps<"my-account-details">

interface FormData {
  business_name: string
  first_name: string
  last_name: string
  gender: "male" | "female"
}

const MyAccountDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useTypedSelector((store) => store.auth)
  // Props
  // State
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      business_name: user?.businessName,
      first_name: user?.registeredName?.split(" ")[0],
      last_name: user?.registeredName?.split(" ")[1],
      gender: user?.gender,
    },
  })

  const handleSave = (data: FormData) => {
    navigation.goBack()
  }
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
      className="flex-1 bg-white"
    >
      <HeaderOnboarding
        onBackComponent={<CloseIcon />}
        className="px-[15] border-b-0"
        title={t("account_name")}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <DmView>
          <DmText className="py-[20] pl-[13] pr-[27] text-15 leading-[22px] font-custom400 text-black">
            {t("the_below_details_descr")}
          </DmText>
          {user?.businessName && (
            <>
              <DmView className="pl-[15] pr-[31] pt-[12]">
                <DmView className="flex-row justify-between items-center pb-[5]">
                  <DmText className="text-16 leading-[19px] font-custom600 text-black">
                    {t("business_name")}
                  </DmText>
                  {/* <DmText className="text-11 leading-[14px] font-custom400 text-black pr-[34]">
                    {t("this_will_show_only_for_business_account")}
                  </DmText> */}
                </DmView>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                    validate: {
                      function: (value, formValues) => {
                        if (user?.proType === "company") {
                          return !!value.length
                        } else {
                          return true
                        }
                      },
                    },
                  }}
                  render={({ field: { value, onChange } }) => (
                    <DmInput
                      value={value}
                      onChangeText={onChange}
                      error={errors.business_name?.message}
                      className=" w-full"
                      placeholder={t("business_name")}
                    />
                  )}
                  name="business_name"
                />
              </DmView>
            </>
          )}
          <DmView className="pl-[15] pr-[31] pt-[16]">
            <DmView className="">
              <DmText className="text-16 leading-[19px] font-custom600 text-black">
                {t("your_name")}
              </DmText>
            </DmView>
            <DmView>
              <DmView className="pt-[10]">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DmInput
                      value={value}
                      onChangeText={onChange}
                      className=" w-full"
                      placeholder={t("first_name")}
                    />
                  )}
                  name="first_name"
                />
              </DmView>
              <DmView className="pt-[10]">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DmInput
                      value={value}
                      onChangeText={onChange}
                      className=" w-full"
                      placeholder={t("last_name")}
                    />
                  )}
                  name="last_name"
                />
              </DmView>
            </DmView>
          </DmView>
          <DmView className="px-[15] pt-[17] flex-between">
            <DmText className="text-16 leading-[22px] font-custom600 text-black pb-[10]">
              {t("your_gender")}
            </DmText>
            <Controller
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <DmChecbox
                    isChecked={value === "male"}
                    onPress={() => onChange("male")}
                    title={t("male")}
                    className="pb-[20]"
                    textClassName="text-15 leading-[19px] font-custom400 text-black"
                  />
                  <DmChecbox
                    isChecked={value === "female"}
                    onPress={() => onChange("female")}
                    title={t("female")}
                    className="pb-[20]"
                    textClassName="text-15 leading-[19px] font-custom400 text-black"
                  />
                </>
              )}
              name="gender"
            />
          </DmView>
        </DmView>
        <DmView className="px-[20] pt-[17] border-t-1 border-grey4">
          <ActionBtn
            textClassName="text-13 leading-[16px] font-custom600"
            className="h-[47] rounded-5"
            title={t("save")}
            onPress={handleSubmit(handleSave)}
            disable={!isValid}
          />
        </DmView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default MyAccountDetailsScreen

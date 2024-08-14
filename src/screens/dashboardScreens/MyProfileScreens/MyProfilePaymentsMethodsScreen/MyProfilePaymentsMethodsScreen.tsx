import React from "react"
// Components
import { ActionBtn, DmChecbox, DmView } from "components/UI"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// Hooks & Redux
import { useTypedSelector } from "store"
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"
// Helpers & Types
// Libs & Utils

// Styles & Assets
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import clsx from "clsx"
import { RootStackScreenProps } from "navigation/types"

type Props = RootStackScreenProps<"my-profile-payments-methods">

interface FormData {
  payment: ("cash" | "credit card")[]
}

const MyProfilePaymentsMethodsScreen: React.FC<Props> = ({
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
      payment: (profileParams?.payment as ("cash" | "credit card")[]) || [],
    },
  })

  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const handleCheckboxChange = (
    value: ("cash" | "credit card")[],
    onChange: (value: ("cash" | "credit card")[]) => void,
    method: "cash" | "credit card"
  ) => {
    const newValue = value.includes(method)
      ? value.filter((item) => item !== method)
      : [...value, method]
    onChange(newValue)
  }
  const handleSave = () => {
    navigation.navigate("my-profile", {
      profileParams: { ...profileParams, payment: getValues("payment") },
    })
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
        <DmView className="mt-[19] px-[15] flex-1 justify-between">
          <DmView>
            <TitleRegistrationFlow
              title={t("accepted_payments")}
              descr={t("how_customers_will_pay_you_for_your_service")}
              classNameDescr="mt-[7]"
            />
            <DmView>
              <Controller
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <DmChecbox
                      isChecked={value.includes("cash")}
                      title={t("cash")}
                      className="mt-[23]"
                      variant="square"
                      onPress={() =>
                        handleCheckboxChange(value, onChange, "cash")
                      }
                      textClassName="flex-1 text-12 leading-[22px] font-custom400"
                    />
                    <DmChecbox
                      title={t("credit_card")}
                      className="mt-[13]"
                      variant="square"
                      onPress={() =>
                        handleCheckboxChange(value, onChange, "credit card")
                      }
                      isChecked={value.includes("credit card")}
                      textClassName="flex-1 text-12 leading-[22px] font-custom400"
                    />
                  </>
                )}
                name="payment"
              />
            </DmView>
          </DmView>
        </DmView>
        <DmView className="px-[20] pt-[17]">
          <ActionBtn
            textClassName={clsx(
              "text-13 leading-[16px] font-custom600",
              !watch("payment").length && "text-grey10 font-custom500"
            )}
            className="h-[47] rounded-5"
            title={t("save")}
            onPress={handleSubmit(handleSave)}
            disable={!watch("payment").length}
          />
        </DmView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default MyProfilePaymentsMethodsScreen

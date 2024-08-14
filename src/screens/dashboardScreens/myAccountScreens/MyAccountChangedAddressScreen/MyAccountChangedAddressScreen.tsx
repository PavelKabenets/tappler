import React from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils
// Styles & Assets
import styles from "./styles"
import CircleCheckedIcon from "assets/icons/check-mark-big.svg"

type Props = RootStackScreenProps<"my-account-changed-address">

const MyAccountChangedAddressScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const data = route.params?.data
  // Props
  // State
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {},
  })
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleGoMyAccountAddress = () => {
    navigation.navigate("my-account-address", data ? { data } : undefined)
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
      className="flex-1 bg-white"
    >
      <HeaderOnboarding
        onBackComponent={<DmView />}
        onGoBackPress={() => null}
        title={t("my_address")}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <DmView>
          <DmView className="pt-[84] items-center">
            <CircleCheckedIcon />
          </DmView>
          <DmView className="items-center">
            <DmText className="pt-[15] text-20 leading-[24px] font-custom600 text-black">
              {t("address_changed")}
            </DmText>
            <DmText className="pt-[8] text-13 leading-[20px] font-custom400 text-black">
              {t("you_have_successfully_changed_your_address")}
            </DmText>
          </DmView>
        </DmView>
        <DmView className="px-[20]">
          <ActionBtn
            onPress={handleGoMyAccountAddress}
            textClassName="text-13 leading-[16px] font-custom600"
            className="h-[47] rounded-5"
            title={t("close")}
          />
        </DmView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default MyAccountChangedAddressScreen

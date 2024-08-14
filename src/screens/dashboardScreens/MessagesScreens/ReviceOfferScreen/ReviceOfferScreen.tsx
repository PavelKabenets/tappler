import React, { useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
// Helpers & Types
import { useTypedSelector } from "store"
import { RootStackScreenProps } from "navigation/types"
// Libs & Utils
import moment from "moment"
// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import EditIcon from "assets/icons/edit.svg"

type Props = RootStackScreenProps<"revice-offer">

const ReviceOfferScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  // State
  const { user } = useTypedSelector((store) => store.auth)
  const { messages } = route.params
  const [isEditing, setIsEditing] = useState(false)
  const [isVisibleButton, setIsVisibleButton] = useState(false)
  const [amount, setAmount] = useState(messages?.price_offer)
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      currency: "",
    },
  })
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleEditPress = () => {
    setIsEditing(true)
    setIsVisibleButton(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    navigation.goBack()
  }
  // Hooks
  // Listeners
  // Render Methods
  const formatDataOffer = (dateString: string) => {
    return moment(dateString).format("DD/MM/YYYY hh:mmA")
  }
  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <HeaderOnboarding
        className="px-[24] border-b-0"
        onBackComponent={<CloseIcon />}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <DmView className="flex-1">
          <DmView className="pt-[23] pb-[20] items-center">
            <DmText className="text-13 leading-[16px] font-custom600 tracking-[0.65]">
              {t("edit_your_offer")}
            </DmText>
          </DmView>
          <DmView className="mx-[38] border-0.3 border-black rounded-5 h-[49] flex-row items-center overflow-hidden">
            <DmView className="w-2/5 h-full items-center justify-center bg-red5 border-r-0.5 border-grey2">
              <DmText className="text-13 leading-[16px] font-custom600 tracking-[0.65] text-white">
                {t("your_offer")}
              </DmText>
            </DmView>
            <DmView
              onPress={handleEditPress}
              className="w-3/5 h-full flex-row items-center justify-between"
            >
              <DmView className="flex-row items-center">
                <DmView className="mx-[10]">
                  <DmText className="text-13 leading-[16px] font-custom600 tracking-[0.65]">
                    {t("egp")}
                  </DmText>
                </DmView>
                <DmView>
                  <DmText className="text-30 leading-[37px] font-custom500 tracking-[1.5]">
                    {amount}
                  </DmText>
                </DmView>
              </DmView>
              <DmView className="pr-[15]">
                <EditIcon />
              </DmView>
            </DmView>
          </DmView>
          <DmView className="px-[24] pt-[50]">
            <DmView className="pb-[13]">
              <DmText className="text-13 leading-[16px] font-custom600 tracking-[0.65]">
                {t("offer_history")}
              </DmText>
            </DmView>
            <DmView className="flex-row items-center">
              <DmView>
                <DmView className="w-[13] h-[13] rounded-full bg-grey17" />
              </DmView>
              <DmView className="flex-row items-center">
                <DmText className="mx-[10] text-13 leading-[16px] font-custom400 tracking-[0.65]">
                  {formatDataOffer(messages?.data_offer)}
                </DmText>
                <DmText className="text-13 leading-[16px] font-custom600 tracking-[0.65]">
                  {t(messages?.price_offer || "") + " EGP"}
                </DmText>
              </DmView>
            </DmView>
            <DmView>
              <DmView className="w-[2] h-[13] bg-grey17 ml-[6]" />
              <DmView className="flex-row items-center pb-[13]">
                <DmView>
                  <DmView className="w-[13] h-[13] rounded-full bg-grey17" />
                </DmView>
                <DmView className="flex-row items-center">
                  <DmText className="mx-[10] text-13 leading-[16px] font-custom400 tracking-[0.65]">
                    {formatDataOffer(messages?.data_offer)}
                  </DmText>
                  <DmText className="text-13 leading-[16px] font-custom600 tracking-[0.65]">
                    {t(messages?.price_offer || "") + " EGP"}
                  </DmText>
                </DmView>
              </DmView>
            </DmView>
          </DmView>
        </DmView>
        {isVisibleButton && (
          <DmView className="px-[20] pt-[20]">
            <ActionBtn
              textClassName="text-13 leading-[16px] font-custom600"
              className="h-[47] rounded-5"
              title={t("confirm_offer")}
              onPress={handleSubmit(handleSave)}
              disable={!isValid}
            />
          </DmView>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default ReviceOfferScreen

import React, { useLayoutEffect, useMemo, useState } from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import AttentionModalComponent from "components/AttentionModalComponent"
// Hooks & Redux
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useTypedSelector } from "store"
// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils
import moment from "moment"
// Styles & Assets
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import AttentionIcon from "assets/icons/attention.svg"

type Props = RootStackScreenProps<"my-account-address">

const MyAccountAddressScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user } = useTypedSelector((store) => store.auth)
  const data = route.params?.data
  // Props
  // State
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      address: data?.address || user?.address?.streetAddress,
      city: data?.city || user?.address?.city,
      governorate: data?.governorate || user?.address?.governorate,
    },
  })
  // Global Store
  // Variables
  const [isModalVisible, setModalVisible] = useState(false)
  const { t, i18n } = useTranslation()
  const handleOpenModal = () => {
    setModalVisible(true)
  }
  const handleHideModal = () => {
    setModalVisible(false)
  }
  const handleCloseModal = () => {
    setModalVisible(false)
    navigation.navigate("my-account-new-address", {
      data: {
        address: getValues("address") || "",
        city: getValues("city") || "",
        governorate: getValues("governorate") || "",
      },
    })
  }
  const lastChange = useMemo(() => {
    return user?.address?.changedAt
      ? moment(user?.address?.changedAt).format(
          i18n.language === "ar" ? "YYYY/MM/DD hh.mmA" : "DD/MM/YYYY hh.mmA"
        )
      : t("never")
  }, [user?.address?.changedAt])
  // Refs
  // Methods
  // Handlers
  // Hooks
  useLayoutEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data])
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        onBackComponent={<CloseIcon />}
        className="px-[15] border-b-0"
        title={t("my_address")}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <DmView className="mt-[28] px-[15]">
          <DmText className="text-16 leading-[16px] font-custom600 text-black">
            {t("current_address")}
          </DmText>
        </DmView>
        <DmView className="pt-[5] px-[15]">
          <DmText className="text-12 leading-[15px] font-custom400 text-grey2">
            {t("last_update")} {lastChange}
          </DmText>
        </DmView>
        <DmView className="px-[15] py-[10]">
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value } }) => (
              <DmInput
                editable={false}
                className="h-[55]"
                inputClassName="text-13 leading-[16px] text-black font-custom500"
                value={value}
                placeholder={t("address")}
              />
            )}
            name="address"
          />
        </DmView>
        <DmView className="px-[15] flex-row">
          <DmView className="w-3/5">
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <DmInput
                  editable={false}
                  className="h-[55]"
                  inputClassName="text-13 leading-[16px] text-black font-custom500"
                  value={value}
                  placeholder={t("city")}
                />
              )}
              name="city"
            />
          </DmView>
          <DmView className="w-2/5">
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <DmInput
                  editable={false}
                  className="ml-[10] h-[55]"
                  inputClassName="text-13 leading-[16px] text-black font-custom500"
                  value={value}
                  placeholder={t("governorate")}
                />
              )}
              name="governorate"
            />
          </DmView>
        </DmView>
        <DmView className="px-[115] pt-[30]">
          <ActionBtn
            onPress={handleOpenModal}
            textClassName="text-13 leading-[20px] font-custom600"
            className="h-[40] rounded-3"
            title={t("change_address")}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <AttentionModalComponent
        isVisible={isModalVisible}
        Icon={<AttentionIcon />}
        onClose={handleHideModal}
        onPress={handleCloseModal}
      />
    </SafeAreaView>
  )
}

export default MyAccountAddressScreen

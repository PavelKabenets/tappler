import React, { useState } from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import HeaderOnboarding from "components/HeaderOnboarding"
import CloseIcon from "assets/icons/close.svg"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import { Controller, useForm } from "react-hook-form"
import colors from "styles/colors"
import SelectCityModal from "components/SelectCityModal"
import { AddressType } from "types"

type Props = RootStackScreenProps<"my-documents-change-place">

type FormValuesType = {
  address: AddressType
}

const MyDocumentsChangePlaceScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  const { address } = route.params
  // State
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValuesType>({
    defaultValues: {
      address,
    },
  })
  const [isSelectCityModalVisible, setSelectCityModalVisible] = useState(false)
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleChangeCity = (item: AddressType) => {
    setValue("address", item)
    handleCloseSelectModal()
  }

  const handleOpenSelectModal = () => {
    setSelectCityModalVisible(true)
  }

  const handleCloseSelectModal = () => {
    setSelectCityModalVisible(false)
  }

  const onSubmit = () => {
    navigation.navigate("my-documents-bussiness-detail", {
      address: getValues("address"),
    })
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <KeyboardAwareScrollView
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <DmView>
          <HeaderOnboarding
            title={t("trust_stickers")}
            onBackComponent={<CloseIcon />}
            className="px-[15] border-0 pb-[0]"
            classNameTitle="text-14 leading-[18px]"
          />
          <DmView className="mt-[37] px-[14]">
            <TitleRegistrationFlow
              title={t("new_address")}
              descr={t("enter_your_new_address_below")}
              classNameTitle="text-16 leading-[19px]"
              classNameDescr="text-12 leading-[15px] font-custom400"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <DmInput
                  className="mt-[17]"
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("street_address")}
                  placeholderTextColor={colors.grey11}
                />
              )}
              name="address.streetAddress"
            />
            <DmView className="mt-[10] flex-row items-center justify-between">
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <DmInput
                    className="flex-1 mr-[5]"
                    value={t(value)}
                    placeholder={t("city")}
                    placeholderTextColor={colors.grey11}
                    onPress={handleOpenSelectModal}
                  />
                )}
                name="address.city"
              />
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <DmInput
                    className="ml-[5] flex-1"
                    value={t(value)}
                    placeholder={t("governorate")}
                    placeholderTextColor={colors.grey11}
                    editable={false}
                    inputClassName="text-black"
                  />
                )}
                name="address.governorate"
              />
            </DmView>
          </DmView>
        </DmView>
        <ActionBtn
          title={t("submit")}
          className="mx-[20] rounded-5"
          textClassName={clsx(
            "text-13 leading-[16px] font-custom600",
            !isValid && "text-grey10 font-custom500"
          )}
          onPress={onSubmit}
          disable={!isValid}
        />
      </KeyboardAwareScrollView>
      <SelectCityModal
        isVisible={isSelectCityModalVisible}
        onClose={handleCloseSelectModal}
        onSubmit={handleChangeCity as (item: Partial<AddressType>) => void}
      />
    </SafeAreaView>
  )
}

export default MyDocumentsChangePlaceScreen

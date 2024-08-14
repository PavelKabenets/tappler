import React, { useLayoutEffect, useState } from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import SelectCityModal from "components/SelectCityModal"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// Hooks & Redux
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import { useTypedSelector } from "store"
// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { AddressType } from "types"
// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import { useLazyGetProsQuery, usePatchProsMutation } from "services/api"
import { mockGovornorateSearchData } from "data/mockData"

type Props = RootStackScreenProps<"my-account-new-address">

const MyAccountNewAddressScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user } = useTypedSelector((store) => store.auth)
  const data = route.params?.data
  const onGoBack = route.params?.onSubmitGoBack
  // Props
  // State
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      address: data?.address || user?.address?.streetAddress,
      city: data?.city || user?.address?.city,
      governorate: data?.governorate || user?.address?.governorate,
    },
  })

  const [isModalVisible, setModalVisible] = useState(false)
  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const [patchPros] = usePatchProsMutation()
  const [getPros] = useLazyGetProsQuery()
  // Refs
  // Methods
  // Handlers
  const handleGoChangedAddress = async () => {
    try {
      const currentData = mockGovornorateSearchData.filter(
        (fItem) => t(fItem.name) === getValues("city")
      )[0]
      await patchPros({
        // @TO DO
        address: {
          streetAddress: getValues("address") || "",
          unitNumber: "1105",
          longitude: currentData.coords.lon,
          latitude: currentData.coords.lat,
          city: t(currentData.name),
          governorate: t(currentData.governorate),
        },
      }).unwrap()
      const address = getValues("address") || ""
      const city = getValues("city") || ""
      const governorate = getValues("governorate") || ""

      if (onGoBack) {
        navigation.goBack()
        await getPros().unwrap()
      } else {
        navigation.navigate("my-account-changed-address", {
          data: {
            address,
            city,
            governorate,
          },
        })
      }
    } catch (e) {
      console.log("Change place error: ", e)
    }
  }
  const handleSelectCity = (selectedCity: Partial<AddressType>) => {
    if (selectedCity.city) {
      setValue("city", t(selectedCity.city))
    }
    if (selectedCity.governorate) {
      setValue("governorate", t(selectedCity.governorate))
    }
    handleCloseModal()
  }
  // Hooks
  const address = watch("address")
  const city = watch("city")
  const governorate = watch("governorate")
  const isFormFilled = address && city && governorate
  useLayoutEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data])
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
      className="flex-1 bg-white"
    >
      <HeaderOnboarding
        onBackComponent={<CloseIcon />}
        className="px-[22] pb-[18] border-b-0"
        title={t("my_address")}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <DmView>
          <DmView className="px-[15]">
            <DmText className="pt-[24] text-16 leading-[16px] font-custom600 text-black">
              {t("new_address")}
            </DmText>
            <DmText className="pt-[5] pb-[7] text-12 leading-[15px] font-custom400 text-grey2">
              {t("enter_your_new_address_below")}
            </DmText>
          </DmView>
          <DmView className="px-[15] py-[10]">
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <DmInput
                  className="h-[55]"
                  inputClassName="text-13 leading-[16px] text-black font-custom400"
                  value={value}
                  placeholder={t("address")}
                  onChangeText={onChange}
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
                render={({ field: { value, onChange } }) => (
                  <DmInput
                    onPress={handleOpenModal}
                    className="h-[55]"
                    inputClassName="text-13 leading-[16px] text-black font-custom500"
                    value={value}
                    placeholder={t("city")}
                    onChangeText={onChange}
                  />
                )}
                name="city"
              />
            </DmView>
            <DmView className="w-2/5">
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DmInput
                    className="ml-[10] h-[55]"
                    inputClassName="text-13 leading-[16px] text-black font-custom400"
                    value={value}
                    placeholder={t("governorate")}
                    onChangeText={onChange}
                  />
                )}
                name="governorate"
              />
            </DmView>
          </DmView>
        </DmView>
        <DmView className="px-[20]">
          <ActionBtn
            onPress={handleGoChangedAddress}
            disable={!isFormFilled}
            textClassName={clsx(
              "text-13 leading-[16px] font-custom600",
              !isFormFilled && "text-grey10 font-custom500"
            )}
            className={clsx("h-[47] rounded-5")}
            title={t("submit")}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <SelectCityModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSelectCity}
      />
    </SafeAreaView>
  )
}

export default MyAccountNewAddressScreen

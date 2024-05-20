import React, { useEffect, useMemo, useState } from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import { Keyboard } from "react-native"
import SelectCityModal from "components/SelectCityModal"
import MainModal from "components/MainModal"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import HeaderOnboarding from "components/HeaderOnboarding"
import DatePicker from "react-native-date-picker"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import { useTypedSelector } from "store"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { AddressType } from "types"

// Libs & Utils
import moment from "moment"
import "moment/locale/ar"

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import colors from "styles/colors"
import EditIcon from "assets/icons/edit.svg"
import AttentionIcon from "assets/icons/attention.svg"
import CalendarIcon from "assets/icons/calendar.svg"
import PaymentMethodModal from "components/PaymentMethodModal"

type Props = RootStackScreenProps<"my-documents-bussiness-detail">

type FormValuesType = {
  firstName: string
  lastName: string
  address: AddressType
  phone: string
  date: string
  descr?: string
}

const MyDocumentsBussinessDetailScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  const { address } = route.params
  // State
  const [isSelectCityModalVisible, setSelectCityModalVisible] = useState(false)
  const [isAttentionModalVisible, setAttentionModalVisible] = useState(false)
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const [isPaymentModalVisible, setPaymantModalVisible] = useState(false)

  const {
    control,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { isValid, errors },
  } = useForm<FormValuesType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address,
      descr: "",
    },
  })

  // Global Store
  const { language, user } = useTypedSelector((store) => store.auth)
  // Variables
  const { t, i18n } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  const lastChange = useMemo(() => {
    return moment(moment().format("DD.MM.YYYY"), "DD.MM.YYYY").fromNow()
  }, [moment().hours()])
  // Handlers
  const handleOpenSelectModal = () => {
    setSelectCityModalVisible(true)
    Keyboard.dismiss()
  }

  const hadnleChangeCity = () => {
    handleOpenSelectModal()
  }

  const handleCloseSelectModal = () => {
    setSelectCityModalVisible(false)
  }

  const handleSubmitModal = (item: AddressType) => {
    setValue("address", item, {
      shouldValidate: true,
      shouldTouch: true,
    })
    handleCloseSelectModal()
  }

  const handleOpenAttentionModal = () => {
    setAttentionModalVisible(true)
  }

  const handleCloseAttentionModal = () => {
    setAttentionModalVisible(false)
  }

  const handleOpenDatePicker = () => {
    setDatePickerVisible(true)
  }

  const handleCloseDatePicker = () => {
    setDatePickerVisible(false)
  }

  const handleSubmit = () => {
    handleOpenPayment()
  }

  const handleGoChangeLocatinScreen = () => {
    handleCloseAttentionModal()

    setTimeout(() => {
      navigation.navigate("my-documents-change-place", {
        address: getValues("address"),
      })
    }, 500)
  }

  const handleChangeDate = (date: Date) => {
    setValue("date", moment(date).toISOString(), {
      shouldValidate: true,
      shouldTouch: true,
    })
    handleCloseDatePicker()
  }

  const handleClosePayment = () => {
    setPaymantModalVisible(false)
  }

  const handleOpenPayment = () => {
    setPaymantModalVisible(true)
  }

  // Hooks
  useEffect(() => {
    setValue("address", address)
  })

  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <HeaderOnboarding
        title={t("trust_stickers")}
        isChevron
        className="px-[12]"
      />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <DmView className="px-[14]">
          <DmText className="mt-[20] text-20 leading-[24px] font-custom600">
            {t("business_details")}
          </DmText>
          <TitleRegistrationFlow
            title={t("business_name")}
            className="mt-[15] px-[10]"
            descr={user?.businessName || "mock Name"}
            classNameTitle="text-11 leading-[14px] font-custom700"
            classNameDescr="mt-[0] text-13 leading-[16px] font-custom500"
          />
          <DmView className="mt-[15] flex-row items-center">
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <DmInput
                  className="flex-1 mr-[5]"
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("first_name")}
                  placeholderTextColor={colors.grey11}
                />
              )}
              name="firstName"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <DmInput
                  className="flex-1 ml-[5]"
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("last_name")}
                  placeholderTextColor={colors.grey11}
                />
              )}
              name="lastName"
            />
          </DmView>

          <Controller
            control={control}
            rules={{ required: true, minLength: 11 }}
            render={({ field: { onChange, value } }) => (
              <DmInput
                className="mt-[10]"
                value={value}
                onChangeText={(val) => {
                  onChange(val)
                  trigger("phone")
                }}
                placeholder={t("mobile_number")}
                placeholderTextColor={colors.grey11}
                keyboardType="numeric"
                maxLength={11}
                error={errors.phone?.type}
              />
            )}
            name="phone"
          />

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DmInput
                className="mt-[10]"
                value={value}
                onChangeText={onChange}
                placeholder={t("business_address")}
                placeholderTextColor={colors.grey11}
                IconRight={<EditIcon />}
                onPress={handleOpenAttentionModal}
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
                  editable={false}
                  inputClassName="text-black"
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
          <TitleRegistrationFlow
            title={t("date_of_visit")}
            className="mt-[25]"
            descr={t("select_the_date_of_visit_to_your_businessLocation")}
            classNameTitle="text-20 leading-[24px]"
            classNameDescr="mt-[0] text-13 leading-[16px]"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <DmInput
                editable={false}
                className="mt-[9]"
                value={
                  value ? moment(value).format("DD/MM/YYYY") : "DD/MM/YYYY"
                }
                inputClassName={clsx(
                  !value && "text-grey9 text-13 leading-[16px] font-custom500"
                )}
                onPress={handleOpenDatePicker}
                placeholder={t("select_a_date")}
                Icon={<CalendarIcon />}
              />
            )}
            name="date"
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <DmInput
                className="mt-[10] flex-1"
                value={value}
                onChangeText={onChange}
                isTextAnimAlways
                placeholder={t("notes")}
                staticPlaceholder={t("enter_notes_here")}
                placeholderTextColor={colors.grey11}
                multiline
                multilineHeight={93}
              />
            )}
            name="descr"
          />
        </DmView>
      </KeyboardAwareScrollView>
      {isValid && (
        <DmView className="mt-[5] px-[20]">
          <ActionBtn
            className="rounded-5 px-[0]"
            title={t("make_payment")}
            titleSecond={`500 ${t("EGP")}`}
            onPress={handleSubmit}
            textClassName="text-13 leading-[16px] font-custom600"
          />
        </DmView>
      )}
      <DatePicker
        date={moment(watch("date")).toDate()}
        open={isDatePickerVisible}
        onConfirm={handleChangeDate}
        onCancel={handleCloseDatePicker}
        modal
        mode="date"
        confirmText={t("OK")}
        cancelText={t("cancel")}
        locale={language}
        title={t("select_date")}
      />
      <SelectCityModal
        isVisible={isSelectCityModalVisible}
        onClose={handleCloseSelectModal}
        onSubmit={handleSubmitModal as (item: Partial<AddressType>) => void}
      />
      <PaymentMethodModal
        isVisible={isPaymentModalVisible}
        onClose={handleClosePayment}
      />

      <MainModal
        isVisible={isAttentionModalVisible}
        Icon={<AttentionIcon />}
        onClose={handleCloseAttentionModal}
        title={t("attention")}
        className="px-[5] pt-[18] pb-[25]"
        classNameTitle="mt-[10] text-20 leading-[24px] font-custom700"
        classNameDescr="mt-[10] text-12 leading-[15px] font-custom400"
        titleBtn={t("OK")}
        classNameBtnsWrapper="mx-[30]"
        classNameBtn="mt-[25]"
        onPress={handleGoChangeLocatinScreen}
        descr={t("you_can_change_your_address_only_number_time_per_year", {
          number: 1,
        })}
      >
        <DmText className="mt-[10] text-12 leading-[15px] font-custom400 text-center">
          {t("last_address_change")}:{" "}
          {!Number.isNaN(Number(lastChange.split(" ")[0])) && (
            <DmText className="text-12 leading-[15px] font-custom700 capitalize text-red">
              {lastChange.split(" ")[0]}{" "}
            </DmText>
          )}
          <DmText className="text-12 leading-[15px] font-custom400 capitalize">
            {lastChange.split(" ").slice(1).join(" ")}
          </DmText>
        </DmText>
      </MainModal>
    </SafeAreaView>
  )
}

export default MyDocumentsBussinessDetailScreen

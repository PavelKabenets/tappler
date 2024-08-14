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
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import { Controller, useForm } from "react-hook-form"
import moment from "moment"
import DatePicker from "react-native-date-picker"
import UploadLicenseComponent from "components/UploadLicenseComponent"
import SelectDoPhotoModal from "components/SelectDoPhotoModal"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { ImageOrVideo } from "react-native-image-crop-picker"
import {
  usePostDocumentMutation,
  usePostProfilePhotoMutation,
} from "services/api"
import { Keyboard } from "react-native"
import CustomDatePicker from "components/CustomDatePicker"

type Props = RootStackScreenProps<"trade-license">

type FormValuesType = {
  tradeNumber: string
  date?: Date
}

const TradeLicenseScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isDatePickerOpen, setDatePickerOpen] = useState(false)
  const [isPhotoModalVisible, setPhotoModalVisible] = useState(false)
  const [photo, setPhoto] = useState<ImageOrVideo>()
  const [isLoading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid, errors },
    trigger,
  } = useForm<FormValuesType>({
    defaultValues: {
      tradeNumber: "",
    },
  })
  // Global Store
  // Variables
  const { t, i18n } = useTranslation()
  const insets = useSafeAreaInsets()
  const [postPhoto] = usePostProfilePhotoMutation()
  const [postDocuments] = usePostDocumentMutation()
  // Refs
  // Methods
  // Handlers
  const handleChangeDate = (val: Date) => {
    setValue("date", val, { shouldValidate: true })
    setDatePickerOpen(false)
  }

  const handleUploadPhoto = () => {
    Keyboard.dismiss()

    if (photo) {
      return setPhoto(undefined)
    }

    setPhotoModalVisible(true)
  }

  const handleClosePhotoModal = () => {
    setPhotoModalVisible(false)
  }

  const handleFinish = async () => {
    if (photo) {
      try {
        setLoading(true)
        const photoRes = await postPhoto(photo).unwrap()
        const res = await postDocuments({
          type: "companyTradeLicense",
          tradeLicenseDocumentData: {
            licenseNumber: getValues("tradeNumber"),
            registrationDate: moment(getValues("date"))
              .locale("en")
              .format("YYYY-MM-DD"),
          },
          files: [
            { fileKey: photoRes.storageKey, assignment: "companyTradeLicense" },
          ],
        }).unwrap()
        navigation.navigate("wait", {
          headerTitle: t("business_identity"),
          startHours: 4,
          endHours: 24,
          documents: Array.isArray(res) ? res : [res],
        })
      } catch (e) {
        console.log("Error upload document: ", e)
      } finally {
        setLoading(false)
      }
    }
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{
        paddingBottom: insets.bottom > 45 ? insets.bottom : 45 - insets.bottom,
      }}
    >
      <HeaderOnboarding
        title={t("business_identity")}
        className="px-[12]"
        isChevron
      />
      <KeyboardAwareScrollView
        scrollEnabled={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          paddingHorizontal: 14,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <DmView>
          <TitleRegistrationFlow
            className="mt-[23]"
            title={t("trade_license")}
            descr={t("please_provide_the_below_information_descr")}
            classNameTitle="text-20 leading-[24px]"
            classNameDescr="mt-[2] text-13 leading-[20px]"
          />
          <Controller
            control={control}
            rules={{ required: true, pattern: /^[\d\s]+$/ }}
            render={({ field: { value, onChange } }) => (
              <DmInput
                isAnimText={false}
                value={value}
                className={clsx(
                  "mt-[23] h-[66] bg-white1",
                  value && "bg-transparent"
                )}
                label={t("trade_license_number")}
                onChangeText={(val) => {
                  onChange(val.replace(/[^0-9]/g, ""))
                  trigger("tradeNumber")
                }}
                keyboardType="number-pad"
                error={errors.tradeNumber?.type}
              />
            )}
            name="tradeNumber"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value } }) => (
              <DmInput
                isAnimText={false}
                value={
                  value
                    ? i18n.language === "ar"
                      ? moment(value).format("YYYY/MM/DD")
                      : moment(value).format("DD/MM/YYYY")
                    : ""
                }
                className={clsx(
                  "mt-[10] h-[66] bg-white1",
                  value && "bg-transparent"
                )}
                label={t("registration_or_renewal")}
                onPress={() => {
                  setDatePickerOpen(true)
                  Keyboard.dismiss()
                }}
              />
            )}
            name="date"
          />
          <UploadLicenseComponent
            onPress={handleUploadPhoto}
            photoUrl={photo?.path || ""}
            className="mt-[10] h-[66]"
          />
        </DmView>
        <DmView>
          <DmText className="text-9 leading-[16px] text-center font-custom400">
            {t("by_tapping_on_send_you_acknowledge")}
          </DmText>
          <ActionBtn
            disable={!isValid || !photo || isLoading}
            className="mt-[20] rounded-4"
            onPress={handleFinish}
            title={t("save")}
            textClassName="text-13 leading-[16px] font-custom500"
            isLoading={isLoading}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <CustomDatePicker
        open={isDatePickerOpen}
        date={getValues("date") || new Date()}
        onConfirm={handleChangeDate}
        modal
        mode="date"
        onCancel={() => {
          setDatePickerOpen(false)
        }}
      />
      <SelectDoPhotoModal
        isVisible={isPhotoModalVisible}
        onClose={handleClosePhotoModal}
        selectedPhoto={photo}
        setSelectedPhoto={setPhoto}
        isPdf
      />
    </SafeAreaView>
  )
}

export default TradeLicenseScreen

import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import SelectPhotosItem from "components/SelectPhotosItem"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles, { photoWidth } from "./styles"
import CloseIcon from "assets/icons/close.svg"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera"
import { Controller, useForm } from "react-hook-form"
import CustomDatePicker from "components/CustomDatePicker"
import moment from "moment"
import FrontId from "assets/icons/front-id.svg"
import BackId from "assets/icons/back-id.svg"
import {
  usePostDocumentMutation,
  usePostProfilePhotoMutation,
} from "services/api"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"

type Props = RootStackScreenProps<"my-documents-id">

const MyDocumentsIDScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const frontPhoto = route.params?.frontPhoto
  const backPhoto = route.params?.backPhoto
  // State
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const [datePickerType, setDatePickerType] = useState<
    "birth" | "expirationDate"
  >()
  const [isCameraModalVisible, setCameraModalVisible] = useState(false)
  const [cameraModalType, setCameraModalType] = useState<"front" | "back">()
  const [frontId, setFrontId] = useState<string | undefined>(
    route.params?.frontPhoto
  )
  const [backId, setBackId] = useState<string | undefined>(
    route.params?.backPhoto
  )
  const [isLoading, setLoading] = useState(false)

  const {
    control,
    setValue,
    watch,
    getValues,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      name: "",
      birth: "",
      idNumber: "",
      expirationDate: "",
    },
  })
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const [sendPhoto] = usePostProfilePhotoMutation()
  const [postDocument] = usePostDocumentMutation()

  const device = useCameraDevice("front")
  const { hasPermission, requestPermission } = useCameraPermission()

  // Refs
  // Methods
  // Handlers
  const handleOpenBirthDatePicker = (type: "birth" | "expirationDate") => {
    setDatePickerVisible(true)
    setDatePickerType(type)
  }

  const handleClearPhotoId = (type: "front" | "back") => {
    if (type === "front") {
      setFrontId(undefined)
    } else {
      setBackId(undefined)
    }
  }

  const handleCameraModalOpen = (type: "front" | "back") => {
    setCameraModalType(type)
    navigation.navigate("camera", { type })
  }

  const handleSubmit = async () => {
    if (frontId && backId) {
      navigation.navigate("my-documents-selfie", {
        idDocumentData: {
          name: getValues("name"),
          idNumber: getValues("idNumber"),
          dateOfBirth: moment(getValues("birth")).format("YYYY-MM-DD"),
          expirationDate: moment(getValues("expirationDate")).format(
            "YYYY-MM-DD"
          ),
        },
        frontPhoto: frontId,
        backPhoto: backId,
        selfiePhoto: undefined
      })
    }
  }

  // Hooks
  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  })

  useEffect(() => {
    if (frontPhoto) {
      setFrontId(frontPhoto)
    }

    if (backPhoto) {
      setBackId(backPhoto)
    }
  }, [frontPhoto, backPhoto])
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <DmView>
        <DmView
          className="px-[23] mt-[18]"
          onPress={navigation.goBack}
          hitSlop={HIT_SLOP_DEFAULT}
        >
          <CloseIcon />
        </DmView>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 14 }}
        >
          <TitleRegistrationFlow
            className="mt-[39]"
            title={`${t("enter_the_following_details")}:`}
            descr={t("the_below_required_information_descr")}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => {
              return (
                <DmInput
                  value={value}
                  onChangeText={onChange}
                  className="mt-[22] h-[66]"
                  placeholder={t("your_name_as_written_in_your_ID")}
                />
              )
            }}
            name="name"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => {
              return (
                <DmInput
                  value={value ? moment(value).format("DD/MM/YYYY") : ""}
                  className="mt-[10] h-[66]"
                  placeholder={t("date_of_birth")}
                  onPress={() => handleOpenBirthDatePicker("birth")}
                />
              )
            }}
            name="birth"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => {
              return (
                <DmInput
                  value={value}
                  onChangeText={onChange}
                  className="mt-[10] h-[66]"
                  placeholder={t("id_number")}
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              )
            }}
            name="idNumber"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => {
              return (
                <DmInput
                  value={value ? moment(value).format("DD/MM/YYYY") : ""}
                  className="mt-[10] h-[66]"
                  placeholder={t("expiration_date")}
                  onPress={() => handleOpenBirthDatePicker("expirationDate")}
                />
              )
            }}
            name="expirationDate"
          />
          <DmView className="mt-[15] flex-row items-center justify-between">
            <SelectPhotosItem
              Icon={<FrontId />}
              onDelete={() => handleClearPhotoId("front")}
              descr={t("front_of_id")}
              width={photoWidth}
              height={photoWidth / 1.155}
              photoUrl={frontId || undefined}
              onPress={() => handleCameraModalOpen("front")}
              resizeMode="stretch"
            />
            <SelectPhotosItem
              Icon={<BackId />}
              onDelete={() => handleClearPhotoId("back")}
              descr={t("back_of_id")}
              width={photoWidth}
              height={photoWidth / 1.155}
              photoUrl={backId || undefined}
              onPress={() => handleCameraModalOpen("back")}
              resizeMode="stretch"
            />
          </DmView>
        </KeyboardAwareScrollView>
      </DmView>
      {isValid && frontId && backId && (
        <ActionBtn
          title={t("continue")}
          className="mx-[14] mt-[8] rounded-5"
          textClassName="text-13 leading-[16px] font-custom600"
          onPress={handleSubmit}
          disable={isLoading}
          isLoading={isLoading}
        />
      )}
      <CustomDatePicker
        open={isDatePickerVisible}
        modal
        mode="date"
        date={
          datePickerType === "birth"
            ? moment(watch("birth") || new Date()).toDate()
            : moment(watch("expirationDate") || new Date()).toDate()
        }
        onConfirm={(date) => {
          if (datePickerType === "birth") {
            setValue("birth", moment(date).toISOString(), {
              shouldValidate: true,
            })
          }

          if (datePickerType === "expirationDate") {
            setValue("expirationDate", moment(date).toISOString(), {
              shouldValidate: true,
            })
          }
          setDatePickerVisible(false)
        }}
        maximumDate={datePickerType === "birth" ? new Date() : undefined}
        onCancel={() => setDatePickerVisible(false)}
      />
    </SafeAreaView>
  )
}

export default MyDocumentsIDScreen

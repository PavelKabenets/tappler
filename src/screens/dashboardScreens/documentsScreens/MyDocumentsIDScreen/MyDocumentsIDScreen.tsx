import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import SelectPhotosItem from "components/SelectPhotosItem"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import MainModal from "components/MainModal"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Controller, useForm } from "react-hook-form"
import CustomDatePicker from "components/CustomDatePicker"
// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useTypedSelector } from "store"
// Helpers & Types
import { PermissionsAndroid } from "react-native"
import { RootStackScreenProps } from "navigation/types"
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera"
import {
  useGetMyDocumentQuery,
  usePostDocumentMutation,
  usePostProfilePhotoMutation,
} from "services/api"
// Libs & Utils
import moment from "moment"
// Styles & Assets
import clsx from "clsx"
import styles, { photoWidth } from "./styles"
import CloseIcon from "assets/icons/close.svg"
import FrontId from "assets/icons/front-id.svg"
import BackId from "assets/icons/back-id.svg"
import IdUserIcon from "assets/icons/id-user.svg"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"

type Props = RootStackScreenProps<"my-documents-id">

const MyDocumentsIDScreen: React.FC<Props> = ({ route, navigation }) => {
  const { user } = useTypedSelector((store) => store.auth)
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

  const [isModalWasShowing, setModalWasShowing] = useState(false)

  const {
    control,
    setValue,
    watch,
    getValues,
    formState: { isValid },
    formState: { errors },
    trigger,
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
  const { t, i18n } = useTranslation()
  const insets = useSafeAreaInsets()
  const [sendPhoto] = usePostProfilePhotoMutation()
  const [postDocument] = usePostDocumentMutation()
  const [isModalIdVisible, setModalIdVisible] = useState(false)
  const { data: documentsData } = useGetMyDocumentQuery()
  const [postImg] = usePostProfilePhotoMutation()
  const [postDoc] = usePostDocumentMutation()

  const device = useCameraDevice("front")
  const { hasPermission, requestPermission } = useCameraPermission()

  // Refs
  // Methods
  async function requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to your storage to save photos.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
      console.warn(err)
      return false
    }
  }
  // Handlers
  const handleOpenModalId = () => {
    const idAlreadyUploaded = documentsData?.filter(
      (item) => item.type === "id"
    )
    if (idAlreadyUploaded?.length) {
      const item = idAlreadyUploaded.pop()
      if (item?.idDocumentData?.idNumber === getValues("idNumber")) {
        handleSendDocs()
      } else {
        setModalIdVisible(true)
      }
    } else {
      setModalIdVisible(true)
    }
  }
  const handleHideModalId = () => {
    setModalIdVisible(false)
  }
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

  const handleSendDocs = async () => {
    try {
      setLoading(true)
      const frontImg = await postImg(frontId).unwrap()
      const backImg = await postImg(backId).unwrap()

      const item = documentsData?.filter((item) => item.type === "id").pop()

      const itemStorage = item?.files
        ?.filter((item) => item.assignment === "id.selfie")
        .pop()

      if (!itemStorage) {
        return
      }

      const res = await postDoc({
        type: "id",
        idDocumentData: {
          name: getValues("name"),
          idNumber: getValues("idNumber"),
          dateOfBirth: moment(getValues("birth"))
            .locale("en")
            .format("YYYY-MM-DD"),
          expirationDate: moment(getValues("expirationDate"))
            .locale("en")
            .format("YYYY-MM-DD"),
        },
        files: [
          {
            assignment: "id.front",
            fileKey: frontImg.storageKey,
          },
          {
            assignment: "id.back",
            fileKey: backImg.storageKey,
          },
          {
            assignment: "id.selfie",
            fileKey: itemStorage!.url!.split("/").pop(),
          },
        ],
      }).unwrap()
      navigation.navigate("wait", {
        endHours: 12,
        headerTitle: t("identity_verification"),
        descr: t("we_will_verify_the_information"),
        documents: Array.isArray(res) ? res : [res],
      })
    } catch (e) {
      console.log("Upload Document Error: ", e)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    handleHideModalId()
    setTimeout(() => {
      if (frontId && backId) {
        navigation.navigate("my-documents-selfie", {
          idDocumentData: {
            name: getValues("name"),
            idNumber: getValues("idNumber"),
            dateOfBirth: moment(getValues("birth"))
              .locale("en")
              .format("YYYY-MM-DD"),
            expirationDate: moment(getValues("expirationDate"))
              .locale("en")
              .format("YYYY-MM-DD"),
          },
          frontPhoto: frontId,
          backPhoto: backId,
          selfiePhoto: undefined,
        })
      }
    }, 400)
  }

  // Hooks
  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [])

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
                  value={
                    value
                      ? moment(value).format(
                          i18n.language === "ar" ? "YYYY/MM/DD" : "DD/MM/YYYY"
                        )
                      : ""
                  }
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
            rules={{ required: true, pattern: /^[\d\s]+$/ }}
            render={({ field: { value, onChange } }) => {
              return (
                <DmInput
                  value={value}
                  onChangeText={(val) => {
                    onChange(val.replace(/[^0-9]/g, ""))
                    trigger("idNumber")
                  }}
                  className="mt-[10] h-[66]"
                  placeholder={t("id_number")}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  error={errors.idNumber?.type}
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
                  value={
                    value
                      ? moment(value).format(
                          i18n.language === "ar" ? "YYYY/MM/DD" : "DD/MM/YYYY"
                        )
                      : ""
                  }
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
              descrWithPhoto
            />
            <SelectPhotosItem
              Icon={<BackId />}
              onDelete={() => handleClearPhotoId("back")}
              descr={t("back_of_id")}
              width={photoWidth}
              height={photoWidth / 1.155}
              photoUrl={backId || undefined}
              onPress={() => handleCameraModalOpen("back")}
              descrWithPhoto
            />
          </DmView>
        </KeyboardAwareScrollView>
      </DmView>
      {isValid && frontId && backId && (
        <ActionBtn
          title={t("continue")}
          className="mx-[14] mt-[8] rounded-5"
          textClassName="text-13 leading-[16px] font-custom600"
          onPress={handleOpenModalId}
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
      <MainModal
        isVisible={isModalIdVisible}
        Icon={<IdUserIcon />}
        onClose={handleSubmit}
        title={t("attention")}
        className="px-[5] pt-[50] pb-[39]"
        classNameTitle="mt-[20] text-20 leading-[24px] font-custom600"
        classNameDescr="mt-[6] mx-[25] text-13 leading-[20px] font-custom400"
        titleBtn={t("close")}
        classNameActionBtnText="text-13 leading-[16px] font-custom600"
        classNameBtnsWrapper="mx-[91]"
        classNameBtn="mt-[26] rounded-5"
        onPress={handleSubmit}
        descr={t("this_id_number_is_already_registered_in_our_system_descr", {
          email: "care@tappler.me",
        })}
      />
    </SafeAreaView>
  )
}

export default MyDocumentsIDScreen

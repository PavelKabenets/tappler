import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { CropRegion, crop } from "vision-camera-cropper"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera"
import { useSharedValue } from "react-native-worklets-core"
import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Vibration,
} from "react-native"
import { SCREEN_HEIGHT, SCREEN_WIDTH, hexToRGBA } from "helpers/helpers"
import { Image } from "react-native"
import { Shadow } from "react-native-shadow-2"
import colors from "styles/colors"
import ShuttterIcon from "assets/icons/shutter-button.svg"
import CloseIcon from "assets/icons/close.svg"
import FlashIcon from "assets/icons/flash.svg"
import FlashNoIcon from "assets/icons/flash-no.svg"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import SelfiePhotoFrameIcon from "assets/icons/selfie-photo-frame.svg"
import CameraFlipIcon from "assets/icons/camera-flip.svg"

type Props = RootStackScreenProps<"camera">

const CameraScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { type } = route.params
  // State
  const [cropRegion, setCropRegion] = useState({
    left: 16,
    top: 20,
    width: 68,
    height: 24,
  })
  const cropRegionShared = useSharedValue<undefined | CropRegion>(undefined)
  const shouldTake = useSharedValue(false)
  const [isFlashOn, setFleshOn] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [cameraDevice, setCameraDevice] = useState<"front" | "back">("back")
  const capture = () => {
    shouldTake.value = true
  }
  const cameraRef = useRef<Camera>(null)
  const [currentPhoto, setCurrentPhoto] = useState("")

  // Global Store
  // Variables
  const { t } = useTranslation()
  const device = useCameraDevice(cameraDevice)
  const { hasPermission } = useCameraPermission()
  const insets = useSafeAreaInsets()

  // Refs
  // Methods
  const getFrameSize = (): { width: number; height: number } => {
    const size = {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    }
    return size
  }

  const desiredRegionHeight = useMemo(() => {
    const size = getFrameSize()
    const regionWidth = 0.8 * size.width
    return regionWidth / (4 / 3)
  }, [SCREEN_HEIGHT])
  // Handlers
  const adaptCropRegionForIDCard = () => {
    const size = getFrameSize()
    const height = Math.ceil(desiredRegionHeight / size.height * 100)
    const region = {
      left: 14,
      top: 20,
      width: 72,
      height: 24,
    }
    setCropRegion(region)
    cropRegionShared.value = region
  }

  const onCaptured = (path: string) => {
    setIsActive(false)
    setCurrentPhoto(path)
  }

  const handleFleshPress = async () => {
    Vibration.vibrate([50])
    setFleshOn((prev) => !prev)
  }

  const handleSubmit = () => {
    if (type !== "selfie") {
      navigation.navigate("my-documents-id", {
        frontPhoto: type === "front" ? currentPhoto : undefined,
        backPhoto: type === "back" ? currentPhoto : undefined,
      })
    } else {
      navigation.navigate("my-documents-selfie", { selfiePhoto: currentPhoto })
    }
  }
  // Hooks
  // Listeners
  // Render Methods
  const onCapturedJS = Worklets.createRunOnJS(onCaptured)

  const takePhoto = async (isEmpty?: boolean) => {
    const res = await cameraRef.current?.takePhoto({
      enableShutterSound: true,
      flash: isFlashOn ? "on" : "off",
    })
    if (res?.path && !isEmpty) {
      setCurrentPhoto(res?.path)
    }
  }

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet"

    if (shouldTake.value == true && cropRegionShared.value != undefined) {
      shouldTake.value = false
      const result = crop(frame, {
        cropRegion,
        includeImageBase64: false,
        saveAsFile: true,
      })

      if (result.path) {
        onCapturedJS(result.path)
      }
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      adaptCropRegionForIDCard()
    })()
  }, [])

  useLayoutEffect(() => {
    if (type === "selfie") {
      setCameraDevice("front")
    } else {
      setCameraDevice("back")
    }
  }, [type])

  if (!device || !hasPermission) {
    return null
  }

  return (
    <DmView style={StyleSheet.absoluteFill}>
      <StatusBar
        barStyle={Platform.OS === "android" ? "dark-content" : "default"}
      />
      <Camera
        isActive
        device={device}
        style={StyleSheet.absoluteFill}
        frameProcessor={frameProcessor}
        photo={true}
        ref={cameraRef}
      />
      {!!currentPhoto && type === "selfie" && (
        <Image
          source={{ uri: currentPhoto }}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            position: "absolute",
          }}
        />
      )}
      {type === "selfie" && (
        <DmView
          style={[StyleSheet.absoluteFill, { marginTop: insets.top + 72 }]}
          className="items-center"
        >
          <Shadow
            distance={999}
            startColor={hexToRGBA(colors.black, 0.8)}
            style={{
              width: SCREEN_WIDTH - 72,
              height: (SCREEN_WIDTH - 72) * 1.2,
              borderRadius: 150,
            }}
          >
            <DmView
              className="w-full h-full"
              style={{ borderRadius: 999999 }}
            />
            <DmView className="mt-[12] px-[24]">
              <DmText className="text-16 leading-[20px] font-custom700 text-center text-white">
                {t("take_a_selfie")}
              </DmText>
              <DmText className="mt-[10] text-15 font-custom400 leading-[20px] text-center text-white">
                {t(
                  currentPhoto
                    ? "is_the_photo_clear_and_all_edges_are_visible"
                    : "make_sure_that_your_face_is_in_the_frame_descr"
                )}
              </DmText>
            </DmView>
          </Shadow>
        </DmView>
      )}
      <DmView style={StyleSheet.absoluteFill} className="justify-end">
        {type !== "selfie" && (
          <DmView
            className="absolute"
            style={{
              left: (8 / 100) * getFrameSize().width,
              top: (cropRegion.top / 100) * getFrameSize().height,
            }}
          >
            <Shadow
              distance={999}
              startColor={hexToRGBA(colors.black, 0.8)}
              endColor={hexToRGBA(colors.black, 0.8)}
              style={{
                width: ((cropRegion.width + 12) / 100) * getFrameSize().width,
                height: (cropRegion.height / 100) * getFrameSize().height,
                borderRadius: 15,
              }}
            >
              <DmView className="absolute w-full top-[-30]">
                <DmText className="text-16 leading-[19px] font-custom600 text-white text-center">
                  {t(
                    type === "front"
                      ? "front_side_of_your_photo_id"
                      : "back_side_of_your_photo_id"
                  )}
                </DmText>
              </DmView>
              <DmView className="w-full h-full" style={{ borderRadius: 15 }}>
                {!!currentPhoto && (
                  <DmView className="items-center">
                    <DmView className="rounded-15 border-1 overflow-hidden">
                      <Image
                        source={{ uri: `${currentPhoto}` }}
                        style={{
                          width:
                            ((cropRegion.width + 12) / 100) *
                            getFrameSize().width,
                          height:
                            (cropRegion.height / 100) * getFrameSize().height,
                        }}
                        resizeMode="stretch"
                      />
                    </DmView>
                  </DmView>
                )}
              </DmView>
            </Shadow>
          </DmView>
        )}
        <DmView
          className="absolute w-full px-[22] flex-row items-center justify-between"
          style={{ top: insets.top + 19 }}
        >
          <DmView onPress={navigation.goBack} hitSlop={HIT_SLOP_DEFAULT}>
            <CloseIcon fill={colors.white} />
          </DmView>
          {type !== "selfie" && (
            <DmView onPress={handleFleshPress} hitSlop={HIT_SLOP_DEFAULT}>
              {!isFlashOn ? <FlashNoIcon /> : <FlashIcon />}
            </DmView>
          )}
          {type === "selfie" && (
            <DmView
              onPress={() =>
                setCameraDevice((prev) => (prev === "back" ? "front" : "back"))
              }
            >
              <CameraFlipIcon />
            </DmView>
          )}
        </DmView>
        {type !== "selfie" && (
          <DmView
            className="absolute w-full px-[22]"
            style={{
              top:
                cropRegion.top / 100 * getFrameSize().height +
                (cropRegion.height / 100) * getFrameSize().height +
                10,
            }}
          >
            <DmText className="text-15 leading-[20px] font-custom400 text-white text-center">
              {!currentPhoto &&
                t(
                  type === "front"
                    ? "place_the_front_of_your_photo_descr"
                    : "place_the_back_of_your_id_descr"
                )}
            </DmText>
          </DmView>
        )}

        <DmView
          className="absolute w-full items-center pt-[20]"
          onPress={
            type === "selfie"
              ? () => takePhoto()
              : () => {
                  takePhoto(true)
                  isFlashOn
                    ? setTimeout(() => {
                        capture()
                      }, 500)
                    : capture()
                }
          }
          style={{
            paddingBottom:
              insets.bottom > 31 ? insets.bottom : 31 - insets.bottom,
            backgroundColor:
              currentPhoto && type !== "selfie"
                ? hexToRGBA(colors.black, 0.6)
                : undefined,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        >
          {!currentPhoto && <ShuttterIcon />}
          {currentPhoto && (
            <>
              {type !== "selfie" && (
                <DmText className="pt-[20] pb-[40] text-20 leading-[24px] font-custom600 text-white text-center">
                  {t("is_the_photo_clear")}
                </DmText>
              )}
              <DmView className="w-full flex-row justify-between px-[12]">
                <ActionBtn
                  title={t("retake")}
                  className="flex-1 rounded-5 bg-transparent border-1 border-white mr-[5]"
                  onPress={() => setCurrentPhoto("")}
                />
                <ActionBtn
                  className="flex-1 rounded-5 ml-[5]"
                  title={t("submit_photo")}
                  onPress={handleSubmit}
                />
              </DmView>
            </>
          )}
        </DmView>
      </DmView>
    </DmView>
  )
}

export default CameraScreen

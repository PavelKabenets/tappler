import React from "react"
// Components
import { DmText, DmView } from "components/UI"
import { Dimensions, FlatList, Image } from "react-native"
import { Shadow } from "react-native-shadow-2"
// Hooks & Redux
import { useTypedSelector } from "store"
import { useTranslation } from "react-i18next"
// Helpers & Types
import { ImageOrVideo } from "react-native-image-crop-picker"
import { hexToRGBA } from "helpers/helpers"
import { MediaTypeCredentials } from "types"
// Libs & Utils
// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import colors from "styles/colors"
import EditPencilIcon from "assets/icons/edit-pencil-note.svg"
import CloseIcon from "assets/icons/close.svg"
import CameraIcon from "assets/icons/camera-grey.svg"

interface Props {
  title: string
  Icon?: boolean
  photo?: boolean
  className?: string
  classNameHeader?: string
  currentPhoto?: ImageOrVideo
  Btn?: boolean
  subtitle?: string
  subtitleArr?: (string | ImageOrVideo)[]
  subtitleArrCredential?: MediaTypeCredentials[]
  onPress?: () => void
  onDeleteImg?: (index: number) => void
}

const MyProfileSettingsComponent: React.FC<Props> = ({
  title,
  subtitle,
  className,
  Btn,
  Icon,
  currentPhoto,
  subtitleArr,
  subtitleArrCredential,
  onPress,
  classNameHeader,
  photo,
  onDeleteImg,
}) => {
  const { t } = useTranslation()
  const { user } = useTypedSelector((store) => store.auth)
  const screenWidth = Dimensions.get("window").width
  const imageSize = screenWidth * 0.28
  const renderListItem = ({
    item,
    index,
  }: {
    item: string | ImageOrVideo
    index: number
  }) => {
    const uri = typeof item === "string" ? item : item.path
    return (
      <DmView className={clsx("pt-[10] mr-[10]", index === 0 && "ml-[15]")}>
        <Image
          style={{ width: imageSize, height: imageSize, borderRadius: 3 }}
          source={{ uri }}
        />
      </DmView>
    )
  }

  const renderListItemCredential = ({
    item,
    index,
  }: {
    item: MediaTypeCredentials
    index: number
  }) => {
    const uri = typeof item.photo === "string" ? item.photo : item.photo?.path
    return (
      <DmView>
        <DmView className="flex-row items-center mt-[13]">
          <DmView className="mr-[8] w-[8] h-[8] rounded-full bg-red" />
          <DmText className="font-13 leading-[16px] font-custom400">
            {item.credential}
          </DmText>
        </DmView>
        <DmView className="mt-[7]">
          <DmView
            onPress={() => onDeleteImg?.(index)}
            className="absolute top-[-7] left-[100] w-[20] h-[20] rounded-full border-1 border-grey2 bg-white items-center z-10 justify-center"
          >
            <CloseIcon />
          </DmView>
          <Image style={{ width: 106, height: 86 }} source={{ uri }} />
        </DmView>
      </DmView>
    )
  }

  return (
    <DmView>
      <DmView
        className={clsx(
          "flex-row justify-between pl-[15] pr-[19] py-[20] border-b-1 border-grey4",
          className
        )}
      >
        <DmView className="flex-1">
          <DmView>
            <DmView
              className={clsx(
                "flex-row items-center justify-between",
                classNameHeader
              )}
            >
              <DmText className="text-14 leading-[18px] font-custom600">
                {title}
              </DmText>
              {Icon && (
                <DmView onPress={onPress}>
                  <EditPencilIcon />
                </DmView>
              )}
            </DmView>
            {photo && (
              <DmView onPress={onPress} className="items-center mt-[-18]">
                <Image
                  source={{
                    uri: currentPhoto?.path || user?.profilePhoto,
                  }}
                  style={{ width: 125, height: 125, borderRadius: 100 }}
                />
                <DmView className="absolute bottom-[-10] items-center">
                  <Shadow
                    style={{ borderRadius: 28 }}
                    distance={1}
                    startColor={hexToRGBA(colors.grey4, 0.2)}
                    offset={[0, 1]}
                  >
                    <DmView className="rounded-28 bg-white">
                      <DmView className="flex-row justify-between items-center py-[5] px-[7]">
                        <CameraIcon />
                        <DmText className="ml-[3] text-13 leading-[16px] font-custom500">
                          {t("edit")}
                        </DmText>
                      </DmView>
                    </DmView>
                  </Shadow>
                </DmView>
              </DmView>
            )}
          </DmView>
          {subtitle && (
            <DmText className="text-13 leading-[16px] font-custom400 mt-[11]">
              {t(subtitle)}
            </DmText>
          )}
          {subtitleArr && (
            <DmView>
              <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                data={subtitleArr}
                renderItem={renderListItem}
                horizontal
                scrollEventThrottle={16}
              />
            </DmView>
          )}
          {subtitleArrCredential && (
            <DmView className="mb-[15]">
              <FlatList
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                data={subtitleArrCredential}
                renderItem={renderListItemCredential}
                scrollEventThrottle={16}
              />
            </DmView>
          )}
        </DmView>
      </DmView>
      {Btn && (
        <DmView onPress={onPress} className="px-[15] w-1/3">
          <DmView className="border-1 border-red rounded-5 h-[31] justify-center items-center">
            <DmText className="text-13 leading-[16px] font-custom600">
              {t("add")}
            </DmText>
          </DmView>
        </DmView>
      )}
    </DmView>
  )
}

export default MyProfileSettingsComponent

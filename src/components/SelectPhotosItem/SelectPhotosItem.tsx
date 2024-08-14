import React from "react"

import { DmText, DmView } from "components/UI"
import { Image, ImageProps } from "react-native"

import styles, { photoWidth } from "./styles"
import CloseIcon from "assets/icons/close.svg"
import clsx from "clsx"
import { ImageOrVideo } from "react-native-image-crop-picker"

interface Props extends ImageProps {
  item?: ImageOrVideo
  className?: string
  onPress?: () => void
  Icon?: React.ReactNode
  onDelete?: (item: ImageOrVideo | string) => void
  width?: number
  height?: number
  descr?: string
  photoUrl?: string
  wrapperClassName?: string
  descrWithPhoto?: boolean
  descrImgHeight?: number
  classNameClose?: string
}

const SelectPhotosItem: React.FC<Props> = ({
  item,
  className,
  onPress,
  Icon,
  onDelete,
  width,
  height,
  descr,
  photoUrl,
  wrapperClassName,
  descrWithPhoto,
  descrImgHeight,
  classNameClose,
  ...restProps
}) => {
  const handleDelete = () => {
    if (item) {
      return onDelete?.(item)
    }

    if (photoUrl) {
      return onDelete?.(photoUrl)
    }
  }

  return (
    <DmView
      className={wrapperClassName}
      onPress={
        onDelete && (item || photoUrl) ? handleDelete : onPress || undefined
      }
    >
      <DmView
        className={clsx(
          "mb-[14] flex-1 overflow-hidden rounded-10",
          (descrWithPhoto || descr) && "justify-between",
          className
        )}
        style={{
          width: width || photoWidth,
          height: height || photoWidth / 1.24,
        }}
      >
        {Icon && !item?.path && !photoUrl && (
          <>
            <DmView className="flex-1 bg-grey32 items-center justify-center mb-[-1]">
              {Icon}
            </DmView>
            {!!descr && (
              <DmView className="py-[6]  bg-black">
                <DmText className="text-center text-13 leading-[16px] font-custom500 text-white">
                  {descr}
                </DmText>
              </DmView>
            )}
          </>
        )}
        {(!!item || photoUrl) && (
          <>
            <DmView className="flex-1">
              <Image
                source={{ uri: item?.path || photoUrl }}
                style={{
                  width: width || photoWidth,
                  height: descrWithPhoto
                    ? descrImgHeight || "100%"
                    : height || photoWidth / 1.24,
                }}
                {...restProps}
              />
            </DmView>
            {!!descr && descrWithPhoto && (
              <DmView className="py-[6] mt-[-1] bg-black">
                <DmText className="text-center text-13 leading-[16px] font-custom500 text-white">
                  {descr}
                </DmText>
              </DmView>
            )}
          </>
        )}
      </DmView>
      {(item || photoUrl) && (
        <DmView
          className={clsx(
            "absolute top-[-10] right-[-10] w-[20] h-[20] rounded-full border-1 border-grey2 bg-white items-center justify-center",
            classNameClose
          )}
        >
          <CloseIcon />
        </DmView>
      )}
    </DmView>
  )
}

export default SelectPhotosItem

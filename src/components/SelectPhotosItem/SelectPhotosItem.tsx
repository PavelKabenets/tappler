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
  onDelete: (item: ImageOrVideo | string) => void
  width?: number
  height?: number
  descr?: string
  photoUrl?: string
  wrapperClassName?: string
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
  ...restProps
}) => {
  return (
    <DmView
      className={wrapperClassName}
      onPress={item || photoUrl ? () => onDelete(item || photoUrl) : onPress}
    >
      <DmView
        className={clsx("mb-[14] flex-1 overflow-hidden rounded-5", className)}
        style={{
          width: width || photoWidth,
          height: height || photoWidth / 1.24,
        }}
      >
        {Icon && !item?.path && !photoUrl && (
          <>
            <DmView className="flex-1 bg-grey32 items-center justify-center">
              {Icon}
            </DmView>
            {!!descr && (
              <DmView className="py-[6] bg-black">
                <DmText className="text-center text-13 leading-[16px] font-custom500 text-white">
                  {descr}
                </DmText>
              </DmView>
            )}
          </>
        )}
        {(!!item || photoUrl) && (
          <Image
            source={{ uri: item?.path || photoUrl }}
            style={{
              width: width || photoWidth,
              height: height || photoWidth / 1.24,
            }}
            {...restProps}
          />
        )}
      </DmView>
      {(item || photoUrl) && (
        <DmView className="absolute top-[-10] right-[-10] w-[20] h-[20] rounded-full border-1 border-grey2 bg-white items-center justify-center">
          <CloseIcon />
        </DmView>
      )}
    </DmView>
  )
}

export default SelectPhotosItem

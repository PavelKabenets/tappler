import React from "react"

import { DmText, DmView } from "components/UI"
import { Image } from "react-native"

import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import clsx from "clsx"

interface Props {
  item: string
  className?: string
  onPress: (item: string) => void
}

const SelectPhotosItem: React.FC<Props> = ({ item, className, onPress }) => {
  return (
    <DmView
      className={clsx("mb-[14]", className)}
      onPress={() => onPress(item)}
    >
      <DmView style={styles.imgWrapper}>
        <Image source={{ uri: item }} style={styles.img} />
      </DmView>
      <DmView className="absolute top-[-10] right-[-10] w-[20] h-[20] rounded-full border-1 border-grey2 bg-white items-center justify-center">
        <CloseIcon />
      </DmView>
    </DmView>
  )
}

export default SelectPhotosItem

import React from "react"

import { DmText, DmView } from "components/UI"
import SelectPhotosItem from "components/SelectPhotosItem"
import { ImageOrVideo } from "react-native-image-crop-picker"
import styles from "./styles"

import clsx from "clsx"

interface Props {
  item: ImageOrVideo | string
  index: number
  onDelete: (index: number) => void
}

const SelectUploadPhotosComponent: React.FC<Props> = ({
  item,
  index,
  onDelete,
}) => {
  return (
    <DmView onPress={() => onDelete(index)}>
      {typeof item !== "string" && (
        <SelectPhotosItem
          item={item}
          resizeMode="cover"
          wrapperClassName={clsx(
            "mx-[10]",
            (index + 1) % 3 === 0 && "mx-[0]",
            (index + 3) % 3 === 0 && "mx-[0]"
          )}
        />
      )}
      {typeof item === "string" && (
        <SelectPhotosItem
          photoUrl={item}
          resizeMode="cover"
          wrapperClassName={clsx(
            "mx-[10]",
            (index + 1) % 3 === 0 && "mx-[0]",
            (index + 3) % 3 === 0 && "mx-[0]"
          )}
        />
      )}
    </DmView>
  )
}

export default SelectUploadPhotosComponent

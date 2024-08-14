import React from "react"

import { DmText, DmView } from "components/UI"
import styles from "./styles"
import clsx from "clsx"
import CameraIcon from "assets/icons/camera.svg"

interface Props {
  index: number
  onPress: (index: number) => void
  text: string
}

const UploadPhotosComponent: React.FC<Props> = ({ index, onPress, text }) => {
  return (
    <DmView
      onPress={() => onPress(index)} 
      className={clsx(
        "px-[13] justify-center items-center border-0.3 border-black rounded-10",
        "mx-[10]",
        (index + 1) % 3 === 0 && "mx-[0]",
        (index + 3) % 3 === 0 && "mx-[0]"
      )}
      style={styles.item}
    >
      <CameraIcon width={40} height={40} />
      <DmText className="mt-[5] text-11 leading-[14px] text-center font-custom600">
        {text}
      </DmText>
    </DmView>
  )
}

export default UploadPhotosComponent

import React, { Dispatch, SetStateAction, useEffect } from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import { useTranslation } from "react-i18next"
import { useSwipeableItemParams } from "react-native-swipeable-item"

interface Props {
  onDelete: () => void
  isPressToggle?: boolean
  setPressToggle?: Dispatch<SetStateAction<boolean>>
}

const UnderlayLeftDelete: React.FC<Props> = ({
  onDelete,
  isPressToggle,
  setPressToggle,
}) => {
  const { t } = useTranslation()
  const { close } = useSwipeableItemParams()

  const handleDelete = () => {
    onDelete()
  }

  useEffect(() => {
    if (isPressToggle && setPressToggle) {
      close()
      setPressToggle(false)
    }
  }, [isPressToggle])

  return (
    <DmView className="w-full items-end" onPress={handleDelete}>
      <DmView className="h-full w-[90] bg-red items-center justify-center">
        <DmText className="text-13 leading-[16px] font-custom600 text-white">
          {t("delete")}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default UnderlayLeftDelete

import React, { useLayoutEffect, useState } from "react"

import { DmChecbox, DmText, DmView } from "components/UI"
import Modal from "react-native-modal"

import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"

import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import LocationIcon from "assets/icons/location.svg"
import ActionResetBtn from "components/ActionResetBtn"

interface Props {
  isVisible: boolean
  onClose?: () => void
  onPress: (type: "office" | "warehouse" | "home" | "store") => void
  currentType?: "office" | "warehouse" | "home" | "store"
  onReset?: () => void
}

const SelectLocationTypeModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onPress,
  currentType,
  onReset,
}) => {
  const [selectedType, setSelectedType] = useState<
    "office" | "warehouse" | "home" | "store" | ""
  >(currentType || "")

  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  const handleSelectType = (
    type: "office" | "warehouse" | "home" | "store"
  ) => {
    setSelectedType(type)
  }

  const handleReset = () => {
    if (onReset) {
      onReset()
      setSelectedType("")

      if (onClose) {
        onClose()
      }
    }
    setSelectedType("")
  }

  useLayoutEffect(() => {
    if (currentType) {
      setSelectedType(currentType)
    }
  }, [currentType])

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} className="m-0">
      <DmView
        className="flex-1 bg-white justify-between"
        style={{
          paddingTop: insets.top + 16,
          paddingBottom:
            insets.bottom > 45
              ? insets.bottom
              : 45 - insets.bottom + insets.bottom,
        }}
      >
        <DmView>
          <DmView className="px-[16] pb-[16]">
            <DmView
              className="w-[25] h-[25] items-center justify-center"
              onPress={onClose}
            >
              <CloseIcon width={14} height={14} />
            </DmView>
          </DmView>
          <DmView className="mt-[42] px-[18]">
            <DmView className="flex-row items-center">
              <LocationIcon />
              <DmText className="ml-[9] text-16 leading-[19px] font-custom600 flex-1">
                {t("select_location_type")}
              </DmText>
            </DmView>
            <DmView className="mt-[18]">
              <DmChecbox
                title={t("service_location_arr.office")}
                onPress={() => handleSelectType("office")}
                isChecked={selectedType === "office"}
              />
              <DmChecbox
                title={t("service_location_arr.warehouse")}
                className="mt-[13]"
                onPress={() => handleSelectType("warehouse")}
                isChecked={selectedType === "warehouse"}
              />
              <DmChecbox
                title={t("service_location_arr.home")}
                className="mt-[13]"
                onPress={() => handleSelectType("home")}
                isChecked={selectedType === "home"}
              />
              <DmChecbox
                title={t("service_location_arr.shop")}
                className="mt-[13]"
                onPress={() => handleSelectType("store")}
                isChecked={selectedType === "store"}
              />
            </DmView>
          </DmView>
        </DmView>
        <DmView>
          <ActionResetBtn
            onReset={handleReset}
            actionBtnDisable={!selectedType}
            onPress={selectedType ? () => onPress(selectedType) : undefined}
          />
        </DmView>
      </DmView>
    </Modal>
  )
}

export default SelectLocationTypeModal

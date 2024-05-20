import React from "react"

import { DmText, DmView } from "components/UI"
import Modal from "react-native-modal"
import { ScrollView } from "react-native"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"

interface Props {
  isVisible: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

const ModalFullScreen: React.FC<Props> = ({ isVisible, onClose, children }) => {
  const insets = useSafeAreaInsets()
  return (
    <Modal isVisible={isVisible} className="m-0">
      <DmView
        style={{
          paddingTop: insets.top ? insets.top : 16,
          paddingBottom: insets.bottom > 36 ? insets.bottom - (insets.bottom - 36) : 36,
        }}
        className="flex-1 bg-white pt-[15]"
      >
        <DmView
          className="px-[24] w-[25] h-[25] items-center justify-center"
          onPress={onClose}
        >
          <CloseIcon />
        </DmView>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
        <DmView className="border-t-1 border-grey32" />
      </DmView>
    </Modal>
  )
}

export default ModalFullScreen

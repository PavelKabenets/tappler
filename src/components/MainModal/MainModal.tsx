import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import Modal from "react-native-modal"

import styles from "./styles"
import clsx from "clsx"

interface Props {
  isVisible: boolean
  onClose: () => void
  title: string
  Icon?: React.ReactNode
  descr?: string
  onPress: () => void
  titleBtn: string
  classNameBtn?: string
  className?: string
}

const MainModal: React.FC<Props> = ({
  isVisible,
  onClose,
  title,
  Icon,
  descr,
  onPress,
  titleBtn,
  classNameBtn,
  className,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      className="m-0 px-[22]"
    >
      <DmView
        className={clsx(
          "bg-white rounded-12 px-[24] pt-[28] pb-[26] items-center",
          className
        )}
      >
        {!!Icon && <DmView>{Icon}</DmView>}
        <DmText className="mt-[24] text-16 text-center font-custom600 leading-[27px]">
          {title}
        </DmText>
        {!!descr && (
          <DmText className="mt-[8] text-13 text-center font-custom400">
            {descr}
          </DmText>
        )}
        <DmView className="px-[8] w-full">
          <ActionBtn
            title={titleBtn}
            onPress={onPress}
            className={clsx("mt-[30] rounded-21 h-[41] mx-[80]", classNameBtn)}
            textClassName="font-custom600"
          />
        </DmView>
      </DmView>
    </Modal>
  )
}

export default MainModal

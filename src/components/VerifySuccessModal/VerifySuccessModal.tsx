import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import Modal from "react-native-modal"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import BigCheckIcon from "assets/icons/check-mark-big.svg"
import clsx from "clsx"

interface Props {
  isVisible: boolean
  textSuccess?: string
  classNameTitle?: string
  classNameTextSuccess?: string
  title: string
  onClose: () => void
}

const VerifySuccessModal: React.FC<Props> = ({
  isVisible,
  onClose,
  title,
  classNameTitle,
  textSuccess,
  classNameTextSuccess,
}) => {
  const { t } = useTranslation()
  return (
    <Modal
      isVisible={isVisible}
      className="m-0 px-[19]"
      onBackdropPress={onClose}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      animationInTiming={400}
    >
      <DmView className="bg-white rounded-12 py-[30] px-[39]">
        <DmView className="items-center">
          <BigCheckIcon />
        </DmView>
        {textSuccess && (
          <DmText className="mt-[11] text-20 leading-[24px] font-custom600 text-center">
            {textSuccess}
          </DmText>
        )}
        <DmText
          className={clsx(
            "mt-[7] text-13 leading-[27px] font-custom500 text-center",
            classNameTitle
          )}
        >
          {title}
        </DmText>
        <ActionBtn
          className="mt-[17] h-[41]"
          title={t("OK")}
          onPress={onClose}
          textClassName="text-13 leading-[16px]"
        />
      </DmView>
    </Modal>
  )
}

export default VerifySuccessModal

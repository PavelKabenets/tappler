import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import Modal from "react-native-modal"
import BtnsRentangle from "components/BtnsRentangle"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import clsx from "clsx"
import colors from "styles/colors"

interface Props {
  isVisible: boolean
  onClose: () => void
  title?: string
  Icon?: React.ReactNode
  descr?: string
  onPress?: () => void
  titleBtn?: string
  titleBtnSecond?: string
  classNameBtn?: string
  className?: string
  children?: React.ReactNode
  classNameModal?: string
  classNameTitle?: string
  classNameDescr?: string
  isCloseBtn?: boolean
  isBtnsTwo?: boolean
  onPressSecond?: () => void
  classNameBtnsWrapper?: string
  classNameBtns?: string
  classNameBtnsText?: string
  classNameActionBtnText?: string
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
  children,
  classNameModal,
  classNameDescr,
  classNameTitle,
  isCloseBtn,
  isBtnsTwo,
  onPressSecond,
  titleBtnSecond,
  classNameBtnsWrapper,
  classNameBtns,
  classNameBtnsText,
  classNameActionBtnText,
}) => {
  const { t } = useTranslation()
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      className={clsx("m-0 px-[22]", classNameModal)}
    >
      <DmView
        className={clsx(
          "bg-white rounded-12",
          !!className?.match(/rounded-\d\d/) &&
            !!className?.match(/rounded-\d\d/)?.length &&
            className?.match(/rounded-\d\d/)![0],
          !!className?.match(/rounded-\d/) &&
            !!className?.match(/rounded-\d/)?.length &&
            className?.match(/rounded-\d\d/)![0]
        )}
      >
        <DmView
          className={clsx(
            "bg-white rounded-12 px-[24] pt-[28] items-center",
            !isCloseBtn && "pb-[26]",
            className
          )}
        >
          {!!Icon && <DmView>{Icon}</DmView>}
          <DmText
            className={clsx(
              "mt-[24] text-16 text-center leading-[27px]",
              classNameTitle,
              "font-custom600"
            )}
          >
            {title}
          </DmText>
          {!!descr && (
            <DmText
              className={clsx(
                "mt-[8] text-13 text-center",
                classNameDescr,
                "font-custom400"
              )}
            >
              {descr}
            </DmText>
          )}
          {children}
          {!isCloseBtn && onPress && !isBtnsTwo && (
            <DmView className="px-[8] flex-row">
              <ActionBtn
                title={titleBtn || ""}
                onPress={onPress}
                className={clsx(
                  "w-full mt-[30] rounded-21 h-[41] mx-[70]",
                  classNameBtn
                )}
                textClassName={clsx("font-custom600", classNameActionBtnText)}
              />
            </DmView>
          )}
          {isBtnsTwo && (
            <BtnsRentangle
              className={classNameBtnsWrapper}
              titleActionBtn={titleBtn}
              titleWhiteBtn={titleBtnSecond}
              onActionBtnPress={onPress}
              onWhiteBtnPress={onPressSecond}
              classNameBtns={classNameBtns}
              classNameBtnsText={classNameBtnsText}
            />
          )}
        </DmView>
        {isCloseBtn && (
          <DmView
            className="mt-[20] py-[15] border-t-1 border-t-grey14 w-full"
            onPress={onClose}
          >
            <DmText className="text-center text-17 text-red font-custom700">
              {t("close")}
            </DmText>
          </DmView>
        )}
      </DmView>
    </Modal>
  )
}

export default MainModal

import React, { useEffect } from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import Modal from "react-native-modal"
import BtnsRentangle from "components/BtnsRentangle"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import clsx from "clsx"
import colors from "styles/colors"
import CloseIcon from "assets/icons/close.svg"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import { useTypedSelector } from "store"
import { useDispatch } from "react-redux"
import { setLoadingModalVisible } from "store/auth/slice"
import { StyleProp, ViewStyle } from "react-native"

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
  classNameSecondBtn?: string
  classNameSecondBtnText?: string
  childrenBottom?: React.ReactNode
  isLoading?: boolean
  classNameCloseBtn?: string
  isCloseIcon?: boolean
  isFadeInOut?: boolean
  titleOutSide?: string
  descrOutSide?: string
  classNameWrapperHight?: string
  classNameTitleOutSide?: string
  classNameCloseIcon?: string
  closeBtnTitle?: string
  styleHightWrapper?: StyleProp<ViewStyle>
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
  classNameSecondBtn,
  classNameSecondBtnText,
  childrenBottom,
  isLoading,
  classNameCloseBtn,
  isCloseIcon,
  isFadeInOut = true,
  titleOutSide,
  descrOutSide,
  classNameWrapperHight,
  classNameTitleOutSide,
  classNameCloseIcon,
  closeBtnTitle,
  styleHightWrapper,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isLogout } = useTypedSelector((store) => store.auth)

  useEffect(() => {
    if (isLogout) {
      dispatch(setLoadingModalVisible(true))
      const interval = setTimeout(() => {
        onClose()
      }, 1000)

      return () => {
        clearTimeout(interval)
      }
    }
  }, [isLogout])
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      className={clsx("m-0 px-[22]", classNameModal)}
      animationIn={isFadeInOut ? "fadeIn" : "slideInUp"}
      animationOut={isFadeInOut ? "fadeOut" : "slideOutDown"}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
    >
      <DmView>
        {!!titleOutSide && (
          <DmText
            className={clsx(
              "ml-[7] text-18 leading-[21px] font-custom700 text-white",
              classNameTitleOutSide
            )}
          >
            {titleOutSide}
          </DmText>
        )}
        {!!descrOutSide && (
          <DmText
            className={clsx(
              "ml-[7] text-12 leading-[15px] font-custom500 text-white",
              !!titleOutSide && "mt-[8.5]"
            )}
          >
            {descrOutSide}
          </DmText>
        )}
        <DmView
          className={clsx(
            "bg-white rounded-12",
            !!className?.match(/rounded-\d\d/) &&
              !!className?.match(/rounded-\d\d/)?.length &&
              className?.match(/rounded-\d\d/)?.[0],
            !!className?.match(/rounded-\d/) &&
              !!className?.match(/rounded-\d/)?.length &&
              className?.match(/rounded-\d\d/)?.[0],
            (titleOutSide || descrOutSide) && "mt-[12]",
            classNameWrapperHight
          )}
          style={styleHightWrapper}
        >
          <DmView
            className={clsx(
              "bg-white rounded-12 px-[24] pt-[28] items-center",
              !isCloseBtn && "pb-[26]",
              className
            )}
          >
            {!!Icon && <DmView>{Icon}</DmView>}
            {!!title && (
              <DmText
                className={clsx(
                  "mt-[24] text-16 text-center",
                  "font-custom600 leading-[27px]",
                  classNameTitle
                )}
              >
                {title}
              </DmText>
            )}
            {!!descr && (
              <DmText
                className={clsx(
                  "mt-[8] text-13 text-center",
                  "font-custom400",
                  classNameDescr
                )}
              >
                {descr}
              </DmText>
            )}
            {!!children && <DmView className="w-full">{children}</DmView>}
            {!isCloseBtn && onPress && !isBtnsTwo && (
              <DmView className={clsx("px-[8] flex-row", classNameBtnsWrapper)}>
                <ActionBtn
                  title={titleBtn || ""}
                  onPress={onPress}
                  disable={isLoading}
                  isLoading={isLoading}
                  className={clsx(
                    "w-full mt-[30] rounded-21 h-[41] mx-[70]",
                    classNameBtn
                  )}
                  textClassName={clsx(
                    classNameActionBtnText?.match(/font/)
                      ? classNameActionBtnText
                      : "font-custom600"
                  )}
                />
              </DmView>
            )}
            {isBtnsTwo && (
              <BtnsRentangle
                className={classNameBtnsWrapper}
                titleActionBtn={titleBtn}
                titleWhiteBtn={titleBtnSecond}
                onActionBtnPress={onPress}
                onWhiteBtnPress={onPressSecond || onClose}
                classNameBtns={classNameBtns}
                classNameBtnsText={classNameBtnsText}
                classNameActionBtn={classNameBtn}
                classNameSecondBtn={classNameSecondBtn}
                classNameActionBtnText={classNameActionBtnText}
                classNameSecondBtnText={classNameSecondBtnText}
                isLoading={isLoading}
              />
            )}
            {childrenBottom}
          </DmView>
          {isCloseBtn && (
            <DmView
              className={clsx(
                "mt-[20] py-[15] border-t-1 border-t-grey14",
                classNameCloseBtn
              )}
              onPress={onClose}
            >
              <DmText className="text-center text-17 text-red font-custom700">
                {closeBtnTitle || t("close")}
              </DmText>
            </DmView>
          )}
          {isCloseIcon && (
            <DmView
              className={clsx(
                "absolute top-[-25] right-[10]",
                classNameCloseIcon
              )}
              onPress={onClose}
              hitSlop={HIT_SLOP_DEFAULT}
            >
              <CloseIcon
                width={12}
                height={12}
                strokeWidth={0}
                fill={colors.white}
              />
            </DmView>
          )}
        </DmView>
      </DmView>
    </Modal>
  )
}

export default MainModal

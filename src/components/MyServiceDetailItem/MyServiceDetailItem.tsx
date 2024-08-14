import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"
import { I18nManager } from "react-native"
import DoneIcon from "assets/icons/check-mark.svg"

interface Props {
  Icon: React.ReactNode
  title: string
  descr: string
  titleBtn?: string
  classNameBtn?: string
  classNameTitle?: string
  classNameSubtitle?: string
  classNameDescr?: string
  className?: string
  onPress?: () => void
  btnVariant?: "white" | "bordered" | "grey" | "yellow"
  disable?: boolean
  isDoneIconVisible?: boolean
  isCenterIcon?: boolean
  RightIcon?: React.ReactNode
  IconDone?: React.ReactNode
  subTitle?: string
  classNameIcon?: string
}

const MyServiceDetailItem: React.FC<Props> = ({
  title,
  descr,
  Icon,
  classNameBtn,
  titleBtn,
  onPress,
  btnVariant,
  className,
  disable,
  isDoneIconVisible,
  isCenterIcon,
  classNameDescr,
  classNameTitle,
  classNameSubtitle,
  RightIcon,
  IconDone,
  subTitle,
  classNameIcon,
}) => {
  return (
    <DmView
      className={clsx(
        "mr-[16] pl-[15] py-[18] border-b-0.5 border-b-grey14",
        { "opacity-[0.4]": disable },
        { "flex-row items-center px-[10] pt-[10] pb-[8]": isCenterIcon },
        className
      )}
      onPress={onPress}
    >
      {isCenterIcon && Icon && (
        <DmView className={clsx("mr-[12] flex-[0.1]", classNameIcon)}>
          {Icon}
        </DmView>
      )}
      <DmView className={clsx(isCenterIcon && "flex-1")}>
        <DmView className="flex-row items-center">
          {!!Icon && !isCenterIcon && (
            <DmView
              className={clsx(
                "mr-[8] w-[24]",
                I18nManager.isRTL && "scale-x-[-1]"
              )}
            >
              {Icon}
            </DmView>
          )}
          <DmText
            className={clsx(
              "text-13 leading-[16px] font-custom600",
              classNameTitle
            )}
          >
            {title}
          </DmText>
          <DmView>
            {!!subTitle && !isDoneIconVisible && (
              <DmText
                className={clsx(
                  "ml-[4] text-13 leading-[16px] font-custom400",
                  classNameSubtitle
                )}
              >
                {subTitle}
              </DmText>
            )}
            {!!titleBtn && !isDoneIconVisible && (
              <ActionBtn
                className={clsx("ml-[10] h-[22]", classNameBtn)}
                title={titleBtn}
                textClassName={clsx(
                  I18nManager.isRTL && "mt-[-2]",
                  "text-10 leading-[13px] font-custom500"
                )}
                variant={btnVariant}
              />
            )}
            {!!isDoneIconVisible && (
              <DmView className={clsx("ml-[10]")}>
                {IconDone || <DoneIcon />}
              </DmView>
            )}
          </DmView>
        </DmView>
        <DmView className="flex-row">
          {!!Icon && !isCenterIcon && (
            <DmView
              className={clsx(
                "mr-[8] w-[24] opacity-0",
                I18nManager.isRTL && "scale-x-[-1]"
              )}
            >
              {Icon}
            </DmView>
          )}

          <DmText
            className={clsx(
              "mt-[6] text-13 leading-[16px] font-custom400",
              classNameDescr
            )}
          >
            {descr}
          </DmText>
        </DmView>
      </DmView>
      {RightIcon && <DmView className="mx-[10]">{RightIcon}</DmView>}
    </DmView>
  )
}

export default MyServiceDetailItem

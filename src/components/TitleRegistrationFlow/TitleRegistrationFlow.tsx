import React from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import clsx from "clsx"

interface Props {
  title?: string
  descr?: string
  descrArray?: string[]
  Icon?: React.ReactNode
  className?: string
  classNameDescr?: string
  classNameTitle?: string
  descrRight?: string
  classNameDescrRight?: string
  IconRight?: React.ReactNode
  onPress?: () => void
  classNameDescrArr?: string
  classNameDescrArrItem?: string
  classNameDescrArrItemWrapper?: string
  titleIcon?: React.ReactNode
}

const TitleRegistrationFlow: React.FC<Props> = ({
  title,
  descr,
  Icon,
  className,
  classNameDescr,
  classNameDescrRight,
  classNameTitle,
  descrArray,
  descrRight,
  IconRight,
  onPress,
  classNameDescrArr,
  classNameDescrArrItem,
  classNameDescrArrItemWrapper,
  titleIcon,
}) => {
  const { t, i18n } = useTranslation()
  const renderListItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <DmView
        key={index}
        className={clsx(
          "mt-[3] flex-row items-center",
          index === 0 && "mt-[2]",
          i18n.language === "ar" && "mt-[0]",
          classNameDescrArrItemWrapper
        )}
      >
        <DmView className="w-[6] h-[6] bg-red rounded-full" />
        <DmText
          className={clsx(
            "ml-[3] text-12 leading-[20px] font-custom400 flex-1",
            classNameDescrArrItem
          )}
        >
          {t(item)}
        </DmText>
      </DmView>
    )
  }
  return (
    <DmView className={clsx(className)} onPress={onPress}>
      <DmView className="flex-row items-center justify-between">
        <DmView className="flex-1">
          <DmView className="flex-row items-center">
            {!!titleIcon && <DmView className="mr-[8]">{titleIcon}</DmView>}

            {!!title && (
              <DmText
                className={clsx(
                  "text-16",
                  !classNameTitle?.match(/leading-/) && "leading-[19px]",
                  !classNameTitle?.match(/font-/) && "font-custom600",
                  classNameTitle
                )}
              >
                {title}
                {!!descrRight && (
                  <DmText
                    className={clsx(
                      "ml-[5] text-16 leading-[19px] flex-1",
                      classNameDescrRight
                    )}
                  >
                    {" "}
                    {descrRight}
                  </DmText>
                )}
              </DmText>
            )}
          </DmView>

          <DmView className="flex-row items-center">
            {!!titleIcon && (
              <DmView className="mr-[8] opacity-0">{titleIcon}</DmView>
            )}

            {!!descr && (
              <DmView
                className={clsx(
                  "mt-[5] flex-row items-center",
                  i18n.language === "ar" && "mt-[0]"
                )}
              >
                {Icon}
                <DmText
                  className={clsx(
                    "flex-1 text-12",
                    !classNameDescr?.match(/leading-/) && "leading-[14px]",
                    !classNameDescr?.match(/font-/) && "font-custom400",
                    !!Icon && "ml-[5]",
                    classNameDescr
                  )}
                >
                  {descr}
                </DmText>
              </DmView>
            )}
          </DmView>
        </DmView>
        {IconRight && <DmView className="pl-[12]">{IconRight}</DmView>}
      </DmView>
      <DmView className={classNameDescrArr}>
        {!!descrArray &&
          descrArray.map((item, index) => {
            return renderListItem({ item, index })
          })}
      </DmView>
    </DmView>
  )
}

export default TitleRegistrationFlow

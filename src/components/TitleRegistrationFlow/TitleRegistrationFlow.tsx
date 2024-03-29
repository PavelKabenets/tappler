import React from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import clsx from "clsx"

interface Props {
  title: string
  descr?: string
  descrArray?: string[]
  Icon?: React.ReactNode
  className?: string
  classNameDescr?: string
  classNameTitle?: string
}

const TitleRegistrationFlow: React.FC<Props> = ({
  title,
  descr,
  Icon,
  className,
  classNameDescr,
  classNameTitle,
  descrArray,
}) => {
  const { t } = useTranslation()
  const renderListItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <DmView key={index} className="mt-[7] flex-row items-center">
        <DmView className="w-[6] h-[6] bg-red rounded-full" />
        <DmText className="ml-[3] text-12 leading-[20px] font-custom400 flex-1">
          {t(item)}
        </DmText>
      </DmView>
    )
  }
  return (
    <DmView className={clsx("w-full", className)}>
      <DmText
        className={clsx(
          "text-16 leading-[19px]",
          !classNameTitle?.match(/font-/) && "font-custom600",
          classNameTitle
        )}
      >
        {title}
      </DmText>
      {descr && (
        <DmView className="mt-[7] flex-row items-center">
          {Icon}
          <DmText
            className={clsx(
              "flex-1 text-12",
              !classNameDescr?.match(/font-/) && "font-custom400",
              !!Icon && "ml-[5]",
              classNameDescr
            )}
          >
            {descr}
          </DmText>
        </DmView>
      )}
      {!!descrArray &&
        descrArray.map((item, index) => {
          return renderListItem({ item, index })
        })}
    </DmView>
  )
}

export default TitleRegistrationFlow

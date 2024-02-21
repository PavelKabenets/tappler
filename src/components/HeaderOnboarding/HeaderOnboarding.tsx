import React from "react"

import { DmText, DmView } from "components/UI"

import { useNavigation } from "@react-navigation/native"

import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"

import styles from "./styles"
import clsx from "clsx"

interface Props {
  title: string
  className?: string
  Icon?: React.ReactNode
  onPressIcon?: () => void
  onGoBackPress?: () => void
  onBackComponent?: React.ReactNode
  subTitle?: string
}

const HeaderOnboarding: React.FC<Props> = ({
  title,
  className,
  Icon,
  onPressIcon,
  onGoBackPress,
  onBackComponent,
  subTitle,
}) => {
  const navigation = useNavigation()

  const handleGoBack = () => {
    if (onGoBackPress) {
      return onGoBackPress()
    }
    navigation.goBack()
  }
  return (
    <DmView
      className={clsx(
        "pt-[17] pb-[20] flex-row items-center justify-center border-b-1 border-grey4",
        { "pb-[10]": subTitle },
        className
      )}
    >
      {/* @TO DO */}
      {!onBackComponent && (
        <DmView
          className="w-[14] h-[14] bg-grey"
          hitSlop={HIT_SLOP_DEFAULT}
          onPress={handleGoBack}
        />
      )}
      {!!onBackComponent && (
        <DmView onPress={handleGoBack}>{onBackComponent}</DmView>
      )}
      <DmView className="flex-1 px-[14]">
        <DmText
          className={clsx(
            "text-center text-16 font-custom600",
            subTitle && "text-14 leading-[18px]"
          )}
        >
          {title}
        </DmText>
        {!!subTitle && (
          <DmText className="mt-[8] text-13 leading-[16px] text-center">
            {subTitle}
          </DmText>
        )}
      </DmView>
      {!Icon && !onBackComponent && (
        <DmView
          className="opacity-0 w-[14] h-[14] bg-grey"
          hitSlop={HIT_SLOP_DEFAULT}
        />
      )}
      {!Icon && !!onBackComponent && (
        <DmView className="opacity-0">{onBackComponent}</DmView>
      )}
      {!!Icon && (
        <DmView onPress={onPressIcon} hitSlop={HIT_SLOP_DEFAULT}>
          {Icon}
        </DmView>
      )}
    </DmView>
  )
}

export default HeaderOnboarding

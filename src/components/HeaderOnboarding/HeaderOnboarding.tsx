import React from "react"

import { DmText, DmView } from "components/UI"

import { useNavigation } from "@react-navigation/native"

import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"

import styles from "./styles"
import clsx from "clsx"
import ArrowBackIcon from "assets/icons/arrow-back.svg"
import { I18nManager } from "react-native"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import colors from "styles/colors"

interface Props {
  title?: string
  className?: string
  Icon?: React.ReactNode
  onPressIcon?: () => void
  onGoBackPress?: () => void
  onBackComponent?: React.ReactNode
  subTitle?: string
  isChevron?: boolean
  children?: React.ReactNode
  headerClassName?: string
  isRightIconDisable?: boolean
  classNameTitle?: string
  classNameSubtitle?: string
  iconsClassName?: string
}

const HeaderOnboarding: React.FC<Props> = ({
  title,
  className,
  Icon,
  onPressIcon,
  onGoBackPress,
  onBackComponent,
  subTitle,
  isChevron,
  children,
  headerClassName,
  isRightIconDisable,
  classNameTitle,
  classNameSubtitle,
  iconsClassName,
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
        "pt-[17] pb-[20]  border-b-1 border-grey4",
        { "pb-[10]": subTitle },
        className
      )}
    >
      <DmView
        className={clsx(
          "flex-row items-center justify-center",
          headerClassName
        )}
      >
        <DmView
          className={clsx(
            "h-[28] justify-center items-start",
            iconsClassName
          )}
        >
          {!onBackComponent && (
            <>
              {!isChevron && (
                <DmView
                  hitSlop={HIT_SLOP_DEFAULT}
                  onPress={handleGoBack}
                  className={I18nManager.isRTL ? "rotate-[180deg]" : ""}
                >
                  <ArrowBackIcon width={16} height={16} />
                </DmView>
              )}
              {isChevron && (
                <DmView
                  hitSlop={HIT_SLOP_DEFAULT}
                  onPress={handleGoBack}
                  className={I18nManager.isRTL ? "rotate-[180deg]" : ""}
                >
                  <ChevronLeftIcon color={colors.red} />
                </DmView>
              )}
            </>
          )}
          {!!onBackComponent && (
            <DmView
              onPress={handleGoBack}
              hitSlop={HIT_SLOP_DEFAULT}
              className="pr-[10]"
            >
              {onBackComponent}
            </DmView>
          )}
        </DmView>
        <DmView className="flex-1 px-[14]">
          <DmText
            className={clsx(
              "text-center text-16 leading-[19px] font-custom600",
              subTitle && "text-14 leading-[18px]",
              classNameTitle
            )}
          >
            {title}
          </DmText>
          {!!subTitle && (
            <DmText className={clsx("mt-[8] text-13 leading-[16px] text-center font-custom400", classNameSubtitle)}>
              {subTitle}
            </DmText>
          )}
        </DmView>
        <DmView
          className={clsx(
            "items-end h-[28] justify-center pl-[10]",
            {
              "opacity-[0.4]": isRightIconDisable,
            },
            iconsClassName
          )}
        >
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
            <DmView
              onPress={isRightIconDisable ? undefined : onPressIcon}
              hitSlop={HIT_SLOP_DEFAULT}
            >
              {Icon}
            </DmView>
          )}
        </DmView>
      </DmView>
      {!!children && (
        <DmView className="w-full items-center mt-[8]">{children}</DmView>
      )}
    </DmView>
  )
}

export default HeaderOnboarding

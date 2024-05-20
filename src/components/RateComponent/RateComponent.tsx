import React from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import clsx from "clsx"

import StarIcon from "assets/icons/star.svg"
import { DimensionValue } from "react-native"
import colors from "styles/colors"
import { renderRateText } from "utils/renderRateText"

interface Props {
  title?: string
  rate: number
  className?: string
  classNameTitle?: string
  itemSize?: number
  itemId?: number
  reviewsCount?: number
}

const RateComponent: React.FC<Props> = ({
  title,
  rate,
  className,
  classNameTitle,
  itemSize = 12,
  itemId,
  reviewsCount,
}) => {
  const { t } = useTranslation()

  const renderStar = (item: number) => {
    const itemWidth =
      Number(rate).toFixed(1) === item.toFixed(1)
        ? "100%"
        : Number(rate).toFixed(1) > item.toFixed(1)
          ? "100%"
          : Number(rate.toFixed(1).toString()[0]) === item - 1
            ? Number(
                rate.toFixed(1).toString()[
                  rate.toFixed(1).toString().length - 1
                ]
              ) *
                10 +
              "%"
            : "0%"

    return (
      <DmView
        className="bg-grey14 mr-[7]"
        style={{ width: itemSize, height: itemSize }}
      >
        <DmView
          className="bg-red h-full"
          style={{ width: itemWidth as DimensionValue }}
        >
          <StarIcon
            width={itemSize}
            height={itemSize}
            fill={colors.white}
            strokeWidth={0}
          />
        </DmView>
      </DmView>
    )
  }
  return (
    <DmView className={clsx("flex-row items-center justify-center", className)}>
      <DmView className="flex-row items-center">
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <DmView key={item + "" + Math.random() + itemId}>
              {renderStar(item)}
            </DmView>
          )
        })}
        <DmText
          className={clsx(
            "text-13 leading-[16px] font-custom500",
            classNameTitle
          )}
        >
          {title || renderRateText(rate, t)}
        </DmText>
      </DmView>
      {reviewsCount !== undefined && (
        <>
          <DmText className="ml-[3] text-13 leading-[16px] font-custom500">
            {!rate ? t("not_yet_rated") : renderRateText(rate, t)}
          </DmText>
          <DmText className="ml-[10] text-13 leading-[16px] font-custom500 text-grey">
            ({t("reviews", { number: rate || 0 })})
          </DmText>
        </>
      )}
    </DmView>
  )
}

export default RateComponent

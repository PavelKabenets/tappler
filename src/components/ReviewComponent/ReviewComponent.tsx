import React from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import clsx from "clsx"
import RateComponent from "components/RateComponent"
import moment from "moment"
import { takeFontFamily } from "helpers/helpers"
import { FlatList, I18nManager, Image } from "react-native"
import { MockReviewsDataType } from "data/mockData"
import { ReviewItemType } from "types"

interface Props {
  className?: string
  item: ReviewItemType
}

const ReviewComponent: React.FC<Props> = ({ className, item }) => {
  const { t, i18n } = useTranslation()

  const renderImage = ({
    item,
    index,
  }: {
    item: { id: number; url: string }
    index: number
  }) => {
    return (
      <DmView
        className={clsx(
          "rounded-5 overflow-hidden",
          index !== 0 && (I18nManager.isRTL ? "mr-[5]" : "ml-[5]")
        )}
      >
        <Image source={{ uri: item.url }} style={styles.img} key={item.id} />
      </DmView>
    )
  }
  return (
    <DmView
      className={clsx(
        "px-[13.5] py-[10] border-t-0.2 border-t-grey23",
        className
      )}
    >
      <DmView className="flex-row justify-between">
        <DmView className="flex-1">
          <DmText className="text-12 leading-[15px] text-grey22">
            {item.customer.firstName + " " + item.customer.lastName}
          </DmText>
          <RateComponent
            className="mt-[4]"
            rate={item.overallScore}
            title={`${item.overallScore} ${t("of")} 5`}
            itemSize={10}
            itemId={item.id}
          />
          <DmText className="mt-[4] text-12 leading-[15px] font-custom400">
            {item.comment}
          </DmText>
        </DmView>
        <DmText
          className={clsx(
            "mt-[20] text-11 uppercase text-grey23",
            i18n.language !== "ar" && "mt-[10]"
          )}
          style={takeFontFamily("font-custom400 leading-[20px]", "ar")}
        >
          {moment(item.reviewDate).format("DD MMM YYYY")}
        </DmText>
      </DmView>
      {/* {!!item.photos?.length && (
        <DmView className="mt-[5]">
          <FlatList
            data={item.photos}
            renderItem={renderImage}
            horizontal
            showsHorizontalScrollIndicator={false}
            inverted={I18nManager.isRTL}
          />
        </DmView>
      )} */}
    </DmView>
  )
}

export default ReviewComponent

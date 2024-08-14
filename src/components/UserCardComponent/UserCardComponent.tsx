import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import { useTypedSelector } from "store"
import { FlatList, Image } from "react-native"
import RateComponent from "components/RateComponent"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import DistinctLabelComponent from "components/DistinctLabelComponent"

interface Props {
  className?: string
  isDistinct?: boolean
  isStickers?: boolean
  isPromoMessage?: boolean
}

type MockDataType = {
  title: string
  Icon: React.ReactNode
}

const mockData: MockDataType[] = [
  {
    title: "individual",
    Icon: <DmView className="w-[14] h-[14] bg-grey" />,
  },
  {
    title: "background_checked",
    Icon: <DmView className="w-[14] h-[14] bg-grey" />,
  },
]

const mockDataSticers: MockDataType[] = [
  {
    title: "instant_discounts",
    Icon: <DmView className="w-[23] h-[21] bg-grey" />,
  },
  {
    title: "number_hour_service",
    Icon: <DmView className="w-[23] h-[21] bg-grey" />,
  },
  {
    title: "fast_delivery",
    Icon: <DmView className="w-[23] h-[21] bg-grey" />,
  },
]

const UserCardComponent: React.FC<Props> = ({
  className,
  isDistinct,
  isStickers,
  isPromoMessage,
}) => {
  const { user } = useTypedSelector((store) => store.auth)
  const { t } = useTranslation()

  const renderListItem = ({ item }: { item: MockDataType }) => {
    return (
      <DmView className="flex-row items-center mr-[10]">
        {item.Icon}
        <DmText className="ml-[4] text-10 leading-[13px] font-custom700">
          {t(item.title)}
        </DmText>
      </DmView>
    )
  }

  const renderMotiationStickers = ({ item }: { item: MockDataType }) => {
    return (
      <DmView className="flex-row items-center">
        <DmText className="text-10 leading-[14px] font-custom700">
          {t(item.title)}
        </DmText>
        <DmView className="ml-[3]">{item.Icon}</DmView>
      </DmView>
    )
  }
  return (
    <DmView
      className={clsx(
        "pt-[15] pb-[15] rounded-14 border-1 border-grey32",
        (isStickers || isPromoMessage) && "pb-[0]",
        className
      )}
    >
      <DmView className="flex-row mx-[15]">
        <DmView>
          <DmView className="rounded-5 overflow-hidden">
            <Image
              style={styles.img}
              source={{ uri: user?.profilePhoto || "" }}
            />
          </DmView>
          {isDistinct && (
            <DistinctLabelComponent className="absolute top-[-8]" />
          )}
        </DmView>
        <DmView className="mt-[4] flex-1 ml-[10]">
          <DmText className="text-14 leading-[17px] font-custom700">
            {user?.registeredName}
          </DmText>
          <DmView className="mt-[12] flex-row">
            <RateComponent
              rate={user?.reviewScore?.overallScore || 0}
              className="justify-start"
            />
            <DmText className="flex-1">
              <DmText className="text-11 leading-[14px] font-custom500">
                {user?.reviewScore?.overallScore || 0} {t("of")} 5
              </DmText>
              <DmText className="text-11 leading-[14px] font-custom500">
                {" "}
                (
                {t("reviews", { number: user?.reviewScore?.reviewsCount || 0 })}
                )
              </DmText>
            </DmText>
          </DmView>
          <DmText
            className="mt-[6] text-10 leading-[15px] font-custom600"
            numberOfLines={2}
          >
            {user?.informationAbout}
          </DmText>
        </DmView>
      </DmView>
      <DmView className="mt-[14] px-[15]">
        <FlatList
          horizontal
          data={mockData}
          renderItem={renderListItem}
          scrollEnabled={false}
        />
      </DmView>
      {(isStickers || isPromoMessage) && (
        <DmView className="mt-[8] py-[8] px-[15] border-t-1 border-t-grey32 bg-red4 rounded-b-14">
          {isStickers && (
            <FlatList
              data={mockDataSticers}
              renderItem={renderMotiationStickers}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              numColumns={3}
              scrollEnabled={false}
            />
          )}
          {isPromoMessage && (
            <DmView className="flex-row items-center">
              <DmView className="mr-[7] w-[18] h-[16] bg-grey" />
              <DmText className="text-10 leading-[13px] font-custom600">
                {t("20_off_your_service_on_tuesdays_and_wednesdays")}
              </DmText>
            </DmView>
          )}
        </DmView>
      )}
    </DmView>
  )
}

export default UserCardComponent

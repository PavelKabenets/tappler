import React from "react"

import { DmText, DmView } from "components/UI"
import { FlatList } from "react-native"
import { useTranslation } from "react-i18next"

import moment from "moment"

import { MediaType } from "types"

import clsx from "clsx"
import styles from "./styles"
import CheckIcon from "assets/icons/check-mark.svg"
import EditPencilIcon from "assets/icons/edit-pencil-note.svg"
import FacebookIcon from "assets/icons/facebook-logo.svg"
import InstagramIcon from "assets/icons/instagram.svg"
import LinkedInIcon from "assets/icons/linkedin.svg"
import TikTokIcon from "assets/icons/tiktok.svg"
import WebsiteIcon from "assets/icons/website.svg"

interface HoursTypeResponse {
  dayOfWeek: string
  openingTime: string
  closingTime: string
}

interface Props {
  title: string
  Icon?: boolean
  checkIcon?: boolean
  subtitle?: string | string[]
  subtitleArrHours?: HoursTypeResponse[]
  subtitleArrWorkingHours?: HoursTypeResponse[]
  subtitleArr?: string | string[]
  subtitleArrPayments?: string | string[]
  subtitleArrMedia?: MediaType[] | undefined
  classNameSubtitle?: string
  className?: string
  onPress?: () => void
}

const MyProfileSettingsCheckboxComponent: React.FC<Props> = ({
  title,
  subtitle,
  subtitleArrHours,
  subtitleArrWorkingHours,
  className,
  subtitleArr,
  subtitleArrPayments,
  subtitleArrMedia,
  classNameSubtitle,
  Icon,
  checkIcon,
  onPress,
}) => {
  const { t } = useTranslation()
  const renderSocialIcon = (
    social: "facebook" | "instagram" | "linkedin" | "tiktok" | "website"
  ) => {
    switch (social) {
      case "facebook":
        return <FacebookIcon />
      case "instagram":
        return <InstagramIcon />
      case "linkedin":
        return <LinkedInIcon />
      case "tiktok":
        return <TikTokIcon />
      case "website":
        return <WebsiteIcon />
    }
  }
  const renderListItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <DmView className={clsx("flex-row items-center pt-[10]")}>
        {checkIcon && (
          <DmView className="mr-[2]">
            <CheckIcon />
          </DmView>
        )}
        <DmText
          className={clsx(
            "text-13 leading-[16px] font-custom400 capitalize",
            classNameSubtitle
          )}
        >
          {t(item)}
        </DmText>
      </DmView>
    )
  }
  const renderPaymentsListItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <DmView className={clsx("flex-row items-center pt-[10]")}>
        <DmView className="mr-[8] w-[8] h-[8] rounded-full bg-red" />
        <DmText
          className={clsx(
            "text-13 leading-[16px] font-custom400 capitalize",
            classNameSubtitle
          )}
        >
          {t(item)}
        </DmText>
      </DmView>
    )
  }
  const renderMediaListItem = ({
    item,
    index,
  }: {
    item: MediaType
    index: number
  }) => {
    return (
      <DmView className={clsx("flex-row items-center pt-[10]")}>
        {renderSocialIcon(item.media)}
        <DmText
          className={clsx(
            "ml-[10] text-12 leading-[20px] font-plain",
            classNameSubtitle
          )}
        >
          {t(item.link)}
        </DmText>
      </DmView>
    )
  }
  const renderHoursListItem = ({
    item,
    index,
  }: {
    item: HoursTypeResponse
    index: number
  }) => {
    const openingTime = moment(item.openingTime, "HH:mm").format("h:mm A")
    const closingTime = moment(item.closingTime, "HH:mm").format("h:mm A")
    return (
      <DmView className={clsx("flex-row items-center pt-[10]")}>
        <DmView className="mr-[8] w-[8] h-[8] rounded-full bg-red" />
        <DmView className="flex-row">
          <DmView className="w-[80]">
            <DmText
              className={clsx(
                "text-13 leading-[16px] font-custom400",
                classNameSubtitle
              )}
            >
              {t(item.dayOfWeek)}
            </DmText>
          </DmView>
          <DmView className="px-[10]">
            <DmText
              className={clsx(
                "text-13 leading-[16px] font-custom400",
                classNameSubtitle
              )}
            >
              {openingTime} {t("to").toLowerCase()} {closingTime}
            </DmText>
          </DmView>
        </DmView>
      </DmView>
    )
  }
  const renderWorkingHoursListItem = ({
    item,
    index,
  }: {
    item: HoursTypeResponse
    index: number
  }) => {
    const openingTime = moment(item.openingTime, "HH:mm").format("h:mm A")
    const closingTime = moment(item.closingTime, "HH:mm").format("h:mm A")
    const dayOfWeek = moment()
      .day(item.dayOfWeek)
      .format("dddd")
      .substring(0, 3)
      .toUpperCase()
    return (
      <DmView className={clsx("flex-row items-center pt-[10]")}>
        <DmView className="mr-[8] w-[8] h-[8] rounded-full bg-red" />
        <DmView className="flex-row">
          <DmView className="w-[35]">
            <DmText
              className={clsx(
                "text-13 leading-[16px] font-custom400",
                classNameSubtitle
              )}
            >
              {t(dayOfWeek)}
            </DmText>
          </DmView>
          <DmView className="px-[18]">
            <DmText
              className={clsx(
                "text-13 leading-[16px] font-custom400",
                classNameSubtitle
              )}
            >
              {openingTime} {"-"} {closingTime}
            </DmText>
          </DmView>
        </DmView>
      </DmView>
    )
  }

  return (
    <DmView
      className={clsx(
        "flex-row justify-between pl-[15] pr-[19] py-[20] border-b-1 border-grey4",
        className
      )}
    >
      <DmView className="flex-1">
        <DmView className="flex-row items-center justify-between">
          <DmText className="text-14 leading-[18px] font-custom600">
            {title}
          </DmText>
          {Icon && (
            <DmView onPress={onPress}>
              <EditPencilIcon />
            </DmView>
          )}
        </DmView>

        {subtitleArrHours && (
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{ flexGrow: 1 }}
            data={subtitleArrHours}
            renderItem={renderHoursListItem}
          />
        )}
        {subtitleArrWorkingHours && (
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{ flexGrow: 1 }}
            data={subtitleArrWorkingHours}
            renderItem={renderWorkingHoursListItem}
          />
        )}
        {subtitleArr && (
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{ flexGrow: 1 }}
            data={subtitleArr}
            renderItem={renderListItem}
          />
        )}
        {subtitleArrPayments && (
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{ flexGrow: 1 }}
            data={subtitleArrPayments}
            renderItem={renderPaymentsListItem}
          />
        )}
        {subtitleArrMedia && (
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{ flexGrow: 1 }}
            data={subtitleArrMedia}
            renderItem={renderMediaListItem}
          />
        )}
        {subtitle && (
          <DmView className="flex-row items-center mt-[11]">
            <DmText
              className={clsx(
                "text-13 leading-[16px] font-custom400",
                classNameSubtitle
              )}
            >
              {t(subtitle)}
            </DmText>
          </DmView>
        )}
      </DmView>
    </DmView>
  )
}

export default MyProfileSettingsCheckboxComponent

import React from "react"

import { DmText, DmView } from "components/UI"

import moment from "moment"
import { JobType } from "types"

import styles from "./styles"
import { useTranslation } from "react-i18next"
import BtnsRentangle from "components/BtnsRentangle"
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { TouchableWithoutFeedback } from "react-native"
import clsx from "clsx"

interface Props {
  item: JobType
  onPress: (item: JobType) => void
  onNotInterestPress?: () => void
  isLead?: boolean
}

const OpportunityItem: React.FC<Props> = ({
  item,
  onPress,
  onNotInterestPress,
  isLead,
}) => {
  const { t } = useTranslation()
  const animRef = useAnimatedRef()
  const height = useSharedValue(0)

  const anim = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value),
      overflow: "hidden",
    }
  }, [])

  const handlePress = () => {
    if (isLead) {
      onPress(item)
    } else {
      runOnUI(() => {
        if (measure(animRef) && height.value === 0) {
          height.value = measure(animRef)!.height
        } else {
          height.value = 0
        }
      })()
    }
  }
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <DmView className="pl-[15] mr-[30] py-[11] border-b-0.2 border-grey31">
        <DmView className="flex-row">
          {!isLead && (
            <>
              <DmView className="flex-[0.18]">
                <DmText className="text-13 leading-[16px] font-custom500 text-grey28 uppercase">
                  {moment(item.requestedOn).format("ddd")}
                </DmText>
                <DmText className="mt-[2] text-26 leading-[32px] font-custom700 text-red">
                  {moment(item.requestedOn).format("DD")}
                </DmText>
                <DmText className="mt-[2] text-13 leading-[16px] font-custom500 text-grey28 uppercase">
                  {moment(item.requestedOn).format("MMM")}
                </DmText>
                <DmText className="mt-[3] text-13 leading-[16px] font-custom500 text-grey28 uppercase">
                  {moment(item.requestedOn).format("YYYY")}
                </DmText>
                <DmText className="mt-[5] text-11 leading-[14px] font-custom500 text-grey28 uppercase">
                  {moment(item.requestedOn).format("HH:mm")}
                </DmText>
              </DmView>
            </>
          )}
          <DmView className="flex-1">
            <DmText className="text-16 leading-[19px] font-custom600">
              {item.serviceCategory.name}
            </DmText>
            <DmText className="mt-[6] text-13 leading-[16px] font-custom500">
              {t("area")}: {item?.serviceArea?.name || "-"}
            </DmText>
            <DmText className="mt-[6] text-13 leading-[16px] font-custom500">
              {t("customer")}:{" "}
              {item.customer.firstName + " " + item.customer.lastName[0]}
            </DmText>
            <DmView
              className={clsx(
                isLead && "flex-row justify-between items-center"
              )}
            >
              <DmText className="mt-[6] text-13 leading-[16px] font-custom500">
                {t("posted")}: {moment(item.requestedOn).fromNow()}
              </DmText>
              {isLead && (
                <DmText className="text-13 leading-[16px] font-custom600">
                  {item.serviceCategory.opportunityPointsCost} {t("EGP")}
                </DmText>
              )}
            </DmView>
            {!isLead && (
              <DmText className="mt-[6] text-13 leading-[16px] font-custom500">
                {t("cost")}: {item.serviceCategory.opportunityPointsCost}
              </DmText>
            )}
            {isLead && (
              <DmText className="mt-[6] text-13 leading-[16px] font-custom500">
                {t("status")}: {t(item.status)}
              </DmText>
            )}
          </DmView>
        </DmView>
        {!isLead && (
          <Animated.View style={anim}>
            <Animated.View
              className="pt-[27] absolute w-full pl-[13] pr-[4] pb-[6]"
              ref={animRef}
            >
              <BtnsRentangle
                titleActionBtn={t("view_details")}
                titleWhiteBtn={t("not_interested")}
                classNameBtns="h-[38]"
                onActionBtnPress={() => onPress(item)}
                onWhiteBtnPress={onNotInterestPress}
              />
            </Animated.View>
          </Animated.View>
        )}
      </DmView>
    </TouchableWithoutFeedback>
  )
}

export default OpportunityItem

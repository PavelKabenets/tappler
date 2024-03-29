import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"

import { ResultFlowDataType } from "types"

import styles from "./styles"
import { profilePhotoData } from "data/profilePhotoData"

interface Props {
  result: ResultFlowDataType
  onNextStep: () => void
  onChangeResult: (obj: ResultFlowDataType) => void
  step: number
}

const ProfilePhoto: React.FC<Props> = ({
  onChangeResult,
  onNextStep,
  result,
  step,
}) => {
  const { t } = useTranslation()

  // @TO DO
  const hadnleSubmit = () => {
    //
  }

  // @TO DO
  const handleImgButtonPress = () => {
    //
  }

  return (
    <DmView className="mt-[24] px-[14] flex-1 justify-between">
      <DmView>
        <TitleRegistrationFlow
          title={t("profile_photo")}
          descr={t("the_profile_photo_the_descr")}
          classNameDescr="leading-[20px]"
        />
        <TitleRegistrationFlow
          className="mt-[19]"
          title={t("some_helpful_tips")}
          classNameTitle="text-13 leading-[16px]"
          descrArray={profilePhotoData}
        />
        <DmView className="mt-[17] items-center">
          <DmView
            className="pt-[24] pb-[18] px-[13] border-0.3 border-black rounded-10 items-center justify-center"
            style={styles.photoBtn}
            onPress={handleImgButtonPress}
          >
            {/* @TO DO */}
            <DmView className="w-[51] h-[41] bg-grey" />
            <DmText className="mt-[10] text-11 text-center font-custom600">
              {t("upload_profile_photo")}
            </DmText>
          </DmView>
        </DmView>
        <DmText className="mt-[28] text-13 leading-[16px] font-custom600 text-center">
          {t("good_photo_examples")}
        </DmText>
        <DmView className="mt-[6] px-[31] flex-row justify-between items-center">
          {/* @TO DO */}
          <DmView className="w-[66] h-[90] bg-grey" />
          {/* @TO DO */}
          <DmView className="w-[66] h-[90] bg-grey" />
          {/* @TO DO */}
          <DmView className="w-[66] h-[90] bg-grey" />
          {/* @TO DO */}
          <DmView className="w-[66] h-[90] bg-grey" />
        </DmView>
      </DmView>
      <ActionBtn
        title={t("next") + " - " + t("business_hour")}
        onPress={hadnleSubmit}
        className="rounded-4 mt-[27]"
      />
    </DmView>
  )
}

export default ProfilePhoto

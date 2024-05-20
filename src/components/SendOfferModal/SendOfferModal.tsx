import React, { useState } from "react"

import { ActionBtn, DmChecbox, DmText, DmView } from "components/UI"

import styles from "./styles"
import MainModal from "components/MainModal"
import { useTranslation } from "react-i18next"
import { JobType } from "types"
import { useTypedSelector } from "store"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface Props {
  isVisible: boolean
  onClose: () => void
  job: JobType
}

const SendOfferModal: React.FC<Props> = ({ isVisible, onClose, job }) => {
  const [selectedType, setSelectedType] = useState<"balance" | "buy">()

  const { user } = useTypedSelector((store) => store.auth)
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const handleCheck = (type: "balance" | "buy") => {
    setSelectedType(type)
  }

  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      className="p-0"
      classNameModal="p-0 justify-end"
      classNameWrapperHight="rounded-t-10 rounded-b-0"
      classNameCloseIcon="top-[-40] right-[20]"
      isCloseIcon
    >
      <DmView
        className="bg-white rounded-t-10"
        style={{ paddingBottom: insets.bottom > 45 ? insets.bottom : 45 }}
      >
        <DmView className="pt-[22] pb-[20] bg-grey38 rounded-t-10 px-[14]">
          <DmText className="text-18 leading-[22px] font-custom700">
            {t("opportunity_cost")}:{" "}
            <DmText className="text-18 leading-[22px] font0custom700 text-red">
              {t("number_points", {
                number: job.serviceCategory.opportunityPointsCost,
              })}
            </DmText>
          </DmText>
        </DmView>
        <DmView className="mt-[12] px-[14]">
          <DmText className="text-14 leading-[18px] font-custom600">
            {t("choose_one_of_the_following")}:
          </DmText>
          <DmView
            className="mt-[8] flex-row justify-between p-[9] pr-[14] border-1 rounded-5 border-grey19"
            onPress={() => handleCheck("balance")}
          >
            <DmChecbox
              title={t("points_from_my_balance")}
              textClassName="text-13 leading-[16px] font-custom400"
              isChecked={selectedType === "balance"}
            />
            <DmView className="items-center">
              <DmText className="text-13 leading-[16px] font-custom700">
                {t("your_balance")}
              </DmText>
              <DmText className="mt-[5] text-13 leading-[16px] font-custom400">
                {t("number_pointss", { number: user?.pointsBalance || 0 })}
              </DmText>
            </DmView>
          </DmView>
          <DmChecbox
            className="mt-[10] py-[17] px-[9] border-1 rounded-5 border-grey19"
            title={t("buy_points")}
            textClassName="text-13 leading-[16px] font-custom400"
            onPress={() => handleCheck("buy")}
            isChecked={selectedType === "buy"}
          />
          <DmText className="mt-[14] text-14 leading-[18px] font-custom600">
            {t("terms_conditions")}
          </DmText>
          <DmText className="text-10 leading-[20px] font-custom400">
            {t("points_used_in_opportunities_are_reserved_or_deducted_descr")}
          </DmText>
          <ActionBtn
            title={t("continue")}
            textClassName="text-13 leading-[16px] font-custom600"
            className="mt-[20] rounded-5"
            disable={!selectedType}
          />
        </DmView>
      </DmView>
    </MainModal>
  )
}

export default SendOfferModal

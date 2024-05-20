import React from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import renderStatusTextColor from "utils/renderStatusTextColor"

import clsx from "clsx"

interface Props {
  status: "active" | "inactive" | "pendingInterview"
  className?: string
}

const StatusComponent: React.FC<Props> = ({ status, className }) => {
  const { t } = useTranslation()
  const renderStatusDescr = () => {
    switch (status) {
      case "active":
        return "service_is_activate_you_can_descr"
      case "inactive":
        return "the_service_is_not_yet_activated_due_to_missing_descr"
      case "pendingInterview":
        return "an_interview_for_your_skills_is_required_descr"
    }
  }
  return (
    <DmView className={clsx("pt-[4] pb-[12] flex-row", className)}>
      <DmText
        className="flex-[0.3] text-13 leeading-[22px] capitalize font-custom600"
        style={{ color: renderStatusTextColor(status) }}
      >
        {t(status)}:
      </DmText>
      <DmText className="flex-[0.7] text-12 leading-[22px] font-custom400">
        {t(renderStatusDescr())}
      </DmText>
    </DmView>
  )
}

export default StatusComponent

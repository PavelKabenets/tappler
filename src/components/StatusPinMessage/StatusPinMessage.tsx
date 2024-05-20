import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import InfoRed from "assets/icons/info-red-middle.svg"
import { useTranslation } from "react-i18next"

interface Props {
  status: "active" | "inactive" | "pendingInterview"
}

const StatusPinMessage: React.FC<Props> = ({ status }) => {
  const { t } = useTranslation()

  const renderIcon = () => {
    switch (status) {
      case "inactive":
        return <InfoRed />
    }
  }

  const renderTitle = () => {
    switch (status) {
      case "inactive":
        return "this_service_is_not_yet_active"
      default:
        return ""
    }
  }

  const renderDescr = () => {
    switch (status) {
      case "inactive":
        return "you_must_complete_all_items"
      default:
        return ""
    }
  }

  return (
    <DmView className="pt-[13] pb-[14] px-[14] bg-pink flex-row items-center">
      <DmView>{renderIcon()}</DmView>
      <DmView className="ml-[14] flex-1">
        <DmText className="text-13 leading-[17px] font-custom600">
          {t(renderTitle())}
        </DmText>
        <DmText className="mt-[6] text-12 leading-[17px] font-custom400">
          {t(renderDescr())}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default StatusPinMessage

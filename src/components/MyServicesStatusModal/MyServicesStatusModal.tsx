import React from "react"

import { DmText } from "components/UI"

import styles from "./styles"
import MainModal from "components/MainModal"
import StatusComponent from "components/StatusComponent"
import { useTranslation } from "react-i18next"

interface Props {
  isVisible: boolean
  onClose: () => void
}

const MyServicesStatusModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const { t } = useTranslation()
  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      title={t("service_status")}
      classNameTitle="mt-[0]"
      className="py-[19]"
    >
      <StatusComponent status="active" className="mt-[9]" />
      <StatusComponent
        status="inactive"
        className="border-t-1 border-b-1 border-grey7"
      />
      <StatusComponent status="pendingInterview" />
    </MainModal>
  )
}

export default MyServicesStatusModal

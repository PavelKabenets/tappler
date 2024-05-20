import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import MainModal from "components/MainModal"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"

interface Props {
  isVisible: boolean
  onClose: () => void
}

const ChoosePaymentCard: React.FC<Props> = ({ isVisible, onClose }) => {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  return (
    <MainModal
        isVisible={isVisible}
        onClose={onClose}
        classNameModal="m-0 p-0 justify-end"
        classNameWrapperHight="mt-[15] roudned-b-0"
        className="rounded-b-0 px-[0] pt-[12] pb-[0]"
        titleOutSide={t("choose_payment_method")}
        classNameTitleOutSide="ml-[14]"
      >
        <DmView
          style={{
            paddingBottom: insets.bottom > 42 ? insets.bottom : 42,
          }}
        >

        </DmView>

    </MainModal>
  )
}

export default ChoosePaymentCard

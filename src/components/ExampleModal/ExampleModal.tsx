import React from "react"

import { DmText, DmView } from "components/UI"
import Modal from "react-native-modal"

import { useTranslation } from "react-i18next"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import styles from "./styles"
import { ScrollView } from "react-native"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"

interface Props {
  isVisible: boolean
  onClose: () => void
}

const ExampleModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  return (
    <Modal isVisible={isVisible} className="m-0">
      <DmView
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        className="flex-1 bg-white pt-[15] px-[24]"
      >
        {/* @TO DO */}
        <DmView className="w-[25] h-[25] bg-grey" onPress={onClose} />
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* @TO DO */}
          <DmView className="w-[150] h-[150] bg-grey" />

          <DmView className="w-full">
            <TitleRegistrationFlow
              className="mt-[34]"
              title={t("example") + " 1"}
              descr={t("example_descr_mock")}
              classNameTitle="text-18 leading-[22px] mb-[5] "
            />
            <TitleRegistrationFlow
              className="mt-[10]"
              title={t("example") + " 1"}
              descr={t("example_descr_mock")}
              classNameTitle="text-18 leading-[22px] mb-[5] "
            />
            <TitleRegistrationFlow
              className="mt-[10]"
              title={t("example") + " 1"}
              descr={t("example_descr_mock")}
              classNameTitle="text-18 leading-[22px] mb-[5] "
            />
          </DmView>
        </ScrollView>
      </DmView>
    </Modal>
  )
}

export default ExampleModal

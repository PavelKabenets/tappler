import React from "react"

import { DmText, DmView } from "components/UI"
import Modal from "react-native-modal"

import { useTranslation } from "react-i18next"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import styles from "./styles"
import { ScrollView } from "react-native"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import CloseIcon from "assets/icons/close.svg"
import img from "assets/images/example.png"
import { Image } from "react-native"

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
        style={{
          paddingTop: insets.top ? insets.top : 16,
          paddingBottom: insets.bottom,
        }}
        className="flex-1 bg-white pt-[15] px-[24]"
      >
        <DmView
          className="w-[25] h-[25] items-center justify-center"
          onPress={onClose}
        >
          <CloseIcon />
        </DmView>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* @TO DO */}
          <Image source={img} style={{ width: 150, height: 150 }} />

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

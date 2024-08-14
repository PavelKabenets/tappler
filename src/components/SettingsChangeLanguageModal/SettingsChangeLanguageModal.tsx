import React from "react"

import { DmChecbox, DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import MainModal from "components/MainModal"
import { useDispatch } from "react-redux"
import { setCurrentScreen, setLanguage } from "store/auth/slice"
import RNRestart from "react-native-restart"
import { useLazyGetMyDocumentQuery, useLazyProsServiceCategoriesQuery } from "services/api"

interface Props {
  isVisible: boolean
  onClose: () => void
}

const SettingsChangeLanguageModal: React.FC<Props> = ({
  isVisible,
  onClose,
}) => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const [getDocs] = useLazyGetMyDocumentQuery()
  const [getServices] = useLazyProsServiceCategoriesQuery()

  const handleSubmit = async (lng: "en" | "ar") => {
    dispatch(setLanguage(lng))
    dispatch(setCurrentScreen("setting"))
    await getDocs().unwrap()
    await getServices().unwrap()
    setTimeout(() => {
      RNRestart.restart()
    }, 100)
  }

  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      title={t("choose_your_language")}
      classNameTitle="text-left mt-[0] w-full"
      className="pt-[16] pb-[33] px-[32]"
    >
      <DmView className="mt-[23] items-left w-full">
        <DmChecbox
          title={t("arabic")}
          isChecked={i18n.language === "ar"}
          textClassName="font-sans400"
          onPress={() => handleSubmit("ar")}
        />
        <DmChecbox
          title={t("english")}
          onPress={() => handleSubmit("en")}
          className="mt-[23]"
          textClassName="font-custom400"
          isChecked={i18n.language === "en"}
        />
      </DmView>
    </MainModal>
  )
}

export default SettingsChangeLanguageModal

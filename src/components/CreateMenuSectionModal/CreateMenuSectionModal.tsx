import React, { useEffect, useState } from "react"

import { ActionBtn, DmInput, DmText, DmView } from "components/UI"

import styles from "./styles"
import MainModal from "components/MainModal"
import { useTranslation } from "react-i18next"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

interface Props {
  isVisible: boolean
  onClose: () => void
  onSubmit: (name: string) => void
}

const CreateMenuSectionModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  const [value, setValue] = useState("")

  const { t } = useTranslation()

  const handleSubmit = () => {
    onSubmit(value)
  }

  useEffect(() => {
    if (isVisible) {
      setValue("")
    }
  }, [isVisible])

  return (
    <DmView className="absolute">
      <KeyboardAwareScrollView
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <MainModal
          isVisible={isVisible}
          onClose={onClose}
          title={t("enter_menu_section_title")}
          descr={`${t("example")}: ${t("add_menu_sections_descr")}`}
          className="pt-[52] pb-[29] px-[18]"
          classNameModal="px-[15]"
          classNameTitle="mt-[0]"
          isCloseIcon
        >
          <DmInput
            className="mt-[15] h-[42] border-grey2"
            inputClassName="text-13 leading-[16px] font-custom600"
            isAnimText={false}
            value={value}
            onChangeText={setValue}
          />
          <DmView className="mt-[41] px-[20] w-full">
            <ActionBtn
              title={t("add")}
              className="h-[41] rounded-21"
              textClassName="text-13 leading-[16px] font-custom600"
              disable={!value}
              onPress={handleSubmit}
            />
          </DmView>
        </MainModal>
      </KeyboardAwareScrollView>
    </DmView>
  )
}

export default CreateMenuSectionModal

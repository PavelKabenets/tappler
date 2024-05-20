import React, { useState } from "react"

import { DmChecbox, DmText, DmView } from "components/UI"
import MainModal from "components/MainModal"

import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

import { JobType } from "types"

import styles from "./styles"
import { addIgnoredJob, setShowDeleteOpportuinityModal } from "store/auth/slice"

interface Props {
  isVisible: boolean
  onClose: () => void
  item: JobType
  onPress?: () => void
}

const DeleteOpportunityModal: React.FC<Props> = ({
  isVisible,
  onClose,
  item,
  onPress,
}) => {
  const [isChecked, setChecked] = useState(false)

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleCheck = () => {
    setChecked((prev) => !prev)
  }

  const handlePress = () => {
    dispatch(setShowDeleteOpportuinityModal(!isChecked))
    dispatch(addIgnoredJob(item.id))
    if (onPress) {
      setTimeout(() => {
        onPress()
      }, 300)
    }
    onClose()
  }
  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      title={t("delete_opportunity")}
      // @TO DO Icon
      Icon={<DmView className="w-[167] h-[163] bg-grey" />}
      descr={t("you_will_not_be_able_to_see_descr")}
      className="pt-[30] pb-[38] px-[26]"
      classNameTitle="mt-[58] text-18 leading-[22px] font-custom700"
      classNameDescr="mt-[10] text-13 leading-[16px] font-custom400"
      isBtnsTwo
      titleBtn={t("yes")}
      titleBtnSecond={t("cancel")}
      classNameBtns="h-[36]"
      classNameBtnsWrapper="mt-[30] px-[10]"
      onPress={handlePress}
      onPressSecond={onClose}
    >
      <DmView className="items-center">
        <DmChecbox
          title={t("dont_show_this_message_again")}
          className="mt-[23]"
          textClassName="text-12 leading-[15px] font-custom400"
          isChecked={isChecked}
          onPress={handleCheck}
        />
      </DmView>
    </MainModal>
  )
}

export default DeleteOpportunityModal

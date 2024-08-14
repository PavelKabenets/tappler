import React, { useState } from "react"

import { DmInput, DmText, DmView } from "components/UI"
import MainModal from "components/MainModal"
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import styles from "./styles"
import clsx from "clsx"
import EditPencilIcon from "assets/icons/edit-pencil-note.svg"

interface Props {
  className?: string
  title: string
  ends_time: string
  time: string
  order: string
  order_number: string
  Icon?: React.ReactNode
  isModal?: boolean
  onPress?: () => void
}

const SubscriptionElemComponent: React.FC<Props> = ({
  className,
  title,
  ends_time,
  time,
  order,
  order_number,
  Icon,
  isModal,
  onPress,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      message: "",
    },
  })
  const [isModalEditVisible, setModalEditVisible] = useState(false)
  const { t } = useTranslation()
  const handleOpenModalEdit = () => {
    setModalEditVisible(true)
  }
  const handleCloseModalEdit = () => {
    setModalEditVisible(false)
  }

  return (
    <DmView
      className={clsx(
        "flex-row justify-between items-center border-t-1 border-grey4 py-[15]",
        className
      )}
    >
      <DmView>
        <DmView className="flex-row items-center">
          <DmText className="mr-[5] text-12 leading-[20px] font-sans700">
            {title}
          </DmText>
          {Icon}
        </DmView>
        <DmText className="mt-[5] text-11 leading-[14px] font-custom400">
          {ends_time} {time}
        </DmText>
        <DmView className="flex-row mt-[5]">
          <DmText className="mr-[5] text-11 leading-[14px] font-custom400">
            {order}: {order_number}
          </DmText>
          <DmView onPress={onPress}>
            <DmText className="text-11 leading-[14px] font-custom400 text-red">
              ({t("view_details")})
            </DmText>
          </DmView>
        </DmView>
      </DmView>
      {isModal && (
        <DmView onPress={handleOpenModalEdit} className="mr-[10]">
          {<EditPencilIcon />}
        </DmView>
      )}
      <MainModal
        isVisible={isModalEditVisible}
        classNameModal="px-[7]"
        className="px-[5] pt-[18] pb-[25] items-start"
        title={t("promotional_stickers_message")}
        classNameTitle="mx-[10] mt-[10] text-16 leading-[19px] font-custom600"
        descr={t("enter_the_message_that_will_appear_under_your_sticker")}
        classNameDescr="mx-[10] mt-[5] text-12 leading-[15px] font-custom400"
        isBtnsTwo
        classNameBtns="mt-[20] h-[38]"
        titleBtn={t("cancel")}
        classNameBtn="bg-white border-1 border-grey2"
        classNameActionBtnText="text-red text-14 leading-[18px] font-custom500"
        titleBtnSecond={t("save")}
        classNameSecondBtn="bg-red border-0"
        classNameSecondBtnText="text-white text-14 leading-[18px] font-custom500"
        classNameBtnsWrapper="mx-[50]"
        onPress={handleCloseModalEdit}
        onClose={handleCloseModalEdit}
      >
        <DmView className="mt-[20] mx-[10]">
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <DmView>
                <DmInput
                  maxLength={32}
                  isAnimText={false}
                  className="h-[40] w-full px-[10] rounded-0"
                  inputClassName="text-12 leading-[20px] font-sans400"
                  value={value}
                  placeholder={t("enter_the_message")}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                />
                <DmText className="mt-[5] text-center text-10 leading-[13px] font-custom400">
                  {t("characters_remaining", { number: 32 - value.length })}
                </DmText>
              </DmView>
            )}
            name="message"
          />
        </DmView>
      </MainModal>
    </DmView>
  )
}

export default SubscriptionElemComponent

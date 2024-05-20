import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import MainModal from "components/MainModal"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import CertificateIcon from "assets/icons/certificate.svg"
import IdCardIcon from "assets/icons/id-card.svg"
import clsx from "clsx"
import { isSmallPhone } from "helpers/helpers"
import { useTypedSelector } from "store"
import { I18nManager } from "react-native"
import { useNavigation } from "@react-navigation/native"

interface Props {
  isVisible: boolean
  onClose: () => void
}

const WaitAMomentModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const { user, documents } = useTypedSelector((store) => store.auth)

  const { t, i18n } = useTranslation()
  const navigation = useNavigation()

  const handlePress = () => {
    onClose()
    setTimeout(() => {
      navigation.navigate("my-documents", { documents })
    }, 400)
  }

  const handleSayItLater = () => {
    onClose()
  }

  const renderBottomBtn = () => {
    return (
      <ActionBtn
        onPress={handleSayItLater}
        title={t("i_will_send_it_later")}
        className="mt-[10] bg-red1 rounded-5"
        textClassName="font-custom600 text-13 leading-[16px] text-white"
      />
    )
  }
  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      title={t("wait_a_moment")}
      classNameTitle="mt-[0] text-23 leading-[28px] font-custom600 text-white"
      classNameDescr="text-13 leading-[28px] font-custom600 mt-[15] text-white"
      className={clsx(
        "pt-[36] pb-[26] px-[30] bg-red1",
        isSmallPhone && "px-[12]"
      )}
      descr={t("to_activate_your_account_you_must_provide_descr")}
      titleBtn={t("send_the_required_documents_now")}
      classNameActionBtnText="text-13 font-custom600 leading-[16px] text-red"
      classNameBtn={clsx("mt-[0] bg-white rounded-5")}
      childrenBottom={renderBottomBtn()}
      onPress={handlePress}
      classNameBtnsWrapper={clsx(isSmallPhone && "px-[18]")}
    >
      <DmView
        className={clsx(
          "px-[16] flex-start w-full mb-[40]",
          I18nManager.isRTL && "flex-col-reverse"
        )}
      >
        <DmView
          className={clsx(
            "mt-[40] flex-row items-center ",
            i18n.language === "ar" && "mt-[30]"
          )}
        >
          <DmView
            className={clsx(I18nManager.isRTL && "scale-x-[-1]", "w-[48]")}
          >
            <IdCardIcon />
          </DmView>
          <DmText className="ml-[10] text-13 leading-[16px] font-custom600 text-white">
            {t("your_identification")}
          </DmText>
        </DmView>
        {user?.proType === "company" && (
          <DmView
            className={clsx(
              "mt-[30] flex-row items-center",
              i18n.language === "ar" && "mt-[30]"
            )}
          >
            <DmView className={clsx(I18nManager.isRTL && "scale-x-[-1]")}>
              <CertificateIcon />
            </DmView>
            <DmText className="ml-[10] text-13 leading-[16px] font-custom600 text-white">
              {t("business_trade_license")}
            </DmText>
          </DmView>
        )}
      </DmView>
    </MainModal>
  )
}

export default WaitAMomentModal

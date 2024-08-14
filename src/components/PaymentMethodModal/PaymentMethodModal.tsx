import React from "react"

import { DmText, DmView } from "components/UI"
import MainModal from "components/MainModal"
import PaymentItem from "components/PaymentItem"

import styles from "./styles"
import MasterCardIcon from "assets/icons/mastercard.svg"
import VisaIcon from "assets/icons/visa.svg"
import MeezaIcon from "assets/icons/meeza.svg"
import FawryIcon from "assets/icons/fawry.svg"
import WalletIcon from "assets/icons/wallet.svg"
import { useTranslation } from "react-i18next"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { PaymentMethodType } from "types"

interface Props {
  isVisible: boolean
  onClose: () => void
  onPress?: (type: PaymentMethodType) => void
}

const PaymentMethodModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onPress,
}) => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const handleCreditOrDebit = () => {
    onPress?.("creditCard")
  }
  // const handleFawryPress = () => {
  //   onPress?.("")
  // }
  const handleWallet = () => {
    onPress?.("mobileWallet")
  }
  return (
    <>
      <MainModal
        isVisible={isVisible}
        onClose={onClose}
        classNameModal="m-0 p-0 justify-end"
        classNameWrapperHight="mt-[15] roudned-b-0"
        className="rounded-b-0 px-[0] pt-[12] pb-[0]"
        titleOutSide={t("choose_payment_method")}
        classNameTitleOutSide="ml-[14]"
        isFadeInOut={false}
      >
        <DmView
          style={{
            paddingBottom: insets.bottom > 42 ? insets.bottom : 42,
          }}
        >
          <PaymentItem
            title={t("credit_or_debit_card")}
            onPress={handleCreditOrDebit}
            Icons={[
              <MasterCardIcon key={0} />,
              <VisaIcon key={1} />,
              <MeezaIcon key={2} />,
            ]}
            className="border-t-0"
          />
          {/* <PaymentItem
            title={t("fawry_pay")}
            Icons={[<FawryIcon key={0} />]}
            onPress={handleFawryPress}
          /> */}
          <PaymentItem
            title={t("mobile_wallet")}
            Icons={[<WalletIcon key={0} />]}
            onPress={handleWallet}
          />
        </DmView>
      </MainModal>
    </>
  )
}

export default PaymentMethodModal

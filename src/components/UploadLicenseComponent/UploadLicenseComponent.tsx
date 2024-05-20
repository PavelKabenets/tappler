import React from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import TradeLicenseIcon from "assets/icons/trade-license.svg"
import CloseIcon from "assets/icons/close.svg"
import clsx from "clsx"
import DoneIcon from "assets/icons/check-mark.svg"

interface Props {
  onPress: () => void
  photoUrl: string
  className?: string
}

const UploadLicenseComponent: React.FC<Props> = ({
  onPress,
  photoUrl,
  className,
}) => {
  const { t } = useTranslation()
  return (
    <DmView
      className={clsx(
        "pl-[26] pr-[31] py-[11] bg-white1 border-1 border-grey27 rounded-5 flex-row items-center justify-between",
        className
      )}
      onPress={onPress}
    >
      <DmView className="flex-row items-center">
        {photoUrl ? <DoneIcon width={27} height={27} /> : <TradeLicenseIcon />}
        <DmText className="ml-[12] text-13 leading-[16px] font-custom600">
          {t(!photoUrl ? "upload_trade_license" : "document_uploaded")}
        </DmText>
      </DmView>
      {!!photoUrl && (
        <DmView className="flex-row items-center">
          <CloseIcon />
          <DmText className="ml-[6] text-13 leading-[16px] font-custom600 text-red capitalize">
            {t("delete")}
          </DmText>
        </DmView>
      )}
    </DmView>
  )
}

export default UploadLicenseComponent

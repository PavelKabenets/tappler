import React from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import { openLegalLink } from "utils/linking"

import styles from "./styles"
import clsx from "clsx"
import LogoIcon from 'assets/icons/logo.svg'

interface Props {
  className?: string
  isLogoVisible?: boolean
}

const OnboardingFooter: React.FC<Props> = ({ className, isLogoVisible }) => {
  const { t } = useTranslation()

  const handlePressTerms = () => {
    openLegalLink("terms")
  }

  const handlePressPrivacy = () => {
    openLegalLink("privacy")
  }
  return (
    <DmView className={clsx("mt-[30] items-center", className)}>
      {isLogoVisible && (
        <DmView className="mb-[13]">
          <LogoIcon width={36} height={36} />
        </DmView>
      )}
      <DmView className="flex-row items-center justify-center">
        <DmView onPress={handlePressTerms}>
          <DmText className="font-custom600 text-grey3 text-11">
            {t("terms_of_service")}
          </DmText>
        </DmView>
        <DmText className="mx-[10] font-custom600 text-grey3 text-11">|</DmText>
        <DmView onPress={handlePressPrivacy}>
          <DmText className="font-custom600 text-grey3 text-11">
            {t("privacy_policy")}
          </DmText>
        </DmView>
      </DmView>
      {/* @TO DO */}
      <DmText className="mt-[5] font-custom500 text-grey3 text-center text-9">
        {t("version")} 1.0.8 - {t("build")}:1511
      </DmText>
    </DmView>
  )
}

export default OnboardingFooter

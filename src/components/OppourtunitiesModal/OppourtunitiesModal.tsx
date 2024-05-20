import React from "react"

import { DmText, DmView } from "components/UI"
import ModalFullScreen from "components/ModalFullScreen"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import MainOilLapmIcon from "assets/icons/man-oil-lamp.svg"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"

interface Props {
  isVisible: boolean
  onClose: () => void
}

const OppourtunitiesModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const { t } = useTranslation()
  return (
    <ModalFullScreen
      isVisible={isVisible}
      onClose={onClose}
      className="px-[24]"
    >
      <DmView className="flex-1 px-[14] pb-[24]">
        <DmView className="mt-[36] items-center">
          <MainOilLapmIcon />
        </DmView>
        <DmText className="text-18 leading-[22px] font-custom600 text-center">
          {t("what_are_opportunities")}
        </DmText>
        <TitleRegistrationFlow
          classNameDescr="mt-[12] text-12 leading-[15px]"
          descr={t("if_you_are_not_selected_from_customers_descr")}
        />
        <TitleRegistrationFlow
          classNameTitle="mt-[12] text-13 leading-[16px]"
          classNameDescr="mt-[5] text-12 leading-[15px]"
          title={t("how_do_i_use_the_opportunities_to_get_business")}
          descr={t("in_opportunities_section_we_will_display_descr")}
        />
        <TitleRegistrationFlow
          classNameTitle="mt-[12] text-13 leading-[16px]"
          classNameDescr="mt-[5] text-12 leading-[15px]"
          title={t("is_the_opportunities_a_free_service")}
          descr={t("listing_your_services_on_the_app_descr")}
        />
        <TitleRegistrationFlow
          classNameTitle="mt-[12] text-13 leading-[16px]"
          classNameDescr="mt-[5] text-12 leading-[15px]"
          title={t("how_do_i_pay_for_an_opportunity")}
          descr={t("points_are_the_only_way_to_purchase_descr")}
        />
        <TitleRegistrationFlow
          classNameDescr="mt-[15] text-9 leading-[11px]"
          descr={t("this_service_gives_you_the_opportunity_descr")}
        />
      </DmView>
    </ModalFullScreen>
  )
}

export default OppourtunitiesModal

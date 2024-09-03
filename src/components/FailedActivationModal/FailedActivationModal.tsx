import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import MainModal from "components/MainModal"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import VerifyFailedIcon from "assets/icons/verify-failed.svg"
import { useGetProsMyActivationQuery } from "services/api"
import { useTypedSelector } from "store"
import { ProfileSettingParamTypes } from "types"
import { useNavigation } from "@react-navigation/native"

interface Props {
  isVisible: boolean
  onClose: () => void
}

const FailedActivationModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const { user } = useTypedSelector((store) => store.auth)
  const { t } = useTranslation()
  const { data, isFetching } = useGetProsMyActivationQuery()
  const navigation = useNavigation()

  const initialProfileState: ProfileSettingParamTypes = {
    proType: user?.proType,
    informationAbout: user?.informationAbout,
    photosOfWorks: user?.photosOfWork,
    hours: user?.hours,
    payment: user?.paymentMethods,
    media: [
      { media: "facebook", link: "facebook/com" },
      { media: "instagram", link: "instagram/com" },
      { media: "linkedin", link: "linkedin/com" },
      { media: "tiktok", link: "tiktok/com" },
      { media: "website", link: "website/com" },
    ],
    businessName: user?.businessName,
    tradeLicenseNumber: "",
    registrationOrRenewal: "",
    credential: [],
  }

  const handleGoProfile = () => {
    onClose()
    setTimeout(() => {
      navigation.navigate("my-profile", { profileParams: initialProfileState })
    }, 400)
  }

  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      title={t("activation_failed")}
      Icon={<VerifyFailedIcon />}
      classNameTitle="font-custom700 text-19 leading-[22px]"
      className="px-[24]"
    >
      <DmView>
        <DmText className="mt-[12] text-13 leading-[21px] font-custom400">
          {t("while_activating_your_account_descr") + ":"}
        </DmText>
      </DmView>
      {!isFetching && data?.profilePhoto?.status === "rejected" && (
        <TitleRegistrationFlow
          titleIcon={<DmView className="w-[6] h-[6] rounded-full bg-red" />}
          title={t("profile_photo")}
          classNameTitle="text-14 leading-[17px]"
          descr={data?.profilePhoto?.rejectReason}
          classNameDescr="mt-[-2] text-12 leading-[18px]"
          className="mt-[8]"
        />
      )}
      {!isFetching && data?.informationAbout?.status === "rejected" && (
        <TitleRegistrationFlow
          titleIcon={<DmView className="w-[6] h-[6] rounded-full bg-red" />}
          title={t("about_me")}
          classNameTitle="text-14 leading-[17px]"
          descr={data?.informationAbout?.rejectReason}
          classNameDescr="mt-[-2] text-12 leading-[18px]"
          className="mt-[12]"
        />
      )}
      {((!isFetching && data?.photosOfWork?.status === "rejected") ||
        !data?.photosOfWork) && (
        <TitleRegistrationFlow
          titleIcon={<DmView className="w-[6] h-[6] rounded-full bg-red" />}
          title={t("photos_of_my_work")}
          classNameTitle="text-14 leading-[17px]"
          descr={data?.photosOfWork?.rejectReason}
          classNameDescr="mt-[-2] text-12 leading-[18px] h-[41]"
          className="mt-[12]"
        />
      )}
      <ActionBtn
        title={t("go_to_my_profile_to_make_changes")}
        className="rounded-4 mt-[18]"
        textClassName="text-13 leading-[16px] font-custom600"
        onPress={handleGoProfile}
      />
      <ActionBtn
        title={t("i_will_do_it_later")}
        className="rounded-4 mt-[8]"
        textClassName="text-13 leading-[16px] font-custom600"
        variant="white"
        onPress={onClose}
      />
    </MainModal>
  )
}

export default FailedActivationModal

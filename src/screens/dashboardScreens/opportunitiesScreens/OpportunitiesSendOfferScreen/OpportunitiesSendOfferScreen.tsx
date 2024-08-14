import React, { useState } from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import ModalFullScreen from "components/ModalFullScreen"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import HeaderOnboarding from "components/HeaderOnboarding"
import moment from "moment"
import BulbIcon from "assets/icons/bulb-yellow.svg"
import modalImg from "assets/images/features2.png"
import { Image, TextInput } from "react-native"
import EditIcon from "assets/icons/edit.svg"
import { Controller, useForm } from "react-hook-form"
import { takeFontFamily } from "helpers/helpers"
import colors from "styles/colors"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import SendOfferModal from "components/SendOfferModal"
import { api, usePostOpportunitiesOfferMutation } from "services/api"
import { useDispatch } from "react-redux"

type Props = RootStackScreenProps<"opportunities-send-offer">

const OpportunitiesSendOfferScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  const { job } = route.params
  // State
  const [isModalVisible, setModalVisible] = useState(false)
  const [isSendOfferModalVisible, setOfferModalVisible] = useState(false)

  const [isLoading, setLoading] = useState(false)

  const {
    control,
    getValues,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      offer: "",
      message: "",
    },
  })
  // Global Store
  // Variables
  const { t, i18n } = useTranslation()
  const insets = useSafeAreaInsets()
  const dispatch = useDispatch()

  const [sendOffer] = usePostOpportunitiesOfferMutation()
  // Refs
  // Methods
  // Handlers
  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleOpenOfferModal = () => {
    setOfferModalVisible(true)
  }

  const handleCloseOfferModal = () => {
    setOfferModalVisible(false)
  }

  const handleDoOffer = async () => {
    try {
      setLoading(true)
      await sendOffer({
        ratePerHour: Number(getValues("offer")),
        opportunityNotes: getValues("message"),
        jobId: job.id,
      }).unwrap()
      handleCloseOfferModal()
      dispatch(api.util.resetApiState())
      setTimeout(() => {
        navigation.navigate("opportunities")
      }, 400)
    } catch (e) {
      console.log("Send Offer Error: ", e)
    }
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <HeaderOnboarding
        title={job.serviceCategory.name}
        onBackComponent={<CloseIcon width={14} height={14} />}
        className="border-0 pb-[0] px-[14]"
        classNameTitle="capitalize"
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="mt-[28] px-[14]"
      >
        <DmText className="text-13 leading-[16px] font-custom600">
          {t("request_number")}:{" "}
          <DmText className="text-13 leading-[16px] font-custom400">
            {job.id}
          </DmText>
        </DmText>
        <DmText className="mt-[12] text-13 leading-[16px] font-custom600">
          {t("customer_name")}:{" "}
          <DmText className="text-13 leading-[16px] font-custom400">
            {job.customer.firstName + " " + job.customer.lastName[0]}
          </DmText>
        </DmText>
        <DmText className="mt-[12] text-13 leading-[16px] font-custom600">
          {t("posted_on")}:{" "}
          <DmText className="text-13 leading-[16px] font-custom400">
            {moment(job.requestedOn).format(`DD MMMM YYYY [${t("at")}] h:mmA`)}
          </DmText>
        </DmText>
        <DmText className="mt-[12] text-13 leading-[16px] font-custom600">
          {t("area")}:{" "}
          <DmText className="text-13 leading-[16px] font-custom400">
            {job?.serviceArea?.name.toString() || "-"}
          </DmText>
        </DmText>
        <DmView
          className="mt-[12] flex-row items-center"
          onPress={handleOpenModal}
        >
          <BulbIcon />
          <DmText className="ml-[4] text-12 leading-[15px] text-red font-custom400">
            {t("view_important_tips")}
          </DmText>
        </DmView>
        <DmView className="mt-[26] rounded-10 border-0.3 border-grey2 px-[22] py-[34] items-center">
          <DmText
            className={clsx(
              "absolute px-[20] text-13 leading-[16px] top-[-8] font-custom600 text-center bg-white",
              i18n.language === "ar" && "top-[-10]"
            )}
          >
            {t("enter_your_offer")}
          </DmText>
          <DmView className="h-[49] flex-row rounded-5 overflow-hidden border-0.3 border-black">
            <DmView className="bg-red items-center justify-center px-[18]">
              <DmText className="text-13 leading-[16px] font-custom600 text-white">
                {t("your_offer")}
              </DmText>
            </DmView>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <DmInput
                  className="flex-1 h-[49] rounded-l-0 border-0"
                  inputClassName=" h-[49] text-30 font-custom500 leading-[37px] py-[0]"
                  keyboardType="numeric"
                  Icon={
                    <DmText className="text-11 leading-[14px] font-custom700">
                      {t("EGP")}
                    </DmText>
                  }
                  IconRight={<EditIcon />}
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="offer"
            />
          </DmView>
        </DmView>
        <DmView className="mt-[34] rounded-10 border-0.3 border-grey2 px-[9] py-[10] pt-[20] items-center flex-1">
          <DmText
            className={clsx(
              "absolute px-[20] text-13 leading-[16px] top-[-8] font-custom600 text-center bg-white",
              i18n.language === "ar" && "top-[-10]"
            )}
          >
            {t("send_message_to_the_customer")}
          </DmText>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                className="text-13 w-full h-full"
                placeholder={t("write_a_message_to_the_customer_descr")}
                placeholderTextColor={colors.grey37}
                style={[
                  takeFontFamily(
                    "font-custom400 leading-[25px]",
                    i18n.language
                  ),
                ]}
                multiline
              />
            )}
            name="message"
          />
        </DmView>
        <ActionBtn
          title={t("continue")}
          disable={!isValid}
          onPress={handleOpenOfferModal}
          className="mt-[19] h-[47] rounded-5"
          textClassName="text-13 leading-[16px] font-custom600"
        />
      </KeyboardAwareScrollView>
      <ModalFullScreen isVisible={isModalVisible} onClose={handleCloseModal}>
        {/* @TO DO */}
        <DmView className="px-[14]">
          <DmView className="items-center">
            <Image source={modalImg} style={{ width: 204, height: 204 }} />
          </DmView>
          <DmText className="mt-[5] text-17 leading-[20px] font-custom600">
            {t("how_to_send_a_winning_offer")}
          </DmText>
          <DmText className="mt-[10] text-13 leading-[20px] font-custom400">
            {t("at_tappler_we_prioritize_trust_and_safety_within_descr")}
          </DmText>
          <TitleRegistrationFlow
            title={t("identity_confirmation")}
            classNameTitle="text-14 leading-[20px]"
            descr={t("verifying_the_identity_of_professionals_descr")}
            classNameDescr="mt-[-5]  text-13 leading-[20px] font-custom400"
          />
          <TitleRegistrationFlow
            title={t("enhanced_security")}
            classNameTitle="text-14 leading-[20px]"
            descr={t("identity_verification_adds_an_extra_descr")}
            classNameDescr="mt-[-5]  text-13 leading-[20px] font-custom400"
          />
          <TitleRegistrationFlow
            title={t("your_privacy_protection")}
            classNameTitle="text-14 leading-[20px]"
            descr={t("we_understand_the_sensitivity_descr")}
            classNameDescr="mt-[-5]  text-13 leading-[20px] font-custom400"
          />
          <TitleRegistrationFlow
            title={t("in_person_id_verification")}
            classNameTitle="text-14 leading-[20px]"
            descr={t("in_some_cases_we_reserve_the_rights")}
            classNameDescr="mt-[-5] text-13 leading-[20px] font-custom400"
          />
        </DmView>
      </ModalFullScreen>
      <SendOfferModal
        isVisible={isSendOfferModalVisible}
        job={job}
        onClose={handleCloseOfferModal}
        onPress={handleDoOffer}
        isLoading={isLoading}
      />
    </SafeAreaView>
  )
}

export default OpportunitiesSendOfferScreen

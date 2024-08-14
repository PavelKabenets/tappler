import React, { useState } from "react"

// Components
import { ActionBtn, DmChecbox, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import MainModal from "components/MainModal"
import HeaderOnboarding from "components/HeaderOnboarding"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { ProsServicesCategoriesResponse } from "services"
import {
  useGetServiceStatusQuery,
  useLazyGetServiceByIdQuery,
  usePostInterviewsMutation,
} from "services/api"
// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import BigCheckIcon from "assets/icons/check-mark-big.svg"
import ShieldIcon from "assets/icons/shield-close.svg"
import { useTypedSelector } from "store"

type Props = RootStackScreenProps<"interview">

const InterviewScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { service } = route.params
  // State
  const [isChecked, setChecked] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [response, setResponse] = useState<ProsServicesCategoriesResponse>()
  const [isAccountActiveModalVisible, setAccountActiveModalVisible] =
    useState(false)
  // Global Store
  const { user } = useTypedSelector((store) => store.auth)
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const [postInterwiew] = usePostInterviewsMutation()
  const [getServiceById] = useLazyGetServiceByIdQuery()
  const { data: interviewData } = useGetServiceStatusQuery(
    service.serviceCategory.id
  )
  // Refs
  // Methods
  // Handlers
  const handleCloseModal = () => {
    setModalVisible(false)
    if (response) {
      setTimeout(() => {
        navigation.navigate("my-services-detail", { service: response })
      }, 400)
    }
  }

  const handleCloseAccountActiveModal = () => {
    setAccountActiveModalVisible(false)
  }

  const handleSubmit = async () => {
    if (user?.accountStatus !== "active") {
      setAccountActiveModalVisible(true)
    } else {
      setModalVisible(true)
      try {
        setLoading(true)
        const serviceCategoryId = service.serviceCategory.id

        await postInterwiew({
          serviceCategoryId,
        }).unwrap()
        const response = await getServiceById(serviceCategoryId).unwrap()

        setModalVisible(true)
        setResponse(response)
      } catch (e) {
        console.log("Interviews Error: ", e)
      } finally {
        setLoading(false)
      }
    }
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <DmView>
        <HeaderOnboarding title={t("interview")} className="px-[12]" isChevron>
          <DmText className="text-13 leading-[16px] font-custom600">
            {t("interview_status")}:{" "}
            <DmText className="text-13 leading-[16px] font-custom400">
              {t(
                !!interviewData?.length && interviewData[0].status ||
                  "not_started"
              )}
            </DmText>
          </DmText>
        </HeaderOnboarding>
        <TitleRegistrationFlow
          className="mt-[27] px-[14]"
          title={t("request_for_an_interview")}
          descr={t("interview_is_required_to_activate")}
          classNameTitle="text-16 leading-[19px]"
          classNameDescr="mt-[5] text-13 leading-[20px] font-custom400"
        />
        <DmView className="mt-[21] flex-row justify-center">
          <DmChecbox
            variant="square"
            title={t("i_am_ready_to_get_interviewed_please_call_me")}
            textClassName="text-11 leading-[14px] font-custom600"
            isChecked={isChecked}
            onPress={() => setChecked((prev) => !prev)}
          />
        </DmView>
      </DmView>
      <ActionBtn
        title={t("submit")}
        className="rounded-4 mx-[20]"
        disable={!isChecked}
        onPress={handleSubmit}
        textClassName="text-13 leading-[16px] font-custom600"
      />
      <MainModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        title={t("we_received_your_request")}
        descr={t("we_will_call_you_shortly_to_setup_the_interview")}
        Icon={<BigCheckIcon />}
        onPress={handleCloseModal}
        titleBtn={t("OK")}
        classNameBtn="mt-[26] h-[41]"
        classNameActionBtnText="text-13 leading-[16px] font-custom600"
        classNameTitle="mt-[10] text-16 leading-[19px]"
        classNameDescr="mt-[0] text-13 leading-[20px] mx-[20]"
        className="py-[20]"
      />
      <MainModal
        isVisible={isAccountActiveModalVisible}
        onClose={handleCloseAccountActiveModal}
        className="py-[30] px-[18]"
        title={t("account_not_active")}
        descr={t("before_requesting_an_interview")}
        classNameTitle="mt-[17] text-16 leading-[19px]"
        classNameDescr="text-13 leading-[20px] font-custom400"
        Icon={<ShieldIcon />}
      />
    </SafeAreaView>
  )
}

export default InterviewScreen

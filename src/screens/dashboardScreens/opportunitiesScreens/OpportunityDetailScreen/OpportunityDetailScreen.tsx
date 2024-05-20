import React, { useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import MapView from "react-native-maps"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import moment from "moment"
import { ScrollView } from "react-native"
import { JobType } from "types"
import { useTypedSelector } from "store"
import { useDispatch } from "react-redux"
import { addIgnoredJob } from "store/auth/slice"
import DeleteOpportunityModal from "components/DeleteOpportunityModal"

type Props = RootStackScreenProps<"opportunity-detail">

const OpportunityDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { job } = route.params
  // State
  const [isDeleteOpporunitiesModalVisible, setDeleteOpporunitiesModalVisible] =
    useState(false)
  const [targetJob, setTargetJob] = useState<JobType>()

  // Global Store
  const { isShowDeleteOpportunitiesModal } = useTypedSelector(
    (store) => store.auth
  )
  // Variables
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  // Refs
  // Methods
  // Handlers
  const handleOpenDeleteOpportunitiesModal = (item: JobType) => {
    setTargetJob(item)
    if (isShowDeleteOpportunitiesModal) {
      setDeleteOpporunitiesModalVisible(true)
    } else {
      dispatch(addIgnoredJob(item.id))
      navigation.goBack()
    }
  }

  const handleDelete = () => {
    navigation.goBack()
  }

  const handleCloseDeleteOpportunitiesModal = () => {
    setDeleteOpporunitiesModalVisible(false)
  }

  const handleSendOffer = () => {
    navigation.navigate("opportunities-send-offer", { job })
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderTextItem = (title: string, descr: string, isWrap: boolean) => {
    return (
      <DmView className={clsx("mb-[10] flex-wrap", !isWrap && "flex-row")}>
        <DmText className="text-13 leading-[16px] font-custom600">
          {title}:{" "}
        </DmText>
        <DmView className={clsx(isWrap && "pt-[8]")}>
          <DmText className={clsx("text-13 leading-[16px] font-custom400")}>
            {descr}
          </DmText>
        </DmView>
      </DmView>
    )
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{
        paddingBottom: insets.bottom > 45 ? insets.bottom : 45 - insets.bottom,
      }}
    >
      <DmView className="flex-1">
        <HeaderOnboarding
          title={job.serviceCategory.name}
          isChevron
          className="px-[12]"
        />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <DmView className="h-[121]">
            <MapView
              className="flex-1"
              provider="google"
              scrollEnabled={false}
            />
          </DmView>
          <DmView className="py-[9] bg-pink1">
            <DmText className="text-13 leading-[16px] font-custom600 text-center">
              {t("opportunity_details")}
            </DmText>
          </DmView>
          <DmView className="mt-[20] px-[14]">
            {renderTextItem(t("request_ID"), job.id.toString(), false)}
            {renderTextItem(
              t("customer_name"),
              job.customer.firstName + " " + job.customer.lastName[0],
              false
            )}
            {renderTextItem(
              t("posted"),
              moment(job.requestedOn).format(`DD MMMM YYYY [${t("at")}] h:mmA`),
              false
            )}
            {renderTextItem(
              t("area"),
              job?.serviceArea?.name.toString() || "-",
              false
            )}
            {renderTextItem(t("service_place"), " - ", true)}
            {renderTextItem(t("service_date"), " - ", true)}
            {renderTextItem(t("service_time"), " - ", true)}
            {renderTextItem(
              t("expected_duration_to_complete_the_service"),
              " - ",
              true
            )}
            {renderTextItem(
              t("customer_notes"),
              job.serviceCategory.descriptionForCustomers,
              true
            )}
          </DmView>
        </ScrollView>
      </DmView>
      <DmView className="pt-[17] px-[16] flex-row border-t-1 border-t-grey33">
        <ActionBtn
          variant="bordered"
          title={t("not_interested")}
          className="border-grey2 border-1 rounded-3 h-[47]"
          textClassName="text-13 leading-[16px] font-custom600"
          onPress={() => handleOpenDeleteOpportunitiesModal(job)}
        />
        <DmView
          className="ml-[10] flex-1 px-[21] rounded-4 bg-red h-[47] flex-row items-center justify-between"
          onPress={handleSendOffer}
        >
          <DmText className="text-13 leading-[16px] font-custom600 text-white">
            {t("send_offer")}
          </DmText>
          <DmView>
            <DmText className="text-13 leading-[16px] font-custom600 text-white text-center">
              {t("cost")}
            </DmText>
            <DmText className="text-11 leading-[14px] font-custom400 text-white text-center">
              {t("number_points", {
                number: job.serviceCategory.opportunityPointsCost,
              })}
            </DmText>
          </DmView>
        </DmView>
      </DmView>
      {!!targetJob && (
        <DeleteOpportunityModal
          onClose={handleCloseDeleteOpportunitiesModal}
          isVisible={isDeleteOpporunitiesModalVisible}
          item={targetJob}
          onPress={handleDelete}
        />
      )}
    </SafeAreaView>
  )
}

export default OpportunityDetailScreen

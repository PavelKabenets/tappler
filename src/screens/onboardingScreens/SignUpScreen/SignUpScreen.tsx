import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useIsFocused } from "@react-navigation/native"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import colors from "styles/colors"
import { MockAllServicesSubItemType } from "data/mockData"
import GovornorateModal from "components/GovornorateModal"
import { GovernorateItemType } from "types"

type Props = RootStackScreenProps<"sign-up">

const SignUpScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  // State
  const [isGovornorateModalVisible, setGovornorateModalVisible] =
    useState(false)
  // @TO DO
  const [searchForServiceValue, setSearchForServiceValue] =
    useState<MockAllServicesSubItemType>()
  // @TO DO
  const [governorateValue, setGovernorateValue] = useState("")
  // Global Store
  // Variables
  const { t } = useTranslation()
  const isFocused = useIsFocused()
  // Refs
  // Methods
  // Handlers
  // @TO DO
  const onSubmit = () => {
    navigation.navigate("log-in", { viewType: "sign-up" })
  }

  const handleGoAllService = () => {
    navigation.navigate("all-services")
  }

  const handleOpenGovornorateModal = () => {
    setGovornorateModalVisible(true)
  }

  const handleCloseGovornorateModal = () => {
    setGovornorateModalVisible(false)
  }

  const handleSubmitModal = ({
    governorate,
    cityArea,
  }: {
    governorate: GovernorateItemType
    cityArea: string
  }) => {
    setGovernorateValue(t(cityArea) + ", " + t(governorate))
    handleCloseGovornorateModal()
  }

  // Hooks
  useEffect(() => {
    if (isFocused) {
      if (route.params?.subItem) {
        setSearchForServiceValue(route.params.subItem)
      }
    }
  }, [isFocused])
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding title={t("new_account")} className="px-[20]" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <DmView>
          <DmText className="mt-[26] text-15 font-custom500">
            {t("what_service_do_you_offer")}
          </DmText>
          {/* @TO DO */}
          <DmInput
            placeholder={t("search_for_service")}
            placeholderTextColor={colors.grey6}
            className="mt-[10]"
            Icon={
              !searchForServiceValue && (
                <DmView className="w-[16] h-[16] bg-grey" />
              )
            }
            IconRight={
              !!searchForServiceValue?.title && (
                <DmView className="w-[14] h-[14] bg-red" />
              )
            }
            onPress={handleGoAllService}
            value={searchForServiceValue?.title}
          />
          <DmText className="mt-[26] text-15 font-custom500">
            {t("where_do_you_provide_your_service")}
          </DmText>
          <DmInput
            placeholder={t("select_govornorate")}
            placeholderTextColor={colors.grey6}
            className="mt-[10]"
            onPress={handleOpenGovornorateModal}
            value={governorateValue}
            IconRight={
              !!governorateValue && <DmView className="w-[14] h-[14] bg-red" />
            }
          />
        </DmView>
        <ActionBtn
          title={t("continue")}
          className="rounded-4"
          onPress={onSubmit}
          disable={!searchForServiceValue || !governorateValue}
        />
      </KeyboardAwareScrollView>
      <GovornorateModal
        isVisible={isGovornorateModalVisible}
        onClose={handleCloseGovornorateModal}
        onSubmit={handleSubmitModal}
      />
    </SafeAreaView>
  )
}

export default SignUpScreen

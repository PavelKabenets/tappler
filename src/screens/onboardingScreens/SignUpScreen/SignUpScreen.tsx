import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import GovornorateModal from "components/GovornorateModal"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useIsFocused } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { GovernorateItemType, SubCategoryType } from "types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import colors from "styles/colors"
import SearchRedIcon from "assets/icons/search-red.svg"
import CheckMark from "assets/icons/check-mark.svg"

type Props = RootStackScreenProps<"sign-up">

const SignUpScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  // State
  const [isGovornorateModalVisible, setGovornorateModalVisible] =
    useState(false)
  // @TO DO
  const [searchForServiceValue, setSearchForServiceValue] =
    useState<SubCategoryType>()
  // @TO DO
  const [governorateValue, setGovernorateValue] = useState("")
  // Global Store
  // Variables
  const { t } = useTranslation()
  const isFocused = useIsFocused()
  const insets = useSafeAreaInsets()
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
        contentContainerStyle={[
          styles.scrollView,
          {
            paddingBottom:
              insets.bottom > 45 ? insets.bottom - 45 : 45 - insets.bottom,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DmView>
          <DmText className="mt-[26] text-15 font-custom500">
            {t("what_service_do_you_offer")}
          </DmText>
          <DmInput
            placeholder={t("search_for_service")}
            placeholderTextColor={colors.grey6}
            className="mt-[10]"
            Icon={!searchForServiceValue && <SearchRedIcon />}
            IconRight={!!searchForServiceValue?.name && <CheckMark />}
            onPress={handleGoAllService}
            value={searchForServiceValue?.name}
            isAnimText={false}
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
            IconRight={!!governorateValue && <CheckMark />}
            isAnimText={false}
          />
        </DmView>
        <ActionBtn
          title={t("continue")}
          className="rounded-4 h-[47]"
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

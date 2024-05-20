import React, { useMemo, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import AccountUpgradesCategoryItem from "components/AccountUpgradesCategoryItem"
import SubscriptionView from "./components/SubscriptionView"
import QuotesView from "./components/QuotesView"
import UtilitiesView from "./components/UtilitiesView"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { I18nManager, Platform } from "react-native"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import UserIcon from "assets/icons/user-empty.svg"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import colors from "styles/colors"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import SubIcon from "assets/icons/subs.svg"
import QuoteIcon from "assets/icons/quote.svg"
import TransactionIcon from "assets/icons/transactions.svg"

type Props = RootStackScreenProps<"account-upgrades">

const AccountUpgradesScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [activeView, setActiveView] = useState<
    "subscription" | "quotes" | "utilites"
  >("subscription")
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleSubscriptionPress = () => {
    setActiveView("subscription")
  }

  const handleQuotesPress = () => {
    setActiveView("quotes")
  }

  const handleUtilitesPress = () => {
    setActiveView("utilites")
  }
  // Hooks
  // Listeners
  // Render Methods
  const RenderView = useMemo(() => {
    switch (activeView) {
      case "subscription":
        return <SubscriptionView navigation={navigation} />
      case "quotes":
        return <QuotesView navigation={navigation} />
      case "utilites":
        return <UtilitiesView navigation={navigation} />
      default:
        return null
    }
  }, [activeView])

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
      <DmView
        className="flex-row items-center justify-between px-[15]"
        style={{
          paddingTop: insets.top + (Platform.OS === "android" ? 29 : 8),
        }}
      >
        <DmView
          className={clsx(I18nManager.isRTL && "scale-x-[-1]")}
          onPress={navigation.goBack}
          hitSlop={HIT_SLOP_DEFAULT}
        >
          <ChevronLeftIcon color={colors.red} />
        </DmView>
        <DmView>
          <DmText className="text-16 leading-[19px] font-custom600 text-center">
            {t("account_upgrades")}
          </DmText>
          <DmText className="mt-[12] text-12 leading-[15px] font-custom500 text-center">
            {t("membership_level")}: {t("basic")}
          </DmText>
        </DmView>
        <DmView>
          <UserIcon />
        </DmView>
      </DmView>
      <DmView className="mt-[24] flex-row justify-between items-center px-[14]">
        <AccountUpgradesCategoryItem
          title={t("subscriptions")}
          Icon={<SubIcon />}
          onPress={handleSubscriptionPress}
          isActive={activeView === "subscription"}
        />
        <AccountUpgradesCategoryItem
          title={t("my_quotes")}
          Icon={<QuoteIcon />}
          onPress={handleQuotesPress}
          isActive={activeView === "quotes"}
        />
        <AccountUpgradesCategoryItem
          title={t("utilities")}
          Icon={<TransactionIcon />}
          onPress={handleUtilitesPress}
          isActive={activeView === "utilites"}
        />
      </DmView>
      <DmView className="mt-[16] flex-1">{RenderView}</DmView>
    </SafeAreaView>
  )
}

export default AccountUpgradesScreen

import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import NetInfo from "@react-native-community/netinfo"
import { useNetInfoInstance } from "@react-native-community/netinfo"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import LostConnectionIcon from "assets/icons/lost-connection.svg"

type Props = RootStackScreenProps<"lost-connection">

const LostConnectionScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isLoading, setLoading] = useState(false)
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const {
    netInfo: { type, isConnected },
    refresh,
  } = useNetInfoInstance()
  // Refs
  // Methods
  // Handlers
  const handleRefresh = async () => {
    setLoading(true)
    await NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        navigation.goBack()
      }
    })
    setLoading(false)
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white pt-[24] px-[24] justify-between"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <DmView onPress={navigation.goBack}>
        <CloseIcon />
      </DmView>
      <DmView className="items-center">
        <LostConnectionIcon />
        <DmText className="mt-[10] text-16 leading-[19px] font-custom600">
          {t("no_internet_connection")}
        </DmText>
        <DmText className="mt-[10] text-14 leading-[17px] font-custom400">
          {t("check_your_WiFi_or_mobile_data_connection")}
        </DmText>
      </DmView>
      <ActionBtn
        title={t("try_again")}
        textClassName="text-16 leading-[19px] font-custom600"
        className="rounded-5"
        onPress={handleRefresh}
        disable={isLoading}
        isLoading={isLoading}
      />
    </SafeAreaView>
  )
}

export default LostConnectionScreen

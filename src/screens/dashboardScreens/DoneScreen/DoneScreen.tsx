import React from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CheckIcon from "assets/icons/check-mark-big.svg"

type Props = RootStackScreenProps<"done">

const DoneScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { nextScreenName, nextScreenParams } = route.params
  // State
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handlePress = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate(nextScreenName, nextScreenParams)
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white px-[20] justify-between"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <DmView />
      <DmView className="items-center pb-[150]">
        <CheckIcon />
        <DmText className="mt-[16] text-16 leading-[19px] font-custom600">
          {t("we_received_your_request")}
        </DmText>
        <DmText className="mt-[10] text-13 leading-[16px] font-custom500">
          {t("our_team_will_contact_you_shortly")}
        </DmText>
      </DmView>
      <ActionBtn
        title={t("OK")}
        className="rounded-5"
        textClassName="text-13 leading-[16px] font-custom600"
        onPress={handlePress}
      />
    </SafeAreaView>
  )
}

export default DoneScreen

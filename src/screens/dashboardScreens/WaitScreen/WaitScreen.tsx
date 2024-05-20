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
import ClockIcon from "assets/icons/clock-red-big.svg"
import HeaderOnboarding from "components/HeaderOnboarding"
import { useTypedSelector } from "store"

type Props = RootStackScreenProps<"wait">

const WaitScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { title, startHours, endHours, descr, headerTitle, documents } =
    route.params
  // State
  // Global Store
  const { documents: documentsRedux } = useTypedSelector((store) => store.auth)
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const onPress = () => {
    navigation.navigate("my-documents", {
      documents: documents || documentsRedux,
    })
  }

  // Refs
  // Methods
  // Handlers
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <DmView>
        <HeaderOnboarding
          title={headerTitle}
          className="px-[12]"
          onBackComponent={<DmView />}
          onGoBackPress={() => null}
        />
        <DmView className="px-[37] mt-[49] items-center">
          <ClockIcon />
          <DmText className="mt-[20] text-16 leading-[19px] font-custom600 text-center">
            {title || t("we_have_received_your_information")}
          </DmText>
          <DmText className="mt-[9] text-13 leading-[20px] font-custom400 text-center">
            {descr || t("we_will_verify_the_information_descr")}
          </DmText>
          <DmText className="mt-[8] text-13 leading-[16px] text-center text-red font-custom400">
            {startHours && endHours
              ? t("this_process_may_take_minues_to_hours", {
                  hours1: startHours || 2,
                  hours2: endHours || 4,
                })
              : t("this_process_may_take_up_to_hours_hours", {
                  hours: endHours,
                })}
          </DmText>
        </DmView>
      </DmView>
      <ActionBtn
        className="rounded-5 mx-[20]"
        title={t("close")}
        onPress={onPress}
      />
    </SafeAreaView>
  )
}

export default WaitScreen
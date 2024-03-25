import React from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import LottieView from "lottie-react-native"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import congratulationsAnim from "assets/lottie/congratulations.json"

type Props = RootStackScreenProps<"congratulation">

const CongratulationScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const hadnleSubmit = () => {
    navigation.navigate("home")
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white pb-[45] px-[19] justify-between"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <DmView className="items-center">
        <LottieView
          autoPlay
          loop
          source={congratulationsAnim}
          style={styles.lottie}
        />
        <DmView>
          <DmText className="text-30 leading-[37px] text-red font-custom500 text-center">
            {t("congratulations")}
          </DmText>
          <DmText className="mt-[12] text-13 text-center leading-[16px] font-custom600">
            {t("you_have_successfully_registered_a_pro_account")}
          </DmText>
          <DmText className="mt-[12] text-13 text-center leading-[20px] font-custom400">
            {t("for_tutorials_and_how_to_use_the_app_descr")}
          </DmText>
        </DmView>
      </DmView>
      <ActionBtn
        title={t("finish")}
        onPress={hadnleSubmit}
        className="rounded-5 h-[47]"
        textClassName="text-13 leading-[16px] font-custom600"
      />
    </SafeAreaView>
  )
}

export default CongratulationScreen

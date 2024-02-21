import React, { useCallback, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import HeaderOnboarding from "components/HeaderOnboarding"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import ChooseAccountType from "./components/ChooseAccountType"
import RegisterFlowProgressBar from "components/RegisterFlowProgressBar"
import { ResultFlowDataType } from "types"
import PersonalInfo from "./components/PersonalInfo"
import PersonalInfoPart2 from "./components/PersonalInfoPart2"
import ProfilePhoto from "./components/ProfilePhoto"

type Props = RootStackScreenProps<"registration-flow">

const RegistrationFlowScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [step, setStep] = useState(0)
  const [barProgress, setBarProgress] = useState(1)
  const [result, setResult] = useState<ResultFlowDataType>()
  // Global Store
  // Variables
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleNextStep = useCallback(() => {
    setStep((prev) => (prev + 1 <= 7 ? prev + 1 : prev))
    if (step > 1) {
      handleNextBarStep()
    }
  }, [step === 1])

  const handleNextBarStep = () => {
    setBarProgress((prev) => (prev + 1 <= 7 ? prev + 1 : prev))
  }

  const handlePrevBarStep = () => {
    setBarProgress((prev) => (prev - 1 >= 1 ? prev - 1 : prev))
  }

  const handlePrevStep = () => {
    setStep((prev) => (prev - 1 >= 0 ? prev - 1 : prev))
  }

  const handleChangeResult = useCallback((obj: ResultFlowDataType) => {
    setResult((prev) => {
      return { ...prev, ...obj }
    })
  }, [])

  const handleBackPress = () => {
    if (step > 2) {
      handlePrevBarStep()
    }
    handlePrevStep()
  }

  // Hooks
  // Listeners
  // Render Methods
  const renderHeaderText = () => {
    switch (step) {
      case 1:
        return "personal_info"
      case 2:
        return "personal_info"
      case 3:
        return "profile_photo"
      case 4:
        return "business_hours"
      case 5:
        return "payments"
      case 6:
        return "photos"
      case 7:
        return "verification"
      case 8:
        return "referral"
      default:
        return ""
    }
  }

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <ChooseAccountType
            onNextStep={handleNextStep}
            onChangeResult={handleChangeResult}
          />
        )
      case 1:
        return (
          <PersonalInfo
            step={step}
            result={result}
            onNextStep={handleNextStep}
            onChangeResult={handleChangeResult}
          />
        )
      case 2:
        return (
          <PersonalInfoPart2
            step={step}
            result={result}
            onNextStep={handleNextStep}
            onChangeResult={handleChangeResult}
          />
        )
      case 3:
        return (
          <ProfilePhoto
            step={step}
            result={result}
            onNextStep={handleNextStep}
            onChangeResult={handleChangeResult}
          />
        )
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={step === 0 ? t("new_account") : t("new_registration")}
        className="px-[20]"
        onBackComponent={
          step === 0 && (
            <DmText className="text-13 leading-[16px] text-red font-custom600">
              {t("logout")}
            </DmText>
          )
        }
        onGoBackPress={step !== 0 ? handleBackPress : undefined}
        subTitle={
          step !== 0
            ? result?.accoutType === "individual"
              ? t("individual_account")
              : t("business_account")
            : undefined
        }
      />
      {step !== 0 && (
        <RegisterFlowProgressBar
          currentStep={barProgress}
          titleCurrentStep={t(renderHeaderText())}
        />
      )}
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        {renderContent()}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default RegistrationFlowScreen

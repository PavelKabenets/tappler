import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import PersonalInfo from "./components/PersonalInfo"
import PersonalInfoPart2 from "./components/PersonalInfoPart2"
import ProfilePhoto from "./components/ProfilePhoto"
import BusinessHours from "./components/BusinessHours"
import Payments from "./components/Payments"
import ChooseAccountType from "./components/ChooseAccountType"
import RegisterFlowProgressBar from "components/RegisterFlowProgressBar"
import HeaderOnboarding from "components/HeaderOnboarding"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import LogoutModal from "components/LogoutModal"
import StopRegistrationModal from "components/StopRegistrationModal"
import Photos from "./components/Photos"
import Verification from "./components/Verification"
import VerificationStep2 from "./components/VerificationStep2"
import Referral from "./components/Referral"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { setResultRegFlow } from "store/auth/slice"
import { useTypedSelector } from "store"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { ResultFlowDataType } from "types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles, { scrollHeightStep2 } from "./styles"
import CloseIcon from "assets/icons/close.svg"
import { renderBtnText, renderHeaderText } from "./utils/renderText"
import { Keyboard, Platform } from "react-native"
import { isSmallPhone } from "helpers/helpers"

type Props = RootStackScreenProps<"registration-flow">

const RegistrationFlowScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [step, setStep] = useState(0)
  const [barProgress, setBarProgress] = useState(1)
  const [result, setResult] = useState<ResultFlowDataType>()
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false)
  const [isRegistrationModalVisible, setRegistrationModalVisible] =
    useState(false)
  const [isValid, setValid] = useState(false)
  // Global Store
  const { isRegistrationFlowComleted, registrationResult } = useTypedSelector(
    (store) => store.auth
  )
  // Variables
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const insets = useSafeAreaInsets()

  const scrollRef = useRef<KeyboardAwareScrollView>(null)

  const offsetBottom = () => {
    return insets.bottom > 45 ? 0 : 45 - insets.bottom
  }
  // Refs
  // Methods
  // Handlers
  const handleNextStep = () => {
    setStep((prev) => (prev + 1 <= 9 ? prev + 1 : prev))
    if (step > 1 && step !== 7) {
      handleNextBarStep()
    }
  }

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
    if (step > 2 && step !== 8) {
      handlePrevBarStep()
    }
    handlePrevStep()
  }

  const handleOpenLogoutModal = () => {
    setLogoutModalVisible(true)
  }

  const handleCloseLogoutModal = () => {
    setLogoutModalVisible(false)
  }

  const handleOpenStopRegistrationModal = () => {
    setRegistrationModalVisible(true)
  }

  const handleCloseStopRegistrationModal = () => {
    setRegistrationModalVisible(false)
  }

  const handleFinish = () => {
    navigation.navigate("terms-conditions")
  }

  // Hooks
  useEffect(() => {
    if (result) {
      dispatch(setResultRegFlow(result))
    }
  }, [result])

  useEffect(() => {
    if (isRegistrationFlowComleted) {
      setStep(0)
      setBarProgress(1)
    }
  }, [isRegistrationFlowComleted])

  useEffect(() => {
    handleChangeResult({ currentStep: step, currentBarStep: barProgress })
  }, [step, barProgress])
  // Listeners
  // Render Methods
  const onScrollToBottom = () => {
    scrollRef.current?.scrollToEnd()
  }

  const headerText = useMemo(() => {
    return renderHeaderText(step, result?.accoutType)
  }, [step])

  const btnText = useMemo(() => {
    return renderBtnText(step, result?.accoutType)
  }, [step])

  useEffect(() => {
    if (registrationResult) {
      handleChangeResult({ ...registrationResult })
      if (registrationResult?.currentStep) {
        setStep(registrationResult.currentStep)
      }
      if (registrationResult?.currentBarStep) {
        setBarProgress(registrationResult.currentBarStep)
      }
    }
  }, [])

  useLayoutEffect(() => {
    setValid(!!result?.isValid)
  }, [result?.isValid])

  const renderContent = useCallback(() => {
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
            onScrollToBottom={onScrollToBottom}
            step={step}
            result={result}
            onChangeResult={handleChangeResult}
          />
        )
      case 2:
        return (
          <PersonalInfoPart2
            step={step}
            result={result}
            onChangeResult={handleChangeResult}
          />
        )
      case 3:
        return (
          <ProfilePhoto
            step={step}
            result={result}
            onChangeResult={handleChangeResult}
          />
        )
      case 4:
        return (
          <BusinessHours
            step={step}
            result={result}
            onChangeResult={handleChangeResult}
          />
        )
      case 5:
        return (
          <Payments
            step={step}
            result={result}
            onNextStep={handleNextStep}
            onChangeResult={handleChangeResult}
          />
        )
      case 6:
        return (
          <Photos
            step={step}
            result={result}
            onChangeResult={handleChangeResult}
            onScrollToBottom={onScrollToBottom}
          />
        )
      case 7:
        return (
          <Verification
            step={step}
            result={result}
            onNextStep={handleNextStep}
            onChangeResult={handleChangeResult}
          />
        )
      case 8:
        return (
          <VerificationStep2
            step={step}
            result={result}
            onNextStep={handleNextStep}
            onChangeResult={handleChangeResult}
          />
        )
      case 9:
        return (
          <Referral
            step={step}
            result={result}
            onNextStep={handleFinish}
            onChangeResult={handleChangeResult}
          />
        )
    }
  }, [step])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={step === 0 ? t("new_account") : t("new_registration")}
        className={clsx("px-[20]", step === 0)}
        onBackComponent={
          step === 0 && (
            <DmText
              className={clsx(
                "text-13 leading-[16px] text-red font-custom600",
                isSmallPhone && "text-11 leading-[14px]"
              )}
            >
              {t("logout")}
            </DmText>
          )
        }
        onGoBackPress={step !== 0 ? handleBackPress : handleOpenLogoutModal}
        subTitle={
          step !== 0
            ? result?.accoutType === "individual"
              ? t("individual_account")
              : t("business_account")
            : undefined
        }
        Icon={step !== 0 && <CloseIcon />}
        onPressIcon={step !== 0 ? handleOpenStopRegistrationModal : undefined}
      />
      {step !== 0 && (
        <RegisterFlowProgressBar
          currentStep={barProgress}
          titleCurrentStep={t(headerText)}
        />
      )}
      <DmView
        className={clsx("flex-1 mb-[0]")}
        style={
          {
            // marginBottom: step === 6 ? offsetBottom() + 57 : offsetBottom(),
          }
        }
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          extraScrollHeight={step === 2 ? scrollHeightStep2 : 0}
          ref={scrollRef}
        >
          {renderContent()}
          {step !== 0 && step !== 7 && step !== 8 && (
            <Animated.View
              className={clsx("w-full px-[20] items-center bg-white")}
              style={{ paddingBottom: offsetBottom() }}
            >
              {step === 6 && (
                <ActionBtn
                  title={t("skip_photos")}
                  onPress={handleNextStep}
                  className="w-full rounded-4 h-[47] mb-[10]"
                  variant="white"
                  textClassName="text-13 leading-[16px] text-red font-custom600"
                />
              )}
              <ActionBtn
                className="w-full mx-[5] rounded-5 h-[47]"
                title={
                  step >= 9 ? t("continue") : t("next") + " - " + t(btnText)
                }
                onPress={step < 9 ? handleNextStep : handleFinish}
                disable={!isValid}
                textClassName="text-13 leading-[16px] font-custom600"
              />
            </Animated.View>
          )}
        </KeyboardAwareScrollView>
      </DmView>

      <LogoutModal
        isVisible={isLogoutModalVisible}
        onClose={handleCloseLogoutModal}
      />
      <StopRegistrationModal
        isVisible={isRegistrationModalVisible}
        onClose={handleCloseStopRegistrationModal}
      />
    </SafeAreaView>
  )
}

export default RegistrationFlowScreen

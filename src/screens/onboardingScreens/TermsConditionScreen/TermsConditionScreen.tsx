import React, { useState } from "react"

// Components
import { ActionBtn, DmChecbox, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, Alert, Platform, I18nManager } from "react-native"
import HeaderOnboarding from "components/HeaderOnboarding"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { setRegistrationFlowComleted } from "store/auth/slice"
import { useTypedSelector } from "store"
import { useProsRegFlowMutation } from "services/api"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils
import { openLegalLink } from "utils/linking"
import moment from "moment"

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import { ErrorSignUpEmailType } from "types"

type Props = RootStackScreenProps<"terms-conditions">

type SelectedType = "acknowledge" | "must" | "review" | "agree"

const TermsConditionScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [selectedIds, setSelectedIds] = useState<SelectedType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  // Global Store
  const { registrationResult, user, selectedCategoriesId } = useTypedSelector(
    (store) => store.auth
  )

  const insets = useSafeAreaInsets()

  // Variables
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()

  const [signUp] = useProsRegFlowMutation()
  // Refs
  // Methods
  // Handlers
  const handlePrivacy = () => {
    openLegalLink("privacy")
  }

  const hadnleTerms = () => {
    openLegalLink("terms")
  }

  const handleSelectItem = (type: SelectedType) => {
    if (selectedIds?.includes(type)) {
      setSelectedIds(selectedIds.filter((item) => item !== type))
    } else {
      setSelectedIds((prev) => [...prev, type])
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await signUp({
        registeredName:
          String(registrationResult?.personalInfo?.firstName) +
          " " +
          String(registrationResult?.personalInfo?.lastName),
        proType: registrationResult?.accoutType,
        mobileNumber: "+20" + String(registrationResult?.phone),
        accountStatus: "active", // @TO DO
        signupPlatform: "email", // @TO DO
        informationAbout: registrationResult?.aboutMe,
        dateOfBirth: "1990-11-28T15:59:20.598Z", // @TO DO
        gender: registrationResult?.personalInfo?.gender as "male" | "female",
        hours: registrationResult?.businessHours
          ?.filter((item) => item.isSelected)
          .map((item) => {
            return {
              dayOfWeek: item.title,
              openingTime: moment(item.value.openAt)
                .locale("en")
                .format("HH:mm"),
              closingTime: moment(item.value.closeAt)
                .locale("en")
                .format("HH:mm"),
            }
          }),
        // @TO DO
        socials: [
          {
            socialMedia: "facebook",
            socialLink: "facebook.com/propage",
          },
        ],
        serviceCategories: selectedCategoriesId,
        // @TO DO
        address: {
          streetAddress: "19 Tripoli Street mock",
          unitNumber: "1105",
          city: t(String(registrationResult?.personalInfo?.city)),
          governorate: t(String(registrationResult?.personalInfo?.governorate)),
          longitude: Number(registrationResult?.personalInfo?.coords?.lon),
          latitude: Number(registrationResult?.personalInfo?.coords?.lat),
        },
        paymentMethods: registrationResult?.payments,
        referral: registrationResult?.referral?.type,
        // @TO DO
        serviceLocation: {
          locationType: "office",
          isRemote: true,
          cities: ["mock city name"],
        },
        userId: user?.id,
      }).unwrap()
      navigation.navigate("congratulation")
      dispatch(setRegistrationFlowComleted(true))
    } catch (e) {
      console.log("Register Flow Sign Up Error: ", e)
      if ((e as ErrorSignUpEmailType).data.message) {
        Alert.alert(
          `${(e as ErrorSignUpEmailType).data.message}`,
          `\n ${(e as ErrorSignUpEmailType).data.statusCode}
          \n ${Object.entries((e as ErrorSignUpEmailType).data.validationErrors)
            ?.map((item) => item[1][0])
            .join("\n\n")}`
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white px-[15]"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <HeaderOnboarding className="ml-[5] border-b-0" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <DmView>
          <TitleRegistrationFlow
            className="mt-[32]"
            classNameTitle="text-25 leading-[30px]"
            title={t("acceptance_of_terms_conditions")}
          />
          <DmView
            className="mt-[45] flex-row flex-start"
            onPress={() => handleSelectItem("acknowledge")}
          >
            <DmChecbox
              variant="square"
              className="items-start"
              isChecked={selectedIds.includes("acknowledge")}
            />
            <DmView
              className={clsx(
                "ml-[10] mt-[-2] flex-row items-center flex-wrap justify-start"
              )}
            >
              <DmText className="text-13 leading-[23px] font-custom500">
                {t("i_acknowledge_that_descr")}{" "}
              </DmText>
              <DmView onPress={hadnleTerms}>
                <DmText className="text-13 leading-[23px] font-custom500 underline">
                  {t("terms_and_conditions")}
                </DmText>
              </DmView>
              <DmText className="text-13 leading-[23px] font-custom500">
                {" "}
                {t("of_use_and")}{" "}
              </DmText>
              <DmView onPress={handlePrivacy}>
                <DmText className="text-13 leading-[23px] font-custom500 underline">
                  {t("privacy_policy")}
                </DmText>
              </DmView>
              <DmText className="text-13 leading-[23px] font-custom500">
                {" "}
                {t("of_the_tappler_app")}
              </DmText>
            </DmView>
          </DmView>
          <DmChecbox
            isChecked={selectedIds.includes("must")}
            variant="square"
            className="mt-[20] items-start"
            title={t("i_must_login_to_my_account_at_least_descr")}
            textClassName="ml-[10] mt-[-2] text-13 leading-[23px] font-custom500 flex-1"
            onPress={() => handleSelectItem("must")}
          />
          <DmChecbox
            variant="square"
            className="mt-[20] items-start"
            title={t("my_review_rating_must_be_descr")}
            textClassName="ml-[10] mt-[-2] text-13 leading-[23px] font-custom500 flex-1"
            isChecked={selectedIds.includes("review")}
            onPress={() => handleSelectItem("review")}
          />
          <DmChecbox
            variant="square"
            className="mt-[20] items-start"
            title={t("i_agree_not_to_place_text_descr")}
            textClassName="ml-[10] mt-[-2] text-13 leading-[23px] font-custom500 flex-1"
            isChecked={selectedIds.includes("agree")}
            onPress={() => handleSelectItem("agree")}
          />
        </DmView>

        <ActionBtn
          title={t("continue")}
          onPress={handleSubmit}
          className="rounded-5 mx-[4] h-[47] mt-[10]"
          disable={selectedIds.length !== 4 || isLoading}
          textClassName="text-13 leading-[16px] font-custom600"
          isLoading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default TermsConditionScreen

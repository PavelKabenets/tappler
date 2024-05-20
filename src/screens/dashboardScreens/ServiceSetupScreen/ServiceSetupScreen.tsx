import React, { useEffect, useState } from "react"

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
import QuestionComponent from "components/QuestionComponent"
import HeaderOnboarding from "components/HeaderOnboarding"
import { FlatList } from "react-native"
import { useTypedSelector } from "store"
import {
  CustomerQuestionsCategoriesType,
  QuestionAssigneeType,
  QuestionsAnswersType,
} from "types"
import {
  api,
  useLazyProsServiceCategoriesQuery,
  useProsServiceCategoriesQuery,
  useProsServicesQuestionMutation,
} from "services/api"
import { useDispatch } from "react-redux"
import { options } from "react-native-mmkv-storage/dist/src/utils"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

type Props = RootStackScreenProps<"service-setup">

const ServiceSetupScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { service } = route.params
  // State
  const { user } = useTypedSelector((store) => store.auth)

  const [question, setQuestion] = useState(
    user?.proType === "company"
      ? service.serviceCategory.proQuestions
      : service.serviceCategory.customerQuestions
  )

  const [answers, setAnswers] = useState<Partial<QuestionsAnswersType>[]>(
    service.questionsAnswers
  )
  const [isLoading, setLoading] = useState(false)

  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const [patchAnswers] = useProsServicesQuestionMutation()
  const dispatch = useDispatch()
  const [lazyFetch] = useLazyProsServiceCategoriesQuery()

  // Refs
  // Methods
  // Handlers
  const handleChangeAnswer = (
    item: Partial<QuestionsAnswersType>,
    type: QuestionAssigneeType
  ) => {
    let currentRes = {}
    if (type === "paragraph" || type === "shortAnswer") {
      currentRes = {
        questionId: item.questionId,
        answer: item.answer,
      }
    }

    if (type === "dateTime") {
      currentRes = item
    }

    if (type === "dateTime") {
      currentRes = {
        questionId: item.questionId,
        date: item.date,
        startTime: item.startTime,
        endTime: item.endTime,
      }
    }
    if (type === "oneChoice") {
      currentRes = item
    }

    if (type === "multipleChoice") {
      currentRes = {
        answer: item.optionsIds?.join(", ") || "",
        questionId: item.questionId,
        optionsIds: item.optionsIds,
      }
    }

    return setAnswers((prev) => {
      // if (type === "multipleChoice") {
      //   if ()
      // }
      if (
        (!(currentRes as Partial<QuestionsAnswersType>).answer &&
          type !== "dateTime" &&
          type !== "multipleChoice") ||
        (type === "oneChoice" &&
          answers.some((mItem) => mItem.optionId === item.optionId))
      ) {
        return [...prev.filter((fItem) => fItem.questionId !== item.questionId)]
      }
      return [
        ...prev.filter((fItem) => fItem.questionId !== item.questionId),
        currentRes as Partial<QuestionsAnswersType>,
      ]
    })
  }

  useEffect(() => {
    function removeNullAndEmptyValues(obj: any) {
      const res = { ...obj }
      Object.keys(res).forEach((key) => {
        if (
          res[key] === null ||
          Array.isArray(res[key]) && res[key].length === 0
        ) {
          delete res[key]
        }
      })
      return res
    }
    const res = service.questionsAnswers
      .map((item) => ({ ...item, optionsIds: item.options, options: null }))
      .map((item) => removeNullAndEmptyValues(item))
    setAnswers(res)
  }, [service.questionsAnswers])

  const handleSubmit = async () => {
    if (answers?.length) {
      setLoading(true)
      try {
        const res = await patchAnswers({
          serivceId: service.serviceCategory.id,
          questionAnswers: answers,
        }).unwrap()

        await lazyFetch().unwrap()
        navigation.navigate("my-services-detail", { service: res })
      } catch (e) {
        console.log("Patch Error: ", e)
      } finally {
        setLoading(false)
      }
    }
  }

  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({
    item,
  }: {
    item: CustomerQuestionsCategoriesType
  }) => {
    return (
      <QuestionComponent
        answers={answers}
        item={item}
        onChangeAnswer={handleChangeAnswer}
      />
    )
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <DmView className="flex-1">
        <HeaderOnboarding
          title={t("service_setup")}
          isChevron
          className="px-[12]"
        />
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <DmView className="mt-[27]">
            <FlatList
              showsVerticalScrollIndicator={false}
              data={question}
              renderItem={renderListItem}
              scrollEnabled={false}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          </DmView>
        </KeyboardAwareScrollView>
      </DmView>
      <DmView>
        <ActionBtn
          onPress={handleSubmit}
          title={t("save")}
          className="mt-[12] mx-[20] rounded-5"
          isLoading={isLoading}
          disable={
            isLoading ||
            answers?.length < question.length ||
            answers.some((item) => !item.answer && !item.startTime)
          }
        />
      </DmView>
    </SafeAreaView>
  )
}

export default ServiceSetupScreen

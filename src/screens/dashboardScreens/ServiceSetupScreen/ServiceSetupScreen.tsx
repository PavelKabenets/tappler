import React, { useEffect, useMemo, useState } from "react"

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
  useDeleteAnswerQuestionMutation,
  useLazyGetProsServiceByIdQuery,
  useLazyProsServiceCategoriesQuery,
  useProsServiceCategoriesQuery,
  useProsServicesQuestionMutation,
} from "services/api"
import { useDispatch } from "react-redux"
import { options } from "react-native-mmkv-storage/dist/src/utils"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { ProsServicesCategoriesResponse } from "services"

type Props = RootStackScreenProps<"service-setup">

const ServiceSetupScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { service } = route.params
  // State
  const { user } = useTypedSelector((store) => store.auth)

  const [question, setQuestion] = useState(service.serviceCategory.proQuestions)
  const intialAnswetsIds = useMemo(() => {
    return service.questionsAnswers.map((item) => item.questionId)
  }, [service])

  const [answers, setAnswers] = useState<Partial<QuestionsAnswersType>[]>(
    service.questionsAnswers
  )
  const [isLoading, setLoading] = useState(false)
  const [getServiceById] = useLazyGetProsServiceByIdQuery()

  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const [patchAnswers] = useProsServicesQuestionMutation()
  const dispatch = useDispatch()
  const [lazyFetch] = useLazyProsServiceCategoriesQuery()
  const [deleteAnswer] = useDeleteAnswerQuestionMutation()

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
        answer: item.answer,
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
    if (answers?.length || intialAnswetsIds.length) {
      setLoading(true)
      const idsForDelete = intialAnswetsIds
        .filter(
          (item) =>
            !answers.map((aItem) => aItem.questionId).includes(item as number)
        )
        .map((item) => item)

      try {
        let result: ProsServicesCategoriesResponse | undefined
        if (idsForDelete.length) {
          await Promise.all(
            idsForDelete.map(async (id) => {
              await deleteAnswer({
                questionId: id as number,
                serviceCategoryId: service.serviceCategory.id,
              }).unwrap()
            })
          )
        }
        if (answers.length) {
          await Promise.all(
            answers.map(async (item, _, arr) => {
              let response: ProsServicesCategoriesResponse
              if (item?.option) {
                const { option, ...restItem } = item
                const { questionId, ...itemToSend } = restItem
                response = await patchAnswers({
                  serivceId: service.serviceCategory.id,
                  questionId: item.questionId as number,
                  ...itemToSend,
                }).unwrap()
              } else {
                const { questionId, ...itemToSend } = item
                response = await patchAnswers({
                  serivceId: service.serviceCategory.id,
                  questionId: item.questionId as number,
                  ...itemToSend,
                }).unwrap()
              }
              if (item.questionId === arr[arr.length - 1].questionId) {
                result = response
              }
            })
          )
        }

        await lazyFetch().unwrap()
        const response = await getServiceById(
          service.serviceCategory.id
        ).unwrap()
        navigation.navigate("my-services-detail", { service: response })
      } catch (e) {
        console.log("Patch Error: ", e)
      } finally {
        setLoading(false)
      }
    } else {
      navigation.goBack()
    }
  }

  // Hooks
  useEffect(() => {
    setAnswers((prev) => prev.filter((item) => item.answer || item.startTime))
  }, [answers.some((item) => !item.answer && !item.startTime)])
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
          disable={isLoading || answers.length !== question.length}
        />
      </DmView>
    </SafeAreaView>
  )
}

export default ServiceSetupScreen

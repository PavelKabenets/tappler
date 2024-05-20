import React, { useEffect, useLayoutEffect, useState } from "react"

import { DmChecbox, DmInput, DmText, DmView } from "components/UI"

import styles from "./styles"
import {
  BusinessHoursItemType,
  BusinessHoursItemValueType,
  CustomerQuestionsCategoriesType,
  ProQuestionsCategoryOptionsType,
  QuestionAssigneeType,
  QuestionsAnswersType,
} from "types"
import BusinessModal from "components/BusinessModal"
import moment from "moment"

interface Props {
  item: CustomerQuestionsCategoriesType
  onChangeAnswer: (
    item: Partial<QuestionsAnswersType>,
    type: QuestionAssigneeType
  ) => void
  answers?: Partial<QuestionsAnswersType>[]
}

const QuestionComponent: React.FC<Props> = ({
  item,
  onChangeAnswer,
  answers,
}) => {
  const [answer, setAnswer] = useState<
    Partial<QuestionsAnswersType> | undefined
  >(answers?.filter((fItem) => fItem.questionId === item.id)[0])
  const [inputValue, setInputValue] = useState(
    answers?.filter((fItem) => fItem.questionId === item.id)[0]?.answer || ""
  )
  const [isBusinessModalVisible, setBusinessModalVisible] = useState(false)
  const [timeItem, setTimeItem] = useState<BusinessHoursItemType>({
    title: "sunday",
    value: {
      openAt:
        moment(
          answers?.filter((fItem) => fItem.questionId === item.id)[0]
            ?.startTime,
          "HH:mm"
        ).toISOString() || "",
      closeAt:
        moment(
          answers?.filter((fItem) => fItem.questionId === item.id)[0]?.endTime,
          "HH:mm"
        ).toISOString() || "",
    },
    isSelected: true,
  })
  const handleCloseBusinessModal = () => {
    setBusinessModalVisible(false)
  }
  const handleOpenBusinessModal = () => {
    setBusinessModalVisible(true)
  }

  const handleModalSubmit = (value: BusinessHoursItemValueType) => {
    setTimeItem((prev) => ({ ...prev, value }))
    handleCloseBusinessModal()
    onChangeAnswer(
      {
        startTime: moment(value.openAt).locale("en").format("HH:mm"),
        endTime: moment(value.closeAt).locale("en").format("HH:mm"),
        date: moment().format("YYYY-MM-DD"),
        questionId: item.id,
      },
      item.type
    )
  }

  const handleChangeInput = (val: string) => {
    setInputValue(val)
    handleSelectAnswer({ value: val, id: item.id })
  }

  const handleSelectAnswer = (
    selectedItem: Partial<Omit<ProQuestionsCategoryOptionsType, "questionId">>
  ) => {
    if (item.type !== "multipleChoice") {
      if (answer?.questionId !== selectedItem.id) {
        setAnswer({
          answer: selectedItem.value,
          optionId: selectedItem.id,
          questionId: item.id,
        })
        onChangeAnswer(
          {
            answer: selectedItem.value,
            optionId: selectedItem.id,
            questionId: item.id,
          },
          item.type
        )
      } else {
        setAnswer(undefined)
        onChangeAnswer(
          {
            answer: selectedItem.value,
            optionId: selectedItem.id,
            questionId: item.id,
          },
          item.type
        )
      }
    } else {
      setAnswer((prev) => {
        if (prev?.optionsIds?.length) {
          if (prev?.optionsIds?.includes(Number(selectedItem.id))) {
            onChangeAnswer(
              {
                answer: selectedItem.value,
                questionId: item.id,
                optionsIds: prev.optionsIds.filter(
                  (fItem) => fItem !== selectedItem.id
                ),
              },
              item.type
            )
            return {
              answer: selectedItem.value,
              questionId: item.id,
              optionsIds: prev.optionsIds.filter(
                (fItem) => fItem !== selectedItem.id
              ),
            }
          }
        }
        const newIds = [
          ...(prev?.optionsIds?.length ? prev.optionsIds : []),
          Number(selectedItem.id),
        ]
        onChangeAnswer(
          {
            questionId: item.id,
            optionsIds: newIds,
            answer: selectedItem.value,
            optionId: selectedItem.id,
          },
          item.type
        )
        return {
          questionId: item.id,
          optionsIds: newIds,
        }
      })
    }
  }

  useLayoutEffect(() => {
    if (answers?.length) {
      answers.map((mapItem) => {
        if (mapItem.questionId === item.id) {
          return setAnswer({ ...mapItem, optionsIds: mapItem.options })
        }

        return null
      })
    }
  }, [])

  useEffect(() => {
    setAnswer(answers?.filter((fItem) => fItem.questionId === item.id)[0])
  }, [answers?.filter((fItem) => fItem.questionId === item.id)[0]])

  return (
    <DmView className="mb-[25] px-[14]">
      {(item.type === "oneChoice" || item.type === "multipleChoice") && (
        <>
          <DmText className="text-16 leading-[19px] font-custom600">
            {item.text}
          </DmText>
          <DmView className="">
            {item.options?.map((mapItem, idx) => {
              return (
                <DmChecbox
                  className="mt-[16]"
                  textClassName="flex-1"
                  variant={item.type === "multipleChoice" ? "square" : "circle"}
                  key={idx}
                  title={mapItem.value}
                  onPress={() => handleSelectAnswer(mapItem)}
                  isChecked={
                    item.type === "multipleChoice" && answer?.optionsIds?.length
                      ? answer?.optionsIds?.includes(mapItem?.id)
                      : item.type === "oneChoice"
                        ? answer?.answer === mapItem.value
                        : false
                  }
                />
              )
            })}
          </DmView>
        </>
      )}
      {(item.type === "shortAnswer" || item.type === "paragraph") && (
        <DmInput
          value={inputValue}
          onChangeText={handleChangeInput}
          placeholder={item.text}
        />
      )}
      {item.type === "dateTime" && (
        <>
          <DmInput
            placeholder={item.text}
            value={
              timeItem.value.openAt
                ? String(
                    `${moment(timeItem.value.openAt).format("hh:mm A")} | ${moment(timeItem.value.closeAt).format("hh:mm A")}`
                  )
                : ""
            }
            onPress={handleOpenBusinessModal}
          />
          <BusinessModal
            isVisible={isBusinessModalVisible}
            item={timeItem}
            onClose={handleCloseBusinessModal}
            onSubmit={handleModalSubmit}
          />
        </>
      )}
    </DmView>
  )
}

export default QuestionComponent

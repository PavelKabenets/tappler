import React, { useState } from "react"

// Components
import { DmInput, DmText, DmView } from "components/UI"
import HeaderOnboarding from "components/HeaderOnboarding"
import CircleProgressPerfomance from "components/CircleProgressPerfomance"
import ScoreAccordeonPerfomance from "components/ScoreAccordeonPerfomance"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "react-native-gesture-handler"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { itemsData } from "data/MyPerfomanceData/itemsData"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import colors from "styles/colors"

type Props = RootStackScreenProps<"my-perfomance">

const MyPerfomanceScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [selectedItem, setSelectedItem] = useState<
    "day" | "week" | "month" | "year"
  >("week")
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null)
  // Global Store
  // Variables
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  // Hooks
  // Listeners
  // Render Methods
  const handleToggleAccordion = (index: number) => {
    setOpenItemIndex((prevIndex) => (prevIndex === index ? null : index))
  }
  const handleItemClick = (item: "day" | "week" | "month" | "year") => {
    setSelectedItem(item)
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={t("my_perfomance")}
        isChevron
        className="px-[15]"
      />
      <DmView className="flex flex-row justify-between items-center px-[89] pt-[37] pb-[27]">
        <DmView onPress={() => handleItemClick("day")}>
          <DmText
            className={clsx(
              "text-12 leading-[15px] font-custom600 text-grey42",
              selectedItem === "day" && "text-black"
            )}
          >
            {t("day")}
          </DmText>
        </DmView>
        <DmView onPress={() => handleItemClick("week")}>
          <DmText
            className={clsx(
              "text-12 leading-[15px] font-custom600 text-grey42",
              selectedItem === "week" && "text-black"
            )}
          >
            {t("week")}
          </DmText>
        </DmView>
        <DmView onPress={() => handleItemClick("month")}>
          <DmText
            className={clsx(
              "text-12 leading-[15px] font-custom600 text-grey42",
              selectedItem === "month" && "text-black"
            )}
          >
            {t("month")}
          </DmText>
        </DmView>
        <DmView onPress={() => handleItemClick("year")}>
          <DmText
            className={clsx(
              "text-12 leading-[15px] font-custom600 text-grey42",
              selectedItem === "year" && "text-black"
            )}
          >
            {t("year")}
          </DmText>
        </DmView>
      </DmView>
      <DmView className="flex flex-row justify-between items-center px-[13]">
        <CircleProgressPerfomance
          percentage={10}
          tintColor={colors.red3}
          num={32}
          strokeWidth={8}
          descr={t("times_you've_been_selected")}
          btnColor={colors.red3}
        />
        <CircleProgressPerfomance
          percentage={25}
          tintColor={colors.grey42}
          num={6.5}
          strokeWidth={8}
          descr={t("your_ranking")}
          btnColor={colors.grey42}
        />
        <CircleProgressPerfomance
          percentage={65}
          tintColor={colors.orange1}
          num={280}
          strokeWidth={8}
          descr={t("converted_opportunities")}
          btnColor={colors.orange1}
        />
      </DmView>
      <ScrollView>
        <DmView className="border-t-1 ml-[15] mr-[24] border-grey4">
          <DmText className="text-16 leading-[19px] font-custom600 mt-[23] mb-[20]">
            {t("understand_this_data")}
          </DmText>
          {itemsData.map((item, index, array) => (
            <DmView key={index}>
              <ScoreAccordeonPerfomance
                item={item}
                isOpen={openItemIndex === index}
                onToggle={() => handleToggleAccordion(index)}
              />
              {index !== array.length - 1 && (
                <DmView className="border-b-1 border-grey4" />
              )}
            </DmView>
          ))}
        </DmView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MyPerfomanceScreen

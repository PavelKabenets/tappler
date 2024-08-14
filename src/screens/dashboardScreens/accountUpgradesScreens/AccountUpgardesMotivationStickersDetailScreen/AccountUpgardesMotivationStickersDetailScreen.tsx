import React from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList, ScrollView } from "react-native"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/chevron-left.svg"
import colors from "styles/colors"

type Props = RootStackScreenProps<"account-upgrades-motivation-stickers-detail">

type MockType = {
  title: string
}

const mockData: MockType[] = [
  {
    title: "mock1",
  },
  { title: "mock2" },
]

const AccountUpgardesMotivationStickersDetailScreen: React.FC<Props> = ({
  navigation,
}) => {
  // Props
  // State
  // Global Store
  // Variables
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({
    item,
    index,
  }: {
    item: MockType
    index: number
  }) => {
    return (
      <DmView className="mb-[16]" style={styles.item}>
        <DmView className="flex-row items-center border-1 border-grey32 rounded-5 justify-between px-[10] py-[5]">
          <DmText>{item.title}</DmText>
          <DmView className="w-[24] h-[24] bg-grey" />
        </DmView>
        <DmText className="mt-[2] text-13 leading-[16px] font-custom400 text-center">
          {t("code")}: {index}
        </DmText>
      </DmView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-[20]">
      <DmView className="mt-[18]" onPress={navigation.goBack}>
        <CloseIcon color={colors.red} width={20} height={20} />
      </DmView>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <DmText className="mb-[32] mt-[6] text-16 leading-[19px] font-custom600 text-center">
          {t("motivational_stickers")}
        </DmText>
        <FlatList
          data={mockData}
          renderItem={renderListItem}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountUpgardesMotivationStickersDetailScreen

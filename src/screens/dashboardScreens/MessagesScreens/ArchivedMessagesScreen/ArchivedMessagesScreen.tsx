import React, { useMemo, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import MessagesComponent from "components/MessagesComponent"
import HeaderOnboarding from "components/HeaderOnboarding"
import { FlatList } from "react-native"
// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { MockMessagesDataItemType, mockMessagesData } from "data/mockData"
import { RootStackScreenProps } from "navigation/types"
// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"

type Props = RootStackScreenProps<"archived-messages">

const ArchivedMessagesScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [searchText, setSearchText] = useState("")
  // Global Store
  // Variables
  const filteredData = useMemo(() => {
    return mockMessagesData.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    )
  }, [searchText])
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleGoMessagesDetail = (item: MockMessagesDataItemType) => {
    navigation.navigate("messages-details", { messages: item })
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({ item }: { item: MockMessagesDataItemType }) => {
    return (
      <MessagesComponent
        key={item.id}
        item={item}
        onPress={() => handleGoMessagesDetail(item)}
      />
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding className="px-[15]" title={t("archived")} isChevron />
      {filteredData.length > 0 ? (
        <DmView className="flex-1">
          <FlatList data={filteredData} renderItem={renderListItem} />
        </DmView>
      ) : (
        <DmView className="flex-1 justify-center items-center">
          <DmText className="text-13 leading-[20px] font-custom400">
            {t("you_do_not_have_any_messages_yet")}
          </DmText>
        </DmView>
      )}
    </SafeAreaView>
  )
}

export default ArchivedMessagesScreen

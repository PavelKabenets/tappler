import React, { useMemo, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderDashboard from "components/HeaderDashboard"
import SearchMessagesComponent from "components/SearchMessagesComponent"
import MessagesComponent from "components/MessagesComponent"
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
import ArchivedIcon from "assets/icons/archived.svg"

type Props = RootStackScreenProps<"messages">

const MessagesScreen: React.FC<Props> = ({ navigation }) => {
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
  const handleSearch = (text: string) => {
    setSearchText(text)
  }
  const handleClick = () => {
    navigation.navigate("archived-messages")
  }
  // Hooks
  // Listeners
  // Render Methods
  const renderListItem = ({ item }: { item: MockMessagesDataItemType }) => {
    return (
      <MessagesComponent
        item={item}
        onPress={() => handleGoMessagesDetail(item)}
      />
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <HeaderDashboard title={t("messages")} />
      <SearchMessagesComponent
        searchText={searchText}
        onChangeText={handleSearch}
      />
      <DmView
        onPress={handleClick}
        className="pt-[30] pb-[14] px-[15] flex-row justify-between border-b-1 border-grey4"
      >
        <DmView className="pl-[10] flex-row items-center">
          <ArchivedIcon />
          <DmText className="mx-[10] text-13 leading-[16px] font-custom600 text-grey30">
            {t("archived")}
          </DmText>
        </DmView>
        <DmView className="pr-[22]">
          <DmText className="text-13 leading-[16px] font-custom600 text-grey30">
            {"1"}
          </DmText>
        </DmView>
      </DmView>
      {filteredData.length > 0 ? (
        <DmView className="flex-1">
          <FlatList
            data={filteredData}
            renderItem={renderListItem}
            keyExtractor={(item) => item.id?.toString()}
            contentContainerStyle={{ flexGrow: 1 }}
          />
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

export default MessagesScreen

import React, { useMemo, useState } from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import { FlatList, KeyboardAvoidingView, Platform } from "react-native"
import MainModal from "components/MainModal"
import MessageComponent from "components/MessageComponent"
import { Shadow } from "react-native-shadow-2"
// Hooks & Redux
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
// Helpers & Types
import { MockMessagesDataItemType, mockMessagesData } from "data/mockData"
import { hexToRGBA } from "helpers/helpers"
import { RootStackScreenProps } from "navigation/types"
// Libs & Utils
import moment from "moment"
// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import colors from "styles/colors"
import ArrowUpIcon from "assets/icons/arrow-up.svg"
import DocumentIcon from "assets/icons/my-documents.svg"
import LocationIcon from "assets/icons/location-red.svg"
import CallIcon from "assets/icons/call.svg"
import BlockIcon from "assets/icons/block.svg"
import ComplaintIcon from "assets/icons/complaint.svg"

type Props = RootStackScreenProps<"messages-details">

const MessagesDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { messages } = route.params
  // State
  const { control } = useForm({
    defaultValues: {
      writing: "",
    },
  })
  const [isAddElem, setIsAddElem] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [listData, setListData] = useState(mockMessagesData)
  // Global Store
  // Variables
  const { t, i18n } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleClick = () => {
    //
  }
  const handleOpenActionModal = () => {
    setIsVisible(true)
  }
  const handleCloseActionModal = () => {
    setIsVisible(false)
  }
  const handleGoReviceOffer = () => {
    navigation.navigate("revice-offer", { messages })
  }
  const handleGoDetailsInMesaages = () => {
    navigation.navigate("details-in-messages")
  }
  const handleClickAddElem = () => {
    setIsAddElem((prevState) => !prevState)
  }
  // Hooks
  // Listeners
  // Render Methods
  const formatDayHeader = (dateString: string, currentLanguage: string) => {
    const messageDate = moment(dateString, "YYYY-MM-DD")
    const today = moment().startOf("day")
    const yesterday = moment().subtract(1, "days").startOf("day")

    if (messageDate.isSame(today, "day")) {
      return t("today")
    } else if (messageDate.isSame(yesterday, "day")) {
      return t("yesterday")
    } else if (currentLanguage === "ar") {
      return messageDate.format("YYYY, D MMMM")
    } else {
      return messageDate.format("MMMM D, YYYY")
    }
  }

  const groupedMessages = useMemo(() => {
    return listData.reduce(
      (groups: Record<string, MockMessagesDataItemType[]>, message) => {
        const dateFormat = i18n.language === "ar" ? "DD-MM-YYYY" : "YYYY-MM-DD"
        const date = moment(message.created_at).format(dateFormat)
        if (!groups[date]) {
          groups[date] = []
        }
        groups[date].push(message)
        return groups
      },
      {}
    )
  }, [listData])

  const renderGroup = ({ item }: { item: MockMessagesDataItemType[] }) => (
    <DmView>
      <DmView className="items-center justify-center py-[6]">
        <DmText className="text-10 leading-[13px] font-sans400">
          {formatDayHeader(item[0].created_at, i18n.language)}
        </DmText>
      </DmView>
      {item.map((message) => (
        <MessageComponent key={message.id} item={message} />
      ))}
    </DmView>
  )
  return (
    <SafeAreaView
      className="flex-1 bg-grey36"
      edges={[]}
      style={{
        paddingBottom: insets.bottom - 10 > 20 ? insets.bottom - 10 : 20,
      }}
    >
      <DmView className="bg-white" style={{ paddingTop: insets.top }}>
        <HeaderOnboarding
          headerClassName="items-end"
          className="px-[19] pb-[20] border-b-0"
          title={t(messages?.sender)}
          subTitle={"Last seen: 23 minutes ago"}
          classNameTitle="text-16 leading-[19px] text-left"
          classNameSubtitle="text-left"
          isChevron
          onPressIcon={handleOpenActionModal}
          Icon={
            <DmView className="flex-row">
              <DmView className="bg-black rounded-full w-[6] h-[6] mx-[1]" />
              <DmView className="bg-black rounded-full w-[6] h-[6] mx-[1]" />
              <DmView className="bg-black rounded-full w-[6] h-[6] mx-[1]" />
            </DmView>
          }
        />
        <DmView className="mx-[72] border-0.3 border-black rounded-5 h-[38] flex-row items-center overflow-hidden">
          <DmView className="w-2/5 h-full items-center justify-center bg-red5 border-r-0.5">
            <DmText className="text-13 leading-[16px] font-custom600 tracking-[0.65] text-white">
              {t("your_offer")}
            </DmText>
          </DmView>
          <DmView className="w-3/5 h-full items-center justify-center">
            <DmText className="text-13 leading-[16px] font-custom600 tracking-[0.65]">
              {t(messages?.price_offer || "") + " EGP"}
            </DmText>
          </DmView>
        </DmView>
        <DmView className="px-[33] pt-[16] flex-row justify-between items-center">
          <DmView className="flex-row items-center">
            <CallIcon />
            <DmText className="mx-[5] text-13 leading-[16] font-custom400">
              {t("call")}
            </DmText>
          </DmView>
          <DmView
            onPress={handleGoReviceOffer}
            className="flex-row items-center"
          >
            <DmView className="w-[29] h-[23] bg-grey" />
            <DmText className="mx-[5] text-13 leading-[16] font-custom400">
              {t("revise_offer")}
            </DmText>
          </DmView>
          <DmView
            onPress={handleGoDetailsInMesaages}
            className="flex-row items-center"
          >
            <DocumentIcon />
            <DmText className="mx-[5] text-13 leading-[16] font-custom400">
              {t("details")}
            </DmText>
          </DmView>
        </DmView>
        <DmView className="mt-[7] h-[43] items-center justify-center bg-grey36 border-b-1 border-grey4">
          <DmText className="text-14 leading-[18] font-custom400">
            {t("messages")}
          </DmText>
        </DmView>
      </DmView>

      <DmView className="bg-grey52 flex-1">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <FlatList
            nestedScrollEnabled={true}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            inverted
            data={Object.values(groupedMessages).reverse()}
            renderItem={renderGroup}
          />
          {isAddElem && (
            <DmView className="w-full h-[92] border-1 border-b-0 border-grey4 rounded-t-[20]">
              <DmView className="flex-row justify-between items-center px-[30]">
                <DmView
                  onPress={handleClick}
                  className="flex-1 border-b-0.2 border-r-0.2 border-grey2 flex-row items-center p-[10]"
                >
                  <DmView className="bg-grey w-[27] h-[22]" />
                  <DmText className="ml-[10] text-13 leading-[16px] font-custom500 tracking-[0.65]">
                    {t("camera")}
                  </DmText>
                </DmView>
                <DmView
                  onPress={handleClick}
                  className="flex-1 border-b-0.2 border-grey2 flex-row items-center p-[10]"
                >
                  <DocumentIcon fill={colors.red} width={18} height={22} />
                  <DmText className="ml-[10] text-13 leading-[16px] font-custom500 tracking-[0.65]">
                    {t("document")}
                  </DmText>
                </DmView>
              </DmView>
              <DmView className="flex-row justify-between items-center px-[30]">
                <DmView
                  onPress={handleClick}
                  className="flex-1 border-r-0.2 border-grey2 flex-row items-center p-[10]"
                >
                  <DmView className="bg-grey w-[27] h-[22]" />
                  <DmText className="ml-[10] text-13 leading-[16px] font-custom500 tracking-[0.65]">
                    {t("gallery")}
                  </DmText>
                </DmView>
                <DmView
                  onPress={handleClick}
                  className="flex-1 flex-row items-center p-[10]"
                >
                  <LocationIcon width={18} height={22} />
                  <DmText className="ml-[10] text-13 leading-[16px] font-custom500 tracking-[0.65]">
                    {t("location")}
                  </DmText>
                </DmView>
              </DmView>
            </DmView>
          )}
          <DmView className="w-full bg-grey36 pb-[10]">
            <Shadow
              style={{ borderRadius: 1 }}
              distance={1}
              startColor={hexToRGBA(colors.grey51, 0.1)}
              offset={[0, -1]}
            />
            <DmView className="flex-row items-center px-[20] pt-[10]">
              <DmView
                onPress={handleClickAddElem}
                className="w-[23] h-[23] mr-[15]"
              >
                <DmView className="absolute w-[23] h-[2px] bg-red top-1/2 transform -translate-y-1/2" />
                <DmView className="absolute h-[23] w-[2px] bg-red left-1/2 transform -translate-x-1/2" />
              </DmView>
              <DmView className="flex-1 h-[41] justify-center items-center">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DmInput
                      isAnimText={false}
                      IconRight={
                        <DmView
                          onPress={handleClick}
                          className="w-[28] h-[28] bg-red justify-center items-center rounded-full"
                        >
                          <ArrowUpIcon color={colors.white} />
                        </DmView>
                      }
                      className="h-[41] bg-white border-0.5 grey-4 rounded-15 px-[10]"
                      inputClassName="text-15 leading-[19px]"
                      value={value}
                      placeholder={t("")}
                      onChangeText={(text) => {
                        onChange(text)
                      }}
                    />
                  )}
                  name="writing"
                />
              </DmView>
            </DmView>
          </DmView>
        </KeyboardAvoidingView>
      </DmView>
      <MainModal
        classNameModal="absolute w-full px-[0] bottom-0"
        className="px-[0] py-[0] rounded-b-0"
        isVisible={isVisible}
        onClose={handleCloseActionModal}
      >
        <DmView style={{ paddingBottom: insets.bottom }}>
          <DmView
            onPress={handleClick}
            className="flex-row items-center px-[17] border-b-1 border-grey4"
          >
            <BlockIcon />
            <ActionBtn
              title={t("block_client")}
              className="ml-[10] h-[71] bg-white items-start rounded-0"
              textClassName="text-13 leading-[21px] font-custom600 text-black"
              classNameTextWrapper="mx-[0]"
            />
          </DmView>
          <DmView
            onPress={handleClick}
            className="flex-row items-center px-[17]"
          >
            <ComplaintIcon />
            <ActionBtn
              title={t("file_a_complain_against_client")}
              className="ml-[10] h-[71] w-full bg-white items-start rounded-0"
              textClassName="text-13 leading-[21px] font-custom500 text-black"
              classNameTextWrapper="mx-[0]"
            />
          </DmView>
        </DmView>
      </MainModal>
    </SafeAreaView>
  )
}

export default MessagesDetailsScreen

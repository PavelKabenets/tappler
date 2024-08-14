import React, { useEffect, useState } from "react"
// Components
import { ActionBtn, DmView } from "components/UI"
import HeaderOnboarding from "components/HeaderOnboarding"
import BusinessHoursItem from "components/BusinessHoursItem"
import BusinessModal from "components/BusinessModal"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { FlatList } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useTypedSelector } from "store"
import { useForm } from "react-hook-form"
// Helpers & Types
import {
  BusinessHoursItemType,
  BusinessHoursItemValueType,
  HoursTypeResponse,
  ResultFlowDataType,
} from "types"
import { RootStackScreenProps } from "navigation/types"
import { businessHoursData } from "data/registrationFlowData"
// Libs & Utils
// Styles & Assets
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import moment from "moment"

type Props = RootStackScreenProps<"my-profile-business-hours">

const MyProfileBusinessHoursScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const { profileParams } = route.params

  const [data, setData] = useState<BusinessHoursItemType[]>(businessHoursData)
  const [selectedItem, setSelectedItem] = useState<BusinessHoursItemType>()

  const [isBusinessModalVisible, setBusinessModalVisible] = useState(false)
  const { user } = useTypedSelector((store) => store.auth)
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      hours: profileParams?.hours,
    },
  })

  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const handleSave = () => {
    const newData = data
      .filter((item) => item.isSelected)
      .map((item, index) => {
        return {
          dayOfWeek: item.title,
          closingTime: item.value.closeAt,
          openingTime: item.value.openAt,
          id: index,
          proId: user?.id as number,
        }
      })
    navigation.navigate("my-profile", {
      profileParams: { ...profileParams, hours: newData },
    })
  }

  const handleSelectItem = (item: BusinessHoursItemType) => {
    setData((prev) =>
      prev.map((prevItem) => {
        return {
          ...prevItem,
          isSelected:
            prevItem.title === item.title
              ? !prevItem.isSelected
              : prevItem.isSelected,
        }
      })
    )
  }

  const handleChangeTimeItem = (item: BusinessHoursItemType) => {
    setSelectedItem(item)
    setBusinessModalVisible(true)
  }

  const handleCloseBusinessModal = () => {
    setBusinessModalVisible(false)
  }

  const handleSubmitModal = (value: BusinessHoursItemValueType) => {
    setData((prev) => {
      return prev.map((item) => {
        if (item === selectedItem) {
          return {
            ...item,
            value,
          }
        }
        return item
      })
    })
    handleCloseBusinessModal()
  }

  useEffect(() => {
    if (profileParams?.hours?.length) {
      const newArr = profileParams?.hours?.map((item) => {
        return {
          title: item.dayOfWeek,
          value: {
            openAt: moment(item.openingTime, "HH:mm").toISOString(),
            closeAt: moment(item.closingTime, "HH:mm").toISOString(),
          },
          isSelected: true,
        }
      })
      const avalibleDays = newArr.map((item) => item.title)
      const resArr = businessHoursData.map((item) => {
        if (avalibleDays.includes(item.title)) {
          return newArr.filter((fItem) => item.title === fItem.title)[0]
        }
        return item
      })
      setData(resArr)
    }
  }, [profileParams?.hours?.length])

  const renderListItem = ({ item }: { item: BusinessHoursItemType }) => {
    return (
      <BusinessHoursItem
        onPress={handleSelectItem}
        item={item}
        onChangePress={handleChangeTimeItem}
        isSelected={item.isSelected}
      />
    )
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <HeaderOnboarding
        className="px-[15] border-0"
        title={t("profile_settings")}
        onBackComponent={<CloseIcon />}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <DmView className="mb-[28] mt-[24] px-[14] flex-1 justify-between">
          <DmView>
            <TitleRegistrationFlow
              title={t("business_hours")}
              descr={t("provide_your_business_days_and_hours")}
              classNameDescr="text-12 leading-[15px] font-custom400"
            />
            <FlatList
              className="mt-[15]"
              data={data}
              renderItem={renderListItem}
              scrollEnabled={false}
            />
          </DmView>
          <BusinessModal
            classNameBtn="h-[41]"
            classNameTitle="text-13 leading-[16px] font-custom600"
            isVisible={isBusinessModalVisible}
            item={selectedItem}
            onClose={handleCloseBusinessModal}
            onSubmit={handleSubmitModal}
          />
        </DmView>
        <DmView className="px-[20] pt-[17]">
          <ActionBtn
            textClassName="text-15 leading-[19px] font-custom600"
            className="h-[47] rounded-5"
            title={t("save")}
            onPress={handleSubmit(handleSave)}
            disable={!isValid}
          />
        </DmView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default MyProfileBusinessHoursScreen

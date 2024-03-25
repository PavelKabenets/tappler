import React, { useEffect, useLayoutEffect, useState } from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"
import { FlatList, I18nManager } from "react-native"
import BusinessHoursItem from "components/BusinessHoursItem"
import BusinessModal from "components/BusinessModal"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"

import {
  BusinessHoursItemType,
  BusinessHoursItemValueType,
  ResultFlowDataType,
} from "types"
import { businessHoursData } from "data/registrationFlowData"

import styles from "./styles"

interface Props {
  result: ResultFlowDataType
  onChangeResult: (obj: ResultFlowDataType) => void
  step: number
}

const BusinessHours: React.FC<Props> = ({ result, onChangeResult, step }) => {
  const [data, setData] = useState<BusinessHoursItemType[]>(
    result?.businessHours || businessHoursData
  )
  const [selectedItem, setSelectedItem] = useState<BusinessHoursItemType>()

  const [isBusinessModalVisible, setBusinessModalVisible] = useState(false)

  const { t } = useTranslation()

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

  const handleSelectAll = (value: BusinessHoursItemValueType) => {
    setData((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          value,
          isSelected: true,
        }
      })
    })
    handleCloseBusinessModal()
  }

  useEffect(() => {
    if (step === 4) {
      if (result?.businessHours) {
        setData(result?.businessHours)
      }
    }
  }, [step])

  useLayoutEffect(() => {
    onChangeResult({ isValid: !!data.filter((item) => item.isSelected).length })
  }, [!!data.filter((item) => item.isSelected).length])

  useEffect(() => {
    return () => {
      onChangeResult({ businessHours: data })
    }
  }, [data])

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
    <DmView className="mb-[28] mt-[24] px-[14] flex-1 justify-between">
      <DmView>
        <TitleRegistrationFlow
          title={t("business_hours")}
          descr={t("provide_your_business_days_and_hours")}
        />
        <FlatList
          className="mt-[15]"
          data={data}
          renderItem={renderListItem}
          scrollEnabled={false}
        />
      </DmView>
      <BusinessModal
        isVisible={isBusinessModalVisible}
        item={selectedItem}
        onClose={handleCloseBusinessModal}
        onSubmit={handleSubmitModal}
        onSelectAll={handleSelectAll}
      />
    </DmView>
  )
}

export default BusinessHours

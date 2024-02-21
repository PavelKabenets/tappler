import React, { useState } from "react"

import { DmInput, DmText, DmView } from "components/UI"
import GovornorateSearchItem from "components/GovornorateSearchItem"
import { FlatList } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Modal from "react-native-modal"

import { useTranslation } from "react-i18next"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { MockSearchItemType, mockGovornorateSearchData } from "data/mockData"
import { GovernorateItemType } from "types"

import styles from "./styles"
import colors from "styles/colors"

interface Props {
  isVisible: boolean
  onClose: () => void
  onSubmit: ({
    governorate,
    city,
  }: {
    governorate: GovernorateItemType
    city: string
  }) => void
}

const SelectCityModal: React.FC<Props> = ({ isVisible, onClose, onSubmit }) => {
  const [filter, setFilter] = useState("")

  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  // @TO DO
  const renderSearchItem = ({ item }: { item: MockSearchItemType }) => {
    const handlePressSearchItem = () => {
      onSubmit({ governorate: item.govornorate, city: item.name })
      setFilter("")
      onClose()
    }
    return <GovornorateSearchItem item={item} onPress={handlePressSearchItem} />
  }
  return (
    <Modal isVisible={isVisible} className="m-0">
      <DmView
        className="flex-1 bg-white"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <DmView className="px-[16] pb-[16] flex-row items-center border-b-1 border-grey4">
          <DmView className="mr-[10] flex-1">
            <DmInput
              inputClassName="h-[43]"
              placeholder={t("search_for_a_neighborhood_or_area")}
              placeholderTextColor={colors.grey9}
              // @TO DO
              Icon={<DmView className="w-[16] h-[16] bg-grey" />}
              value={filter}
              onChangeText={setFilter}
            />
          </DmView>
          {/* @TO DO */}
          <DmView className="w-[25] h-[25] bg-grey" onPress={onClose} />
        </DmView>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          <FlatList
            data={mockGovornorateSearchData}
            renderItem={renderSearchItem}
            scrollEnabled={false}
          />
        </KeyboardAwareScrollView>
      </DmView>
    </Modal>
  )
}

export default SelectCityModal

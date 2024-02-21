import React, { useEffect, useMemo, useState } from "react"

import { ActionBtn, DmChecbox, DmInput, DmText, DmView } from "components/UI"
import Modal from "react-native-modal"
import { FlatList, ScrollView } from "react-native"

import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"

import { GovernorateItemType } from "types"
import { governoratesData } from "data/govornorateData"

import styles from "./styles"
import colors from "styles/colors"
import clsx from "clsx"
import { MockSearchItemType, mockGovornorateSearchData } from "data/mockData"
import GovornorateSearchItem from "components/GovornorateSearchItem"

interface Props {
  isVisible: boolean
  onClose: () => void
  onSubmit: ({
    governorate,
    cityArea,
  }: {
    governorate: GovernorateItemType
    cityArea: string
  }) => void
}

const GovornorateModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  const [view, setView] = useState<"content" | "search">("content")
  const [filter, setFilter] = useState("")
  const [selectedGovernorate, setSelectedGovernorate] = useState("")
  const [selectedCityArea, setSelectedCityArea] = useState("")
  const [isFullGoverDataVisiible, setFullGoverDataVisible] = useState(false)

  // @TO DO
  const governorateData = useMemo(() => {
    if (isFullGoverDataVisiible) {
      return governoratesData
    }
    return governoratesData.slice(0, 2)
  }, [governoratesData, isFullGoverDataVisiible])

  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  const hadnleOpenGoverData = () => {
    setFullGoverDataVisible(true)
  }

  const hadnleCloseGoverData = () => {
    setFullGoverDataVisible(false)
  }

  const hadlePressCityArea = (val: string) => {
    if (val === selectedCityArea) {
      setSelectedCityArea("")
    } else {
      setSelectedCityArea(val)
    }
  }

  const handleReset = () => {
    setFilter("")
  }

  useEffect(() => {
    if (filter) {
      setView("search")
      setFullGoverDataVisible(false)
    } else {
      setView("content")
    }
  }, [filter])

  const renderGovornorateItem = ({ item }: { item: GovernorateItemType }) => {
    const handlePressItem = () => {
      if (selectedGovernorate === item) {
        setSelectedGovernorate("")
      } else {
        setSelectedGovernorate(item)
        setFullGoverDataVisible(false)
      }
    }
    return (
      <DmChecbox
        className="mb-[13]"
        onPress={handlePressItem}
        title={t(item)}
        isChecked={selectedGovernorate === item}
      />
    )
  }

  const renderSearchItem = ({ item }: { item: MockSearchItemType }) => {
    const handlePressSearchItem = () => {
      setSelectedGovernorate(item.govornorate)
      setSelectedCityArea(item.area)
      setFilter("")
    }
    return <GovornorateSearchItem item={item} onPress={handlePressSearchItem} />
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} className="m-0">
      <DmView
        className="flex-1 bg-white"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <DmView className="px-[16] pb-[16] flex-row items-center border-b-1 border-grey4">
          <DmView className="w-[25] h-[25] bg-grey" onPress={onClose} />
          <DmView className="ml-[6] flex-1">
            <DmInput
              inputClassName="h-[42]"
              placeholder={t("search_for_a_neighborhood_or_area")}
              placeholderTextColor={colors.grey9}
              // @TO DO
              Icon={<DmView className="w-[16] h-[16] bg-grey" />}
              value={filter}
              onChangeText={setFilter}
            />
          </DmView>
        </DmView>
        <ScrollView
          contentContainerStyle={[
            styles.scrollView,
            !!filter && styles.paddingHorizontal0,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {view === "content" && (
            <DmView className="mt-[18]">
              <DmView
                className={clsx(
                  !!selectedGovernorate && "pb-[18] border-b-0.5 border-b-grey5"
                )}
              >
                <DmView className="flex-row items-center">
                  {/* @TO DO */}
                  <DmView className="w-[21] h-[21] bg-grey" />
                  <DmText className="ml-[9] text-16 font-custom600 flex-1">
                    {t("governorate")}
                  </DmText>
                </DmView>
                <FlatList
                  className="mt-[18]"
                  scrollEnabled={false}
                  data={governorateData}
                  renderItem={renderGovornorateItem}
                />
                {governoratesData.length > 2 && (
                  <DmView
                    onPress={
                      isFullGoverDataVisiible
                        ? hadnleCloseGoverData
                        : hadnleOpenGoverData
                    }
                    className="flex-row items-center"
                  >
                    <DmText className="font-custom600 text-red text-13">
                      {t(isFullGoverDataVisiible ? "hide" : "view_more")}
                    </DmText>
                    {/* @TO DO */}
                    <DmView className="ml-[6] w-[11] h-[7] bg-grey" />
                  </DmView>
                )}
              </DmView>
              {!!selectedGovernorate && (
                <DmView
                  className={clsx(
                    "mt-[13] pb-[18]",
                    !!selectedCityArea && "border-b-0.5 border-b-grey5"
                  )}
                >
                  <DmView className="flex-row items-center">
                    {/* @TO DO */}
                    <DmView className="w-[21] h-[21] bg-grey" />
                    <DmText className="ml-[9] text-16 font-custom600 flex-1">
                      {t("city_area")}
                    </DmText>
                  </DmView>
                  <DmChecbox
                    className="mt-[18]"
                    title={t("new_cairo")}
                    onPress={() => hadlePressCityArea("new_cairo")}
                    isChecked={selectedCityArea === "new_cairo"}
                  />
                  <DmChecbox
                    className="mt-[11]"
                    title={t("nasr_city")}
                    onPress={() => hadlePressCityArea("nasr_city")}
                    isChecked={selectedCityArea === "nasr_city"}
                  />
                </DmView>
              )}
            </DmView>
          )}
          {view === "search" && (
            <FlatList
              data={mockGovornorateSearchData}
              renderItem={renderSearchItem}
              scrollEnabled={false}
            />
          )}
        </ScrollView>
        {!!selectedCityArea && !!selectedGovernorate && (
          <DmView className="px-[20] pb-[45] pt-[8] border-t-0.5 border-t-grey5">
            <DmView className={clsx("w-full", "flex-row")}>
              {!!filter && (
                <ActionBtn
                  title={t("reset")}
                  onPress={handleReset}
                  className="rounded-4 mr-[8]"
                  variant="bordered"
                  textClassName="font-custom600"
                />
              )}
              <ActionBtn
                title={t("done")}
                onPress={() =>
                  onSubmit({
                    governorate: selectedGovernorate,
                    cityArea: selectedCityArea,
                  })
                }
                className="rounded-4 flex-1"
                textClassName="font-custom600"
              />
            </DmView>
          </DmView>
        )}
      </DmView>
    </Modal>
  )
}

export default GovornorateModal

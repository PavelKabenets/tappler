import React, { useEffect, useLayoutEffect, useMemo, useState } from "react"

import { ActionBtn, DmChecbox, DmInput, DmText, DmView } from "components/UI"
import Modal from "react-native-modal"
import { FlatList, ScrollView } from "react-native"
import GovornorateSearchItem from "components/GovornorateSearchItem"

import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"

import {
  GeocoderResponse,
  GeocoderResultType,
  GovernorateItemType,
  PlaceOfServiceType,
} from "types"
import { governoratesData } from "data/govornorateData"
import { MockSearchItemType, mockGovornorateSearchData } from "data/mockData"

import getGeolocationByName from "utils/getGeolocationByName"

import styles from "./styles"
import colors from "styles/colors"
import clsx from "clsx"
import CloseIcon from "assets/icons/close.svg"
import SearchGrey from "assets/icons/search-grey.svg"
import CityIcon from "assets/icons/city.svg"
import LocationIcon from "assets/icons/location.svg"
import ChevronDown from "assets/icons/chevron-down.svg"
import { ProsServicesCategoriesResponse } from "services"
import ActionResetBtn from "components/ActionResetBtn"

interface Props {
  isVisible: boolean
  onClose: () => void
  onSubmit?: ({
    governorate,
    cityArea,
  }: {
    governorate: GovernorateItemType
    cityArea: string
  }) => void
  onPlaceOfServicePress?: ({
    governorate,
    city,
  }: {
    governorate: string
    city: string[]
  }) => void
  type?: "selected"
  placeOfService?: PlaceOfServiceType
  isLoading?: boolean
  onReset?: () => void
}

const GovornorateModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onSubmit,
  onPlaceOfServicePress,
  type,
  placeOfService,
  isLoading = false,
  onReset,
}) => {
  const [view, setView] = useState<"content" | "search">("content")
  const [filter, setFilter] = useState("")
  const [selectedGovernorate, setSelectedGovernorate] = useState("")
  const [selectedCityArea, setSelectedCityArea] = useState<string | string[]>(
    type ? [] : ""
  )
  const [isFullGoverDataVisiible, setFullGoverDataVisible] = useState(false)
  // @TO DO
  const [places, setPlaces] = useState<GeocoderResultType>()

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
    if (!type) {
      if (val === selectedCityArea) {
        setSelectedCityArea("")
      } else {
        setSelectedCityArea(val)
      }
    }

    if (type === "selected") {
      if (selectedCityArea.includes(val)) {
        setSelectedCityArea(
          (selectedCityArea as string[]).filter((item) => item !== val)
        )
      } else {
        setSelectedCityArea([...(selectedCityArea as string[]), val])
      }
    }
  }

  const handleReset = () => {
    setFilter("")
    if (onReset) {
      onReset()
      onClose()
    }

    if (type === "selected") {
      setSelectedCityArea([])
      setSelectedGovernorate("")
    }
  }

  const handleChangeFilterText = (val: string) => {
    setFilter(val)
    // getGeolocationByName({ name: val, updateState: setPlaces })
  }

  useEffect(() => {
    if (filter) {
      setView("search")
      setFullGoverDataVisible(false)
    } else {
      setView("content")
    }
  }, [filter])

  useEffect(() => {
    if (!isVisible) {
      setSelectedGovernorate("")
      if (type === "selected") {
        setSelectedCityArea([])
      } else {
        setSelectedCityArea("")
      }
    }
  }, [isVisible])

  useLayoutEffect(() => {
    if (
      placeOfService &&
      isVisible &&
      !!placeOfService.serviceLocationAreas?.length
    ) {
      setSelectedCityArea(
        placeOfService.serviceLocationAreas.map((item) => item.city)
      )
      setSelectedGovernorate(
        placeOfService.serviceLocationAreas.map(
          (item) => item.governorate
        )[0] || ""
      )
    }
  }, [placeOfService?.serviceLocationAreas, isVisible])

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
        textClassName="flex-1"
        isChecked={selectedGovernorate === item}
      />
    )
  }

  const renderSearchItem = ({ item }: { item: MockSearchItemType }) => {
    const handlePressSearchItem = () => {
      setSelectedCityArea((prev) => {
        if (prev.includes(t(item.area))) {
          return prev
        } else {
          return [...prev, t(item.area)]
        }
      })
      setSelectedGovernorate(item.governorate)
      setFilter("")
    }
    return <GovornorateSearchItem item={item} onPress={handlePressSearchItem} />
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} className="m-0">
      <DmView
        className="flex-1 bg-white"
        style={{
          paddingTop: insets.top + 16,
          paddingBottom:
            insets.bottom > 45
              ? insets.bottom
              : 45 - insets.bottom + insets.bottom,
        }}
      >
        <DmView className="px-[16] pb-[16] flex-row items-center border-b-1 border-grey4">
          <DmView
            className="w-[25] h-[25] items-center justify-center"
            onPress={onClose}
          >
            <CloseIcon width={14} height={14} />
          </DmView>
          <DmView className="ml-[6] flex-1">
            <DmInput
              placeholder={t("search_for_a_neighborhood_or_area")}
              placeholderTextColor={colors.grey9}
              // @TO DO
              Icon={<SearchGrey />}
              value={filter}
              onChangeText={handleChangeFilterText}
              isAnimText={!!type}
            />
          </DmView>
        </DmView>
        <ScrollView
          contentContainerStyle={[
            styles.scrollView,
            !!filter && styles.paddingHorizontal0,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {view === "content" && (
            <DmView className="mt-[18]">
              <DmView
                className={clsx(
                  (!!selectedGovernorate || type === "selected") &&
                    "pb-[18] border-b-0.5 border-b-grey5"
                )}
              >
                <DmView className="flex-row items-center">
                  <LocationIcon />
                  <DmText className="ml-[9] text-16 leading-[19px] font-custom600 flex-1">
                    {t("governorate")}
                  </DmText>
                </DmView>
                <FlatList
                  className="mt-[18]"
                  scrollEnabled={false}
                  data={governorateData}
                  renderItem={renderGovornorateItem}
                />
                {/* {governoratesData.length > 2 && (
                  <>
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
                    <DmView>
                      {isFullGoverDataVisiible && (
                        <DmView className="rotate-[180deg]">
                          <ChevronDown
                            width={18}
                            height={18}
                            stroke={colors.red}
                          />
                        </DmView>
                      )}
                      {!isFullGoverDataVisiible && (
                        <ChevronDown
                          width={18}
                          height={18}
                          stroke={colors.red}
                        />
                      )}
                    </DmView>
                  </DmView>
                  </>
                )} */}
              </DmView>
              {!!selectedGovernorate && (
                <DmView
                  className={clsx(
                    "mt-[13] pb-[18]",
                    !!selectedCityArea && "border-b-0.5 border-b-grey5"
                  )}
                >
                  <DmView className="flex-row items-center">
                    <CityIcon />
                    <DmText className="ml-[9] text-16 leading-[19px] font-custom600 flex-1">
                      {t("city_area")}
                    </DmText>
                  </DmView>
                  <DmChecbox
                    className="mt-[18]"
                    title={t("new_cairo")}
                    onPress={() => hadlePressCityArea(t("new_cairo"))}
                    isChecked={selectedCityArea.includes(t("new_cairo"))}
                    textClassName="flex-1"
                    variant={type === "selected" ? "square" : "circle"}
                  />
                  <DmChecbox
                    className="mt-[11]"
                    title={t("nasr_city")}
                    onPress={() => hadlePressCityArea(t("nasr_city"))}
                    isChecked={selectedCityArea.includes(t("nasr_city"))}
                    textClassName="flex-1"
                    variant={type === "selected" ? "square" : "circle"}
                  />
                </DmView>
              )}
            </DmView>
          )}
          {view === "search" && (
            <FlatList
              data={mockGovornorateSearchData?.filter((item) =>
                t(item.name).toLowerCase().includes(filter.toLowerCase())
              )}
              renderItem={renderSearchItem}
              keyboardShouldPersistTaps="handled"
              scrollEnabled={false}
            />
          )}
        </ScrollView>
        {!!selectedCityArea.length && !!selectedGovernorate && (
          <ActionResetBtn
            onPress={() =>
              type === "selected"
                ? onPlaceOfServicePress?.({
                    governorate: selectedGovernorate,
                    city: selectedCityArea as string[],
                  })
                : onSubmit?.({
                    governorate: selectedGovernorate,
                    cityArea: selectedCityArea as string,
                  })
            }
            isLoading={isLoading}
            isResetBtnVisible={!!filter || type === "selected"}
            onReset={handleReset}
          />
        )}
      </DmView>
    </Modal>
  )
}

export default GovornorateModal

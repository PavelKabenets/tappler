import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmChecbox, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import HeaderOnboarding from "components/HeaderOnboarding"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import GovornorateModal from "components/GovornorateModal"
import {
  api,
  useProsServiceCategoriesQuery,
  useProsServicesCategoriesPlaceOfServiceMutation,
} from "services/api"
import SelectableBtn from "components/SelectableBtn"
import PlusIcon from "assets/icons/plus.svg"
import colors from "styles/colors"
import SelectLocationTypeModal from "components/SelectLocationTypeModal"
import {
  ProsServicesCategoriesPlaceOfServiceRequest,
  ProsServicesCategoriesResponse,
} from "services"
import { PlaceOfServiceType } from "types"
import { useIsFocused } from "@react-navigation/native"
import { useDispatch } from "react-redux"

type Props = RootStackScreenProps<"place-of-services">

const PlaceOfServiceScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { service } = route.params
  const placeOfServiceParams = (
    route.params as {
      service: ProsServicesCategoriesResponse
      placeOfService?: PlaceOfServiceType
    }
  )?.placeOfService

  const [currentService, setCurrentService] = useState(service)
  // State
  const [isGovernatureModalVisible, setGovernatureModalVisible] =
    useState(false)
  const [isSelectionLocalTypeModalVisible, setSelectionLocalTypeModalVisivle] =
    useState(false)
  const [currentPlaceOfService, setCurrentPlaceOfService] =
    useState<Partial<PlaceOfServiceType>>()

  const [isProvideCheck, setProvideCheck] = useState(false)

  const [isLoading, setLoading] = useState(false)
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const isFocused = useIsFocused()

  const dispatch = useDispatch()
  const { refetch } = useProsServiceCategoriesQuery()

  const [patchPlaceOfService] =
    useProsServicesCategoriesPlaceOfServiceMutation()
  // Refs
  // Methods
  // Handlers
  const handleOpenGovernature = () => {
    setGovernatureModalVisible(true)
  }

  const handleCloseGovernature = () => {
    setGovernatureModalVisible(false)
  }

  const handleOpenSelectionLocalTypeModalVisible = () => {
    setSelectionLocalTypeModalVisivle(true)
  }

  const handleCloseSelectionLocalTypeModalVisible = () => {
    setSelectionLocalTypeModalVisivle(false)
  }

  const handleChangeCurrentPlaceOfService = (
    item: Partial<ProsServicesCategoriesPlaceOfServiceRequest>
  ) => {
    setCurrentPlaceOfService((prev) => ({ ...prev, ...item }))
  }

  const handleResetCity = () => {
    handleChangeCurrentPlaceOfService({ serviceLocationAreas: [] })
  }

  const handleResetLocationType = () => {
    handleChangeCurrentPlaceOfService({ serviceLocationType: undefined })
  }

  const handleCityPress = async ({
    governorate,
    city,
  }: {
    governorate: string
    city: string[]
  }) => {
    handleChangeCurrentPlaceOfService({
      id: currentService.serviceCategory.id,
      serviceLocationAreas: city.map((item) => {
        return {
          // @TO DO
          city: t(item),
          governorate,
        }
      }),
      // @TO DO
      placeOfService: ["proToCustomer"],
    })
    handleCloseGovernature()
  }

  const handleRemoveCityArea = async (item: string) => {
    handleChangeCurrentPlaceOfService({
      serviceLocationAreas: currentPlaceOfService?.serviceLocationAreas?.filter(
        (fItem) => {
          return item !== fItem.city
        }
      ),
    })
  }

  const handleLocationPress = (
    type: "office" | "warehouse" | "home" | "store"
  ) => {
    handleChangeCurrentPlaceOfService({ serviceLocationType: type })
    handleCloseSelectionLocalTypeModalVisible()
  }

  const handleGoDeliveryRadiusScreen = () => {
    navigation.navigate("delivery-radius", {
      placeOfService: currentPlaceOfService,
      service: currentService,
    })
  }

  const handleResetDelivery = () => {
    handleChangeCurrentPlaceOfService({
      deliveryRadius: 0,
    })
  }

  const handleSubmit = async () => {
    dispatch(api.util.resetApiState())
    try {
      setLoading(true)
      if (service?.serviceCategory?.placeOfService?.length) {
        await patchPlaceOfService({
          id: service.serviceCategory.id,
          placeOfService: [
            currentPlaceOfService?.serviceLocationAreas?.length
              ? "proToCustomer"
              : undefined,
            currentPlaceOfService?.deliveryRadius ? "delivery" : undefined,
            currentPlaceOfService?.serviceLocationType
              ? "customerToPro"
              : undefined,
            isProvideCheck ? "remoteOrOnline" : undefined,
          ].filter((item) => !!item) as (
            | "proToCustomer"
            | "delivery"
            | "customerToPro"
            | "remoteOrOnline"
          )[],
          ...(currentPlaceOfService?.serviceLocationAreas?.length
            ? {
                serviceLocationAreas:
                  currentPlaceOfService?.serviceLocationAreas,
              }
            : {}),
          ...currentPlaceOfService?.deliveryRadius
            ? { deliveryRadius: currentPlaceOfService?.deliveryRadius }
            : {},
          ...currentPlaceOfService?.serviceLocationType
            ? {
                serviceLocationType: currentPlaceOfService?.serviceLocationType,
              }
            : {},
        }).unwrap()
      }
      await refetch().unwrap()
      navigation.navigate("my-services-detail", {
        service: {
          ...service,
          placeOfService: currentPlaceOfService
            ? [{ ...currentPlaceOfService, place: isProvideCheck }]
            : [],
        },
      })
    } catch (e) {
      console.log("Patch Place Of Service Error: ", e)
    } finally {
      setLoading(false)
    }
  }

  const btnDisable = () => {
    if (service?.serviceCategory?.placeOfService?.length) {
      return (
        !currentPlaceOfService?.serviceLocationAreas?.length &&
        !currentPlaceOfService?.deliveryRadius &&
        !currentPlaceOfService?.serviceLocationType?.length &&
        !currentPlaceOfService?.isRemote
      )
    }
  }

  // Hooks
  useEffect(() => {
    setCurrentService(service)
    if (placeOfServiceParams) {
      setCurrentPlaceOfService(placeOfServiceParams)
      setProvideCheck(!!placeOfServiceParams?.isRemote)
    } else {
      setCurrentPlaceOfService({
        ...service.placeOfService.reduce<Omit<PlaceOfServiceType, "place">>(
          (acc, obj) => {
            Object.entries(obj).forEach(([key, value]) => {
              if (key !== "place" && value != null) {
                if (typeof value === "string" || Array.isArray(value)) {
                  if (value.length !== 0) {
                    (acc as any)[key] = value
                  }
                } else {
                  (acc as any)[key] = value
                }
              }
            })
            return acc
          },
          {} as Omit<PlaceOfServiceType, "place">
        ),
        isRemote:
          currentService.placeOfService.some(
            (item) => item?.isRemote || item.place === "remoteOrOnline"
          ) ||
          isProvideCheck ||
          currentPlaceOfService?.isRemote,
      })
      setProvideCheck(
        service.placeOfService.some(
          (item) => item.place === "remoteOrOnline" || item?.isRemote
        ) || isProvideCheck
      )
    }
  }, [placeOfServiceParams, isFocused])

  useEffect(() => {
    if (currentService) {
      setProvideCheck(
        currentService.placeOfService.some(
          (item) => item.place === "remoteOrOnline" || item?.isRemote
        )
      )
    }
  }, [currentService])

  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <HeaderOnboarding
        title={t("place_of_service")}
        isChevron
        className="px-[12]"
      />
      <KeyboardAwareScrollView style={{ flexGrow: 1 }}>
        <DmText className="px-[16] mt-[27] text-16 leading-[19px] font-custom600">
          {t("where_do_you_provide_your_services")}
        </DmText>
        <DmView className="mt-[28] px-[9]">
          {service?.serviceCategory?.placeOfService?.includes(
            "proToCustomer"
          ) && (
            <DmView
              className={clsx(
                "mb-[28]",
                !!currentPlaceOfService?.serviceLocationAreas?.length &&
                  "mb-[6]"
              )}
            >
              <DmView className="px-[11]">
                <DmChecbox
                  variant="square"
                  title={t("i_go_to_customer_location_or_party")}
                  textClassName="font-custom400 text-13 leading-[20px] flex-1"
                  onPress={
                    currentPlaceOfService?.serviceLocationAreas?.length
                      ? handleResetCity
                      : handleOpenGovernature
                  }
                  isChecked={
                    !!currentPlaceOfService?.serviceLocationAreas?.length
                  }
                />
              </DmView>
              {!!currentPlaceOfService?.serviceLocationAreas?.length && (
                <DmView>
                  <DmView className="mt-[16] flex-row items-center flex-wrap">
                    {currentPlaceOfService?.serviceLocationAreas.map((item) => {
                      return (
                        <SelectableBtn
                          className="mr-[10]"
                          key={item.city}
                          title={item.city}
                          onPress={handleRemoveCityArea}
                        />
                      )
                    })}
                  </DmView>
                  <DmView
                    className="px-[11] py-[16] flex-row items-center"
                    onPress={handleOpenGovernature}
                  >
                    <DmView className="mr-[7] w-[24] h-[24] rounded-full bg-grey24 justify-center items-center">
                      <PlusIcon
                        width={20}
                        height={20}
                        color={colors.white}
                        strokeWidth={3}
                      />
                    </DmView>
                    <DmText className="text-13 leading-[16px] font-custom600">
                      {t("add_area")}
                    </DmText>
                  </DmView>
                </DmView>
              )}
            </DmView>
          )}

          {service?.serviceCategory?.placeOfService?.includes(
            "customerToPro"
          ) && (
            <DmView className={clsx("px-[11] mb-[27]")}>
              <DmChecbox
                variant="square"
                textClassName="font-custom400 flex-1"
                onPress={handleOpenSelectionLocalTypeModalVisible}
                isChecked={
                  !!currentPlaceOfService?.serviceLocationType ||
                  !!currentPlaceOfService?.serviceLocationType
                }
              >
                <DmText
                  className={clsx(
                    "text-13 leading-[20px] font-custom400 flex-1"
                  )}
                >
                  {t("customers_come_to_my_location_descr")}{" "}
                  <DmText className="text-13 leading-[20px] font-custom600 text-red">
                    {t(
                      currentPlaceOfService?.serviceLocationType?.toLowerCase()
                        ? `service_location_arr.${currentPlaceOfService?.serviceLocationType?.toLowerCase()}`
                        : ""
                    )}
                  </DmText>
                </DmText>
              </DmChecbox>
            </DmView>
          )}
          {service?.serviceCategory?.placeOfService?.includes("delivery") && (
            <DmView className="mb-[27] px-[11]">
              <DmChecbox
                variant="square"
                onPress={
                  currentPlaceOfService?.deliveryRadius
                    ? handleResetDelivery
                    : handleGoDeliveryRadiusScreen
                }
                isChecked={!!currentPlaceOfService?.deliveryRadius}
              >
                <DmText
                  className={clsx(
                    "text-13 leading-[20px] font-custom400 flex-1"
                  )}
                >
                  {t("i_provide_delivery_of_my_product_or_food_within")}{" "}
                  <DmText
                    className={clsx(
                      "text-15 font-custom600 text-red",
                      !currentPlaceOfService?.deliveryRadius && "text-black"
                    )}
                  >
                    {currentPlaceOfService?.deliveryRadius
                      ? currentPlaceOfService?.deliveryRadius !== 999
                        ? currentPlaceOfService?.deliveryRadius
                        : t("no_limit") + " "
                      : "__"}
                  </DmText>
                  {t("km_of_my_location")}
                </DmText>
              </DmChecbox>
            </DmView>
          )}
          {service?.serviceCategory?.placeOfService?.includes(
            "remoteOrOnline"
          ) && (
            <DmView className="px-[11]">
              <DmChecbox
                variant="square"
                title={t("i_provide_my_service_remotely_or_online")}
                textClassName="flex-1 text-13 leading-[20px] font-custom400"
                onPress={() => {
                  setProvideCheck((prev) => !prev)
                  setCurrentPlaceOfService((prev) => ({
                    ...prev,
                    isRemote: !prev?.isRemote,
                  }))
                }}
                isChecked={isProvideCheck}
              />
            </DmView>
          )}
        </DmView>
      </KeyboardAwareScrollView>
      {!btnDisable() && (
        <ActionBtn
          onPress={handleSubmit}
          title={t("save")}
          className="mx-[20] rounded-5"
          isLoading={isLoading}
          disable={isLoading || btnDisable()}
        />
      )}
      <GovornorateModal
        type="selected"
        isVisible={isGovernatureModalVisible}
        onClose={handleCloseGovernature}
        onPlaceOfServicePress={handleCityPress}
        placeOfService={currentPlaceOfService}
        isLoading={isLoading}
        onReset={handleResetCity}
      />
      <SelectLocationTypeModal
        isVisible={isSelectionLocalTypeModalVisible}
        onClose={handleCloseSelectionLocalTypeModalVisible}
        onPress={handleLocationPress}
        currentType={currentPlaceOfService?.serviceLocationType}
        onReset={handleResetLocationType}
      />
    </SafeAreaView>
  )
}

export default PlaceOfServiceScreen

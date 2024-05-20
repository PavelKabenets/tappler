import React, { useEffect, useState } from "react"

// Components
import {
  ActionBtn,
  DmAuthInput,
  DmChecbox,
  DmText,
  DmView,
} from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import {
  FlatList,
  I18nManager,
  ImageBackground,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from "react-native"
import { Alert } from "react-native"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import ChevronLeft from "assets/icons/chevron-left.svg"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import colors from "styles/colors"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import AddPlusTitleComponent from "components/AddPlusTitleComponent"
import { ErrorSignUpEmailType, FoodOptionType } from "types"
import CreateFoodMenuOptionModal from "components/CreateFoodMenuOptionModal"
import MenuItemOptionsItem from "components/MenuItemOptionsItem"
import {
  usePatchProsServicesCategoriesMenuSectionItemMutation,
  usePostProfilePhotoMutation,
  usePostdProsServicesCategoriesMenuSectionItemMutation,
} from "services/api"
import CameraIcon from "assets/icons/camera.svg"
import SelectDoPhotoModal from "components/SelectDoPhotoModal"
import photoLinkToBlob from "utils/photoLinkToBlob"
import { ImageOrVideo } from "react-native-image-crop-picker"
import { SCREEN_WIDTH } from "helpers/helpers"

type Props = RootStackScreenProps<"food-section-menu-detail">

type DefaultValuesType = {
  itemName: string
  descr: string
  price: string
  discountedPrice: string
  expressDelivery: boolean
  preOrder: boolean
  options?: FoodOptionType[]
}

const FoodSectionMenuItemDetailScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  const { service, currentSection, menuItem } = route.params

  // State
  const [isLoading, setLoading] = useState(false)
  const [isAddOptionModalVisible, setAddOptionModalVisible] = useState(false)
  const [currentOptions, setCurrentOptions] = useState<FoodOptionType[]>([])
  const [targetOption, setTargetOption] = useState<FoodOptionType>()
  const [photo, setPhoto] = useState<ImageOrVideo>()
  const [isPhotoModalVisible, setPhotoModalVisible] = useState(false)

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<DefaultValuesType>({
    defaultValues: {
      itemName: "",
      descr: "",
      price: "",
      discountedPrice: "",
      expressDelivery: false,
      preOrder: false,
    },
  })
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const [postMenuItem] = usePostdProsServicesCategoriesMenuSectionItemMutation()
  const [patchMenuItem] =
    usePatchProsServicesCategoriesMenuSectionItemMutation()
  const [postProfilePhoto] = usePostProfilePhotoMutation()
  // Refs
  // Methods
  // Handlers
  const handleOpenAddOptionsModal = () => {
    setTimeout(() => {
      setAddOptionModalVisible(true)
    }, 100)
  }

  const handleCloseAddOptionsModal = () => {
    setAddOptionModalVisible(false)
  }

  const handleClosePhotoModal = () => {
    setPhotoModalVisible(false)
  }

  const handleOpenPhotoModal = () => {
    setPhotoModalVisible(true)
  }

  const handleItemPress = (item: FoodOptionType) => {
    setTargetOption(item)
    handleOpenAddOptionsModal()
  }

  const handleAdd = () => {
    setTargetOption(undefined)
    handleOpenAddOptionsModal()
  }

  const handleEditOption = (item: FoodOptionType) => {
    setCurrentOptions((prev) =>
      prev?.map((mItem) => {
        if (mItem.index === targetOption?.index) {
          return { ...item, index: mItem.index }
        }
        return mItem
      })
    )
  }

  const handleAddOption = (item: FoodOptionType) => {
    setCurrentOptions((prev) => [
      ...prev,
      { ...item, index: currentOptions.length },
    ])
  }

  const handleDelete = (index: number) => {
    setCurrentOptions((prev) => prev.filter((item) => item.index !== index))
  }

  const onSubmit = async () => {
    if (!menuItem) {
      try {
        setLoading(true)
        const photoId = await postProfilePhoto(photo).unwrap()
        const res = await postMenuItem({
          name: getValues("itemName"),
          description: getValues("descr"),
          price: Number(getValues("price")),
          discountPrice: Number(getValues("discountedPrice")),
          options: currentOptions.map((item) => {
            if (typeof item.index === "number") {
              const { index, ...body } = item
              return body
            }
            return item
          }),
          isExpressDeliveryAvailable: getValues("expressDelivery"),
          isPreOrderOnly: getValues("preOrder"),
          sectionId: currentSection.id,
          serviceId: service.serviceCategory.id,
          photo: photoId.storageKey,
        }).unwrap()
        navigation.navigate("food-section-detail", {
          service: res,
          currentSection:
            res.menu?.menuSections.filter(
              (item) => item.id === currentSection.id
            )[0] || currentSection,
        })
      } catch (e) {
        console.log("Create Menu Item Error: ", e)
        if ((e as ErrorSignUpEmailType).data.message) {
          Alert.alert(
            `${(e as ErrorSignUpEmailType).data.message}`,
            `\n ${(e as ErrorSignUpEmailType).data.statusCode}
          \n ${Object.entries((e as ErrorSignUpEmailType).data.validationErrors)
            ?.map((item) => item[1][0])
            .join("\n\n")}`
          )
          return
        }
        if ((e as ErrorSignUpEmailType).data.message) {
          Alert.alert(
            `${(e as ErrorSignUpEmailType).data.message}`,
            `\n ${(e as ErrorSignUpEmailType).data.statusCode}
          \n ${Object.entries((e as ErrorSignUpEmailType).data.validationErrors)
            ?.map((item) => item[1][0])
            .join("\n\n")}`
          )
          return
        }
        if ((e as { error: string })?.error) {
          Alert.alert(`${(e as { error: string }).error}`)
        } else {
          Alert.alert("504")
        }
      } finally {
        setLoading(false)
      }
    } else {
      try {
        setLoading(true)
        const photoId = photo ? await postProfilePhoto(photo).unwrap() : null
        const res = await patchMenuItem({
          id: menuItem.id,
          name: getValues("itemName"),
          description: getValues("descr"),
          price: Number(getValues("price")),
          discountPrice: Number(getValues("discountedPrice")),
          options: currentOptions.map((item) => {
            if (typeof item.index === "number") {
              const { index, ...body } = item
              return body
            }
            return item
          }),
          isExpressDeliveryAvailable: getValues("expressDelivery"),
          isPreOrderOnly: getValues("preOrder"),
          sectionId: currentSection.id,
          serviceId: service.serviceCategory.id,
          photo: photoId?.storageKey
            ? photoId.storageKey
            : menuItem?.photo.split("/")[
                Number(menuItem?.photo.split("/").length) - 1
              ],
        }).unwrap()
        navigation.navigate("food-section-detail", {
          service: res,
          currentSection:
            res.menu?.menuSections.filter(
              (item) => item.id === currentSection.id
            )[0] || currentSection,
        })
      } catch (e) {
        console.log("Create Menu Item Error: ", e)
        if ((e as ErrorSignUpEmailType).data.message) {
          Alert.alert(
            `${(e as ErrorSignUpEmailType).data.message}`,
            `\n ${(e as ErrorSignUpEmailType).data.statusCode}
          \n ${Object.entries((e as ErrorSignUpEmailType).data.validationErrors)
            ?.map((item) => item[1][0])
            .join("\n\n")}`
          )
          return
        }
        if ((e as { error: string })?.error) {
          Alert.alert(`${(e as { error: string }).error}`)
        } else {
          Alert.alert("504")
        }
      } finally {
        setLoading(false)
      }
    }
  }
  // Hooks
  useEffect(() => {
    if (menuItem?.options) {
      setCurrentOptions(
        menuItem.options.map((item, idx) => ({ ...item, index: idx }))
      )
    }

    if (menuItem?.id) {
      setValue("itemName", menuItem.name, {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: true,
      })
      setValue("descr", menuItem.description, {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: true,
      })
      setValue("price", menuItem.price.toString(), {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: true,
      })
      setValue("discountedPrice", menuItem.discountPrice.toString(), {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: true,
      })
      setValue("expressDelivery", menuItem.isExpressDeliveryAvailable, {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: true,
      })
      setValue("preOrder", menuItem.isPreOrderOnly, {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: true,
      })
    }
  }, [menuItem?.id])
  // Listeners
  // Render Methods
  const renderListItem = ({
    item,
    index,
  }: {
    item: FoodOptionType
    index: number
  }) => {
    return (
      <MenuItemOptionsItem
        item={item}
        onPress={handleItemPress}
        className={clsx(index === 0 && "border-t-0")}
        index={index}
      />
    )
  }

  const [lines, setLines] = useState(1)

  const onContentSizeChange = (
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    const { height } = event.nativeEvent.contentSize
    const newLines = Math.ceil(height / (I18nManager.isRTL ? 21 : 16))
    if (newLines > 5) {
      setValue("descr", watch("descr").slice(0, -1), { shouldValidate: true })
    }
    setLines(newLines)
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      edges={["bottom"]}
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 14 }}
      >
        <DmView onPress={handleOpenPhotoModal}>
          <ImageBackground
            className="justify-between pb-[4]"
            source={{ uri: photo?.path || menuItem?.photo || undefined }}
            resizeMode="stretch"
            style={{
              paddingTop: insets.top + 11,
              paddingHorizontal: 8,
              height: SCREEN_WIDTH / 1.6,
            }}
          >
            <DmView
              className={clsx(
                "w-[31] h-[31] bg-white rounded-full items-center justify-center",
                I18nManager.isRTL && "scale-x-[-1]"
              )}
              onPress={navigation.goBack}
            >
              <ChevronLeft stroke={colors.red} />
            </DmView>
            <DmView className="items-center">
              <DmView className="scale-x-[-1]">
                <CameraIcon
                  width={29}
                  height={29}
                  fill={photo || menuItem?.photo ? colors.white : colors.red}
                />
              </DmView>
              <DmText
                className={clsx(
                  "text-11 leading-[14px] font-custom600 text-center",
                  (!!photo || menuItem?.photo) && "text-white"
                )}
              >
                {t(
                  !!photo || menuItem?.photo ? "change_photo" : "upload_photo"
                )}
              </DmText>
            </DmView>
          </ImageBackground>
        </DmView>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <DmView className="mt-[20]">
              <DmAuthInput
                placeholder={t("enter_dish_name_descr")}
                label={t("item_name")}
                value={value}
                wrapperClassName="ml-[14]"
                containerClassName="mr-[14.5]"
                inputClassName="h-[50]"
                onChangeText={onChange}
              />
            </DmView>
          )}
          name="itemName"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <DmView className="mt-[30]">
              <DmAuthInput
                placeholder={t("enter_the_description_of_the_item_descr")}
                label={t("description")}
                onContentSizeChange={onContentSizeChange}
                value={value}
                wrapperClassName="ml-[14]"
                numberOfLines={lines}
                containerClassName="mr-[14.5]"
                onChangeText={(val) => {
                  if (lines <= 5) {
                    onChange(val)
                  }
                }}
                multiline
                style={{
                  height:
                    50 +
                    (lines <= 5
                      ? (I18nManager.isRTL ? 21 : 16) * (lines - 1)
                      : (I18nManager.isRTL ? 21 : 16) * (5 - 1)),
                }}
              />
            </DmView>
          )}
          name="descr"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <DmView className="mt-[20]">
              <DmAuthInput
                placeholder={t("enter_the_price_before_any_discount")}
                label={t("normal_price_in_EGP")}
                value={value}
                wrapperClassName="ml-[14]"
                containerClassName="mr-[14.5]"
                inputClassName="h-[50]"
                keyboardType="numeric"
                onChangeText={onChange}
              />
            </DmView>
          )}
          name="price"
        />
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => (
            <DmView className="mt-[20]">
              <DmAuthInput
                placeholder={t(
                  "if_you_do_not_offer_any_discount_leave_this_blanc"
                )}
                label={t("discounted_price_in_EGP")}
                value={value}
                wrapperClassName="ml-[14]"
                containerClassName="mr-[14.5]"
                inputClassName="h-[50]"
                keyboardType="numeric"
                onChangeText={onChange}
              />
            </DmView>
          )}
          name="discountedPrice"
        />
        <DmView>
          <FlatList
            data={currentOptions}
            renderItem={renderListItem}
            scrollEnabled={false}
          />
        </DmView>
        <AddPlusTitleComponent
          title={t("add_options")}
          className="py-[26] mr-[14.5]"
          onPress={handleAdd}
        />
        <DmView className="mt-[14] px-[14]">
          <DmText className="text-11 leading-[14px] font-custom700">
            {t("pickup_and_delivery")}
          </DmText>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <DmChecbox
                title={t("express_delivery_descr")}
                textClassName="flex-1 text-13 leading-[16px] font-custom400"
                className="mt-[11]"
                isChecked={value}
                onPress={() => {
                  onChange(!value)
                  setValue("preOrder", false, { shouldValidate: true })
                }}
              />
            )}
            name="expressDelivery"
          />
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <DmChecbox
                title={t("pre_order_only_descr")}
                textClassName="flex-1 text-13 leading-[16px] font-custom400"
                className="mt-[11]"
                isChecked={value}
                onPress={() => {
                  onChange(!value)
                  setValue("expressDelivery", false, { shouldValidate: true })
                }}
              />
            )}
            name="preOrder"
          />
        </DmView>
      </KeyboardAwareScrollView>
      <DmView className="pt-[20] border-t-0.3 border-t-grey4">
        <ActionBtn
          onPress={() => handleSubmit(onSubmit)()}
          title={t("save")}
          className="mx-[20] rounded-5"
          textClassName="text-13 leading-[16px] font-custom600"
          isLoading={isLoading}
          disable={
            isLoading ||
            !isValid ||
            !photo && !menuItem?.photo ||
            (!watch("expressDelivery") &&
            !watch("preOrder"))
          }
        />
      </DmView>
      <CreateFoodMenuOptionModal
        isVisible={isAddOptionModalVisible}
        onClose={handleCloseAddOptionsModal}
        currentOption={targetOption}
        setCurrentOption={handleEditOption}
        onAdd={handleAddOption}
        onDelete={handleDelete}
      />
      <SelectDoPhotoModal
        isVisible={isPhotoModalVisible}
        onClose={handleClosePhotoModal}
        selectedPhoto={photo}
        setSelectedPhoto={setPhoto}
        width={SCREEN_WIDTH}
        height={SCREEN_WIDTH / 1.6}
      />
    </SafeAreaView>
  )
}

export default FoodSectionMenuItemDetailScreen

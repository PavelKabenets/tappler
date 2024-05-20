import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"

import styles from "./styles"
import { MenuItemType } from "types"
import { useTranslation } from "react-i18next"
import { Image } from "react-native"
import clsx from "clsx"
import colors from "styles/colors"
import { hexToRGBA, isLittlePhone, isSmallPhone } from "helpers/helpers"
import PlusIcon from "assets/icons/plus.svg"
import { Grayscale } from "react-native-color-matrix-image-filters"

interface Props {
  item: MenuItemType
  className?: string
  onPress?: (item: MenuItemType) => void
  inStore?: boolean
}

const FoodMenuSectionMenuItem: React.FC<Props> = ({
  item,
  onPress,
  inStore,
}) => {
  const { t } = useTranslation()
  return (
    <DmView
      className="px-[16] pt-[20] pb-[23] border-b-0.5 border-b-grey14"
      onPress={onPress ? () => onPress(item) : undefined}
    >
      <DmView className=" flex-row justify-between">
        <DmView className="flex-1 justify-between">
          <DmView>
            <DmText className="text-14 leading-[18px] font-custom600">
              {item.name}
            </DmText>
            <DmText
              className="mt-[5] text-13 leading-[15px] font-custom400"
              numberOfLines={4}
            >
              {item.description}
            </DmText>
          </DmView>
          <DmView className="mt-[13] flex-row items-center">
            {item.price || item.price !== 0 ? (
              <DmText
                className={clsx("flex-1 text-13 leading-[16px] font-custom600")}
                style={{ fontSize: 15 - item.price.toString().length }}
              >
                {item.discountPrice ? item.discountPrice : item.price}{" "}
                {t("EGP")}
              </DmText>
            ) : (
              <DmText className="text-14 leading-[18px] font-custom600 text-grey2">
                {t("price_on_selection")}
              </DmText>
            )}
            <DmView
              className={clsx(
                "flex-[2] items-center flex-row justify-end",
                !item.price && "flex-0"
              )}
            >
              <DmText
                className={clsx(
                  "flex-1 text-13 leading-[16px] text-grey2 font-custom400 line-through",
                  !item.price && "flex-0"
                )}
                style={{
                  fontSize: 15 - item.discountPrice.toString().length,
                }}
              >
                {item.discountPrice ? item?.price : ""}{" "}
                {item.discountPrice ? t("EGP") : ""}
              </DmText>
              <DmView className={clsx(item.price && "flex-1")}>
                {item.isPreOrderOnly ? (
                  <ActionBtn
                    title={t("pre_order")}
                    className="h-[20] self-auto bg-red2 rounded-4 px-[8]"
                    classNameTextWrapper="mx-[0]"
                    textClassName={clsx(
                      "text-11 leading-[14px] font-custom700 text-white"
                    )}
                  />
                ) : (
                  <DmView />
                )}
              </DmView>
            </DmView>
          </DmView>
        </DmView>
        <DmView
          className="ml-[21] overflow-hidden items-center justify-end"
          style={styles.img}
        >
          {!item.inStock ? (
            <Grayscale>
              <Image
                source={{ uri: item.photo || undefined }}
                style={[styles.img]}
              />
            </Grayscale>
          ) : (
            <Image
              source={{ uri: item.photo || undefined }}
              style={[styles.img]}
            />
          )}

          {inStore && (
            <DmView className="absolute bottom-[8] items-center justify-center w-[30] h-[23] bg-white rounded-3">
              <PlusIcon
                color={colors.black}
                width={18}
                height={18}
                strokeWidth={2.5}
              />
            </DmView>
          )}
        </DmView>
      </DmView>
      {!item.inStock && (
        <DmText className="mt-[20] text-14 leading-[18px] font-custom600 text-red">
          {t("out_of_stock")}
        </DmText>
      )}
    </DmView>
  )
}

export default FoodMenuSectionMenuItem

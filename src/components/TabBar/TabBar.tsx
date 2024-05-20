import React from "react"

import { DmText, DmView } from "components/UI"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { isIphoneX } from "react-native-iphone-x-helper"

import { useSafeAreaInsets } from "react-native-safe-area-context"
import i18n from "locales/i18n"

import styles from "./styles"
import clsx from "clsx"
import colors from "styles/colors"
import { useTranslation } from "react-i18next"
import { TFunction } from "i18next"
import { isLittlePhone } from "helpers/helpers"

const TabBar = ({
  state,
  navigation,
  descriptors,
  insets,
  t,
}: BottomTabBarProps & { t: TFunction }): JSX.Element => {
  return (
    <DmView
      className={clsx("bg-white")}
      style={{
        paddingBottom:
          insets.bottom > 31
            ? insets.bottom - (insets.bottom - 31)
            : 31 - insets.bottom,
      }}
    >
      <DmView className="h-[0.7] bg-grey15 w-full mb-[20]" />
      <DmView className={clsx("flex-row justify-between")}>
        {state.routes.map((route, index) => {
          const focused = state.index === index
          const { options } = descriptors[route.key]
          return (
            <DmView
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                })

                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name)
                }
              }}
              key={route.key}
              className="items-center justify-center"
              style={styles.item}
            >
              {!!options.tabBarIcon &&
                options.tabBarIcon({ focused, color: "", size: 24 })}
              <DmText
                className={clsx(
                  "mt-[2] text-grey17 text-11 leading-[18px]",
                  isLittlePhone && "text-10",
                  !focused && "font-custom500",
                  focused && "text-black font-custom600"
                )}
              >
                {t(route.name)}
              </DmText>
            </DmView>
          )
        })}
      </DmView>
    </DmView>
  )
}

export default TabBar

import React, { useMemo } from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"

import styles from "./styles"
import LogoIcon from "assets/icons/logo.svg"
import clsx from "clsx"
import SettingsIcon from "assets/icons/gear.svg"
import BellIcon from "assets/icons/bell.svg"
import colors from "styles/colors"
import { useGetNotitficationsQuery } from "services/api"

interface Props {
  className?: string
  title?: string
}

const HeaderDashboard: React.FC<Props> = ({ className, title }) => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { data } = useGetNotitficationsQuery({ page: 1 })

  const unreaded = useMemo(() => {
    return data?.data.reduce((sum, curr) => sum + (!curr.readAt ? 1 : 0), 0)
  }, [data])

  const handleSettings = () => {
    navigation.navigate("setting")
  }

  const handleNotifications = () => {
    navigation.navigate("main-notifications")
  }

  return (
    <DmView>
      {!!title && (
        <DmView className="px-[16] py-[10] absolute w-full">
          <DmView className="flex-1 items-center justify-center">
            <DmText className="text-16 leading-[19px] font-custom600">
              {title}
            </DmText>
          </DmView>
        </DmView>
      )}
      <DmView
        className={clsx(
          "pl-[14] pr-[16] py-[10] flex-row items-center justify-between",
          { "flex-row-reverse": !!title },
          className
        )}
      >
        {!title && (
          <DmView className="flex-row items-center">
            <LogoIcon width={27} height={27} />
            <DmText className="ml-[8] text-18 leading-[25px] text-white font-custom600">
              {t("tappler")}
            </DmText>
          </DmView>
        )}
        <DmView className="flex-row items-center">
          <DmView onPress={handleNotifications}>
            <BellIcon fill={!title ? colors.white : colors.grey2} />
            {!!unreaded && (
              <DmView className="absolute top-[-8] right-[-8] bg-red rounded-full w-[20] h-[20] items-center justify-center">
                <DmText className="text-13 leading-[16px] text-white font-custom700 text-right">
                  {data?.data.reduce(
                    (sum, curr) => sum + (!curr.readAt ? 1 : 0),
                    0
                  )}
                </DmText>
              </DmView>
            )}
          </DmView>
          <DmView className="ml-[24]" onPress={handleSettings}>
            <SettingsIcon fill={!title ? colors.white : colors.grey30} />
          </DmView>
        </DmView>
      </DmView>
    </DmView>
  )
}

export default HeaderDashboard

import React, { useState } from "react"

import { DmText, DmView } from "components/UI"
import { Switch } from "react-native-switch"
import { useTranslation } from "react-i18next"
import colors from "styles/colors"
import styles from "./styles"

interface Props {
  title: string
  subtitle: string
}

const NotificationsSwitchComponent: React.FC<Props> = ({ title, subtitle }) => {
  const [toggleValue, setToggleValue] = useState(false)
  const { t } = useTranslation()
  return (
    <DmView className="flex-row justify-between pl-[15] pr-[19] py-[12] border-b-1 border-grey4">
      <DmView>
        <DmText className="text-13 leading-[16px] font-custom600 text-black">
          {title}
        </DmText>
        <DmText className="text-11 leading-[14px] font-custom400 text-grey43">
          {subtitle}
        </DmText>
      </DmView>
      <DmView>
        <Switch
          value={toggleValue}
          onValueChange={setToggleValue}
          disabled={false}
          circleSize={28}
          barHeight={31}
          backgroundActive={colors.red3}
          backgroundInactive={colors.grey43}
          circleActiveColor={colors.white}
          circleInActiveColor={colors.white}
          changeValueImmediately={true}
          innerCircleStyle={styles.innerCircle}
          renderActiveText={false}
          renderInActiveText={false}
          switchLeftPx={(51 / 31) + 2.1}
          switchRightPx={(51 / 31) + 2.1}
          switchWidthMultiplier={51 / 31}
          switchBorderRadius={30}
        />
      </DmView>
    </DmView>
  )
}

export default NotificationsSwitchComponent

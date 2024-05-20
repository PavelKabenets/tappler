import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"
import HomeIcon from "assets/icons/home.svg"
import HomeActiveIcon from "assets/icons/home-active.svg"
import LeadsIcon from "assets/icons/leads.svg"
import LeadsActiveIcon from "assets/icons/leads-active.svg"
import OpportunitiesIcon from "assets/icons/opportunities.svg"
import OpportunitiesActiveIcon from "assets/icons/opportunities-active.svg"
import MessagesIcon from "assets/icons/messages.svg"
import MessagesActiveIcon from "assets/icons/messages-active.svg"

interface Props {
  type: "home" | "leads" | "opportunities" | "messages"
  focused: boolean
}

const RenderTabBarIcon: React.FC<Props> = ({ type, focused }) => {
  const renderIcon = () => {
    switch (type) {
      case "home": {
        if (focused) {
          return <HomeActiveIcon />
        }

        return <HomeIcon />
      }
      case "leads": {
        if (focused) {
          return <LeadsActiveIcon />
        }

        return <LeadsIcon />
      }

      case "messages": {
        if (focused) {
          return <MessagesActiveIcon />
        }

        return <MessagesIcon />
      }

      case "opportunities": {
        if (focused) {
          return <OpportunitiesActiveIcon />
        }

        return <OpportunitiesIcon />
      }
    }
  }
  return (
    <DmView className="w-[22] h-[22] items-center justify-center">
      {renderIcon()}
    </DmView>
  )
}

export default RenderTabBarIcon

import React from "react"

import colors from "styles/colors"
import ActiveDefenceIcon from "assets/icons/active-defence.svg"
import InActiveDefenceIcon from "assets/icons/non-active-account.svg"
import VacantionIcon from "assets/icons/vacation.svg"
import SuspendIcon from "assets/icons/suspended.svg"

export default (
  status:
    | "active"
    | "inactive"
    | "pendingInterview"
    | "suspended"
    | "vacation"
    | string
    | undefined
) => {
  switch (status) {
    case "active":
      return <ActiveDefenceIcon />

    case "inactive":
      return <InActiveDefenceIcon />

    case "suspended":
      return <SuspendIcon />

    case "vacation":
      return <VacantionIcon />
    default:
      return <InActiveDefenceIcon />
  }
}

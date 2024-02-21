import { Linking } from "react-native"
import logger from "./logger"
import * as config from "config"

// import config from 'config'
// import { isIOs } from 'styles/helpers'

export const openUrl = async (url: string) => {
  try {
    await Linking.openURL(url)
  } catch (e) {
    logger.log("Open url error", e)
  }
}

export const openLegalLink = (type: "terms" | "privacy") => {
  openUrl(type === "terms" ? config.TERMS_LINK : config.PRIVACY_LINK)
}

// export const goToAppMarket = async () => {
//   await openUrl(isIOs ? config.IOS_APP_LINK : config.ANDROID_APP_LINK)
// }

// export const openPrivacyAndTerms = (type: 'privacy' | 'terms') => {
//   openUrl(type === 'privacy' ? config.PRIVACY_LINK : config.TERMS_LINK)
// }

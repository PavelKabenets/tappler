import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import * as RNLocalize from "react-native-localize"

import en from "./en.json"
import ar from "./ar.json"
import moment from "moment"

const translates = {
  en,
  ar,
}

const fallback = { languageTag: "en", isRTL: true }

const { languageTag, isRTL } =
  RNLocalize.findBestLanguageTag(Object.keys(translates)) || fallback

i18n.use(initReactI18next).init({
  lng: languageTag,
  compatibilityJSON: "v3",
  fallbackLng: fallback.languageTag,
  resources: translates,
  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },
})

moment.locale(languageTag)

export const deviceLocale = languageTag
export const isMetrickSystem = RNLocalize.usesMetricSystem()
export const temperatureUnit = RNLocalize.getTemperatureUnit()
export const is24timeForamt = RNLocalize.uses24HourClock()

export const getI18nArrayString = (key: string) => {
  const keyObj = i18n.t(key, { returnObjects: true })

  if (Array.isArray(keyObj)) {
    return keyObj as Array<string>
  }

  return []
}

export default i18n

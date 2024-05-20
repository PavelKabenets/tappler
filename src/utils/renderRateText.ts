import { TFunction } from "i18next"

export const renderRateText = (rate: number, t: TFunction) => {
  if (rate.toFixed(1) === Number(5).toFixed(1)) {
    return t("excellent")
  }
  if (!rate) {
    return t("")
  }

  if (rate.toFixed(0) < Number(1).toFixed(1)) {
    return t("poor")
  }

  if (rate.toFixed(1) < Number(2).toFixed(1)) {
    return t("poor")
  }

  if (rate.toFixed(1) < Number(3).toFixed(1)) {
    return t("below_average")
  }

  if (rate.toFixed(1) < Number(4).toFixed(1)) {
    return t("average")
  }

  if (rate.toFixed(1) < Number(5).toFixed(1)) {
    return t("good")
  }
}

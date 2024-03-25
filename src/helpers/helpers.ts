import { Dimensions } from "react-native"

export const SCREEN_WIDTH = Dimensions.get("screen").width
export const SCREEN_HEIGHT = Dimensions.get("screen").height
export const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/

export const isSmallPhone = SCREEN_WIDTH < 393

export const isLittlePhone = SCREEN_WIDTH < 375

export const hexToRGBA = (hexCode: string, opacity: number) => {
  let hex = hexCode.replace("#", "")

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

const renderSansFontFamily = (
  className: string
):
  | {
      fontFamily: string
      lineHeight?: number
    }
  | undefined => {
  let res = {}
  switch (
    className?.match(/custom(\d{3})/) &&
    className?.match(/custom(\d{3})/)![1]
  ) {
    // Add fonts here
    case "700":
      res = {
        fontFamily: "TheSans-Bold",
      }
      break

    case "600":
      res = {
        fontFamily: "TheSans-Bold",
      }
      break

    case "500":
      res = {
        fontFamily: "TheSans-Plain",
      }
      break

    case "400":
      res = {
        fontFamily: "TheSans-Plain",
      }
      break
  }

  if (
    className?.match(/leading-\[(\d{1,2})px\]/) &&
    className?.match(/leading-\[(\d{1,2})px\]/)![1]
  ) {
    res = {
      ...res,
      lineHeight:
        Number(className?.match(/leading-\[(\d{1,2})px\]/)![1]) * 1.32,
    }
  }

  return res as {
    fontFamily: string
    lineHeight?: number
  }
}

const renderMontserratFontFamily = (className: string) => {
  switch (
    className?.match(/custom(\d{3})/) &&
    className?.match(/custom(\d{3})/)![1]
  ) {
    case "700":
      return {
        fontFamily: "Montserrat-Bold",
      }
    case "600":
      return {
        fontFamily: "Montserrat-SemiBold",
      }

    case "500":
      return {
        fontFamily: "Montserrat-Medium",
      }

    case "400":
      return {
        fontFamily: "Montserrat-Regular",
      }
  }
}

export const takeFontFamily = (font: string, lng: string) => {
  if (lng === "en") {
    return renderMontserratFontFamily(font)
  }
  if (lng === "ar") {
    return renderSansFontFamily(font)
  }
}

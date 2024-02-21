import { Dimensions } from "react-native"

export const SCREEN_WIDTH = Dimensions.get("screen").width
export const SCREEN_HEIGHT = Dimensions.get("screen").height
export const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/

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

const renderSansFontFamily = (className: string) => {
  switch (className?.match(/custom(\d{3})/)![1]) {
    // Add fonts here
    case "700":
      return {
        fontFamily: "TheSans-Bold",
      }

    case "600":
      return {
        fontFamily: "TheSans-SemiBold",
      }

    case "500":
      return {
        fontFamily: "TheSans-Regular",
      }

    case "400":
      return {
        fontFamily: "TheSans-Regular",
      }
  }
}

const renderMontserratFontFamily = (className: string) => {
  switch (className?.match(/custom(\d{3})/)![1]) {
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
    if (font.match(/custom(\d{3})/)) {
      return renderMontserratFontFamily(font)
    }
  }
  if (lng === "ar") {
    if (font.match(/custom(\d{3})/)) {
      return renderSansFontFamily(font)
    }
  }
}

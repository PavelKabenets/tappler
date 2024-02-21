import { SetStateAction, Dispatch } from "react"

export const renderSansFontFamily = (
  className: string,
  setStylesFontFamilyState: Dispatch<SetStateAction<{ fontFamily: string }>>
) => {
  switch (className?.match(/custom(\d{3})/)![1]) {
    // Add fonts here
    case "700":
      setStylesFontFamilyState({
        fontFamily: "TheSans-Bold",
      })
      break
    case "600":
      setStylesFontFamilyState({
        fontFamily: "TheSans-SemiBold",
      })
      break
    case "500":
      setStylesFontFamilyState({
        fontFamily: "TheSans-Regular",
      })
      break
    case "400":
      setStylesFontFamilyState({
        fontFamily: "TheSans-Regular",
      })
      break
  }
}

export const renderMontserratFontFamily = (
  className: string,
  setStylesFontFamilyState: Dispatch<SetStateAction<{ fontFamily: string }>>
) => {
  switch (className?.match(/custom(\d{3})/)![1]) {
    case "700":
      setStylesFontFamilyState({
        fontFamily: "Montserrat-Bold",
      })
      break
    case "600":
      setStylesFontFamilyState({
        fontFamily: "Montserrat-SemiBold",
      })
      break
    case "500":
      setStylesFontFamilyState({
        fontFamily: "Montserrat-Medium",
      })
      break
    case "400":
      setStylesFontFamilyState({
        fontFamily: "Montserrat-Regular",
      })
      break
  }
}

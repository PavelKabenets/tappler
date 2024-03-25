import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"

const lottieWidth = SCREEN_WIDTH - 114

export default StyleSheet.create({
  lottie: {
    width: lottieWidth,
    height: lottieWidth / 0.75,
  }
})

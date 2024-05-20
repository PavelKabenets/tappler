import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"
import colors from "styles/colors"

export default StyleSheet.create({
  img: {
    width: SCREEN_WIDTH - 102,
    height: (SCREEN_WIDTH - 102) / 1.5,
  },
})

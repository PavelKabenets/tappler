import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"
import colors from "styles/colors"

export default StyleSheet.create({
  goBackEmpty: {
    width: 40,
    height: 40,
  },
  logoEmpty: {
    width: 20,
    height: 20,
  },
  bigIconEmpty: {
    width: SCREEN_WIDTH - 36,
    height: (SCREEN_WIDTH - 36) / 1.5,
  },
  socialEmpty: {
    width: 26,
    height: 26,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 27,
    justifyContent: "space-between",
  },
})

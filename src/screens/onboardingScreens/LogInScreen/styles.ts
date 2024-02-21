import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"
import colors from "styles/colors"

export default StyleSheet.create({
  goBackEmpty: {
    width: 40,
    height: 40,
    backgroundColor: colors.grey,
  },
  logoEmpty: {
    width: 20,
    height: 20,
    backgroundColor: colors.grey,
  },
  bigIconEmpty: {
    width: SCREEN_WIDTH - 36,
    height: (SCREEN_WIDTH - 36) / 1.5,
    backgroundColor: colors.grey,
  },
  socialEmpty: {
    width: 26,
    height: 26,
    backgroundColor: colors.grey,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 27,
    justifyContent: "space-between",
  },
})

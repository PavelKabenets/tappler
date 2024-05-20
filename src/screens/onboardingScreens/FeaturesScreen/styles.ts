import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"
import colors from "styles/colors"

export default StyleSheet.create({
  emptyImg: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    backgroundColor: colors.grey,
  },
  img: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  inverted: { flexDirection: "row-reverse", transform: [{ scaleX: -1 }] },
})

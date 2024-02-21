import { StyleSheet } from "react-native"
import colors from "styles/colors"

export default StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingBottom: 27,
    paddingHorizontal: 19,
    justifyContent: "space-between",
  },
  emptyGoBack: {
    width: 16,
    height: 16,
    backgroundColor: colors.grey,
  },
  emptyEye: {
    width: 24,
    height: 24,
    backgroundColor: colors.grey,
  },
})

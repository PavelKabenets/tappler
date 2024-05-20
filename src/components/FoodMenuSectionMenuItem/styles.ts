import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"
import colors from "styles/colors"

const iconWidth = SCREEN_WIDTH / 3.23

const styles = StyleSheet.create({
  img: {
    width: iconWidth,
    height: iconWidth,
    backgroundColor: colors.grey4,
    borderRadius: 5,
  },
})

export default styles

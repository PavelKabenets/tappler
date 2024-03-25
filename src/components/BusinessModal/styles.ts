import { SCREEN_WIDTH, isLittlePhone } from "helpers/helpers"
import { StyleSheet } from "react-native"
import colors from "styles/colors"

const itemWidth = SCREEN_WIDTH / 3.47

const styles = StyleSheet.create({
  item: {
    width: itemWidth,
  },
})

export default styles

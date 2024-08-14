import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"

const itemWidth = (SCREEN_WIDTH - 50) / 2

export default StyleSheet.create({
  item: {
    width: itemWidth,
  },
})

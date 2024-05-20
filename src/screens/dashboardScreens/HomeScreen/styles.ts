import { SCREEN_WIDTH, isSmallPhone } from "helpers/helpers"
import { StyleSheet } from "react-native"

const itemWidth = SCREEN_WIDTH / 1.45

export default StyleSheet.create({
  img: {
    width: itemWidth,
    height: itemWidth / 1.5,
  },
})

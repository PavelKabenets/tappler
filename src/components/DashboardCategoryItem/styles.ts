import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"

const itemWidth = (SCREEN_WIDTH - 34) / 2

const styles = StyleSheet.create({
  item: {
    width: itemWidth,
    height: itemWidth / 1.5,
  },
})

export default styles

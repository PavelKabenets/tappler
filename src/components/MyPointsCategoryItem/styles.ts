import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"

const itemWidth = (SCREEN_WIDTH - 48) / 3

const styles = StyleSheet.create({
  item: {
    width: itemWidth,
    height: itemWidth / 1.3,
  },
})

export default styles

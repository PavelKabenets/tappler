import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"

const itemWidth = (SCREEN_WIDTH - 48) / 4

const styles = StyleSheet.create({
  item: {
    width: itemWidth,
  },
})

export default styles

import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const itemWidth = (SCREEN_WIDTH - 60) / 3

const styles = StyleSheet.create({
  contentContainerStyle: { paddingTop: 30, paddingHorizontal: 14 },
  item: {
    width: itemWidth,
    height: itemWidth / 1.24,
  },
})

export default styles

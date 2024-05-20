import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const photoWidth = (SCREEN_WIDTH - 60) / 3

const styles = StyleSheet.create({
  img: {
    width: photoWidth,
    height: photoWidth / 1.24,
  },
})

export default styles

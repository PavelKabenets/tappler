import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"

const itemImgSize = (SCREEN_WIDTH - 50) / 4

const styles = StyleSheet.create({
  img: {
    width: itemImgSize,
    height: itemImgSize,
  },
})

export default styles

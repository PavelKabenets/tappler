import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"

const photoBtnWidth = SCREEN_WIDTH / 2.62
const photoBtnHeight = photoBtnWidth / 1.32

const styles = StyleSheet.create({
  photoBtn: {
    width: photoBtnWidth,
    height: photoBtnHeight,
  },
})

export default styles

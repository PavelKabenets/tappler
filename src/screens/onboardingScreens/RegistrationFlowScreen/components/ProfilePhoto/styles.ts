import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"

const photoBtnWidth = SCREEN_WIDTH / 2.62
const photoBtnHeight = photoBtnWidth / 1.32

const examplePhotoWidth = (SCREEN_WIDTH - 48) / 4 

const styles = StyleSheet.create({
  photoBtn: {
    width: photoBtnWidth,
    height: photoBtnHeight,
  },
  activePhoto: {
    width: photoBtnWidth,
    height: photoBtnWidth,
  },
  examplePhoto: {
    width: examplePhotoWidth,
    height: examplePhotoWidth / 1.06,
  },
  btnWrapper: {
    width: photoBtnWidth,
  },
})

export default styles

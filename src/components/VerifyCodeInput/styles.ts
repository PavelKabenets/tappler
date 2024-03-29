import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"

const inputSize = (SCREEN_WIDTH - 184) / 4

const styles = StyleSheet.create({
  shadowRounded: {
    borderRadius: 5,
  },
  input: {
    width: inputSize,
    height: inputSize,
  },
})

export default styles

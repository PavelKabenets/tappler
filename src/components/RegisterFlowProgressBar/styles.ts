import { SCREEN_WIDTH } from "helpers/helpers"
import { StyleSheet } from "react-native"

const disableStepSize = (SCREEN_WIDTH - 26 - 13 * 9) / 9
const activeStepSize = disableStepSize * 4.6

const styles = StyleSheet.create({
  item: {
    width: disableStepSize,
    height: disableStepSize,
  },
  activeStepSize: {
    width: activeStepSize,
    paddingHorizontal: disableStepSize / 2.3,
  },
})

export default styles

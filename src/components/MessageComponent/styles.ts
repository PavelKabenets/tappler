import { StyleSheet } from "react-native"
import { hexToRGBA } from "helpers/helpers"
import colors from "styles/colors"

export default StyleSheet.create({
  tail: {
    position: "absolute",
    bottom: 0,
    left: -20,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderLeftColor: "transparent",
    borderRightWidth: 20,
    borderRightColor: "transparent",
    borderBottomWidth: 15,
    borderBottomColor: "white",
  },

  myMessageTail: {
    left: "auto",
    right: -20,
    top: 0,
    borderRightWidth: 0,
    borderBottomColor: hexToRGBA(colors.grey50, 0.25),
    transform: [{ rotate: "180deg" }],
  },
})

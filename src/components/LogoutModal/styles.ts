import { StyleSheet } from "react-native"
import colors from "styles/colors"

const styles = StyleSheet.create({
  dropdownStyles: {
    margin: 0,
    position: "absolute",
    width: "100%",
    backgroundColor: colors.white,
    top: 20,
    borderRadius: 0,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: colors.black,
  },
  boxStyles: {
    height: 30,
    alignItems: "center",
    flexDirection: "row-reverse",
    paddingRight: 10,
    paddingLeft: 15,
    borderRadius: 3,
    paddingVertical: 0,
    paddingTop: 2,
    borderColor: colors.black,
  },
  dropdownItemStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 15,
  },
  input: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20,
    color: colors.black,
    fontFamily: "TheSans-Regular",
    marginLeft: 4,
  },
  dropdownTextItemStyle: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.black,
    fontFamily: "TheSans-Regular",
  },
})

export default styles

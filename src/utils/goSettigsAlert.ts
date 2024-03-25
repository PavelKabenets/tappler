import { openSettings } from "react-native-permissions"

import { Alert } from "react-native"

export const openAlert = ({
  title,
  descr,
  btnText,
  cancelText,
}: {
  title: string
  descr: string
  btnText: string
  cancelText: string
}) => {
  Alert.alert(title, descr, [
    { text: cancelText, style: "cancel" },
    { text: btnText, onPress: () => openSettings() },
  ])
}

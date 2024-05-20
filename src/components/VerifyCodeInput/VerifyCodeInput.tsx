import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react"

import { DmText, DmView } from "components/UI"
import { I18nManager, TextInput } from "react-native"
import { Shadow } from "react-native-shadow-2"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import colors from "styles/colors"
import { hexToRGBA, takeFontFamily } from "helpers/helpers"
import clsx from "clsx"

interface Props {
  className?: string
  setCodeValue: Dispatch<SetStateAction<string>>
  initialValue?: string
}

const VerifyCodeInput: React.FC<Props> = ({
  className,
  initialValue,
  setCodeValue,
}) => {
  const [value, setValue] = useState(initialValue || "")
  const [prevValue, setPrevValue] = useState("")

  const firstInputRef = useRef<TextInput>(null)
  const secondInputRef = useRef<TextInput>(null)
  const thirdInputRef = useRef<TextInput>(null)
  const fourInputRef = useRef<TextInput>(null)

  const { i18n } = useTranslation()

  const handleChangeValue = (val: string, idx: number) => {
    setValue((prev) => {
      const newArr = prev.split("")
      newArr[idx] = val

      return newArr.join("").length < 5 ? newArr.join("") : value
    })
  }

  useEffect(() => {
    if (prevValue.length > value.length) {
      switch (prevValue.length) {
        case 1:
          firstInputRef.current?.blur()
          break
        case 2:
          firstInputRef.current?.focus()
          break
        case 3:
          secondInputRef.current?.focus()
          break
        case 4:
          thirdInputRef.current?.focus()
          break
      }
    } else {
      switch (value.length) {
        case 0:
          firstInputRef.current?.focus()
          break
        case 1:
          secondInputRef.current?.focus()
          break
        case 2:
          thirdInputRef.current?.focus()
          break
        case 3:
          fourInputRef.current?.focus()
          break
        case 4:
          fourInputRef.current?.blur()
          break
      }
    }
    setPrevValue(value)
    setCodeValue(value)
  }, [value])

  return (
    <DmView
      className={clsx(
        "flex-row justify-between w-full",
        I18nManager.isRTL && "flex-row-reverse",
        className
      )}
    >
      <Shadow
        style={styles.shadowRounded}
        startColor={hexToRGBA(colors.red, 0.35)}
        distance={5}
      >
        <DmView className="border-0.7 border-red rounded-5">
          <TextInput
            ref={firstInputRef}
            style={[
              styles.input,
              takeFontFamily("font-custom500 leading-[26px]", i18n.language),
            ]}
            className={clsx("text-20")}
            value={value[0]}
            onChangeText={(val) => handleChangeValue(val, 0)}
            textAlign="center"
            textAlignVertical="center"
            keyboardType="numeric"
            returnKeyType={"done"}
          />
        </DmView>
      </Shadow>
      <Shadow
        style={styles.shadowRounded}
        startColor={hexToRGBA(colors.red, 0.35)}
        distance={5}
      >
        <DmView className="border-0.7 border-red rounded-5">
          <TextInput
            ref={secondInputRef}
            style={[
              styles.input,
              takeFontFamily("font-custom500 leading-[26px]", i18n.language),
            ]}
            className={clsx("text-20")}
            value={value[1]}
            onChangeText={(val) => handleChangeValue(val, 1)}
            textAlign="center"
            textAlignVertical="center"
            keyboardType="numeric"
          />
        </DmView>
      </Shadow>
      <Shadow
        style={styles.shadowRounded}
        startColor={hexToRGBA(colors.red, 0.35)}
        distance={5}
      >
        <DmView className="border-0.7 border-red rounded-5">
          <TextInput
            ref={thirdInputRef}
            style={[
              styles.input,
              takeFontFamily("font-custom500 leading-[26px]", i18n.language),
            ]}
            className={clsx("text-20")}
            value={value[2]}
            onChangeText={(val) => handleChangeValue(val, 2)}
            textAlign="center"
            textAlignVertical="center"
            keyboardType="numeric"
          />
        </DmView>
      </Shadow>
      <Shadow
        style={styles.shadowRounded}
        startColor={hexToRGBA(colors.red, 0.35)}
        distance={5}
      >
        <DmView className="border-0.7 border-red rounded-5">
          <TextInput
            ref={fourInputRef}
            className={clsx("text-20")}
            style={[
              styles.input,
              takeFontFamily("font-custom500 leading-[26px]", i18n.language),
            ]}
            value={value[3]}
            onChangeText={(val) => handleChangeValue(val, 3)}
            textAlign="center"
            textAlignVertical="center"
            keyboardType="numeric"
          />
        </DmView>
      </Shadow>
    </DmView>
  )
}

export default VerifyCodeInput

import React from "react"

import { DmText } from "components/UI"

import styles from "./styles"
import MainModal from "components/MainModal"
import { useTypedSelector } from "store"
import { ActivityIndicator } from "react-native"
import colors from "styles/colors"
import { hexToRGBA } from "helpers/helpers"

interface Props {
  //
}

const LoadingModal: React.FC<Props> = (props) => {
  const { isLoadingModalVisible } = useTypedSelector((store) => store.auth)
  return (
    <MainModal
      isVisible={!!isLoadingModalVisible}
      onClose={() => null}
      classNameWrapperHight="self-center"
      className="pl-[23] pr-[22] pt-[23] pb-[22] items-center bg-transparent"
      styleHightWrapper={{ backgroundColor: hexToRGBA(colors.white, 0.5) }}
    >
      <ActivityIndicator color={colors.red} size="large" />
    </MainModal>
  )
}

export default LoadingModal

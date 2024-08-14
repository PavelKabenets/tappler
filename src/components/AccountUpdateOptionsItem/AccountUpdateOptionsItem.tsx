import React from "react"

import { DmChecbox, DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import { useTypedSelector } from "store"
import { Image } from "react-native"

interface Props {
  title: string
  descr: string
  children?: React.ReactNode
  className?: string
  isCheckbox?: boolean
  isChecked?: boolean
  isFeatured?: boolean
  isBorderVisible?: boolean
  onPress: () => void
  onLearnMorePress: () => void
}

const AccountUpdateOptionsItem: React.FC<Props> = ({
  title,
  descr,
  children,
  className,
  isCheckbox,
  isChecked,
  isFeatured,
  isBorderVisible = true,
  onPress,
  onLearnMorePress,
}) => {
  const { user } = useTypedSelector((store) => store.auth)
  const { t } = useTranslation()
  return (
    <DmView>
      <DmView
        className={clsx("pt-[15] pb-[15] px-[20]", className)}
        onPress={onPress}
      >
        <DmView className="flex-row justify-between pr-[12]">
          <DmView className="flex-1 flex-row items-start">
            {isCheckbox && <DmChecbox isChecked={isChecked} variant="square" />}
            <DmView className="flex-1">
              <DmView className="flex-row items-center justify-between">
                <DmView>
                  <DmView className="flex-row items-center">
                    <DmText className="text-14 leading-[18px] font-custom600">
                      {title}
                    </DmText>
                    <DmView
                      className="mx-[15]"
                      onPress={onLearnMorePress}
                      hitSlop={HIT_SLOP_DEFAULT}
                    >
                      <DmText className="text-12 leading-[15px] font-custom600 text-red">
                        {t("learn_more")}
                      </DmText>
                    </DmView>
                  </DmView>
                  <DmView>
                    <DmText className="mt-[6] text-13 leading-[20px] font-custom400">
                      {descr}
                    </DmText>
                  </DmView>
                </DmView>
                {isFeatured && (
                  <DmView className="flex justify-between items-center">
                    <DmView className="w-[86] h-[66] rounded-5">
                      <Image
                        source={{
                          uri: user?.profilePhoto,
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 5,
                        }}
                      />
                    </DmView>
                    <DmView className="absolute top-[-15]">
                      <DmView className="h-[18] px-[4] rounded-2 bg-yellow items-center justify-center border-0.5 border-grey2">
                        <DmText className="text-10 leading-[13px] font-custom600">
                          {t("featured")}
                        </DmText>
                      </DmView>
                    </DmView>
                  </DmView>
                )}
              </DmView>
              {!!children && (
                <DmView className="bg-pink4 mt-[8] flex-row px-[15] h-[31] border-0.3 border-grey2 rounded-5 justify-center items-center">
                  {children}
                </DmView>
              )}
            </DmView>
          </DmView>
        </DmView>
      </DmView>
      {isBorderVisible && (
        <DmView className="h-[0.4] ml-[14] mr-[16] bg-grey31" />
      )}
    </DmView>
  )
}

export default AccountUpdateOptionsItem

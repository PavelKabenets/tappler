import React from "react"

import { DmChecbox, DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"

interface Props {
  title: string
  descr: string
  children?: React.ReactNode
  className?: string
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
  isChecked,
  isFeatured,
  isBorderVisible = true,
  onPress,
  onLearnMorePress,
}) => {
  const { t } = useTranslation()
  return (
    <DmView>
      <DmView
        className={clsx("pt-[15] pb-[15] pl-[15]", className)}
        onPress={onPress}
      >
        <DmView className="flex-row justify-between pr-[12]">
          <DmView className="flex-1 flex-row items-start">
            <DmChecbox isChecked={isChecked} variant="square" />
            <DmView className="flex-1">
              <DmView className="flex-row items-center justify-between pr-[8]">
                <DmView className="flex-row items-center">
                  <DmText className="text-14 leading-[18px] font-custom600">
                    {title}
                  </DmText>
                  {isFeatured && (
                    <DmView className="ml-[10] h-[18] px-[4] rounded-2 bg-yellow items-center justify-center border-0.5 border-grey2">
                      <DmText className="text-10 leading-[13px] font-custom600">
                        {t("featured")}
                      </DmText>
                    </DmView>
                  )}
                </DmView>
                <DmView onPress={onLearnMorePress} hitSlop={HIT_SLOP_DEFAULT}>
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
              {!!children && (
                <DmView className="mt-[8] flex-row px-[15] h-[31] border-0.3 border-grey2 rounded-5 justify-center items-center">
                  {children}
                </DmView>
              )}
            </DmView>
          </DmView>
        </DmView>
      </DmView>
      {isBorderVisible && <DmView className="h-[0.4] mr-[25] bg-grey31" />}
    </DmView>
  )
}

export default AccountUpdateOptionsItem

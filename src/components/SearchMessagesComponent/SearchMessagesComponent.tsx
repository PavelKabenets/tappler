import React from "react"
// Components
import { DmInput, DmText, DmView } from "components/UI"
// Hooks & Redux
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
// Helpers & Types

// Libs & Utils

// Styles & Assets
import styles from "./styles"
import SearchIcon from "assets/icons/search-red.svg"

interface Props {
  searchText: string
  onChangeText: (text: string) => void
}

const SearchMessagesComponent: React.FC<Props> = ({ searchText, onChangeText }) => {
  const { t } = useTranslation()
  const { control } = useForm({
    defaultValues: {
      searching: searchText,
    },
  })
  return (
    <DmView className="px-[15]">
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <DmInput
            isAnimText={false}
            Icon={<SearchIcon />}
            className="h-[39] bg-grey52 border-0.2"
            inputClassName="text-15 leading-[19px]"
            value={searchText}
            placeholder={t("search_messages")}
            onChangeText={(text) => {
              onChange(text)
              onChangeText(text)
            }}
          />
        )}
        name="searching"
      />
    </DmView>
  )
}

export default SearchMessagesComponent

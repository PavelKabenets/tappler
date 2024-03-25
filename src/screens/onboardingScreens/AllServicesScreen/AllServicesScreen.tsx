import React, { useMemo, useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import AllServicesItem from "components/AllServicesItem"
import AllServicesSubItem from "components/AllServicesSubItem"
import HeaderOnboarding from "components/HeaderOnboarding"
import { ActivityIndicator, FlatList, ScrollView } from "react-native"
import AllServicesModal from "components/AllServicesModal"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useGetServicesQuery } from "services/api"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { ServiceCategoryType } from "types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import SearchRedIcon from "assets/icons/search-red.svg"
import CloseIcon from "assets/icons/close.svg"
import colors from "styles/colors"

type Props = RootStackScreenProps<"all-services">

const AllServicesScreen: React.FC<Props> = ({ navigation }) => {
  const [isSearchModalVisible, setSearchModalVisible] = useState(false)
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const handleItemPress = (item: ServiceCategoryType) => {
    navigation.navigate("service-detail", { service: item })
  }

  const { data, isFetching } = useGetServicesQuery()

  const handleSearchPress = () => {
    setSearchModalVisible(true)
  }

  const hadnleCloseModal = () => {
    setSearchModalVisible(false)
  }

  const handleGoRequestAddingService = () => {
    navigation.navigate("request-adding-service")
  }

  const renderListItem = ({ item }: { item: ServiceCategoryType }) => {
    return <AllServicesItem item={item} onPress={handleItemPress} />
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={t("new_account")}
        className="px-[20]"
        Icon={<SearchRedIcon />}
        onPressIcon={handleSearchPress}
        onBackComponent={<CloseIcon />}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollView,
          { marginBottom: insets.bottom > 30 ? 0 : 30 - insets.bottom },
        ]}
      >
        {isFetching && (
          <DmView className="mt-[14]">
            <ActivityIndicator color={colors.red} />
          </DmView>
        )}
        <FlatList
          data={data?.data}
          renderItem={renderListItem}
          scrollEnabled={false}
          ListFooterComponent={
            !isFetching ? (
              <AllServicesItem
                item={{
                  name: t("dont_see_your_service_tap_here"),
                  id: 12312399999,
                  categories: [],
                }}
                variant="red"
                className="border-b-0"
                onPress={handleGoRequestAddingService}
              />
            ) : null
          }
        />
      </ScrollView>
      <AllServicesModal
        isVisible={isSearchModalVisible}
        onClose={hadnleCloseModal}
      />
    </SafeAreaView>
  )
}

export default AllServicesScreen

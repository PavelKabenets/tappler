import React, { useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import MyAccountEditComponent from "components/MyAccountEditComponent"
import MainModal from "components/MainModal"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useTypedSelector } from "store"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import styles from "./styles"
import DeleteIcon from "assets/icons/delete.svg"
import CloseBigIcon from "assets/icons/close-big.svg"
import { ScrollView } from "react-native"

type Props = RootStackScreenProps<"my-account">

const MyAccountScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useTypedSelector((store) => store.auth)
  // Props
  // State
  // Global Store
  // Variables
  const { t } = useTranslation()
  const [isModalPasswordVisible, setModalPasswordVisible] = useState(false)
  const handleOpenModalPassword = () => {
    setModalPasswordVisible(true)
  }
  const handleHideModalPassword = () => {
    setModalPasswordVisible(false)
  }
  const handleCloseModalPassword = () => {
    setModalPasswordVisible(false)
    navigation.navigate("my-account-change-password")
  }
  const [isModalDeleteVisible, setModalDeleteVisible] = useState(false)
  const handleOpenModalDelete = () => {
    setModalDeleteVisible(true)
  }
  const handleHideModalDelete = () => {
    setModalDeleteVisible(false)
  }
  const handleCloseModalDelete = () => {
    setModalDeleteVisible(false)
    navigation.navigate("my-account")
  }
  // Refs
  // Methods
  // Handlers
  const handleGoMyAccountDetails = () => {
    navigation.navigate("my-account-details")
  }
  const handleGoMyAccountType = () => {
    navigation.navigate("my-account-type")
  }
  const handleGoMyAccountEmail = () => {
    navigation.navigate("my-account-email")
  }
  const handleGoMyAccountAddress = () => {
    navigation.navigate("my-account-address")
  }
  const handleGoMyAccountPhoneNumber = () => {
    navigation.navigate("my-account-phone-number")
  }
  function formatPhoneNumber(phoneNumber: any) {
    const withoutCountryCode = phoneNumber.slice(3)
    const firstPart = withoutCountryCode.slice(0, 3)
    const lastPart = withoutCountryCode.slice(-4)
    return `${firstPart}****${lastPart}`
  }
  // Hooks
  // Listeners
  // Render Methods
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding isChevron className="px-[15] border-b-0" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <DmText className="text-25 leading-[30px] text-black font-custom600 pt-[7] px-[22] pb-[20]">
          {t("my_account")}
        </DmText>
        <MyAccountEditComponent
          onPress={handleGoMyAccountDetails}
          title={t("account_details")}
          button={t("edit")}
          descr={user?.registeredName || ""}
        />
        <MyAccountEditComponent
          onPress={handleGoMyAccountType}
          title={t("account_type")}
          button={t("edit")}
          descr={t(user?.proType || "")}
        />
        <MyAccountEditComponent
          onPress={handleGoMyAccountAddress}
          title={t("my_address")}
          button={t("edit")}
          descr={t("your_address_details")}
        />
        <MyAccountEditComponent
          onPress={handleGoMyAccountEmail}
          classNameDescr="text-13 leading-[20] text-grey44"
          title={t("email")}
          button={t("add")}
          descr={t("add_change_your_email_address")}
        />
        <MyAccountEditComponent
          onPress={handleGoMyAccountPhoneNumber}
          classNameDescr="text-13 leading-[20] text-grey44"
          title={t("phone_number")}
          button={t("edit")}
          descr={t("phone_number_descr", {
            number: user ? formatPhoneNumber(user.mobileNumber) : "",
          })}
        />
        <MyAccountEditComponent
          onPress={handleOpenModalPassword}
          classNameDescr="text-13 leading-[20] text-grey44"
          title={t("change_my_password")}
          button={t("edit")}
          descr={t("change_your_login_password")}
        />
        <MyAccountEditComponent
          onPress={handleOpenModalDelete}
          classNameDescr="text-13 leading-[20] text-grey44"
          last={true}
          title={t("delete_my_account")}
          button={t("delete")}
          descr={t("delete_my_account_descr")}
        />
        <MainModal
          isVisible={isModalPasswordVisible}
          Icon={
            <DmView className="rounded-full bg-grey25 p-[3] mt-[10]">
              <CloseBigIcon />
            </DmView>
          }
          onClose={handleHideModalPassword}
          title={t("can't_change_password")}
          className="px-[5] pt-[18] pb-[25]"
          classNameTitle="mt-[20] text-20 leading-[24px] font-custom600"
          classNameDescr="mt-[10] text-13 leading-[20px] font-custom400"
          titleBtn={t("OK")}
          classNameActionBtnText="text-13 leading-[16px] font-custom400"
          classNameBtnsWrapper="mx-[40]"
          classNameBtn="mt-[22]"
          onPress={handleCloseModalPassword}
          descr={t("changing_your_password_is_not_possible")}
        />
        <MainModal
          isVisible={isModalDeleteVisible}
          Icon={
            <DmView className="ml-[7]">
              <DeleteIcon />
            </DmView>
          }
          isBtnsTwo
          classNameBtns="mt-[28] h-[40]"
          classNameModal="px-[17]"
          onClose={handleHideModalDelete}
          title={t("delete_your_account")}
          classNameTitle="mt-[17] text-13 leading-[25px] font-custom600"
          classNameDescr="mt-[5] text-13 leading-[20px] font-custom400"
          titleBtn={t("delete")}
          classNameBtnsWrapper="mx-[15]"
          onPress={handleCloseModalDelete}
          descr={t(
            "if_you_delete_your_account_you_will_not_be_able_to_retrieve_your_data"
          )}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default MyAccountScreen

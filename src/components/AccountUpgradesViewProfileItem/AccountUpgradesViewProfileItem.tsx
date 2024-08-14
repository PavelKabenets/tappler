import React, { useEffect, useState } from "react"

import { DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"
import { ProsServicesCategoriesResponse } from "services"
import { ServiceLocationAreasType, ServiceLocationType } from "types"
import clsx from "clsx"
import styles from "./styles"
import colors from "styles/colors"

interface Props {
  item: ProsServicesCategoriesResponse
}

const AccountUpgradesViewProfileItem: React.FC<Props> = ({ item }) => {
  const [locationInfo, setLocationInfo] = useState<{
    serviceLocationAreas: ServiceLocationAreasType[]
    serviceLocationType: ServiceLocationType | null
  }>({
    serviceLocationAreas: [],
    serviceLocationType: null,
  })

  const { t } = useTranslation()

  useEffect(() => {
    const serviceLocationAreas = item.placeOfService.filter(
      (service) => service.serviceLocationAreas
    )[0]

    const serviceLocationType = item.placeOfService.find(
      (service) => service.serviceLocationType
    )?.serviceLocationType

    setLocationInfo({
      serviceLocationType: serviceLocationType || null,
      serviceLocationAreas: serviceLocationAreas?.serviceLocationAreas,
    })
  }, [item])

  return (
    <>
      <DmView className="pt-[11] pb-[26] px-[16] border-b-1 border-grey53 mr-[16]">
        <DmText className="mt-[10] text-13 leading-[16px] font-custom600 text-red">
          {item.serviceCategory.name}
        </DmText>
        <DmView>
          {item.questionsAnswers && (
            <DmView>
              <DmView className="flex-row items-center mt-[15]">
                <DmView className="bg-red rounded-full w-[8] h-[8]" />
                <DmText className="mx-[8] text-12 leading-[15px] font-custom600">
                  {t("useful_info_about_this_service")}
                </DmText>
              </DmView>
              {item.questionsAnswers.map((question, index) => (
                <React.Fragment key={index}>
                  <DmView className="px-[16] pt-[10]">
                    <DmText className="text-12 leading-[15px] font-custom400">
                      {question.question?.text}
                    </DmText>
                    <DmText className="text-12 leading-[15px] font-custom400">
                      {question.answer}
                    </DmText>
                  </DmView>
                </React.Fragment>
              ))}
            </DmView>
          )}
        </DmView>
        <DmView>
          <DmView className="flex-row items-center mt-[15] mb-[10]">
            <DmView className="bg-red rounded-full w-[8] h-[8]" />
            <DmText className="mx-[8] text-12 leading-[15px] font-custom600">
              {t("service_location")}
            </DmText>
          </DmView>
          {locationInfo.serviceLocationAreas &&
            locationInfo.serviceLocationType && (
              <DmView className="flex-row pr-[37]">
                <DmView className="bg-grey w-[10] h-[13]" />
                <DmText className="mx-[8] text-13 leading-[20px] font-custom400">
                  {"Customers receive the service at my location in"}{" "}
                  <DmText className="text-red5">
                    {locationInfo?.serviceLocationAreas?.map(
                      (area, i) => `${i !== 0 ? ", " : ""}"${t(area.city)}"`
                    )}
                  </DmText>{" "}
                  {"and my location is:"}{" "}
                  <DmText className="text-red5">
                    {t(locationInfo?.serviceLocationType || "")}
                  </DmText>
                </DmText>
              </DmView>
            )}
          {locationInfo.serviceLocationAreas && (
            <DmView className="mt-[12] pr-[37]">
              <DmView className="flex-row">
                <DmView className="bg-grey w-[10] h-[13]" />
                <DmText className="mx-[8] text-13 leading-[20px] font-custom400">
                  {t(
                    "i_travel_to_customer_site_or_3rd_party_site_on_selected_locations"
                  )}
                </DmText>
              </DmView>
              <DmView className="pl-[18]">
                {locationInfo?.serviceLocationAreas?.map((area, i) => (
                  <DmText
                    key={i}
                    className="mt-[10] text-12 leading-[15px] font-custom400"
                  >
                    {"-"} {t(area.city)}
                  </DmText>
                ))}
              </DmView>
            </DmView>
          )}
        </DmView>
        {item.placeOfService.some(
          (sItem) => sItem.place === "remoteOrOnline"
        ) && (
          <DmView className="flex-row mt-[15]">
            <DmView className="bg-grey w-[10] h-[13]" />
            <DmText className="mx-[8] text-13 leading-[16px] font-custom400">
              {t("i_provide_my_service_remotely_or_online")}
            </DmText>
          </DmView>
        )}
      </DmView>
    </>
  )
}

export default AccountUpgradesViewProfileItem

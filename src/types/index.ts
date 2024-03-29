export type FeaturesCarouselItemType = {
  id: string
  img?: string
  title: string
  description: string
}

export type ResultFlowDataType =
  | {
      accoutType?: "individual" | "business"
      personalInfo?: Partial<{
        firstName: string
        lastName: string
        address: string
        city: string
        governorate: string
        gender: string
      }>
      aboutMe?: string
    }
  | undefined

export type GovernorateItemType = string

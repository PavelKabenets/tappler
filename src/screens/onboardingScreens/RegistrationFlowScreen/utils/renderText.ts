export const renderHeaderText = (
  step: number,
  resultAccType: "company" | "individual" | undefined
) => {
  switch (step) {
    case 1:
      return resultAccType === "company" ? "business_info" : "personal_info"
    case 2:
      return resultAccType === "company" ? "business_info" : "personal_info"
    case 3:
      return "profile_photo"
    case 4:
      return "business_hours"
    case 5:
      return "payments"
    case 6:
      return "photos"
    case 7:
      return "verification"
    case 8:
      return "verification"
    case 9:
      return "referral"
    default:
      return ""
  }
}

export const renderBtnText = (
  step: number,
  resultAccType: "company" | "individual" | undefined
) => {
  switch (step) {
    case 1:
      return resultAccType === "company"
        ? "information_about_your_business"
        : "information_about_you"
    case 2:
      return "profile_photo"
    case 3:
      return "business_hours"
    case 4:
      return "payment_methods"
    case 5:
      return "photos_of_my_work"
    case 6:
      return "mobile_verification"
    default:
      return ""
  }
}

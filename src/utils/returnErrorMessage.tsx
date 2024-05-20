import { ErrorSignUpEmailType } from "types"

export const returnErrorMessageArr = (e: ErrorSignUpEmailType) => {
  return Object.entries((e as ErrorSignUpEmailType).data.validationErrors)?.map(
    (item) => item[1][0]
  )
}

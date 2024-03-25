import { Dispatch, SetStateAction } from "react"
import Geocoder from "react-native-geocoding"
import { GeocoderResultType } from "types"

export default async ({
  name,
  updateState,
}: {
  name: string
  updateState: Dispatch<SetStateAction<GeocoderResultType | undefined>>
}) => {
  try {
    const response = await Geocoder.from(name)

    const { results } = response
    updateState(results)
  } catch (e) {
    //
  }
}

import moment from "moment"

export default function generateTimeArray() {
  const timeArray = []

  for (let i = 1; i <= 24; i++) {
    const hour = i < 10 ? "0" + i : "" + i
    const label = moment(hour, "HH").format("hh:mmA")
    const value = moment(hour, "HH").toISOString()

    timeArray.push({ value, label })
  }

  return timeArray
}

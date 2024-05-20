import colors from "styles/colors"

export default (
  status: "active" | "inactive" | "pendingInterview" | "suspended" | "vacation"
) => {
  switch (status) {
    case "active":
      return colors.green
    case "inactive":
      return colors.red
    case "pendingInterview":
      return colors.orange
    case "suspended":
      return colors.orange
    case "vacation":
      return colors.red
  }
}

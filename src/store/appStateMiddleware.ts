import { Middleware } from "@reduxjs/toolkit"
import { AppState } from "react-native"
import { api } from "services/api"

const appStateMiddleware: Middleware = ({ dispatch }) => {
  AppState.addEventListener("change", (nextAppState) => {
    if (nextAppState === "active") {
      dispatch(
        api.util.invalidateTags([
          "Auth",
          "Documents",
          "Jobs",
          "Leads",
          "MyReviews",
          "Notifications",
          "Points",
          "Quotes",
          "Services",
        ])
      )
    }
  })

  return (next) => (action) => next(action)
}

export default appStateMiddleware

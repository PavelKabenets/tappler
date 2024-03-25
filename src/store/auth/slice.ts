import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Routes } from "navigation/routes"
import { RootStackParamList } from "navigation/types"
import { api } from "services/api"
import { ResultFlowDataType, UserType } from "types"

export interface AuthState {
  isAuth: boolean
  isRegistrationFlowComleted?: boolean
  token?: string
  registrationResult?: ResultFlowDataType
  user?: UserType
  selectedCategoriesId: number[]
  language: "en" | "ar"
  currentScreen?: Routes
}

const initialState: AuthState = {
  isAuth: false,
  selectedCategoriesId: [],
  language: "en",
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setRegistrationFlowComleted: (
      state: AuthState,
      action: PayloadAction<boolean>
    ) => {
      state.isRegistrationFlowComleted = action.payload
    },
    logout: (state: AuthState) => {
      state.isAuth = false
      state.isRegistrationFlowComleted = false
      state.registrationResult = undefined
      state.user = undefined
      state.selectedCategoriesId = []
    },
    setResultRegFlow: (
      state: AuthState,
      action: PayloadAction<ResultFlowDataType>
    ) => {
      state.registrationResult = action.payload
    },
    setSelectedCategoriesId: (
      state: AuthState,
      action: PayloadAction<number[]>
    ) => {
      state.selectedCategoriesId = action.payload
    },
    setLanguage: (state: AuthState, action: PayloadAction<"en" | "ar">) => {
      state.language = action.payload
    },
    setCurrentScreen: (
      state: AuthState,
      action: PayloadAction<Routes | undefined>
    ) => {
      state.currentScreen = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.prosSignUp.matchFulfilled,
      (state, { payload }) => {
        state.user = payload
      }
    )
  },
})

export const {
  setIsAuth,
  logout,
  setRegistrationFlowComleted,
  setResultRegFlow,
  setSelectedCategoriesId,
  setLanguage,
  setCurrentScreen,
} = authSlice.actions

export default authSlice.reducer

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Routes } from "navigation/routes"
import { RootStackParamList } from "navigation/types"
import { MyDocumentsResponse } from "services"
import { api } from "services/api"
import { ResultFlowDataType, UserType } from "types"

export interface AuthState {
  isAuth: boolean
  isRegistrationFlowComleted?: boolean
  token?: string
  refreshToken?: string
  registrationResult?: ResultFlowDataType
  user?: Partial<UserType>
  selectedCategoriesId: number[]
  language: "en" | "ar"
  currentScreen?: Routes
  isNotificationRequestWasShowing: boolean
  isWaitAMomentModalPossibleVisible: boolean
  isLogout?: boolean
  isFoodMenuGuideShows?: boolean
  documents?: MyDocumentsResponse
  isShowDeleteOpportunitiesModal?: boolean
  jobsIgnoredIds: number[]
  isLoadingModalVisible?: boolean
}

const initialState: AuthState = {
  isAuth: false,
  selectedCategoriesId: [],
  language: "en",
  isNotificationRequestWasShowing: false,
  isWaitAMomentModalPossibleVisible: true,
  isLogout: false,
  jobsIgnoredIds: [],
  isShowDeleteOpportunitiesModal: true,
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
      state.token = undefined
      state.refreshToken = undefined
      state.isLogout = true
      state.jobsIgnoredIds = []
      state.isShowDeleteOpportunitiesModal = true
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
    setNotificationsWasShowing: (
      state: AuthState,
      action: PayloadAction<boolean>
    ) => {
      state.isNotificationRequestWasShowing = action.payload
    },
    setTokens: (
      state: AuthState,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      if (action.payload.token) {
        state.token = action.payload.token
      }
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken
      }
    },
    setWaitAMomentModalPossibleVisible: (
      state: AuthState,
      action: PayloadAction<boolean>
    ) => {
      state.isWaitAMomentModalPossibleVisible = action.payload
    },
    setLogout: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isLogout = action.payload
    },
    setFoodMenuGuideShows: (
      state: AuthState,
      action: PayloadAction<boolean>
    ) => {
      state.isFoodMenuGuideShows = action.payload
    },
    setShowDeleteOpportuinityModal: (
      state: AuthState,
      action: PayloadAction<boolean>
    ) => {
      state.isShowDeleteOpportunitiesModal = action.payload
    },
    addIgnoredJob: (state: AuthState, action: PayloadAction<number>) => {
      state.jobsIgnoredIds = [...(state.jobsIgnoredIds || []), action.payload]
    },
    setLoadingModalVisible: (
      state: AuthState,
      action: PayloadAction<boolean>
    ) => {
      state.isLoadingModalVisible = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.prosSignUp.matchFulfilled,
      (state, { payload }) => {
        state.user = payload
      }
    )
    builder.addMatcher(
      api.endpoints.auth.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token
        state.refreshToken = payload.refreshToken
        state.user = { ...state.user, id: payload.id }
        state.isAuth = true
        state.isRegistrationFlowComleted = true
      }
    )
    builder.addMatcher(
      api.endpoints.getPros.matchFulfilled,
      (state, { payload }) => {
        state.user = { ...state?.user, ...payload }
      }
    )
    builder.addMatcher(
      api.endpoints.prosRegFlow.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token
        state.refreshToken = payload.refreshToken
        state.isRegistrationFlowComleted = true
      }
    )
    builder.addMatcher(
      api.endpoints.responseTime.matchFulfilled,
      (state, { payload }) => {
        const { proId, ...obj } = payload
        state.user = { ...state.user, responseTimePeriods: obj }
      }
    )
    builder.addMatcher(
      api.endpoints.refreshToken.matchFulfilled,
      (state, { payload }) => {
        if (payload.token) {
          state.token = payload.token
        }
        if (payload.refreshToken) {
          state.refreshToken = payload.refreshToken
        }
      }
    )
    builder.addMatcher(
      api.endpoints.getMyDocument.matchFulfilled,
      (state, { payload }) => {
        state.documents = payload
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
  setNotificationsWasShowing,
  setTokens,
  setWaitAMomentModalPossibleVisible,
  setLogout,
  setFoodMenuGuideShows,
  setShowDeleteOpportuinityModal,
  addIgnoredJob,
  setLoadingModalVisible,
} = authSlice.actions

export default authSlice.reducer

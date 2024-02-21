import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
  isAuth: boolean
  isRegistrationFlowComleted?: boolean
  token?: string
}

const initialState: AuthState = {
  isAuth: true,
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
    },
  },
  extraReducers: (builder) => {
    //
  },
})

export const { setIsAuth, logout, setRegistrationFlowComleted } =
  authSlice.actions

export default authSlice.reducer

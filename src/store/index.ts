import { TypedUseSelectorHook, useSelector } from "react-redux"
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import authReducer from "./auth/slice"
import storage from "utils/storage"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import { combineReducers } from "redux"
import { api } from "services/api"

const persistConfig = {
  key: "tappler_mob_app-root-storage",
  storage,
  whitelist: ["auth"],
}

const reducers = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

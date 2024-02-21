import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage"
import logger from "./logger"

const storage = new MMKVLoader().initialize()

const STORAGE_KEYS = {
  IS_SOW_WELCOME: "@IS_SOW_WELCOME",
} as const

type STORAGE_KEYS_T = "@isSowAllergen" | "@isUmaReq"

export const setIsSawWelcome = async (val: boolean) => {
  try {
    await storage.setBoolAsync(STORAGE_KEYS.IS_SOW_WELCOME, val)
  } catch (e) {
    logger.error("setIsSawWelcome", e)
  }
}

export const getIsSawWelcome = async () => {
  try {
    return await storage.getBoolAsync(STORAGE_KEYS.IS_SOW_WELCOME)
  } catch (e) {
    logger.error("getIsSawWelcome", e)
  }
}

export const useStorage = (key: STORAGE_KEYS_T, defaultValue?: boolean) => {
  const [value, setValue] = useMMKVStorage(key, storage, defaultValue)
  return [value, setValue]
}

export default storage

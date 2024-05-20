import { Platform } from "react-native"
import { PERMISSIONS, check, request } from "react-native-permissions"

export const useCheckCameraPermissions = async () => {
  const permission = await check(
    Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
  )
  if (permission === "granted") {
    return true
  } else {
    return false
  }
}

export const useRequestCameraPermissions = async () => {
  const permission = await request(
    Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
  )
  if (permission === "granted") {
    return true
  } else {
    return false
  }
}

export const useRequestGallery = async () => {
  let permissionRequest = await request(
    Platform.OS === "android"
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.IOS.PHOTO_LIBRARY
  )

  if (permissionRequest === "unavailable") {
    permissionRequest = await request(
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY
    )
  }

  if (permissionRequest === "granted") {
    return true
  } else {
    return false
  }
}

export const useCheckGallery = async () => {
  let permissionRequest = await check(
    Platform.OS === "android"
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.IOS.PHOTO_LIBRARY
  )

  if (permissionRequest === "unavailable") {
    permissionRequest = await check(
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY
    )
  }

  if (permissionRequest === "granted") {
    return true
  } else {
    return false
  }
}

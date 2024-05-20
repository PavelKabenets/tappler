import RNFetchBlob from "rn-fetch-blob"

export default async (url: string): Promise<File | null> => {
  const data = await RNFetchBlob.fs.readFile(url, "base64")
  const blob = new Blob([data], {
    type: "image/jpeg",
    lastModified: Date.now(),
  })
  const file = new File([blob], "photo.jpg", {
    type: "image/jpeg",
    lastModified: Date.now(),
  })
  return file
}

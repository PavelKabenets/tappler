import { ProAdditionalDocumentsType } from "types"

export function getUniqueAdditionalDocuments(
  documents: ProAdditionalDocumentsType[]
): ProAdditionalDocumentsType[] {
  const uniqueDocs: { [key: number]: ProAdditionalDocumentsType } = {}

  documents
    .map((item) => item)
    .reverse()
    .forEach((doc) => {
      const additionalDocId = doc.additionalDocument.id
      if (!uniqueDocs[additionalDocId]) {
        uniqueDocs[additionalDocId] = doc
      }
    })

  return Object.values(uniqueDocs)
}

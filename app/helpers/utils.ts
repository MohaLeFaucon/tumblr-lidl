import { ImageManipulator } from 'expo'

export const filePathToBlob = async (filePath: string) => {
  const res = await fetch(filePath)
  return await res.blob()
}

export const resizeImage = async (uri: string) => {
  const result = await ImageManipulator.manipulate(
    uri,
    [
      {
        resize: { width: 400 },
      },
    ],
    {
      base64: false,
      format: 'jpeg',
      compress: 0.5,
    },
  )
  return result
}

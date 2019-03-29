import * as firebase from 'firebase'
// tslint:disable-next-line:import-name
import db from '../firebase'

import { filePathToBlob } from '../helpers/utils'

const uploadFile = async (
  filename: string,
  filePath: string,
): Promise<string | null> => {
  const blob = await filePathToBlob(filePath)
  const ref = firebase
    .storage()
    .ref()
    .child(filename)
  await ref.put(blob)
  return ref.getDownloadURL()
}

interface UploadParams {
  uri: string
  width: number
  height: number
  description: string
}

const uploadImage = async ({
  uri,
  width,
  height,
  description,
}: UploadParams) => {
  try {
    const userId = firebase.auth().currentUser!.uid
    const downloadURL = await uploadFile(`${Date.now()}_${userId}`, uri)
    await db.collection('pictures').add({
      userId,
      description,
      user: db.collection('users').doc(userId),
      imageUrl: downloadURL,
      imageWidth: width,
      imageHeight: height,
      comments: [],
      likes: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  } catch (e) {
    throw e
  }
}

export default {
  uploadFile,
  uploadImage,
}

import * as firebase from 'firebase'
// tslint:disable-next-line:import-name
import db from '../firebase'

/**
 * LIKES
 */
const getUsersLikesFromPicture = async (
  pictureId: string,
): Promise<AppTypes.User[]> => {
  const picture = await db
    .collection('pictures')
    .doc(pictureId)
    .get()
  const pictureData = picture.data()
  const likes = pictureData!.likes as firebase.firestore.DocumentReference[]
  const dataUsers = await Promise.all(likes.map((user) => user.get()))
  return dataUsers.map((dataUser) => {
    const data = dataUser.data() as AppTypes.User
    data.id = dataUser.id
    return data
  })
}

const addLikeToPicture = async (pictureId: string): Promise<any> => {
  const picture = db.collection('pictures').doc(pictureId)
  const currentUser = db
    .collection('users')
    .doc(firebase.auth().currentUser!.uid)
  return picture.update({
    likes: firebase.firestore.FieldValue.arrayUnion(currentUser),
  })
}

const removeLikeFromPicture = async (pictureId: string): Promise<any> => {
  const picture = db.collection('pictures').doc(pictureId)
  const currentUser = db
    .collection('users')
    .doc(firebase.auth().currentUser!.uid)
  return picture.update({
    likes: firebase.firestore.FieldValue.arrayRemove(currentUser),
  })
}

/**
 * COMMENTS
 */
interface CommentSnapshot {
  user: firebase.firestore.DocumentReference
  content: string
  createdAt: number
}

const getCommentsFromPicture = async (
  pictureId: string,
): Promise<AppTypes.Comment[]> => {
  const picture = await db
    .collection('pictures')
    .doc(pictureId)
    .get()
  const pictureData = picture.data()
  const comments = pictureData!
    .comments as firebase.firestore.DocumentReference[]
  return Promise.all(
    comments.map(
      async (comm): Promise<AppTypes.Comment> => {
        const comment = await comm.get()
        const commentData = comment.data() as CommentSnapshot
        const userSnap = await commentData.user.get()
        const user = userSnap.data() as AppTypes.User
        return {
          user: {
            ...user,
            id: userSnap.id,
          },
          createdAt: new Date(commentData.createdAt),
          content: commentData.content,
        }
      },
    ),
  )
}

const addCommentToPicture = async (
  content: string,
  pictureId: string,
): Promise<AppTypes.Comment> => {
  const picture = db.collection('pictures').doc(pictureId)
  const comment = db.collection('comments').doc()
  const currentUser = firebase.auth().currentUser
  const currentUserRef = db
    .collection('users')
    .doc(firebase.auth().currentUser!.uid)
  const commentData = {
    content,
    user: currentUserRef,
    createdAt: Date.now(),
  }
  await Promise.all([
    comment.set(commentData),
    picture.update({
      comments: firebase.firestore.FieldValue.arrayUnion(comment),
    }),
  ])

  return {
    content,
    user: {
      username: currentUser!.displayName!,
      avatarUrl: currentUser!.photoURL,
      id: currentUser!.uid,
    },
    createdAt: new Date(Date.now()),
  }
}

export default {
  getUsersLikesFromPicture,
  addLikeToPicture,
  removeLikeFromPicture,
  getCommentsFromPicture,
  addCommentToPicture,
}

import * as firebase from 'firebase'
// tslint:disable-next-line:import-name
import db from '../firebase'

interface UpdateProfileParams {
  username: string
  avatarUrl: string | null
}

const updateProfile = ({ username, avatarUrl }: UpdateProfileParams) =>
  firebase.auth().currentUser!.updateProfile({
    displayName: username,
    photoURL: avatarUrl,
  })

interface UpdateUserParams {
  userId: string
  [key: string]: any
}

const createUser = (uid: string) =>
  db
    .collection('users')
    .doc(uid)
    .set({
      username: null,
      avatarUrl: null,
    })

const updateUser = ({ userId, ...properties }: UpdateUserParams) =>
  db
    .collection('users')
    .doc(userId)
    .set(properties)

const getUserByUserId = (userId: string) =>
  db
    .collection('users')
    .doc(userId)
    .get()

const getUserByUsername = (username: string) =>
  db
    .collection('users')
    .where('username', '==', username)
    .get()

const filterUserByUsername = (query: string) =>
  db
    .collection('users')
    .orderBy('username')
    .startAt(query)
    .endAt(`${query}\uf8ff`)
    .get()

const subscribeToUser = (userId: string) =>
  Promise.all([
    db
      .collection('users')
      .doc(userId)
      .update({
        subscribers: firebase.firestore.FieldValue.arrayUnion(
          firebase.auth().currentUser!.uid,
        ),
      }),
    db
      .collection('users')
      .doc(firebase.auth().currentUser!.uid)
      .update({
        subscribing: firebase.firestore.FieldValue.arrayUnion(userId),
      }),
  ])

const unsubscribeToUser = (userId: string) =>
  Promise.all([
    db
      .collection('users')
      .doc(userId)
      .update({
        subscribers: firebase.firestore.FieldValue.arrayRemove(
          firebase.auth().currentUser!.uid,
        ),
      }),
    db
      .collection('users')
      .doc(firebase.auth().currentUser!.uid)
      .update({
        subscribing: firebase.firestore.FieldValue.arrayRemove(userId),
      }),
  ])

export default {
  createUser,
  updateProfile,
  updateUser,
  getUserByUsername,
  getUserByUserId,
  filterUserByUsername,
  subscribeToUser,
  unsubscribeToUser,
}

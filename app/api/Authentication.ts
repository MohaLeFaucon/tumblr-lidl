import * as firebase from 'firebase'

interface AuthParams {
  email: string
  password: string
}

const signin = ({ email, password }: AuthParams) =>
  firebase.auth().signInWithEmailAndPassword(email, password)

const signup = ({ email, password }: AuthParams) =>
  firebase.auth().createUserWithEmailAndPassword(email, password)

const signout = () => firebase.auth().signOut()

export default {
  signin,
  signup,
  signout,
}

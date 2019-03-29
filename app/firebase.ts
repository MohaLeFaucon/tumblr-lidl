import * as firebase from 'firebase'
import 'firebase/firestore'

import { env } from '../env'

firebase.initializeApp({
  apiKey: env.FIREBASE_API_KEY,
  databaseURL: env.FIREBASE_DATABASE_URL,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  storageBucket: env.FIREBASE_BUCKET_URL,
  projectId: 'tumblrlidl',
})

const db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true,
})

export default db

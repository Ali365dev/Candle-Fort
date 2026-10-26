import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { requireFirebase } from './firebase.js'

export function signIn(email, password) {
  const { auth } = requireFirebase()
  return signInWithEmailAndPassword(auth, email, password)
}

export function createAccount(email, password) {
  const { auth } = requireFirebase()
  return createUserWithEmailAndPassword(auth, email, password)
}

export function signOut() {
  const { auth } = requireFirebase()
  return firebaseSignOut(auth)
}

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { requireFirebase } from './firebase.js'

const productsCollection = 'products'

export async function getProducts() {
  const { db } = requireFirebase()
  const snapshot = await getDocs(collection(db, productsCollection))
  return snapshot.docs.map((productDoc) => ({
    id: productDoc.id,
    ...productDoc.data(),
  }))
}

export async function getProduct(productId) {
  const { db } = requireFirebase()
  const snapshot = await getDoc(doc(db, productsCollection, productId))
  return snapshot.exists()
    ? { id: snapshot.id, ...snapshot.data() }
    : null
}

export async function createProduct(product) {
  const { db } = requireFirebase()
  const productRef = await addDoc(collection(db, productsCollection), product)
  return productRef.id
}

export async function updateProduct(productId, updates) {
  const { db } = requireFirebase()
  await updateDoc(doc(db, productsCollection, productId), updates)
}

export async function deleteProduct(productId) {
  const { db } = requireFirebase()
  await deleteDoc(doc(db, productsCollection, productId))
}

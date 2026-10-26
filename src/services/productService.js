import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { requireFirebase } from './firebase.js'

const productsCollection = 'products'
const MAX_PRODUCT_IMAGE_SIZE = 10 * 1024 * 1024

export async function uploadProductImage(file) {
  const { storage } = requireFirebase()
  if (!file?.type.startsWith('image/')) {
    throw new Error('Choose an image file for the product photo.')
  }
  if (file.size > MAX_PRODUCT_IMAGE_SIZE) {
    throw new Error('Product images must be 10 MB or smaller.')
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
  const imageRef = ref(storage, `product-images/${Date.now()}-${safeName}`)
  const uploaded = await uploadBytes(imageRef, file)
  return getDownloadURL(uploaded.ref)
}

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

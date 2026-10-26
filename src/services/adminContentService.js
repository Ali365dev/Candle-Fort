import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { requireFirebase } from './firebase.js'

const MAX_ADMIN_ASSET_SIZE = 10 * 1024 * 1024

export async function getAdminRecords(collectionName) {
  const { db } = requireFirebase()
  const snapshot = await getDocs(collection(db, collectionName))
  return snapshot.docs.map((record) => ({ id: record.id, ...record.data() }))
}

export async function getAdminRecord(collectionName, recordId) {
  const { db } = requireFirebase()
  const snapshot = await getDoc(doc(db, collectionName, recordId))
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
}

export async function createAdminRecord(collectionName, values, recordId) {
  const { db } = requireFirebase()
  if (recordId) {
    await setDoc(doc(db, collectionName, recordId), values)
    return recordId
  }
  const created = await addDoc(collection(db, collectionName), values)
  return created.id
}

export async function updateAdminRecord(collectionName, recordId, values) {
  const { db } = requireFirebase()
  await updateDoc(doc(db, collectionName, recordId), values)
}

export async function deleteAdminRecord(collectionName, recordId) {
  const { db } = requireFirebase()
  await deleteDoc(doc(db, collectionName, recordId))
}

export async function uploadAdminAsset(file, folder = 'admin-assets') {
  const { storage } = requireFirebase()
  if (!file?.type.startsWith('image/')) throw new Error('Choose an image file.')
  if (file.size > MAX_ADMIN_ASSET_SIZE) throw new Error('Images must be 10 MB or smaller.')
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
  const imageRef = ref(storage, `${folder}/${Date.now()}-${crypto.randomUUID()}-${safeName}`)
  const uploaded = await uploadBytes(imageRef, file)
  return getDownloadURL(uploaded.ref)
}

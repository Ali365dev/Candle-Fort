import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { requireFirebase } from './firebase.js'

const MAX_RECEIPT_SIZE = 5 * 1024 * 1024
const ALLOWED_RECEIPT_TYPES = ['application/pdf']

export async function uploadPaymentReceipt(userId, orderId, file) {
  const { storage } = requireFirebase()

  if (
    !file ||
    (!file.type.startsWith('image/') &&
      !ALLOWED_RECEIPT_TYPES.includes(file.type))
  ) {
    throw new Error('Receipt must be an image or PDF file.')
  }
  if (file.size > MAX_RECEIPT_SIZE) {
    throw new Error('Receipt must be 5 MB or smaller.')
  }

  const receiptRef = ref(storage, `payment-receipts/${userId}/${orderId}/receipt`)
  const result = await uploadBytes(receiptRef, file)
  return getDownloadURL(result.ref)
}

export async function createOrder({
  userId,
  items,
  paymentMethod,
  transactionReference = '',
  receiptFile = null,
  shippingAddress = {},
}) {
  const { db } = requireFirebase()

  if (!userId) {
    throw new Error('Sign in is required to place an order.')
  }
  if (!['cod', 'manual'].includes(paymentMethod)) {
    throw new Error('Choose Cash on Delivery or manual payment.')
  }
  if (paymentMethod === 'manual' && !transactionReference.trim()) {
    throw new Error('A transaction reference is required for manual payment.')
  }

  const orderRef = doc(collection(db, 'orders'))
  const receiptUrl =
    paymentMethod === 'manual' && receiptFile
      ? await uploadPaymentReceipt(userId, orderRef.id, receiptFile)
      : null

  await setDoc(orderRef, {
    userId,
    items: items.map(({ product, quantity }) => ({
      productId: product.id,
      name: product.name,
      unitPrice: Number(product.price),
      quantity,
    })),
    paymentMethod,
    transactionReference:
      paymentMethod === 'manual' ? transactionReference.trim() : null,
    receiptUrl,
    shippingAddress,
    status: 'pending',
    createdAt: new Date().toISOString(),
  })

  return orderRef.id
}

export async function getCustomerOrders(userId) {
  if (!userId) {
    throw new Error('A customer user id is required to load orders.')
  }
  const { db } = requireFirebase()
  const ordersQuery = query(
    collection(db, 'orders'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
  )
  const snapshot = await getDocs(ordersQuery)
  return snapshot.docs.map((orderDoc) => ({
    id: orderDoc.id,
    ...orderDoc.data(),
  }))
}

export async function getAdminOrders() {
  const { db } = requireFirebase()
  const ordersQuery = query(
    collection(db, 'orders'),
    orderBy('createdAt', 'desc'),
  )
  const snapshot = await getDocs(ordersQuery)
  return snapshot.docs.map((orderDoc) => ({
    id: orderDoc.id,
    ...orderDoc.data(),
  }))
}

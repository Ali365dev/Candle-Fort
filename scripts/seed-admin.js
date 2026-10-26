#!/usr/bin/env node
/**
 * Creates a dummy admin user and sets the admin custom claim.
 *
 * Usage:
 *   node scripts/seed-admin.js <path-to-service-account.json>
 *
 * The service account JSON is downloaded from:
 *   Firebase Console → Project Settings → Service accounts → Generate new private key
 */

import { readFileSync } from 'fs'
import { cert, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const ADMIN_EMAIL = process.env.CANDLEFORT_ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.CANDLEFORT_ADMIN_PASSWORD

const serviceAccountPath = process.argv[2]
if (!serviceAccountPath) {
  console.error('Usage: CANDLEFORT_ADMIN_EMAIL=... CANDLEFORT_ADMIN_PASSWORD=... node scripts/seed-admin.js <path-to-service-account.json>')
  process.exit(1)
}

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Set CANDLEFORT_ADMIN_EMAIL and CANDLEFORT_ADMIN_PASSWORD before running this script.')
  process.exit(1)
}

let serviceAccount
try {
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'))
} catch {
  console.error(`Could not read service account file: ${serviceAccountPath}`)
  process.exit(1)
}

initializeApp({ credential: cert(serviceAccount) })

const auth = getAuth()

async function run() {
  let uid

  try {
    const existing = await auth.getUserByEmail(ADMIN_EMAIL)
    uid = existing.uid
    console.log(`User already exists: ${ADMIN_EMAIL} (uid: ${uid})`)
  } catch (err) {
    if (err.code !== 'auth/user-not-found') throw err
    const created = await auth.createUser({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    uid = created.uid
    console.log(`Created user: ${ADMIN_EMAIL} (uid: ${uid})`)
  }

  await auth.setCustomUserClaims(uid, { admin: true })
  console.log('Admin claim set.')
  console.log('Sign in at /login — you will be redirected to /admin automatically.')
}

run().then(() => process.exit(0)).catch(err => { console.error(err.message); process.exit(1) })

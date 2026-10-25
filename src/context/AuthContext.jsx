import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, firebaseConfigured } from '../services/firebase.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(Boolean(auth))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!auth) {
      return undefined
    }

    return onAuthStateChanged(
      auth,
      async (nextUser) => {
        setError('')
        setUser(nextUser)
        setIsAdmin(false)

        if (nextUser) {
          try {
            const token = await nextUser.getIdTokenResult()
            setIsAdmin(token.claims.admin === true)
          } catch (authError) {
            setError(`Could not verify account permissions: ${authError.message}`)
          }
        }

        setLoading(false)
      },
      (authError) => {
        setError(`Could not check sign-in status: ${authError.message}`)
        setLoading(false)
      },
    )
  }, [])

  const value = {
    user,
    isAdmin,
    loading,
    error,
    configured: firebaseConfigured,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Keep the context hook beside its provider for a simple, discoverable API.
// oxlint-disable-next-line react/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

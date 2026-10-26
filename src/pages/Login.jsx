import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { ArrowLeft, LockKeyhole, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { createAccount, signIn } from '../services/authService.js'

function Login() {
  const { configured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState('signin')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const returnTo = location.state?.from?.pathname || location.state?.returnTo

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') || '').trim()
    const password = String(formData.get('password') || '')

    try {
      const result = mode === 'signup'
        ? await createAccount(email, password)
        : await signIn(email, password)
      const token = await result.user.getIdTokenResult()
      navigate(returnTo || (token.claims.admin === true ? '/admin' : '/'), { replace: true })
    } catch (authError) {
      setError(authError.code === 'auth/email-already-in-use'
        ? 'An account already exists for this email. Sign in instead.'
        : authError.code === 'auth/invalid-credential'
          ? 'That email and password combination was not recognized.'
          : authError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="account-page">
      <Link className="account-back" to={returnTo || '/'}><ArrowLeft size={15} /> Back to Candle Fort</Link>
      <section className="account-card">
        <span className="account-icon"><Sparkles size={24} /></span>
        <p className="store-eyebrow">Your Candle Fort account</p>
        <h1>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h1>
        <p className="account-description">Sign in to continue your order and keep your favorite moments close.</p>
        {!configured ? <p className="store-message" role="status">Firebase isn’t configured yet. Add the VITE_FIREBASE values in .env.local to enable accounts.</p> : null}
        <form className="account-form" onSubmit={handleSubmit}>
          <label>Email address<input autoComplete="email" name="email" placeholder="you@example.com" required type="email" /></label>
          <label>Password<input autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} minLength={mode === 'signup' ? 6 : undefined} name="password" placeholder="At least 6 characters" required type="password" /></label>
          {error ? <p className="error-message" role="alert">{error}</p> : null}
          <button className="store-button" disabled={!configured || submitting} type="submit">{submitting ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'} <LockKeyhole size={15} /></button>
        </form>
        <p className="account-switch">{mode === 'signup' ? 'Already have an account?' : 'New to Candle Fort?'} <button type="button" onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setError('') }}>{mode === 'signup' ? 'Sign in' : 'Create an account'}</button></p>
      </section>
    </main>
  )
}

export default Login

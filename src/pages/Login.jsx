import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'
import { signIn } from '../services/authService.js'

function Login() {
  const { configured } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    const formData = new FormData(event.currentTarget)
    try {
      await signIn(formData.get('email'), formData.get('password'))
      navigate('/admin')
    } catch (signInError) {
      setError(signInError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page narrow-page">
      <h1>Admin login</h1>
      {!configured && (
        <p className="notice">
          Firebase is not configured yet. Copy <code>.env.example</code> to{' '}
          <code>.env.local</code> and add your Firebase web app settings.
        </p>
      )}
      <form className="form-stack" onSubmit={handleSubmit}>
        <label>
          Email
          <input autoComplete="username" name="email" required type="email" />
        </label>
        <label>
          Password
          <input
            autoComplete="current-password"
            name="password"
            required
            type="password"
          />
        </label>
        {error && <p className="error-message" role="alert">{error}</p>}
        <button disabled={!configured || submitting} type="submit">
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="helper-text">
        Admin access requires a trusted Firebase custom claim. Creating admin
        accounts is not handled in this frontend.
      </p>
    </main>
  )
}

export default Login

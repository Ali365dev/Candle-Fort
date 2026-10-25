import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'

function ProtectedAdminRoute() {
  const { user, isAdmin, loading, error } = useAuth()
  const location = useLocation()

  if (loading) {
    return <main className="page">Checking admin access…</main>
  }

  if (!user) {
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  if (!isAdmin) {
    return (
      <main className="page">
        <h1>Admin access required</h1>
        <p>
          This account does not have the required admin permission. Contact the
          project administrator.
        </p>
        {error && <p className="error-message" role="alert">{error}</p>}
      </main>
    )
  }

  return <Outlet />
}

export default ProtectedAdminRoute

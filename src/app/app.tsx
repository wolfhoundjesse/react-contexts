import React from 'react'
import { useAuthInfo } from '../common/contexts/auth.context'

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

const App = () => {
  const { loginStatus } = useAuthInfo()
  return loginStatus !== 'Idle' ? (
    <React.Suspense fallback={<div>Loading ...</div>}>
      {loginStatus === 'Success' ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  ) : null
}

export default App

import React from 'react'
import { render, cleanup } from '../../test/app-provider-wrapper'
import UnauthenticatedApp from './unauthenticated-app'
import AuthenticatedApp from './authenticated-app'

afterEach(cleanup)

test('The unauthenticated side of the application should render when there is no authInfo', async () => {
  const { getByText } = render(<UnauthenticatedApp />)

  expect(getByText(/cactus/i)).toBeInTheDocument()
})

test('The authenticated side of the application should render when authInfo is present', async () => {
  const { getByText } = render(<AuthenticatedApp />, {
    authInfo: { doctorCompanyId: 0, signature: 'Tacos', token: 'Cats' },
  })

  expect(getByText(/congratulations/i)).toBeInTheDocument()
})

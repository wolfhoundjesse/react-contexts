import React from 'react'
import Error401 from '../common/components/error-pages/error-401'
import Button from '@material-ui/core/Button'
import { useState } from 'react'

const UnauthenticatedApp = () => {
  const [isErrorPageVisible, setIsErrorPageVisible] = useState(false)
  return (
    <>
      <h1>Unauthenticated App</h1>
      <p>
        If you are seeing this, then your application has not been authenticated. Use this component
        for routes/screens/pages that do not require authentication. For example, in applications
        with a cactus router, this is a great place to put a route to an error page.
      </p>
      <Button
        onClick={() => setIsErrorPageVisible(!isErrorPageVisible)}
        variant='contained'
        color='primary'
      >
        {isErrorPageVisible ? 'Hide' : 'Show'} Error Page
      </Button>
      <br />
      <br />
      {isErrorPageVisible && <Error401 />}
    </>
  )
}

export default UnauthenticatedApp

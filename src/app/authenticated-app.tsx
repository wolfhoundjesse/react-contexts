import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      gridColumn: 'span 3',
    },
    [theme.breakpoints.down('sm')]: {
      gridColumn: '4 / 9',
    },
  },
}))

const AuthenticatedApp = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>Authenticated App</h1>
      <p>
        <strong>Congratulations!</strong>
      </p>
      <p>
        If you are seeing this, then your application has successfully been
        authenticated. All application routes/pages/screens that require the
        user to be authenticated should be set up here.
      </p>
    </div>
  )
}

export default AuthenticatedApp

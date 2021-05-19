import React from 'react'
import { useUserAgentParser } from '../common/contexts/user-agent.context'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: '0 12px',
  },
  grid: {
    display: 'grid',
    columnGap: 24,
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(12, 8.333fr)',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(16, 6.25fr)',
    },
    gridAutoFlow: 'row',
  },
}))
interface Props {
  children?: React.ReactNode
}

const Layout = ({ children, ...props }: Props) => {
  const classes = useStyles()
  const { browser } = useUserAgentParser()
  return (
    <div className={classes.container}>
      <div className={classes.grid} {...props}>
        {browser && browser.name === 'IE' && (
          <div>
            Nemo does not support Internet Explorer. Please use the Chrome, Firefox or Edge browsers for
            optimal performance.
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

export default Layout

import React, { ReactNode } from 'react'
import ContainerDataProvider from '../common/contexts/container-data.context'
import AuthProvider from '../common/contexts/auth.context'
import ApiServiceProvider from '../common/contexts/api-service.context'
import { UserAgentParserProvider } from '../common/contexts/user-agent.context'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Layout from '../layout/layout'

const theme = createMuiTheme({})
interface Props {
  children?: ReactNode
}

const AppProvider = ({ children }: Props) => {
  return (
    <ContainerDataProvider>
      <AuthProvider>
        <ApiServiceProvider>
          <UserAgentParserProvider userAgent={window.navigator.userAgent}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Layout>{children}</Layout>
            </ThemeProvider>
          </UserAgentParserProvider>
        </ApiServiceProvider>
      </AuthProvider>
    </ContainerDataProvider>
  )
}

export default AppProvider

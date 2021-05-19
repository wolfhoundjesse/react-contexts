import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useContainerData } from './container-data.context'
import { dashboardApi } from '../constants/dashboard-api.routes'
import { AuthInfo } from '../models'

export interface AuthContextValue {
  loginStatus: 'Success' | 'Failed' | 'Idle'
  authInfo?: AuthInfo
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
)

interface Props {
  children?: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const { containerData } = useContainerData()
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>()
  const [loginStatus, setLoginStatus] = useState<'Success' | 'Failed' | 'Idle'>(
    'Idle'
  )

  /**
   * In development, supply credentials to loginUser().
   */
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && loginStatus === 'Idle') {
      loginUser('internaldev', 'Apex@007')
    }
  }, [loginStatus])

  /**
   * In environments other than development, take authInfo from the containerData provider.
   */
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' && containerData !== undefined) {
      setAuthInfo(containerData.authInfo)
      setLoginStatus('Success')
    }
  }, [containerData])

  const loginUser = async (username: string, password: string) => {
    try {
      let headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('RequestInfo', 'TestUser#TestPass###')

      let options: RequestInit = {
        headers,
        credentials: 'same-origin',
        method: 'post',
        body: JSON.stringify({ UserName: username, Password: password }),
      }

      let result = await fetch(dashboardApi.AuthenticateDashboardUser, options)
      let data = await result.json()

      if (data.ValidationStatus === 'Success') {
        setAuthInfo({
          doctorCompanyId: data.DoctorCompanyId,
          signature: data.Signature,
          token: data.Token,
        })
      }
      setLoginStatus(data.ValidationStatus)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <AuthContext.Provider value={{ loginStatus, authInfo }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthInfo = (): AuthContextValue => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthInfo must be used with a AuthProvider')
  }
  return context
}

export default AuthProvider

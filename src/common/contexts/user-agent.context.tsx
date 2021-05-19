import * as React from 'react'
import { UAParser } from 'ua-parser-js'

interface State {
  os?: IUAParser.IOS
  device?: IUAParser.IDevice
  engine?: IUAParser.IEngine
  browser?: IUAParser.IBrowser
  cpu?: IUAParser.ICPU
}

const UserAgentContext = React.createContext<State>({})

interface Props {
  children?: React.ReactNode
  userAgent: string
}

export const UserAgentParserProvider = ({ children, userAgent }: Props) => {
  const value = React.useMemo(() => {
    const uaParser = new UAParser()
    uaParser.setUA(userAgent)
    return {
      os: uaParser.getOS(),
      browser: uaParser.getBrowser(),
      cpu: uaParser.getCPU(),
      device: uaParser.getDevice(),
      engine: uaParser.getEngine(),
    }
  }, [userAgent])

  return (
    <UserAgentContext.Provider value={value}>
      {children}
    </UserAgentContext.Provider>
  )
}

export const useUserAgentParser = () => {
  const context = React.useContext(UserAgentContext)
  if (context === undefined) {
    throw new Error(
      `useUserAgentParser must be used within a UserAgentParserProvider`
    )
  }
  return context
}

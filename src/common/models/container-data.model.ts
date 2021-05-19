import { AuthInfo } from './auth-info.model'

// Use this interface to model the data that will be passed from the microfrontend container

export interface ContainerData {
  authInfo?: AuthInfo
  initialRoute?: string
}

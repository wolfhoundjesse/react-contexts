import React, { ReactElement, ReactNode } from 'react'
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react'

import {
  ContainerDataContext,
  ContextValue as ContainerContextValue,
} from '../src/common/contexts/container-data.context'
import { AuthContext } from '../src/common/contexts/auth.context'
import { AuthInfo } from '../src/common/models'
import { ApiServiceContext, ApiService } from '../src/common/contexts/api-service.context'

const defaultContainerContextValue: ContainerContextValue = {
  containerData: {},
  setContainerData: jest.fn(),
}

const defaultAuthInfo: AuthInfo = {
  doctorCompanyId: 0,
  signature: '',
  token: '',
}
const defaultApiService: ApiService = {
  delete: jest.fn(),
  get: jest.fn(),
  patch: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}

export interface AppWrapperRenderOptions extends Omit<RenderOptions, 'queries'> {
  containerContextValue?: ContainerContextValue
  authInfo?: AuthInfo
  apiService?: ApiService
}

export const render = (
  ui: ReactElement,
  {
    containerContextValue = defaultContainerContextValue,
    authInfo = defaultAuthInfo,
    apiService = defaultApiService,
    ...options
  }: AppWrapperRenderOptions = {}
): RenderResult => {
  const Wrapper = ({ children }: { children?: ReactNode }): ReactElement => {
    return (
      <ContainerDataContext.Provider value={containerContextValue}>
        <AuthContext.Provider value={{ authInfo, loginStatus: 'Success' }}>
          <ApiServiceContext.Provider value={apiService}>{children}</ApiServiceContext.Provider>
        </AuthContext.Provider>
      </ContainerDataContext.Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'

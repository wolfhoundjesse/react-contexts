import React, { createContext, ReactNode, useContext } from 'react'
import { useAuthInfo } from './auth.context'
import { AuthInfo } from '../models'

interface HttpResponse<ResponseObjectType> extends Response {
  parsedBody?: ResponseObjectType
}

export interface ApiService {
  get: <RequestObjectType>(
    url: string,
    options: RequestInit,
    isNodeApi: boolean
  ) => Promise<HttpResponse<RequestObjectType>>
  post: <RequestObjectType>(
    url: string,
    body: any,
    options: RequestInit,
    isNodeApi: boolean
  ) => Promise<HttpResponse<RequestObjectType>>
  put: <RequestObjectType>(
    url: string,
    body: any,
    options: RequestInit,
    isNodeApi: boolean
  ) => Promise<HttpResponse<RequestObjectType>>
  patch: <RequestObjectType>(
    url: string,
    body: any,
    options: RequestInit,
    isNodeApi: boolean
  ) => Promise<HttpResponse<RequestObjectType>>
  delete: <RequestObjectType>(
    url: string,
    body: any,
    options: RequestInit,
    isNodeApi: boolean
  ) => Promise<HttpResponse<RequestObjectType>>
}

export const ApiServiceContext = createContext<ApiService | undefined>(undefined)

interface Props {
  children?: ReactNode
}

const ApiServiceProvider = ({ children }: Props) => {
  const { authInfo = {} as AuthInfo } = useAuthInfo()

  const value = {
    get: (url: string, options: RequestInit, isNodeApi: boolean) => {
      const headers = prepareHeaders(isNodeApi, authInfo)
      const request: RequestInit = {
        ...options,
        credentials: 'same-origin',
        method: 'get',
        headers,
      }
      return apiService<any>(authInfo, new Request(url, request), isNodeApi)
    },
    post: (url: string, body: any, options: RequestInit, isNodeApi: boolean) => {
      const headers = prepareHeaders(isNodeApi, authInfo)
      const request: RequestInit = {
        ...options,
        credentials: 'same-origin',
        method: 'post',
        headers,
        body: JSON.stringify(body),
      }
      return apiService<any>(authInfo, new Request(url, request), isNodeApi)
    },
    patch: (url: string, body: any, options: RequestInit, isNodeApi: boolean) => {
      const headers = prepareHeaders(isNodeApi, authInfo)
      const request: RequestInit = {
        ...options,
        credentials: 'same-origin',
        method: 'patch',
        headers,
        body: JSON.stringify(body),
      }
      return apiService<any>(authInfo, new Request(url, request), isNodeApi)
    },
    put: (url: string, body: any, options: RequestInit, isNodeApi: boolean) => {
      const headers = prepareHeaders(isNodeApi, authInfo)
      const request: RequestInit = {
        ...options,
        credentials: 'same-origin',
        method: 'put',
        headers,
        body: JSON.stringify(body),
      }
      return apiService<any>(authInfo, new Request(url, request), isNodeApi)
    },
    delete: (url: string, body: any, options: RequestInit, isNodeApi: boolean) => {
      const headers = prepareHeaders(isNodeApi, authInfo)
      const request: RequestInit = {
        ...options,
        credentials: 'same-origin',
        method: 'delete',
        headers,
        body: JSON.stringify(body),
      }
      return apiService<any>(authInfo, new Request(url, request), isNodeApi)
    },
  }

  const apiService = async <ResponseObjectType extends any>(
    authInfo: AuthInfo,
    request: RequestInfo,
    isNodeApi: boolean
  ): Promise<HttpResponse<ResponseObjectType>> => {
    const response: HttpResponse<ResponseObjectType> = await fetch(request).then(checkStatus)
    response.parsedBody = await response.json()
    return response
  }

  const prepareHeaders = (isNodeApi: boolean, authInfo: any) => {
    const { partnerUserId, partnerPassword, doctorCompanyId, token, signature } = authInfo
    let headers = new Headers()

    headers.append('Content-Type', 'application/json')

    if (isNodeApi) {
      headers.append('doctorcompanyid', doctorCompanyId.toString())
      headers.append('signature', signature)
      headers.append('token', token)
    } else {
      headers.append(
        'RequestInfo',
        `${partnerUserId}#${partnerPassword}#${doctorCompanyId}#${signature}#${token}`
      )
    }

    return headers
  }

  const checkStatus = (response: HttpResponse<any>) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else if (response.status === 401) {
      window.location = '' as unknown as Location
      // C# APIs expect PascalCase, and Node APIs expect camelCase
      return Promise.reject({
        validationStatus: 'FAILED',
        ValidationStatus: 'FAILED',
        validationMessages: ['Authentication Failed'],
        ValidationMessages: ['Authentication Failed'],
      })
    } else {
      return Promise.reject({
        validationStatus: 'FAILED',
        ValidationStatus: 'FAILED',
        validationMessages: ['Exception Occurred'],
        ValidationMessages: ['Exception Occurred'],
      })
    }
  }

  return <ApiServiceContext.Provider value={value}>{children}</ApiServiceContext.Provider>
}

export const useApiService = (): ApiService => {
  const context = useContext(ApiServiceContext)
  if (context === undefined) {
    throw new Error('useApiService must be used within an ApiServiceProvider')
  }
  return context
}

export default ApiServiceProvider

import React, { createContext, ReactNode, useContext, useState } from 'react'
import { ContainerData } from '../models'

export interface ContextValue {
  containerData: ContainerData
  setContainerData: (containerData: ContainerData) => void
}

export const ContainerDataContext = createContext<ContextValue | undefined>(
  undefined
)

/**
 * Use this object to populate the container with any data needed
 * for development outside of the microfrontend container
 */
const devContainerData: ContainerData = {}

interface Props {
  children?: ReactNode
}

const ContainerDataProvider = ({ children }: Props) => {
  const [containerData, setContainerData] = useState<ContainerData>(
    process.env.NODE_ENV === 'development'
      ? devContainerData
      : window.parent.containerData
  )

  return (
    <ContainerDataContext.Provider
      value={{
        containerData,
        setContainerData,
      }}
    >
      {children}
    </ContainerDataContext.Provider>
  )
}

export const useContainerData = (): ContextValue => {
  const context = useContext(ContainerDataContext)
  if (context === undefined) {
    throw new Error(
      'useContainerData must be used with a ContainerDataProvider'
    )
  }
  return context
}

export default ContainerDataProvider

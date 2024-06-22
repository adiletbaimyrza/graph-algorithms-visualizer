import { createContext, ReactNode } from 'react'
import useEdgeId from './useEdgeId'

interface EdgeIdContextType {
  get: () => number
  set: (newEdgeId: number) => void
  reset: () => void
}

// prettier-ignore
const EdgeIdContext = createContext<EdgeIdContextType | undefined>(undefined)

interface EdgeIdProviderProps {
  children: ReactNode
}

const EdgeIdProvider = ({ children }: EdgeIdProviderProps) => {
  const edgeId = useEdgeId()

  return (
    <EdgeIdContext.Provider value={edgeId}>{children}</EdgeIdContext.Provider>
  )
}

export { EdgeIdContext, EdgeIdProvider, type EdgeIdContextType }

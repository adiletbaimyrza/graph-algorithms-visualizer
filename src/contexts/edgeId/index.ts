import { useContext } from 'react'
import { EdgeIdContext, EdgeIdContextType } from './EdgeIdContext'

const useEdgeId = (): EdgeIdContextType => {
  const edgeIdContext = useContext(EdgeIdContext)

  if (!edgeIdContext) {
    throw new Error(
      'EdgeIdContext has to be used within <EdgeIdContext.Provider>'
    )
  }

  return edgeIdContext
}

export default useEdgeId

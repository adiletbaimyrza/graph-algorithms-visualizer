import { useContext } from 'react'
import { VertexIdContext, VertexIdContextType } from './VertexIdContext'

const useVertexIdContext = (): VertexIdContextType => {
  const vertexIdContext = useContext(VertexIdContext)

  if (!vertexIdContext) {
    throw new Error(
      'VertexIdContext has to be used within <VertexIdContext.Provider>'
    )
  }

  return vertexIdContext
}

export default useVertexIdContext

import { useContext } from 'react'
import { VerticesContext, VerticesContextType } from './VerticesContext'

const useVertices = (): VerticesContextType => {
  const verticesContext = useContext(VerticesContext)

  if (!verticesContext) {
    throw new Error(
      'VerticesContext has to be used within <VerticesContext.Provider>'
    )
  }

  return verticesContext
}

export default useVertices

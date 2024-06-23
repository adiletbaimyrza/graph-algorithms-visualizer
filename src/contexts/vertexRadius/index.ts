import { useContext } from 'react'
import {
  VertexRadiusContext,
  VertexRadiusContextType,
} from './VertexRadiusContext'

const useVertexRadius = (): VertexRadiusContextType => {
  const vertexRadiusContext = useContext(VertexRadiusContext)

  if (!vertexRadiusContext) {
    throw new Error(
      'VertexRadiusContext has to be used within <VertexRadiusContext.Provider>'
    )
  }

  return vertexRadiusContext
}

export default useVertexRadius

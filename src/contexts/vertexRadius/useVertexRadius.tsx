import { useState } from 'react'

const useVertexRadius = () => {
  const [vertexRadius, setVertexRadius] = useState<number>(20)

  const set = (newVertexRadius: number) => {
    setVertexRadius(newVertexRadius)
  }

  const get = () => {
    return vertexRadius
  }

  return { get, set }
}

export default useVertexRadius

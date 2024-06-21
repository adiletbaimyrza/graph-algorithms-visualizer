import { useState } from 'react'

const useVertexId = () => {
  const [vertexId, setVertexId] = useState<number>(0)

  const set = (newVertexId: number) => {
    setVertexId(newVertexId)
  }

  const get = () => {
    const prevVertexId = vertexId
    setVertexId(vertexId + 1)

    return prevVertexId
  }

  return { get, set }
}

export default useVertexId

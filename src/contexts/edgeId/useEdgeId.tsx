import { useState } from 'react'

const useEdgeId = () => {
  const [edgeId, setEdgeId] = useState<number>(0)

  const set = (newEdgeId: number) => {
    setEdgeId(newEdgeId)
  }

  const get = () => {
    const prevEdgeId = edgeId
    setEdgeId(edgeId + 1)

    return prevEdgeId
  }

  const reset = () => {
    setEdgeId(0)
  }

  return { get, set, reset }
}

export default useEdgeId

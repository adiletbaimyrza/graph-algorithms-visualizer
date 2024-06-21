import { useState } from 'react'
import IVertex from '../../interfaces/IVertex'

const useLinkingVertex = () => {
  const [linkingVertex, setLinkingVertex] = useState<IVertex | null>(null)

  const set = (newlinkingVertex: IVertex) => {
    setLinkingVertex(newlinkingVertex)
  }

  const get = () => {
    return linkingVertex
  }

  const reset = () => {
    setLinkingVertex(null)
  }

  return { get, set, reset }
}

export default useLinkingVertex

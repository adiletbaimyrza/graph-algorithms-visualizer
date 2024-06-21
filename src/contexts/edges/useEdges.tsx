import { useState } from 'react'
import IEdge from '../../interfaces/IEdge'

const useEdges = () => {
  const [edges, setEdges] = useState<IEdge[]>([])

  const get = () => {
    return edges
  }

  const set = (newEdges: IEdge[]) => {
    setEdges(newEdges)
  }

  const add = (newEdge: IEdge) => {
    const updatedEdges = [...edges, newEdge]
    setEdges(updatedEdges)
  }

  const remove = (id: number) => {
    const filteredEdges = edges.filter((edge) => edge.id !== id)
    setEdges(filteredEdges)
  }

  return { get, set, add, remove }
}

export default useEdges

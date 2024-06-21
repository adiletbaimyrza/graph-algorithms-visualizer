import { useState } from 'react'
import IVertex from '../../interfaces/IVertex'

const useVertices = () => {
  const [vertices, setVertices] = useState<IVertex[]>([])

  const get = () => {
    return vertices
  }

  const set = (newVertices: IVertex[]) => {
    setVertices(newVertices)
  }

  const add = (newVertex: IVertex) => {
    const updatedVertices = [...vertices, newVertex]
    setVertices(updatedVertices)
  }

  const remove = (id: number) => {
    const filteredVertices = vertices.filter((vertex) => vertex.id !== id)
    setVertices(filteredVertices)
  }

  return { get, set, add, remove }
}

export default useVertices

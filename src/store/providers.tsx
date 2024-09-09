import { useState, useRef, ReactNode } from 'react'
import {
  CurrentAlgorithmContext,
  EdgeIDContext,
  IsAnimatingContext,
  LineWidthContext,
  LinkingVertexContext,
  SpeedContext,
  StepIDContext,
  VertexIDContext,
  VertexRadiusContext,
  VerticesContext,
  IsWeightedContext,
  EdgesContext,
  FontSizeContext,
} from './contexts'
import {
  TAlgorithm,
  TEdgeID,
  TEdge,
  TVertex,
  TStepID,
  TVertexID,
} from '../types'

export const CurrentAlgorithmContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<TAlgorithm>('dfs')

  const state = currentAlgorithm

  const set = (newAlgorithm: TAlgorithm) => {
    setCurrentAlgorithm(newAlgorithm)
  }

  const get = () => {
    return currentAlgorithm
  }

  return (
    <CurrentAlgorithmContext.Provider value={{ state, set, get }}>
      {children}
    </CurrentAlgorithmContext.Provider>
  )
}

export const EdgeIDContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const edgeID = useRef<TEdgeID>(0)

  const state = edgeID.current

  const set = (newEdgeID: TEdgeID) => {
    edgeID.current = newEdgeID
  }

  const get = () => {
    const prevEdgeID = edgeID.current++
    return prevEdgeID
  }

  const reset = () => {
    edgeID.current = 0
  }

  return (
    <EdgeIDContext.Provider value={{ state, set, get, reset }}>
      {children}
    </EdgeIDContext.Provider>
  )
}

export const EdgesContextProvider = ({ children }: { children: ReactNode }) => {
  const [edges, setEdges] = useState<TEdge[]>([])

  const state = edges

  const get = () => {
    return edges
  }

  const set = (newEdges: TEdge[]) => {
    setEdges(newEdges)
  }

  const add = (newEdge: TEdge) => {
    const updatedEdges = [...edges, newEdge]
    setEdges(updatedEdges)
  }

  const remove = (id: TEdgeID) => {
    const filteredEdges = edges.filter((edge) => edge.id !== id)
    setEdges(filteredEdges)
  }

  const reset = () => {
    setEdges([])
  }

  const update = (id: TEdgeID, updatedEdge: Partial<TEdge>) => {
    setEdges(
      edges.map((edge) => (edge.id === id ? { ...edge, ...updatedEdge } : edge))
    )
  }

  return (
    <EdgesContext.Provider
      value={{ state, get, set, add, remove, reset, update }}
    >
      {children}
    </EdgesContext.Provider>
  )
}

export const FontSizeContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [fontSize, setFontSize] = useState<number>(14)

  const state = fontSize

  const set = (newFontSize: number) => {
    setFontSize(newFontSize)
  }

  const get = () => {
    return fontSize
  }

  return (
    <FontSizeContext.Provider value={{ state, get, set }}>
      {children}
    </FontSizeContext.Provider>
  )
}

export const IsAnimatingContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const isAnimating = useRef<boolean>(false)

  const state = isAnimating.current

  const set = (newIsAnimatingValue: boolean) => {
    isAnimating.current = newIsAnimatingValue
  }

  const get = () => {
    return isAnimating.current
  }

  const reset = () => {
    isAnimating.current = false
  }

  return (
    <IsAnimatingContext.Provider value={{ state, get, set, reset }}>
      {children}
    </IsAnimatingContext.Provider>
  )
}

export const LineWidthContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [lineWidth, setLineWidth] = useState<number>(6)

  const state = lineWidth

  const set = (newLineWidth: number) => {
    setLineWidth(newLineWidth)
  }

  const get = () => {
    return lineWidth
  }

  return (
    <LineWidthContext.Provider value={{ state, get, set }}>
      {children}
    </LineWidthContext.Provider>
  )
}

export const LinkingVertexContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [linkingVertex, setLinkingVertex] = useState<TVertex | null>(null)

  const state = linkingVertex

  const set = (newlinkingVertex: TVertex) => {
    setLinkingVertex(newlinkingVertex)
  }

  const get = () => {
    return linkingVertex
  }

  const reset = () => {
    setLinkingVertex(null)
  }

  return (
    <LinkingVertexContext.Provider value={{ state, get, set, reset }}>
      {children}
    </LinkingVertexContext.Provider>
  )
}

export const SpeedContextProvider = ({ children }: { children: ReactNode }) => {
  const speed = useRef<number>(100)

  const state = speed.current

  const set = (newSpeed: number) => {
    speed.current = newSpeed
  }

  const get = () => {
    return speed.current
  }

  return (
    <SpeedContext.Provider value={{ state, get, set }}>
      {children}
    </SpeedContext.Provider>
  )
}

export const StepIDContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const stepID = useRef<TStepID>(0)
  const isForward = useRef<boolean>(true)

  const state = stepID.current

  const set = (newStepID: TStepID) => {
    stepID.current = newStepID
  }

  const get = () => {
    return stepID.current
  }

  const increment = () => {
    stepID.current = stepID.current + 1

    return bulk
  }

  const decrement = () => {
    stepID.current = stepID.current - 1

    return bulk
  }

  const forward = () => {
    if (isForward.current === false) {
      increment()
    }

    isForward.current = true

    return bulk
  }

  const backward = () => {
    if (isForward.current === true) {
      decrement().decrement()
    } else {
      decrement()
    }

    isForward.current = false

    return bulk
  }

  const reset = () => {
    stepID.current = 0
  }

  const bulk = {
    state,
    set,
    get,
    increment,
    decrement,
    forward,
    backward,
    reset,
  }

  return (
    <StepIDContext.Provider value={bulk}>{children}</StepIDContext.Provider>
  )
}

export const VertexIDContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const vertexId = useRef<TVertexID>(0)

  const state = vertexId.current

  const set = (newVertexId: TVertexID) => {
    vertexId.current = newVertexId
  }

  const get = () => {
    const prevVertexId = vertexId.current++
    return prevVertexId
  }

  const reset = () => {
    vertexId.current = 0
  }

  return (
    <VertexIDContext.Provider value={{ state, get, set, reset }}>
      {children}
    </VertexIDContext.Provider>
  )
}

export const VertexRadiusContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [vertexRadius, setVertexRadius] = useState<number>(20)

  const state = vertexRadius

  const set = (newVertexRadius: number) => {
    setVertexRadius(newVertexRadius)
  }

  const get = () => {
    return vertexRadius
  }

  return (
    <VertexRadiusContext.Provider value={{ state, get, set }}>
      {children}
    </VertexRadiusContext.Provider>
  )
}

export const VerticesContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [vertices, setVertices] = useState<TVertex[]>([])

  const state = vertices

  const get = () => {
    return vertices
  }

  const set = (newVertices: TVertex[]) => {
    setVertices(newVertices)
  }

  const add = (newVertex: TVertex) => {
    const updatedVertices = [...vertices, newVertex]
    setVertices(updatedVertices)
  }

  const remove = (id: TVertexID) => {
    const filteredVertices = vertices.filter((vertex) => vertex.id !== id)
    setVertices(filteredVertices)
  }

  const reset = () => {
    setVertices([])
  }

  return (
    <VerticesContext.Provider value={{ state, get, set, add, remove, reset }}>
      {children}
    </VerticesContext.Provider>
  )
}

export const IsWeightedContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [isWeighted, setIsWeighted] = useState<boolean>(false)

  return (
    <IsWeightedContext.Provider value={{ isWeighted, setIsWeighted }}>
      {children}
    </IsWeightedContext.Provider>
  )
}

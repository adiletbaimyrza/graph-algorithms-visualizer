import { createContext } from 'react'
import {
  TAlgorithm,
  TEdgeID,
  TEdge,
  TVertex,
  TStepID,
  TVertexID,
} from '../types'

export type TCurrentAlgorithmContext = {
  state: TAlgorithm
  get: () => TAlgorithm
  set: (newAlgorithm: TAlgorithm) => void
}
export const CurrentAlgorithmContext = createContext<
  TCurrentAlgorithmContext | undefined
>(undefined)

export type TEdgeIDContext = {
  state: number
  get: () => number
  set: (newEdgeID: TEdgeID) => void
  reset: () => void
}
export const EdgeIDContext = createContext<TEdgeIDContext | undefined>(
  undefined
)

export type TEdgesContext = {
  state: TEdge[]
  get: () => TEdge[]
  set: (newEdges: TEdge[]) => void
  add: (newEdge: TEdge) => void
  remove: (id: TEdgeID) => void
  reset: () => void
}
export const EdgesContext = createContext<TEdgesContext | undefined>(undefined)

export type TFontSizeContext = {
  state: number
  get: () => number
  set: (newFontSize: number) => void
}
export const FontSizeContext = createContext<TFontSizeContext | undefined>(
  undefined
)

export type TIsAnimatingContext = {
  state: boolean
  get: () => boolean
  set: (newIsAnimatingValue: boolean) => void
  reset: () => void
}
export const IsAnimatingContext = createContext<
  TIsAnimatingContext | undefined
>(undefined)

export type TLineWidthContext = {
  state: number
  get: () => number
  set: (newLineWidth: number) => void
}
export const LineWidthContext = createContext<TLineWidthContext | undefined>(
  undefined
)

export type TLinkingVertexContext = {
  state: TVertex | null
  get: () => TVertex | null
  set: (newlinkingVertex: TVertex) => void
  reset: () => void
}
export const LinkingVertexContext = createContext<
  TLinkingVertexContext | undefined
>(undefined)

export type TSpeedContext = {
  state: number
  get: () => number
  set: (newSpeed: number) => void
}
export const SpeedContext = createContext<TSpeedContext | undefined>(undefined)

export type TStepIDContext = {
  state: TStepID
  get: () => TStepID
  set: (newStepID: TStepID) => void
  increment: () => TStepIDContext
  decrement: () => TStepIDContext
  forward: () => TStepIDContext
  backward: () => TStepIDContext
  reset: () => void
}
export const StepIDContext = createContext<TStepIDContext | undefined>(
  undefined
)

export type TVertexIDContext = {
  state: TVertexID
  get: () => TVertexID
  set: (newVertexId: TVertexID) => void
  reset: () => void
}
export const VertexIDContext = createContext<TVertexIDContext | undefined>(
  undefined
)

export type TVertexRadiusContext = {
  state: number
  get: () => number
  set: (newVertexRadius: number) => void
}
export const VertexRadiusContext = createContext<
  TVertexRadiusContext | undefined
>(undefined)

export type TVerticesContext = {
  state: TVertex[]
  get: () => TVertex[]
  set: (newVertices: TVertex[]) => void
  add: (newVertex: TVertex) => void
  remove: (id: TVertexID) => void
  reset: () => void
}
export const VerticesContext = createContext<TVerticesContext | undefined>(
  undefined
)

export type TIsWeightedContext = {
  isWeighted: boolean
  setIsWeighted: React.Dispatch<React.SetStateAction<boolean>>
}
export const IsWeightedContext = createContext<TIsWeightedContext | undefined>(
  undefined
)

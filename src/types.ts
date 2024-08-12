export type TVertex = {
  id: TVertexID
  x: TCoord
  y: TCoord
}

export type TEdge = {
  id: TEdgeID
  vx1: TVertex
  vx2: TVertex
  weight: TWeight | undefined
}

export type TStep = {
  id: TStepID
  dsc: string
  cdId: TCodeID
  anim: TAnimation
  vxId: TVertexID | undefined
  dgId: TEdgeID | undefined
  vxId2: TVertexID | undefined
}

export type TAdjacencyList = Map<TVertexID, TVertexID[]>

export type TAlgorithm = 'dfs' | 'bfs' | 'prim' | 'kruskal' | 'dijkstra'

export type TAnimation =
  | 'Check'
  | 'Push'
  | 'Pop'
  | 'Visit'
  | 'NoAction'
  | 'Reverse'

export type TEdgeID = number

export type TVertexID = number

export type TStepID = number

export type TCodeID = number

export type TWeight = number

export type TCoord = number

export type TGraphSize = 'xs' | 's' | 'm' | 'l' | 'xl'

export type TPaths = Map<TVertexID, Map<TVertexID, TEdgeID>>

export type TWeightedPaths = Map<TVertexID, Map<TVertexID, number[]>>

export type TVertex = {
  id: TVxId
  x: number
  y: number
}

export type TEdge = {
  id: TVxId
  vx1: TVertex
  vx2: TVertex
  weight: TWeight | undefined
}

export type TStep = {
  id: number
  dsc: string
  cdId: number
  anim: TAnim
  vxId: TVxId | undefined
  dgId: TDgId | undefined
  vxId2: TVxId | undefined
}

export type TAdjList = Map<TVxId, TVxId[]>

export type TAlgo = 'dfs' | 'bfs' | 'prim' | 'kruskal' | 'dijkstra'

export type TAnim = 'Check' | 'Push' | 'Pop' | 'Visit' | 'NoAction' | 'Reverse'

export type TDgId = number

export type TVxId = number

export type TWeight = number

export type TGraphSize = 'xs' | 's' | 'm' | 'l' | 'xl'

export type TPaths = Map<TVxId, Map<TVxId, TDgId>>

export type TWeightPaths = Map<TVxId, Map<TVxId, number[]>>

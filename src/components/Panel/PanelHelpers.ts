import { TAdjacencyList } from '../../types'

const findSmallestVx = (adj: TAdjacencyList) => {
  const vxs = adj.keys()

  return Math.min(...vxs)
}

export { findSmallestVx }

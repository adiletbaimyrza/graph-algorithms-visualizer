import { TAdjList } from '../../types'

const findSmallestVx = (adj: TAdjList) => {
  const vxs = adj.keys()

  return Math.min(...vxs)
}

export { findSmallestVx }

import TAdjList from '../../types/TAdjList'

const findSmallestVx = (adj: TAdjList) => {
  const vxs = adj.keys()

  return Math.min(...vxs)
}

export { findSmallestVx }

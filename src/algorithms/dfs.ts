import { TAdjList } from '../types'

const dfsTraverse = (startVx: number, adj: TAdjList) => {
  const stack = [startVx]

  const visited = new Set<number>()

  while (stack.length > 0) {
    const curVx: number = stack.pop()!

    if (!visited.has(curVx)) {
      visited.add(curVx)

      const neighbors = adj.get(curVx)!

      neighbors.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          stack.push(neighbor)
        }
      })
    }
  }
}

export default dfsTraverse

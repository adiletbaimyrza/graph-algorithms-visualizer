import StepTracker from './StepTracker'
import { TAdjList } from '../types'
import TPaths from '../types/TPaths'

const dfsTraverse = (startVx: number, adj: TAdjList, paths: TPaths) => {
  const rec = new StepTracker()
  rec.dsc('Start DFS').cdId(0).anim('NoAction').add()

  const stack = [startVx]
  rec
    .dsc(`Init stack with start vertex ${startVx}`)
    .cdId(1)
    .anim('Push')
    .vxId(startVx)

  const visited = new Set<number>()
  rec.dsc('Init empty set for visited vertices').cdId(2).anim('NoAction')

  while (stack.length > 0) {
    rec.dsc('Vertices still to visit, continue loop').cdId(3).anim('NoAction')

    const curVx: number = stack.pop()!
    // TODO
    rec.dsc(`Pop vertex ${curVx} from stack`).cdId(4).anim('Pop').vxId(curVx)

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

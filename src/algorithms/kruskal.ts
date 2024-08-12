import DisjointSet from './DisjointSet'
import StepTracker from './StepTracker'
import { TVertex, TEdge } from '../types'

const kruskal = (vertices: TVertex[], edges: TEdge[]) => {
  const step = new StepTracker()
  step.add("Start Kruskal's algorithm", 0, 'NoAction')

  const vxIds = vertices.map((vx) => vx.id)

  const disjointSet = new DisjointSet(vxIds)
  step.add('Initialize disjoint set', 1, 'NoAction')

  const mst: TEdge[] = []
  step.add('Init mst', 2, 'NoAction')

  const sortedDgs = edges.slice().sort((a, b) => a.weight! - b.weight!)
  step.add('Sort edges by weight', 3, 'NoAction')

  sortedDgs.forEach((dg) => {
    step.add(
      `Iterate over sorted edges: Current (${dg.vx1.id}, ${dg.vx2.id})`,
      4,
      'NoAction'
    )

    const { vx1, vx2, weight }: TEdge = dg

    step.add(
      `Processing edge (${vx1.id}, ${vx2.id}) with weight ${weight}`,
      5,
      'Pop',
      vx1.id,
      dg.id,
      vx2.id
    )
    step.add(
      `Processing edge (${vx1.id}, ${vx2.id}) with weight ${weight}`,
      5,
      'Reverse',
      vx1.id,
      dg.id,
      vx2.id
    )

    if (!disjointSet.isConnected(vx1.id, vx2.id)) {
      step.add(
        `Check if ${vx1.id} and ${vx2.id} form a cycle`,
        6,
        'Check',
        vx2.id,
        dg.id,
        vx1.id
      )

      mst.push(dg)
      step.add(
        `Add edge (${vx1.id}, ${vx2.id}) to MST`,
        7,
        'Visit',
        vx1.id,
        dg.id,
        vx2.id
      )

      disjointSet.union(vx1.id, vx2.id)
      // add step there
    } else {
      step.add(
        `Check if ${vx1.id} and ${vx2.id} form a cycle`,
        6,
        'Check',
        vx2.id,
        dg.id,
        vx1.id
      )
      step.add(
        `Vertices ${vx1.id} and ${vx2.id} form a cycle`,
        9,
        'Reverse',
        vx2.id,
        dg.id,
        vx1.id
      )
    }
  })
  step.add(`Iterate over sorted edges`, 4, 'NoAction')
  step.add(`Iteration finished. Exit For loop`, 10, 'NoAction')

  step.add("Finish Kruskal's algorithm", 11, 'NoAction')
  return step.getTotalSteps()
}

export default kruskal

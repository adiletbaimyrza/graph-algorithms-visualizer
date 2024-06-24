import {
  animateContinue,
  createAdjList,
  dfs,
  bfs,
  useRandomGraph,
} from '../../algorithms'
import { useCurrentAlgo, useVertices, useEdges } from '../../contexts'

const Panel = () => {
  const generate = useRandomGraph()
  const currentAlgo = useCurrentAlgo()
  const vertices = useVertices()
  const edges = useEdges()

  return (
    <div className="bg-slate-200">
      <button
        className="py-2 px-5 bg-amber-700 border border-zinc-600"
        onClick={() => {
          generate('xs')
        }}
      >
        xs
      </button>
      <button
        className="py-2 px-5 bg-amber-700 border border-zinc-600"
        onClick={() => {
          generate('s')
        }}
      >
        s
      </button>
      <button
        className="py-2 px-5 bg-amber-700 border border-zinc-600"
        onClick={() => {
          generate('m')
        }}
      >
        m
      </button>
      <button
        className="py-2 px-5 bg-amber-700 border border-zinc-600"
        onClick={() => {
          generate('l')
        }}
      >
        l
      </button>
      <button
        className="py-2 px-5 bg-amber-700 border border-zinc-600"
        onClick={() => {
          generate('xl')
        }}
      >
        xl
      </button>
      <button
        className="py-2 px-5 bg-amber-700 border border-zinc-600"
        onClick={() => {
          currentAlgo.set('dfs')
        }}
      >
        dfs
      </button>
      <button
        className="py-2 px-5 bg-amber-700 border border-zinc-600"
        onClick={() => {
          currentAlgo.set('bfs')
        }}
      >
        bfs
      </button>
      <button className="py-2 px-5 bg-green-700 border border-zinc-600">
        prev
      </button>
      <button
        className="py-2 px-5 bg-green-700 border border-zinc-600"
        onClick={() => {
          const adj = createAdjList(vertices.get(), edges.get())
          if (currentAlgo.get() === 'dfs') {
            animateContinue(dfs(0, adj))
          } else {
            animateContinue(bfs(0, adj))
          }
        }}
      >
        play/stop
      </button>

      <button className="py-2 px-5 bg-green-700 border border-zinc-600">
        next
      </button>
    </div>
  )
}

export default Panel

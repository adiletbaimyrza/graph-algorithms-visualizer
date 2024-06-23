import { useRandomGraph } from '../../algorithms'
import { useCurrentAlgo } from '../../contexts'

const Panel = () => {
  const generate = useRandomGraph()
  const currentAlgo = useCurrentAlgo()

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
      <button
        className="py-2 px-5 bg-green-700 border border-zinc-600"
        onClick={() => {
          console.log('run algorithm')
        }}
      >
        RUN
      </button>
    </div>
  )
}

export default Panel

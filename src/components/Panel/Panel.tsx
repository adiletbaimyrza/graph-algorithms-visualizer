import {
  animateStartFrom,
  createAdjList,
  dfs,
  bfs,
  useRandomGraph,
  animateFinishUntil,
} from '../../algorithms'
import {
  useCurrentAlgo,
  useVertices,
  useEdges,
  useStepId,
  useIsAnimating,
} from '../../contexts'

const Panel = () => {
  const generate = useRandomGraph()
  const currentAlgo = useCurrentAlgo()
  const vertices = useVertices()
  const edges = useEdges()
  const stepId = useStepId()
  const isAnimating = useIsAnimating()

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
          const adj = createAdjList(vertices.get(), edges.get())

          if (currentAlgo.get() === 'dfs') {
            animateFinishUntil(
              dfs(0, adj),
              stepId.decrement().get(),
              stepId.set
            )
          } else {
            animateFinishUntil(
              bfs(0, adj),
              stepId.decrement().get(),
              stepId.set
            )
          }

          stepId.set(stepId.get() - 1)
        }}
      >
        prev
      </button>
      <button
        className="py-2 px-5 bg-green-700 border border-zinc-600"
        onClick={() => {
          if (isAnimating.get()) {
            isAnimating.set(false)
          } else {
            isAnimating.set(true)

            const adj = createAdjList(vertices.get(), edges.get())

            if (currentAlgo.get() === 'dfs') {
              animateStartFrom(
                dfs(0, adj),
                stepId.get(),
                stepId.set,
                isAnimating.get
              )
            } else {
              animateStartFrom(
                bfs(0, adj),
                stepId.get(),
                stepId.set,
                isAnimating.get
              )
            }
          }
        }}
      >
        {isAnimating.get() ? 'stop' : 'play'}{' '}
        {/* Toggle button label based on animation state */}
      </button>

      <button
        className="py-2 px-5 bg-green-700 border border-zinc-600"
        onClick={() => {
          const adj = createAdjList(vertices.get(), edges.get())

          if (currentAlgo.get() === 'dfs') {
            animateFinishUntil(
              dfs(0, adj),
              stepId.increment().get(),
              stepId.set
            )
          } else {
            animateFinishUntil(
              bfs(0, adj),
              stepId.increment().get(),
              stepId.set
            )
          }

          stepId.set(stepId.get())
        }}
      >
        next
      </button>
    </div>
  )
}

export default Panel

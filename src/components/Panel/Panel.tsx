import { useEffect, useRef } from 'react'
import {
  useCurrentAlgo,
  useVertices,
  useEdges,
  useStepId,
  useIsAnimating,
  useLinkingVertex,
  useEdgeId,
  useVertexId,
} from '../../contexts'
import { createAdjList, dfs, bfs, useRandomGraph } from '../../algorithms'
import {
  completeAnimations,
  startAnimations,
  resetStyles,
} from '../../animations'
import { findSmallestVx } from './PanelHelpers'
import graphSizes from './graphSizes'
import { TGraphSize, TStep } from '../../types'
import createPaths from '../../algorithms/createPaths'

const Panel = () => {
  const vertices = useVertices()
  const edges = useEdges()
  const vertexId = useVertexId()
  const edgeId = useEdgeId()
  const stepId = useStepId()
  const currentAlgo = useCurrentAlgo()
  const isAnimating = useIsAnimating()
  const linkingVertex = useLinkingVertex()
  const generate = useRandomGraph()
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const fired = useRef(false)

  const execAlgo = () => {
    const adj = createAdjList(vertices.get(), edges.get())
    const paths = createPaths(vertices.get(), edges.get(), adj)
    const vx = findSmallestVx(adj)

    let steps: TStep[]

    switch (currentAlgo.get()) {
      case 'dfs':
        steps = dfs(vx, adj, paths)
        break
      case 'bfs':
        steps = bfs(vx, adj, paths)
        break
    }

    return steps
  }

  const next = () => {
    const steps = execAlgo()

    if (stepId.get() < steps.length) {
      completeAnimations(steps, stepId.forward().get())
      stepId.increment()
    } else {
      console.warn('Attempt to increment stepId beyond last step')
    }
  }

  const prev = () => {
    const steps = execAlgo()

    if (stepId.get() > 0) {
      completeAnimations(steps, stepId.backward().get())
    } else {
      console.warn('Attempt to decrement stepId beyond first step')
    }
  }

  const play = () => {
    isAnimating.set(true)

    const steps = execAlgo()

    startAnimations(steps, stepId.get(), stepId.set, isAnimating.get, 10)
  }

  const stop = () => {
    isAnimating.set(false)
  }

  const randGraphBySize = (event: React.MouseEvent) => {
    generate((event.target as HTMLButtonElement).value as TGraphSize)
  }

  const reset = () => {
    isAnimating.reset()
    linkingVertex.reset()
    vertexId.reset()
    edgeId.reset()
    stepId.reset()

    resetStyles()
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!fired.current) {
        if (event.key === 'ArrowRight') {
          nextRef.current?.click()
        } else if (event.key === 'ArrowLeft') {
          prevRef.current?.click()
        }
        fired.current = true
      }
    }

    const handleKeyUp = () => {
      fired.current = false
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    // Cleanup function to remove the event listeners
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const deleteGraph = () => {
    vertices.reset()
    edges.reset()
    isAnimating.reset()
    linkingVertex.reset()
    vertexId.reset()
    edgeId.reset()
    stepId.reset()

    resetStyles()
  }

  return (
    <div className="bg-slate-200">
      {graphSizes.map((size) => (
        <button
          key={size}
          value={size}
          className="py-2 px-5 bg-amber-700 border border-zinc-600"
          onClick={randGraphBySize}
        >
          {size}
        </button>
      ))}

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
        ref={prevRef}
        className="py-2 px-5 bg-green-700 border border-zinc-600"
        onClick={prev}
      >
        prev
      </button>
      <button
        className="py-2 px-5 bg-green-700 border border-zinc-600"
        onClick={play}
      >
        play
      </button>
      <button
        className="py-2 px-5 bg-green-700 border border-zinc-600"
        onClick={stop}
      >
        stop
      </button>

      <button
        ref={nextRef}
        className="py-2 px-5 bg-green-700 border border-zinc-600"
        onClick={next}
      >
        next
      </button>
      <button
        className="py-2 px-5 bg-green-700 border border-zinc-600"
        onClick={reset}
      >
        reset
      </button>
      <button
        className="py-2 px-5 bg-green-700 border border-zinc-600"
        onClick={deleteGraph}
      >
        delete
      </button>
    </div>
  )
}

export default Panel

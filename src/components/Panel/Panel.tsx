import { useEffect, useRef } from 'react'
import {
  useCurrentAlgorithmContext,
  useEdgeIDContext,
  useEdgesContext,
  useIsAnimatingContext,
  useIsWeightedContext,
  useLinkingVertexContext,
  useSpeedContext,
  useStepIDContext,
  useVertexIDContext,
  useVerticesContext,
} from '../../store/hooks'
import createAdjList from '../../algorithms/createAdjList'
import dfs from '../../algorithms/dfs'
import bfs from '../../algorithms/bfs'
import useRandomGraph from '../../algorithms/useRandomGraph'
import completeAnimations from '../../animations/completeAnimations'
import startAnimations from '../../animations/startAnimations'
import { resetStyles } from '../../animations/animationHelpers'
import { findSmallestVx } from './PanelHelpers'
import graphSizes from './graphSizes'
import { TGraphSize, TStep } from '../../types'
import createPaths from '../../algorithms/createPaths'
import prim from '../../algorithms/prim'
import createWeightPaths from '../../algorithms/createWeightedPaths'
import kruskal from '../../algorithms/kruskal'
import dijkstra from '../../algorithms/dijkstra'

const Panel = () => {
  const vertices = useVerticesContext()
  const edges = useEdgesContext()
  const vertexId = useVertexIDContext()
  const edgeId = useEdgeIDContext()
  const stepId = useStepIDContext()
  const currentAlgo = useCurrentAlgorithmContext()
  const isAnimating = useIsAnimatingContext()
  const linkingVertex = useLinkingVertexContext()
  const speed = useSpeedContext()
  const { isWeighted, setIsWeighted } = useIsWeightedContext()
  const generate = useRandomGraph()
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const fired = useRef(false)

  const toggleIsWeighted = () => {
    setIsWeighted(!isWeighted)
  }

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
      case 'prim':
        steps = prim(
          vx,
          adj,
          createWeightPaths(vertices.get(), edges.get(), adj)
        )
        break
      case 'kruskal':
        steps = kruskal(vertices.get(), edges.get())
        break
      case 'dijkstra':
        steps = dijkstra(
          vx,
          vertices.get(),
          adj,
          createWeightPaths(vertices.get(), edges.get(), adj)
        )
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

    startAnimations(steps, stepId.get(), stepId.set, isAnimating.get, speed.get)
  }

  const stop = () => {
    isAnimating.set(false)
  }

  const randGraphBySize = (event: React.MouseEvent) => {
    generate((event.target as HTMLButtonElement).value as TGraphSize)
  }

  const reset = () => {
    isAnimating.set(false)

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
        className="py-2 px-5 bg-amber-700 border border-zinc-600"
        onClick={() => {
          currentAlgo.set('prim')
        }}
      >
        prim
      </button>
      <button
        className="py-2 px-5 bg-amber-700 border border-zinc-600"
        onClick={() => {
          currentAlgo.set('kruskal')
        }}
      >
        kruskal
      </button>
      <button
        className="py-2 px-5 bg-amber-700 border border-zinc-600"
        onClick={() => {
          currentAlgo.set('dijkstra')
        }}
      >
        dijkstra
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

      <button
        className="py-2 px-5 bg-lime-400 border border-zinc-600"
        onClick={() => speed.set(200)}
      >
        x0.5
      </button>
      <button
        className="py-2 px-5 bg-lime-400 border border-zinc-600"
        onClick={() => speed.set(100)}
      >
        x1
      </button>
      <button
        className="py-2 px-5 bg-lime-400 border border-zinc-600"
        onClick={() => speed.set(50)}
      >
        x2
      </button>
      <button
        className="py-2 px-5 bg-lime-400 border border-zinc-600"
        onClick={() => speed.set(25)}
      >
        x4
      </button>
      <button
        className="py-2 px-5 bg-lime-400 border border-zinc-600"
        onClick={() => speed.set(1)}
      >
        turbo
      </button>

      <button
        className="py-2 px-5 bg-sky-400 border border-zinc-600"
        onClick={toggleIsWeighted}
      >
        {isWeighted ? 'Unweighted' : 'Weighted'}
      </button>
    </div>
  )
}

export default Panel

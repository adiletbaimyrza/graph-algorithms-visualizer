import {
  useCurrentAlgo,
  useVertices,
  useEdges,
  useStepId,
  useIsAnimating,
} from '../../contexts'
import { createAdjList, dfs, bfs, useRandomGraph } from '../../algorithms'
import {
  animateFinishUntil,
  animateStartFrom,
  resetStyles,
} from '../../animations'
import graphSizes from './graphSizes'
import { TAdjList, TGraphSize } from '../../types'
import { useEffect, useRef } from 'react'

const Panel = () => {
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const fired = useRef(false)

  const vertices = useVertices()
  const edges = useEdges()
  const stepId = useStepId()
  const currentAlgo = useCurrentAlgo()
  const isAnimating = useIsAnimating()
  const generate = useRandomGraph()

  const next = () => {
    const adj: TAdjList = createAdjList(vertices.get(), edges.get())

    if (currentAlgo.get() === 'dfs') {
      const steps = dfs(0, adj)
      if (stepId.get() < steps.length - 1) {
        animateFinishUntil(steps, stepId.forward().get())
        stepId.increment()
      } else {
        console.warn('Attempt to increment stepId beyond last step')
      }
    } else {
      const steps = bfs(0, adj)
      if (stepId.get() < steps.length - 1) {
        animateFinishUntil(steps, stepId.forward().get())
        stepId.increment()
      } else {
        console.warn('Attempt to increment stepId beyond last step')
      }
    }
  }

  const prev = () => {
    const adj = createAdjList(vertices.get(), edges.get())

    if (currentAlgo.get() === 'dfs') {
      const steps = dfs(0, adj)
      if (stepId.get() > 0) {
        animateFinishUntil(steps, stepId.backward().get())
      } else {
        console.warn('Attempt to decrement stepId beyond first step')
      }
    } else {
      const steps = bfs(0, adj)
      if (stepId.get() > 0) {
        animateFinishUntil(steps, stepId.backward().get())
      } else {
        console.warn('Attempt to decrement stepId beyond first step')
      }
    }
  }

  const play = () => {
    isAnimating.set(true)

    const adj = createAdjList(vertices.get(), edges.get())

    if (currentAlgo.get() === 'dfs') {
      animateStartFrom(dfs(0, adj), stepId.get(), stepId.set, isAnimating.get)
    } else {
      animateStartFrom(bfs(0, adj), stepId.get(), stepId.set, isAnimating.get)
    }
  }

  const stop = () => {
    isAnimating.set(false)
  }

  const randGraphBySize = (event: React.MouseEvent) => {
    generate((event.target as HTMLButtonElement).value as TGraphSize)
  }

  const reset = () => {
    resetStyles()
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
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
    </div>
  )
}

export default Panel

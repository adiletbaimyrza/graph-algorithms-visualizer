import { useEffect } from 'react'
import Prism from 'prismjs'
import '../../prism.css'
import pseudocodes from './pseudocodes'
import { useCurrentAlgorithmContext } from '../../store/hooks'
import { TAlgorithm } from '../../types'

const getAlgorithmTitle = (algorithmType: TAlgorithm): string => {
  switch (algorithmType) {
    case 'bfs':
      return 'Breadth-First-Search Algorithm'
    case 'dfs':
      return 'Depth-First-Search Algorithm'
    case 'dijkstra':
      return "Dijkstra's Algorithm"
    case 'kruskal':
      return "Kruskal's MST Algorithm"
    case 'prim':
      return "Prim's MST Algorithm"
  }
}

const Pseudocode = () => {
  const currentAlgo = useCurrentAlgorithmContext()

  useEffect(() => {
    Prism.highlightAll()
  }, [currentAlgo])

  return (
    <div className="bg-slate-500">
      <h1 className="text-center text-xl p-2 text-stone-50">
        {getAlgorithmTitle(currentAlgo.get())}
      </h1>
      {pseudocodes[currentAlgo.get()].map((codeLine, index) => (
        <div key={index} className="relative">
          <span className="absolute left-0 w-8 text-right pr-2 text-gray-400 text-[0.9em]">
            {index + 1}
          </span>
          <pre
            id={`pseudo-${index}`}
            style={{ textIndent: `${codeLine.indent}px` }}
            className="pseudo bg-slate-600 pl-10"
          >
            <code className="language-javascript">{codeLine.content}</code>
          </pre>
        </div>
      ))}
      <div id="info"></div>
    </div>
  )
}

export default Pseudocode

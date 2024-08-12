import { useEffect } from 'react'
import Prism from 'prismjs'
import '../../prism.css'
import pseudocodes from './pseudocodes'
import { useCurrentAlgorithmContext } from '../../store/hooks'

const Pseudocode = () => {
  const currentAlgo = useCurrentAlgorithmContext()

  useEffect(() => {
    Prism.highlightAll()
  }, [currentAlgo])

  return (
    <div className=" bg-slate-500">
      {pseudocodes[currentAlgo.get()].map((codeLine, index) => (
        <pre
          key={index}
          id={`pseudo-${index}`}
          style={{ textIndent: `${codeLine.indent}px` }}
          className="pseudo bg-slate-600"
        >
          <code className="language-javascript">{codeLine.content}</code>
        </pre>
      ))}
      <div id="info"></div>
    </div>
  )
}

export default Pseudocode

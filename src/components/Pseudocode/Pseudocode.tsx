import { useCurrentAlgo } from '../../contexts'

import pseudocodes from './pseudocodes'

const Pseudocode = () => {
  const currentAlgo = useCurrentAlgo()

  return (
    <div className="w-[400px] bg-slate-500">
      {pseudocodes[currentAlgo.get()].map((codeLine, index) => (
        <p
          key={index}
          id={`pseudo-${index}`}
          style={{ textIndent: `${codeLine.indent}px` }}
          className="pseudo bg-slate-600"
        >
          {codeLine.content}
        </p>
      ))}
      <div id="info"></div>
    </div>
  )
}

export default Pseudocode

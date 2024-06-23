import { useCurrentAlgo } from '../../contexts'
import pseudocodes from './pseudocodes'

const Pseudocode = () => {
  const currentAlgo = useCurrentAlgo()

  return (
    <div className="min-w-[400px] bg-slate-500">
      {pseudocodes[currentAlgo.get()].map((codeLine, index) => (
        <p
          key={index}
          style={{ textIndent: `${codeLine.indent}px` }}
          className="bg-slate-600"
        >
          {codeLine.content}
        </p>
      ))}
    </div>
  )
}

export default Pseudocode

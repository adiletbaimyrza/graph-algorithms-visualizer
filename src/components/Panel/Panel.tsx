import { useRandomGraph } from '../../algorithms/useRandomGraph'

const Panel = () => {
  const generate = useRandomGraph()
  return (
    <div onClick={() => generate('s')} className="absolute">
      Panel
    </div>
  )
}

export default Panel

import { useRandomGraph } from '../../algorithms'

const Panel = () => {
  const generate = useRandomGraph()

  return (
    <div className="absolute bg-slate-200">
      <button
        className="p-2"
        onClick={() => {
          generate('xs')
        }}
      >
        xs
      </button>
      <button
        className="p-2"
        onClick={() => {
          generate('s')
        }}
      >
        s
      </button>
      <button
        className="p-2"
        onClick={() => {
          generate('m')
        }}
      >
        m
      </button>
      <button
        className="p-2"
        onClick={() => {
          generate('l')
        }}
      >
        l
      </button>
      <button
        className="p-2"
        onClick={() => {
          generate('xl')
        }}
      >
        xl
      </button>
    </div>
  )
}

export default Panel

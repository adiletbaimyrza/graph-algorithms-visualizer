import IVertex from '../../interfaces/IVertex'

const Vertex = ({ id, x, y }: IVertex) => {
  return (
    <g>
      <circle
        id={`circle-${id}`}
        cx={x}
        cy={y}
        r={30}
        className="stroke-slate-300 fill-slate-300"
      ></circle>
      <text>{id}</text>
    </g>
  )
}

export default Vertex

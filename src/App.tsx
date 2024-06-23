import { Canvas, Panel, Pseudocode } from './components'
import './App.css'

function App() {
  return (
    <div className="flex flex-col h-full">
      <Panel />
      <div className="flex flex-grow">
        <Pseudocode />
        <Canvas />
      </div>
    </div>
  )
}

export default App

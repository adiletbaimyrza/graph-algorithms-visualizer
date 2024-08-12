import Canvas from './components/Canvas/Canvas'
import Panel from './components/Panel/Panel'
import Pseudocode from './components/Pseudocode/Pseudocode'
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

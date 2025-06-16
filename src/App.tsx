import { useState } from 'react'
import './App.css'
import Dice from './Dice'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to pin it at its current value between rolls.</p>
      </div>
      <Dice count={10} />
     

    </>
  )
}

export default App

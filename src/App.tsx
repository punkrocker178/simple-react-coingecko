import { useState } from 'react'
import { Button } from './components/ui/button'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function increment() {
    setCount(count + 1)
  }
  return (
    <>
      <h1>
        Counter
      </h1>
      <Button className="button" type="button" onClick={increment}>Increment</Button>
      <p>Count: {count}</p>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TableComponent from './tableComponent'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TableComponent/>
    </>
  )
}

export default App

import { useState } from 'react'

import './App.css'
import Signup from './components/signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='p-5 bg-black text-white'>
        <Signup/>
      </div>
        
    </>
  )
}

export default App

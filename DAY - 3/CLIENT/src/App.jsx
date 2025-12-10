import { useState } from 'react'
import Home from './Home' 
import Greeting from './Greeting'
import Counter from './Counter'
import Button from './Buttons'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Hello React!</h1>
      <Home name = "Giri" />
      <Greeting name="Giri" />
      <Counter />
      <Button />
    </div>
  )
}

export default App

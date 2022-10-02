import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Animation} from "./drawing/Animation";

function App() {

  return (
    <div className="App">
     <h1>Skolestudio</h1>
     <Animation width={500} height={500}/>
  
    </div>
  )
}

export default App

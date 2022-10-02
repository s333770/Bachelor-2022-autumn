import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Animation} from "./drawing/Animation";
import { SlideButton } from './SlideButton/SlideButton';

function App() {

  return (
    <div className="App">
     <h1>Skolestudio</h1>
     <SlideButton></SlideButton>
     <Animation width={500} height={500}/>
  
    </div>
  )
}

export default App

import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Animation } from "./drawing/Animation";
import { SlideButton } from "./SlideButton/SlideButton";
import Canvas from "./drawing/canvas";

function App() {
  const drawArt=(context: CanvasRenderingContext2D)=>{
    context.fillStyle="blue";
    context.fillRect(0,0,100,120);
  }

  return (
    <div className="App">
      <h1>Skolestudio</h1>
      <SlideButton></SlideButton>
      <Canvas width={window.innerWidth} height={innerHeight} draw={drawArt} />
    </div>
  );
}

export default App;

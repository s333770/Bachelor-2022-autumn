import {  useEffect, useState } from "react";
import "./App.css";
import { SlideButton } from "./SlideButton/SlideButton";
import init, { Game } from "../applic/pkg/applic";
import Canvas from "./drawing/Canvas";
import CanvasJs from "./drawing/CanvasJs";
function App() {


 
  return (
    <div className="App">
      <div className="container" style={{display: "flex", flexDirection:"column"}}>
      <h1>Skolestudio</h1>
      WebAssembly
      <Canvas/>
      <br/>
      Javascript
      <CanvasJs/>
      </div>
    </div>
  );
}

export default App;

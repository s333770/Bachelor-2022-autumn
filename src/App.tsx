import {  useEffect, useState } from "react";
import "./App.css";
import { SlideButton } from "./SlideButton/SlideButton";
import init, { Game } from "../applic/pkg/applic";
import Canvas from "./drawing/Canvas";
function App() {


 
  return (
    <div className="App">
      <h1>Skolestudio</h1>
      <Canvas/>
    </div>
  );
}

export default App;

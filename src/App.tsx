import {  useEffect, useState } from "react";
import "./App.css";
import { SlideButton } from "./SlideButton/SlideButton";
import init, { Game } from "../applic/pkg/applic";
import Canvas from "./drawing/Canvas";
 export interface Bird {
  x: number;
  y: number;
  velocity: number;
  size: number;
}
function App() {

  const [bird, setBird] = useState<Bird>({ x: 0, y: 0, velocity: 0, size: 10 });
  useEffect(()=>{ init().then((_) => {
    const GameWorld: any = Game.new();
    const gameWidth = GameWorld.width();
    const gameHeight = GameWorld.height();
    const updateFunction=GameWorld.update();
    setBird({
      x: GameWorld.bird_x(),
      y: GameWorld.bird_y(),
      velocity: GameWorld.bird_velocity(),
      size: GameWorld.bird_size(),
    });
  });},[])
 
  return (
    <div className="App">
      <h1>Skolestudio</h1>
      <Canvas x={bird.x} y={bird.y} velocity={bird.velocity} size={bird.size}/>
    </div>
  );
}

export default App;

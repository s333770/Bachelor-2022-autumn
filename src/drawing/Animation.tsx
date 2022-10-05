import { useEffect, useRef, useState } from 'react';
import init, { Game } from "../../applic/pkg/applic";
interface Canvas{height:number, width: number}; 
interface Bird{x: number, y: number, velocity: number}
export const Animation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvas,setCanvas]=useState<Canvas>();
    const [bird,setBird]=useState<Bird>();
    init().then(_=>{
      const GameWorld: any=Game.new();
      const gameWidth=GameWorld.width();
      const gameHeight=GameWorld.height();
      setBird({x:GameWorld.bird_x(), y: GameWorld.bird_y(), velocity: GameWorld.bird_velocity() })
      setCanvas({height: gameHeight,width: gameWidth});
    })
    useEffect(() => {
      if (canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');  
          let x=0;
          if (context) {
              const renderFrame = () => {
              context.beginPath();  
              context.fillStyle="white";
              context.fillRect(0,0,canvas.width,canvas.height);
              context.arc(x, 75, 50, 0, 2 * Math.PI);
              context.fillStyle="red";
              context.stroke();
              context.fill();
              x++;
              };
          
              const tick = () => {
                if (!canvasRef.current) return;
                 context.clearRect(0, 0, canvas.width, canvas.height);                

                  renderFrame();
                  requestAnimationFrame(tick);
              };
                requestAnimationFrame(tick);
          }
        }},[]);    
    return <canvas ref={canvasRef} height={canvas?.height} width={canvas?.width} />
      }
  
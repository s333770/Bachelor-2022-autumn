import React, { useEffect, useRef } from "react";
import init, { Bird, Game } from "../../applic/pkg/applic";

const Canvas: React.FC= () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  let requestId:any,
  i = 0;

  useEffect(() => {
    init().then(wasm=>{

    const game=Game.new()

    const canvas = canvasRef.current;
    if (!canvas) {
    
      return;
    }
    canvas.width=600;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    document.addEventListener("keydown",(e)=>{
      switch(e.code){
          case "ArrowUp": 
             game.fly_upwards();
              break;
          case "Space": 
              game.fly_upwards();
               break;
      }})

  
    const render = () => {
      context.beginPath();
      context.fillStyle="blue";   
      context.fillRect(0,0, 600,400);
        context.beginPath();
        context.fillStyle="red";
      
        context.arc(
            canvas.width / 2,
            game.bird_y(),
            game.bird_size(),
            0,
            2 * Math.PI
        );
        game.gravity();
        context.fill();
        context.fillRect(game.get_current_counter(),0,game.get_pipe_width(),game.get_pipe_top());  
        context.fillRect(game.get_current_counter(),canvas.height, game.get_pipe_width(),-game.get_pipe2_bottom())
        game.update_spawn_rate();
        game.detect_collsion();
        requestId=requestAnimationFrame(render);
        return () => {
          cancelAnimationFrame(requestId);
        };
    }; 
    render();
   

  })
  }, []);
  return <canvas ref={canvasRef}  width={400} height={400}/>;
};

export default Canvas;

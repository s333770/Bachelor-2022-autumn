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
        context.fillRect(0,0,100,100);  
        console.log(game.get_random_number());

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

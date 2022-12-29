import { useEffect, useRef, useState } from "react";
import { BirdJs, worldHeight, worldWidth, PipeJs } from "../jsGame/Game";


const CanvasJs: React.FC= () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let requestId:any,
    i = 0,
    gameOver=false;
    // const [gameOver, setGameOver]=useState(false);
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }
      const bird=new BirdJs();
    var pipe=new PipeJs();
      document.addEventListener("keydown",(e)=>{
        switch(e.code){
            case "ArrowUp": 
          bird.flyUpwards();
                break;
            case "Space": 
        bird.flyUpwards();
                 break;
            case "Enter":
              gameOver=false;
        }});

        const detectCollision=(bird: BirdJs, pipe: PipeJs, xPosition: number)=>{
          if(bird.y+bird.size<=pipe.top/3 && xPosition<worldWidth/2+bird.size &&  xPosition>worldWidth/2-bird.size ){
            gameOver=true;
          }
          if(bird.y-bird.size >= worldHeight-pipe.bottom/2 && xPosition<worldWidth/2+bird.size &&  xPosition>worldWidth/2-bird.size){ 
           gameOver=true;
          }
        }
       
      const render = () => {
        context.beginPath();
        context.fillStyle="blue";   
        context.fillRect(0,0, 600,400);
          context.beginPath();
          context.fillStyle="red";
          context.arc(bird.x,bird.y,bird.size,0,2*Math.PI);
          context.fill();
          bird.update();
          i++;
          context.fillRect(pipe.pipe_spawn_rate-i, 0,pipe.width,pipe.top/3);
          context.fillRect(pipe.pipe_spawn_rate-i, worldHeight ,pipe.width ,-pipe.bottom/2);   
          detectCollision(bird,pipe,i);
          if(gameOver==true){
            context.font="30px Arial";
            context.fillText("Game over, press enter to restart", 10, 50);
          }

          if(i>=worldWidth && gameOver!==true){
            pipe=new PipeJs();
            i=0;
          }
          
       
          
          requestId=requestAnimationFrame(render);
          return () => {
            cancelAnimationFrame(requestId);
          };
      }; 
      render();
    }, []);

    return <canvas ref={canvasRef}  width={worldWidth} height={worldHeight}/>;
  };
 


 
  
  export default CanvasJs;
  
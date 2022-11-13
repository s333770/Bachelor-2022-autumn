import { useEffect, useRef } from "react";
import { BirdJs, worldHeight, worldWidth } from "../jsGame/Game";


const CanvasJs: React.FC= () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let requestId:any,
    i = 0;
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
      document.addEventListener("keydown",(e)=>{
        switch(e.code){
            case "ArrowUp": 
          bird.flyUpwards();
                break;
            case "Space": 
        bird.flyUpwards();
                 break;
        }});
       
      const render = () => {
        context.beginPath();
        context.fillStyle="blue";   
        context.fillRect(0,0, 600,400);
          context.beginPath();
          context.fillStyle="red";
          context.arc(bird.x,bird.y,bird.size,0,2*Math.PI);
          context.fill();
          bird.update();
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
  
import React, { useEffect, useRef } from "react";
import init from "../../applic/pkg/applic";
import { Bird } from "../App";



const Canvas: React.FC<Bird> = ({x, y,velocity,size}:Bird) => {
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

  
    const render = () => {
        context.beginPath();
        context.fillStyle="red";
        context.arc(
            canvas.width / 2,
            canvas.height / 2,
            size,
            i,
            2 * Math.PI
        );
        context.fill();   
         requestId=requestAnimationFrame(render);
         return () => {
            cancelAnimationFrame(requestId);
         };
   }; 
    render();
   


  }, []);
  return <canvas ref={canvasRef}  width={400} height={400}/>;
};

export default Canvas;

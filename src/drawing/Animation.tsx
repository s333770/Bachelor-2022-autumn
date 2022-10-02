import React, { useEffect, useRef } from 'react';
import * as bird from "../../public/bird1.png";
  interface AnimationProps {
    width: number;
    height: number;
}

export const Animation = ({ width, height }: AnimationProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
      if (canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');  
          let x=0;
          if (context) {
              context.beginPath();
              context.fillStyle="white"
              context.fillRect(0, 0, canvas.width, canvas.height);
              context.fill(); 

              const renderFrame = () => {
              context.beginPath();
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
        

    return <canvas ref={canvasRef} height={height} width={width} />
      }
  
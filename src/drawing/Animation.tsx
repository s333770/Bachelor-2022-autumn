import React, { useEffect, useRef } from 'react'
  
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
          if (context) {
              context.beginPath();
              context.fillStyle="white"
              context.fillRect(0, 0, canvas.width, canvas.height);

              context.fill(); 
          }
        }},[]);    

    return <canvas ref={canvasRef} height={height} width={width} />
      }
  
import { useEffect, useRef, useState } from "react";
import init, { Game } from "../../applic/pkg/applic";
interface Canvas {
  height: number;
  width: number;
}
interface Bird {
  x: number;
  y: number;
  velocity: number;
  size: number;
}
export const Animation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas>();
  const [bird, setBird] = useState<Bird>({ x: 0, y: 0, velocity: 0, size: 10 });
  init().then((_) => {
    const GameWorld: any = Game.new();
    const gameWidth = GameWorld.width();
    const gameHeight = GameWorld.height();
    setBird({
      x: GameWorld.bird_x(),
      y: GameWorld.bird_y(),
      velocity: GameWorld.bird_velocity(),
      size: GameWorld.bird_size(),
    });
    setCanvas({ height: gameHeight, width: gameWidth });
  });
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        const renderFrame = () => {
          context.beginPath();
          context.fillStyle = "white";
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.arc(bird.x, bird?.y, bird?.size, 0, 2 * Math.PI);
          context.fillStyle = "red";
          context.stroke();
          context.fill();
        };

        const tick = () => {
          if (!canvasRef.current) return;
          context.clearRect(0, 0, canvas.width, canvas.height);
          renderFrame();
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }
  }, []);
  return (
    <canvas ref={canvasRef} height={canvas?.height} width={canvas?.width} />
  );
};

"use client";
import React, { useEffect, useRef } from "react";

const GrindCanvasAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let animationFrameId: number | undefined = undefined;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 20;
    const gridColor = "black";
    const backgroundColor = "white";
    const lineColor = "black";
    const lineWidth = 1;

    const drawGrid = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = gridColor;
      ctx.lineWidth = lineWidth;

      for (let x = gridSize; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = gridSize; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();

      // Randomly generate slow motions of curving lines
      const numLines = 10;
      for (let i = 0; i < numLines; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        const endX = Math.random() * canvas.width;
        const endY = Math.random() * canvas.height;
        const controlX1 = Math.random() * canvas.width;
        const controlY1 = Math.random() * canvas.height;
        const controlX2 = Math.random() * canvas.width;
        const controlY2 = Math.random() * canvas.height;

        ctx.lineWidth = Math.random() * 2 + 1;
        ctx.strokeStyle = lineColor;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(
          controlX1,
          controlY1,
          controlX2,
          controlY2,
          endX,
          endY
        );
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default GrindCanvasAnimation;

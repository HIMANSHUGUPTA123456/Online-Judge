"use client";
import React, { useEffect } from "react";
import { createNoise3D } from "simplex-noise";

const AnimatedCanvasLight: React.FC = () => {
  useEffect(() => {
    const circleCount = 150;
    const circlePropCount = 8;
    const circlePropsLength = circleCount * circlePropCount;
    const baseSpeed = 1;
    const rangeSpeed = 1;
    const baseTTL = 150;
    const rangeTTL = 200;
    const baseRadius = 100;
    const rangeRadius = 200;
    const rangeHue = 60;
    const xOff = 0.0015;
    const yOff = 0.0015;
    const zOff = 0.0015;
    const lightBackgroundColor = "hsla(0,0%,95%,1)";

    let container: HTMLElement | null;
    let canvas: { a: HTMLCanvasElement; b: HTMLCanvasElement };
    let ctx: { a: CanvasRenderingContext2D; b: CanvasRenderingContext2D };
    let circleProps: Float32Array;
    const noise3D = createNoise3D();
    let baseHue = 220;

    function rand(max: number): number {
      return Math.random() * max;
    }

    function setup() {
      createCanvas();
      resize();
      initCircles();
      draw();
      window.addEventListener("resize", resize);
    }

    function initCircles() {
      circleProps = new Float32Array(circlePropsLength);

      for (let i = 0; i < circlePropsLength; i += circlePropCount) {
        initCircle(i);
      }
    }

    function initCircle(i: number) {
      const x: number = rand(canvas.a.width);
      const y = rand(canvas.a.height);
      const n = noise3D(x * xOff, y * yOff, baseHue * zOff);
      const t = rand(Math.PI * 2);
      const speed = baseSpeed + rand(rangeSpeed);
      const vx = speed * Math.cos(t);
      const vy = speed * Math.sin(t);
      const life = 0;
      const ttl = baseTTL + rand(rangeTTL);
      const radius = baseRadius + rand(rangeRadius);
      const hue = baseHue + n * rangeHue;

      circleProps.set([x, y, vx, vy, life, ttl, radius, hue], i);
    }

    function updateCircles() {
      baseHue++;
      for (let i = 0; i < circlePropsLength; i += circlePropCount) {
        updateCircle(i);
      }
    }

    function updateCircle(i: number) {
      const i2 = i + 1;
      const i3 = i + 2;
      const i4 = i + 3;
      const i5 = i + 4;
      const i6 = i + 5;
      const i7 = i + 6;
      const i8 = i + 7;
      const x = circleProps[i];
      const y = circleProps[i2];
      const vx = circleProps[i3];
      const vy = circleProps[i4];
      let life = circleProps[i5];
      const ttl = circleProps[i6];
      const radius = circleProps[i7];
      const hue = circleProps[i8];

      drawCircle(x, y, life, ttl, radius, hue);

      life++;

      circleProps[i] = x + vx;
      circleProps[i2] = y + vy;
      circleProps[i5] = life;

      if (checkBounds(x, y, radius) || life > ttl) {
        initCircle(i);
      }
    }

    function drawCircle(
      x: number,
      y: number,
      life: number,
      ttl: number,
      radius: number,
      hue: number
    ) {
      ctx.a.save();
      ctx.a.fillStyle = `hsla(${hue},60%,30%,${fadeInOut(life, ttl)})`;
      ctx.a.beginPath();
      ctx.a.arc(x, y, radius, 0, Math.PI * 2);
      ctx.a.fill();
      ctx.a.closePath();
      ctx.a.restore();
    }

    function checkBounds(x: number, y: number, radius: number) {
      return (
        x < -radius ||
        x > canvas.a.width + radius ||
        y < -radius ||
        y > canvas.a.height + radius
      );
    }

    function createCanvas() {
      container = document.querySelector(".content--canvas");
      if (!container) return;

      canvas = {
        a: document.createElement("canvas"),
        b: document.createElement("canvas"),
      };
      canvas.b.style.position = "fixed";
      canvas.b.style.top = "0";
      canvas.b.style.left = "0";
      canvas.b.style.width = "100%";
      canvas.b.style.height = "100%";
      container.appendChild(canvas.b);
      ctx = {
        a: canvas.a.getContext("2d") as CanvasRenderingContext2D,
        b: canvas.b.getContext("2d") as CanvasRenderingContext2D,
      };
    }

    function resize() {
      const { innerWidth, innerHeight } = window;

      canvas.a.width = innerWidth;
      canvas.a.height = innerHeight;

      ctx.a.drawImage(canvas.b, 0, 0);

      canvas.b.width = innerWidth;
      canvas.b.height = innerHeight;

      ctx.b.drawImage(canvas.a, 0, 0);
    }

    function render() {
      ctx.b.save();
      ctx.b.filter = "blur(50px)";
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();
    }

    function draw() {
      ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
      ctx.b.fillStyle = lightBackgroundColor;
      ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height);
      updateCircles();
      render();
      window.requestAnimationFrame(draw);
    }

    function fadeInOut(life: number, ttl: number) {
      const halfTTL = ttl / 2;
      return life < halfTTL ? life / halfTTL : 1 - (life - halfTTL) / halfTTL;
    }

    setup();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="content--canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default AnimatedCanvasLight;

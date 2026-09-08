"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const AREA_PER_NODE = 12000;
const MIN_NODES = 24;
const MAX_NODES = 130;
const CONNECT_DISTANCE = 140;
const CURSOR_RADIUS = 160;

type Node = { x: number; y: number; vx: number; vy: number };

// Signature hero visual: a constellation of drifting nodes with
// distance-based connecting lines, brightening near the cursor. Plain
// Canvas 2D (no new dependency), fully static under reduced-motion.
// Node count scales with canvas area so density stays consistent
// whether it's filling a small mobile hero or a wide desktop one.
export function NeuralCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frameId = 0;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      const count = Math.max(
        MIN_NODES,
        Math.min(MAX_NODES, Math.floor((width * height) / AREA_PER_NODE)),
      );
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < CONNECT_DISTANCE) {
            ctx!.strokeStyle = accent;
            ctx!.globalAlpha = (1 - dist / CONNECT_DISTANCE) * 0.25;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }

        const node = nodes[i];
        const distToMouse = Math.hypot(node.x - mouse.x, node.y - mouse.y);
        if (distToMouse < CURSOR_RADIUS) {
          ctx!.strokeStyle = accent;
          ctx!.globalAlpha = (1 - distToMouse / CURSOR_RADIUS) * 0.5;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(node.x, node.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
      }

      for (const node of nodes) {
        const near =
          Math.hypot(node.x - mouse.x, node.y - mouse.y) < CURSOR_RADIUS;
        ctx!.globalAlpha = near ? 0.9 : 0.5;
        ctx!.fillStyle = accent;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, near ? 2.5 : 1.5, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;

      if (!prefersReducedMotion) {
        frameId = requestAnimationFrame(draw);
      }
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function handlePointerLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function handleResize() {
      resize();
      seed();
      if (prefersReducedMotion) draw();
    }

    resize();
    seed();
    draw();

    // Listen on the parent (not the canvas itself): centered content
    // sits visually on top of the canvas as a sibling, so pointer
    // events over it would never reach a listener on the canvas alone
    // -- bubbling to the shared ancestor covers the whole hero area.
    const hitArea = canvas.parentElement ?? canvas;

    window.addEventListener("resize", handleResize);
    if (!prefersReducedMotion) {
      hitArea.addEventListener("pointermove", handlePointerMove);
      hitArea.addEventListener("pointerleave", handlePointerLeave);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      hitArea.removeEventListener("pointermove", handlePointerMove);
      hitArea.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`h-full w-full ${className}`}
    />
  );
}

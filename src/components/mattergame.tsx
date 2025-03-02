"use client"

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const MatterGame = () => {
  const sceneRef = useRef(null); // Ref untuk container canvas

  useEffect(() => {
    // Modul yang diperlukan dari Matter.js
    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

    // Buat engine
    const engine = Engine.create();
    const { world } = engine;

    // Buat renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      canvas: document.createElement("canvas"),
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: "#f4f4f4",
      },
    });

    // Tambahkan canvas ke DOM
    sceneRef.current.appendChild(render.canvas);

    // Buat objek fisika
    const ground = Bodies.rectangle(400, 590, 810, 60, { isStatic: true });
    const box = Bodies.rectangle(400, 200, 80, 80);
    const ball = Bodies.circle(400, 100, 40);

    // Tambahkan objek ke dunia
    World.add(world, [ground, box, ball]);

    // Setup mouse interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false, // Sembunyikan garis constraint
        },
      },
    });

    // Tambahkan mouse constraint ke dunia
    World.add(world, mouseConstraint);

    // Jalankan renderer dan engine
    Render.run(render);
    Runner.run(Runner.create(), engine);

    // Cleanup saat komponen di-unmount
    return () => {
      Render.stop(render);
      World.clear(world);
      Engine.clear(engine);
      sceneRef.current.removeChild(render.canvas);
    };
  }, []);

  return <div ref={sceneRef}></div>;
};

export default MatterGame;
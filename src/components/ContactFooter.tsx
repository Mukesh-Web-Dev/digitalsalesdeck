"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const contacts = [
  {
    name: "Natasha Freimark",
    title: "VP, Corporate Partnerships",
    company: "Mall of America",
    phone: "952.456.1104",
    email: "natasha.freimark@moa.net",
  },
  {
    name: "Kevin Robb",
    title: "Senior Director, Corporate Partnerships",
    company: "Mall of America",
    phone: "952.883.8910",
    email: "kevin.robb@moa.net",
  },
  {
    name: "Jen Martone",
    title: "Sr Account Executive, Corporate Partnerships",
    company: "Mall of America",
    phone: "612.380.7422",
    email: "jen.martone@moa.net",
  },
];

type TubesCursorApp = {
  tubes?: {
    setColors?: (colors: string[]) => void;
    setLightsColors?: (colors: string[]) => void;
  };
  destroy?: () => void;
  resize?: () => void;
};

export default function ContactFooter() {
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<TubesCursorApp | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.style.touchAction = "none";

    type TubesCursorModule = {
      default?: (
        canvas: HTMLCanvasElement,
        options: {
          tubes: {
            colors: string[];
            lights: {
              intensity: number;
              colors: string[];
            };
          };
        }
      ) => TubesCursorApp;
    };

    let app: TubesCursorApp | null = null;
    let isMounted = true;

    const loadCursor = async () => {
      try {
        const remoteUrl =
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
        const remoteModule = (await import(
          /* webpackIgnore: true */ remoteUrl
        )) as unknown as TubesCursorModule;
        const TubesCursor =
          (remoteModule.default ?? remoteModule) as (
            canvas: HTMLCanvasElement,
            options: {
              tubes: {
                colors: string[];
                lights: {
                  intensity: number;
                  colors: string[];
                };
              };
            }
          ) => TubesCursorApp;
        if (!isMounted || !canvas) return;

        app = TubesCursor(canvas, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
            },
          },
        });
        appRef.current = app;
      } catch (error) {
        console.error("Failed to load TubesCursor", error);
      }
    };

    loadCursor();

    const randomColors = (count: number) =>
      new Array(count)
        .fill(0)
        .map(
          () =>
            "#" + Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")
        );

    const handleClick = () => {
      const tubes = appRef.current?.tubes;
      if (!tubes) return;
      const colors = randomColors(3);
      const lightsColors = randomColors(4);
      tubes.setColors?.(colors);
      tubes.setLightsColors?.(lightsColors);
    };

    document.body.addEventListener("click", handleClick);

    const handleResize = () => {
      if (appRef.current?.resize) {
        appRef.current.resize();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      document.body.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      if (appRef.current?.destroy) {
        appRef.current.destroy();
      }
    };
  }, []);

  // 3D Star Model Setup
  useEffect(() => {
    if (!starCanvasRef.current) return;
    const canvas = starCanvasRef.current;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Force allow vertical scroll on touch devices
    canvas.style.touchAction = "pan-y";

    // Setup realistic lighting environment for true glassmorphism
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    let model: THREE.Group | null = null;
    let targetRotationX = Math.PI / 6;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const updateModelPosition = () => {
      if (!model) return;
      if (window.innerWidth < 768) {
        model.position.set(0, 1.3, 0); // Centered and elevated on mobile/tablet
        model.scale.set(0.07, 0.07, 0.07);
      } else {
        model.position.set(2.5, 1, 0); // Offset to the right on desktop
        model.scale.set(0.1, 0.1, 0.1);
      }
    };

    const loader = new GLTFLoader();
    loader.load("/model/star.glb", (gltf) => {
      model = gltf.scene;
      
      // Traverse the model to apply a glassmorphic material
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          // Create a perfectly clear crystal glass material
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff, // Pure clear base
            transmission: 1.0, // Fully transparent
            opacity: 1.0,
            transparent: true,
            roughness: 0.0, // 0 roughness removes the silvery/frosted look
            metalness: 0.0, // 0 metalness ensures pure glass, not mirror
            ior: 1.52, // Exact Index of Refraction for crystal/glass
            thickness: 2.0, // Internal refraction volume
            clearcoat: 1.0, // High-gloss outer reflection
            clearcoatRoughness: 0.0, // Perfectly smooth reflection
          });
        }
      });

      model.rotation.x = targetRotationX;
      scene.add(model);
      updateModelPosition();
    });

    // Custom Professional Interaction (Scroll Safe)
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;
      
      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;
      
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (model) {
        // Auto rotate slowly if not dragging
        if (!isDragging) {
          targetRotationY -= 0.005;
        }
        
        // Smoothly interpolate (lerp) current rotation to target rotation
        model.rotation.y += (targetRotationY - model.rotation.y) * 0.1;
        model.rotation.x += (targetRotationX - model.rotation.x) * 0.1;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateModelPosition();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const cursorDot = document.getElementById("contact-cursor");
    const cursorRing = document.getElementById("contact-cursor-ring");
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let frameId: number;

    const onMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || !cursorDot || !cursorRing) return;
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      cursorDot.style.opacity = inside ? "1" : "0";
      cursorRing.style.opacity = inside ? "1" : "0";
      mx = event.clientX;
      my = event.clientY;
      cursorDot.style.left = `${mx}px`;
      cursorDot.style.top = `${my}px`;
    };

    const animateCursor = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      const cursorRingEl = document.getElementById("contact-cursor-ring");
      if (cursorRingEl) {
        cursorRingEl.style.left = `${rx}px`;
        cursorRingEl.style.top = `${ry}px`;
      }
      frameId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", onMouseMove);
    animateCursor();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-[#050505] text-[#eee8de] select-none cursor-none flex flex-col justify-center"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* 3D Star Canvas */}
      <canvas
        ref={starCanvasRef}
        className="absolute inset-0 w-full h-full object-cover z-10"
      />

      <div
        id="contact-cursor"
        className="pointer-events-none fixed z-50 h-3 w-3 rounded-full bg-white transition-opacity duration-200 hidden md:block"
      />
      <div
        id="contact-cursor-ring"
        className="pointer-events-none fixed z-50 h-12 w-12 rounded-full border border-white/40 transition-opacity duration-200 hidden md:block"
      />

      <div className="relative z-20 mx-auto flex w-full max-w-4xl flex-col justify-center px-6 md:px-12 text-center pointer-events-none">
        <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-[#eee8de]/70 mb-4">
          Contact Us
        </p>
        <h2 className="text-2xl md:text-4xl font-semibold uppercase text-white mb-8">
          Mall of America Partnerships
        </h2>

        <div className="space-y-6 md:space-y-0 text-center md:text-left text-sm md:text-base flex flex-col md:flex-row justify-between gap-6 md:gap-8 leading-relaxed md:leading-8 text-[#eee8de]/90">
          {contacts.map((contact, idx) => (
            <div key={idx} className="mb-0">
              <p className="font-semibold text-white">{contact.name}</p>
              <p>
                {contact.title}
                <br />
                {contact.company}
              </p>
              <p>
                <a
                  href={`tel:${contact.phone.replace(/\./g, "")}`}
                  className="pointer-events-auto underline decoration-[#ff6a2d]/50 hover:text-[#ff6a2d]"
                >
                  {contact.phone}
                </a>
                <br />
                <a
                  href={`mailto:${contact.email}`}
                  className="pointer-events-auto underline decoration-[#ff6a2d]/50 hover:text-[#ff6a2d]"
                >
                  {contact.email}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

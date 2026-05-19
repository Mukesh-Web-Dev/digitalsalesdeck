"use client";

import { useEffect } from "react";

export default function ClickSpark() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Define and register the custom element if not already registered
    if (!customElements.get("click-spark")) {
      class ClickSparkElement extends HTMLElement {
        private svg!: SVGElement;

        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }

        connectedCallback() {
          this.shadowRoot!.innerHTML = this.createSpark();
          this.svg = this.shadowRoot!.querySelector("svg") as SVGElement;
        }

        /**
         * Triggers the line animations for the sparks radiating outwards.
         */
        animateSpark() {
          const sparks = [...this.svg.children] as SVGLineElement[];
          if (sparks.length === 0) return;

          const y1Attr = sparks[0].getAttribute("y1");
          const size = y1Attr ? parseInt(y1Attr) : 30;
          const offset = size / 2 + "px";

          const keyframes = (i: number) => {
            const deg = `calc(${i} * (360deg / ${sparks.length}))`;

            return [
              {
                "stroke-dashoffset": size * 3,
                transform: `rotate(${deg}) translateY(${offset})`
              },
              {
                "stroke-dashoffset": size,
                transform: `rotate(${deg}) translateY(0)`
              }
            ];
          };

          const options = {
            duration: 660,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
            fill: "forwards" as const
          };

          sparks.forEach((spark, i) => {
            if (typeof spark.animate === "function") {
              spark.animate(keyframes(i), options);
            }
          });
        }

        createSpark() {
          return `
            <style>
              :host {
                position: fixed;
                pointer-events: none;
                display: block;
                width: 100px;
                height: 100px;
                z-index: 2147483647;
                --click-spark-color: #d4af37;
              }
              svg {
                display: block;
                width: 100%;
                height: 100%;
              }
              line {
                transform-origin: 50px 50px;
              }
            </style>
            <svg viewBox="0 0 100 100" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke="var(--click-spark-color, currentcolor)" transform="rotate(-20)">
              ${Array.from(
                { length: 8 },
                (_) =>
                  `<line x1="50" y1="30" x2="50" y2="4" stroke-dasharray="30" stroke-dashoffset="30" />`
              ).join("")}
            </svg>
          `;
        }
      }

      customElements.define("click-spark", ClickSparkElement);
    }

    /**
     * Global capture phase click handler
     * Captures every click on the page instantly, even through smooth scrolls or layout sections.
     */
    const handleClick = (e: MouseEvent) => {
      // console.log("ClickSpark triggered at", e.clientX, e.clientY);

      const spark = document.createElement("click-spark") as HTMLElement & { animateSpark: () => void };
      
      // Position the spark container center exactly under the mouse pointer
      spark.style.left = e.clientX - 50 + "px";
      spark.style.top = e.clientY - 50 + "px";

      document.body.appendChild(spark);

      // Trigger the Web Animations API on the lines once the element connects
      requestAnimationFrame(() => {
        if (typeof spark.animateSpark === "function") {
          spark.animateSpark();
        }
      });

      // Automatically clean up the DOM once the animation is complete (660ms duration)
      setTimeout(() => {
        spark.remove();
      }, 1000);
    };

    // Attach to window using capturing phase so no child stopPropagation blocks it
    window.addEventListener("click", handleClick, { capture: true });

    return () => {
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return null;
}

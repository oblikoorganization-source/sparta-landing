"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const dot = ref.current!;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.classList.remove("hidden");
    };
    const leave = () => dot.classList.add("hidden");
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      dot.classList.toggle(
        "hover",
        !!el.closest("a, button, .gal__item, .chip, input, textarea, select")
      );
      // black cursor over ANY red — fills AND red text (red-on-red inverts to cyan).
      // 1) red text + components that are red whenever the pointer is on them
      //    (always-red, or red-on-hover — being "over" it === it's hovered === red)
      let red = !!el.closest(
        ".btn--solid, .inv__cta, .chip.active, " +
          ".loc-chips span, .clubv6__vals li, .stx2--0 .st, " +
          ".red, .l1"
      );
      // 2) walk up to the first opaque background and check if it's red —
      //    auto-covers every red FILL incl. :hover states (chips, etc.)
      if (!red) {
        let node: HTMLElement | null = el;
        while (node && node !== document.body) {
          const bg = getComputedStyle(node).backgroundColor;
          const m = bg.match(/rgba?\(([^)]+)\)/);
          if (m) {
            const [r, g, b, a = 1] = m[1].split(",").map((s) => parseFloat(s));
            if (a > 0.5) {
              if (r > 120 && r > g * 1.7 && r > b * 1.7) red = true;
              break;
            }
          }
          node = node.parentElement;
        }
      }
      dot.classList.toggle("dark", red);
    };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      dot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    loop();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor hidden" aria-hidden="true" />;
}

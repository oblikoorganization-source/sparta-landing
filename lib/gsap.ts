/**
 * Центральна ініціалізація GSAP для проєкту «Спарта».
 * gsap 3.13 → SplitText / CustomEase безкоштовні.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

export function initGsap() {
  if (registered || typeof window === "undefined") return { gsap, ScrollTrigger, SplitText };
  registered = true;

  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

  CustomEase.create("ease-out-quint", "0.22, 1, 0.36, 1");
  CustomEase.create("ease-menu", "0.6, 0.14, 0, 1");

  gsap.defaults({ ease: "ease-out-quint", duration: 1 });

  return { gsap, ScrollTrigger, SplitText };
}

export { gsap, ScrollTrigger, SplitText };

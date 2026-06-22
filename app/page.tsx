"use client";

import { useEffect, useRef } from "react";
import { initGsap, gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import Hero from "@/components/Hero";
import ClubSection from "@/components/ClubSection";
import StatsSection from "@/components/StatsSection";
import Ticker from "@/components/Ticker";
import AchievementsSection from "@/components/AchievementsSection";
import LocationsSection from "@/components/LocationsSection";
import InventorySection from "@/components/InventorySection";
import MediaSection from "@/components/MediaSection";
import GallerySection from "@/components/GallerySection";
import CampSection from "@/components/CampSection";
import PartnersSection from "@/components/PartnersSection";
import ContactsSection from "@/components/ContactsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    initGsap();
    const splits: SplitText[] = [];
    const cleanups: Array<() => void> = [];

    // Respect prefers-reduced-motion: GSAP writes inline styles, so CSS
    // `animation:none` can't stop it — we must skip building the scroll
    // animations and instead show every element at its final state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-reveal], [data-split]", { opacity: 1, y: 0, clearProps: "transform" });
      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        el.style.clipPath = "none";
      });
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = parseFloat(el.dataset.count || "0");
        const dec = (el.dataset.count || "").includes(".") ? 1 : 0;
        el.textContent = end.toFixed(dec).replace(".", ",") + (el.dataset.suffix || "");
      });
      return;
    }

    const split = (el: Element) => {
      const s = new SplitText(el as HTMLElement, {
        type: "lines",
        mask: "lines",
        linesClass: "sline",
      });
      splits.push(s);
      return s;
    };

    const ctx = gsap.context(() => {
      /* ---- SECTION HEADINGS (split line mask) ---- */
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const s = split(el);
        gsap.set(el, { opacity: 1 });
        gsap.from(s.lines, {
          yPercent: 125,
          duration: 1,
          stagger: 0.09,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      /* ---- GENERIC REVEALS ---- */
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 87%" },
        });
      });

      /* ---- CLIP REVEAL for media ---- */
      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 84%" },
          }
        );
      });

      /* ---- IMAGE PARALLAX ---- */
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      /* ---- COUNT-UP ---- */
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = parseFloat(el.dataset.count || "0");
        const dec = (el.dataset.count || "").includes(".") ? 1 : 0;
        const suffix = el.dataset.suffix || "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(dec).replace(".", ",") + suffix;
          },
        });
      });

      /* ---- MAGNETIC BUTTONS ---- */
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        gsap.utils.toArray<HTMLElement>(".btn").forEach((btn) => {
          const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
          const move = (e: MouseEvent) => {
            const r = btn.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.45);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          btn.addEventListener("mousemove", move);
          btn.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            btn.removeEventListener("mousemove", move);
            btn.removeEventListener("mouseleave", leave);
          });
        });
      }
    }, root);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      splits.forEach((s) => s.revert());
      cleanups.forEach((fn) => fn());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main ref={root} id="top">
      {/* ===================== HERO ===================== */}
      <Hero />

      {/* ===================== TICKER ===================== */}
      <Ticker />

      {/* ===================== CLUB ===================== */}
      <ClubSection />

      {/* ===================== STATS ===================== */}
      <StatsSection />

      {/* ===================== ACHIEVEMENTS ===================== */}
      <AchievementsSection />

      {/* ===================== LOCATIONS ===================== */}
      <LocationsSection />

      {/* ===================== INVENTORY ===================== */}
      <InventorySection />

      {/* ===================== MEDIA ===================== */}
      <MediaSection />

      {/* ===================== GALLERY ===================== */}
      <GallerySection />

      {/* ===================== CAMP ===================== */}
      <CampSection />

      {/* ===================== PARTNERS ===================== */}
      <PartnersSection />

      {/* ===================== CONTACTS ===================== */}
      <ContactsSection />

      {/* ===================== FOOTER ===================== */}
      <Footer />
    </main>
  );
}

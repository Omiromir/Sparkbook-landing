"use client";
import { useEffect } from "react";
import { createTimeline, stagger } from "animejs";
import { animate, inView } from "motion";

export function MotionEffects() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const current = document.querySelector<HTMLElement>('.document-sidebar a[aria-current="page"]');
    const links = current?.parentElement;
    if (current && links && links.scrollWidth > links.clientWidth) links.scrollLeft += current.getBoundingClientRect().left - links.getBoundingClientRect().left - 4;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const scene = document.querySelector<HTMLElement>(".hero");
    const motionToggle = scene?.querySelector<HTMLButtonElement>(".hero-motion-toggle");
    let sceneVisible = false;
    const updateScene = () => scene?.classList.toggle("hero-in-view", sceneVisible && !document.hidden);
    const sceneObserver = scene ? new IntersectionObserver(([entry]) => {
      sceneVisible = entry.isIntersecting;
      updateScene();
    }) : undefined;
    if (scene) sceneObserver?.observe(scene);
    const pauseScene = () => {
      const paused = scene?.classList.toggle("hero-motion-paused");
      motionToggle?.setAttribute("aria-pressed", String(paused));
    };
    motionToggle?.addEventListener("click", pauseScene);
    document.addEventListener("visibilitychange", updateScene);
    const reveals = [...document.querySelectorAll<HTMLElement>(".reveal")];
    const animations = new Map<Element, ReturnType<typeof animate>>();
    let stopWatching: (() => void) | undefined;
    const hero = !preference.matches && document.querySelector(".hero-copy") ? createTimeline({ defaults: { duration: 450, ease: "out(3)" } })
      .add(".hero-copy .hero-enter", { opacity: [0, 1], y: [12, 0], delay: stagger(50) }, 0)
      .add(".phone-wrap", { opacity: [0, 1], y: [18, 0], scale: [.98, 1] }, 150) : undefined;
    const update = () => {
      stopWatching?.();
      animations.forEach(animation => animation.stop());
      animations.clear();
      document.documentElement.classList.toggle("motion-ready", !preference.matches);
      if (preference.matches) {
        hero?.pause();
        document.querySelectorAll<HTMLElement>(".reveal, .hero-copy .hero-enter, .phone-wrap").forEach(element => { element.style.opacity = "1"; element.style.transform = "none"; });
        return;
      }
      stopWatching = inView(reveals, element => {
        animations.get(element)?.stop();
        animations.set(element, animate(element, { opacity: 1, y: 0 }, { duration: .3, ease: "easeOut" }));
        return () => {
          animations.get(element)?.stop();
          animations.set(element, animate(element, { opacity: 0, y: 16 }, { duration: .18, ease: "easeOut" }));
        };
      }, { amount: .08, margin: "0px 0px -24px 0px" });
    };
    // Real href anchors work without JavaScript; this only adds motion and focus.
    const anchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const id = anchor.getAttribute("href")?.slice(1);
      const target = id && document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const url = new URL(location.href);
      url.hash = id;
      if (url.href !== location.href) history.pushState(null, "", url);
      target.scrollIntoView({ behavior: preference.matches || anchor.classList.contains("skip-link") ? "instant" : "smooth", block: "start" });
      const hadTabindex = target.hasAttribute("tabindex");
      if (!hadTabindex) {
        target.tabIndex = -1;
        target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
      }
      target.focus({ preventScroll: true });
    };
    update();
    preference.addEventListener("change", update);
    document.addEventListener("click", anchorClick);
    return () => {
      hero?.pause();
      sceneObserver?.disconnect();
      motionToggle?.removeEventListener("click", pauseScene);
      document.removeEventListener("visibilitychange", updateScene);
      scene?.classList.remove("hero-in-view", "hero-motion-paused");
      stopWatching?.();
      animations.forEach(animation => animation.stop());
      preference.removeEventListener("change", update);
      document.removeEventListener("click", anchorClick);
      document.documentElement.classList.remove("js", "motion-ready");
    };
  }, []);
  return null;
}

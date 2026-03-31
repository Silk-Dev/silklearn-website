import gsap from 'gsap';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const PAGE_TRANSITION_DONE_EVENT = 'silklearn:page-transition-in-done';

gsap.defaults({
  ease: 'power3.inOut',
  duration: 0.3,
});

export const animatePageIn = () => {
  const curvePath = document.getElementById('curve-path');
  const pageNameDisplay = document.getElementById('page-name-display');
  const curveTransition = document.getElementById('curve-transition');
  if (!curvePath || !pageNameDisplay || !curveTransition) return;

  // Kill any lingering tweens from a previous transition so they don't conflict.
  gsap.killTweensOf([curvePath, pageNameDisplay]);

  const tl = gsap.timeline();

  tl.set(curveTransition, { visibility: 'visible' })
    .set(curvePath, {
      attr: { d: 'M 0,0 Q 50,-15 100,0 L 100,100 Q 50,115 0,100 Z' },
    })
    .set(pageNameDisplay, { opacity: 0, y: 30 })
    .to(pageNameDisplay, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'back.out(1.4)',
    })
    .to(pageNameDisplay, {
      opacity: 0,
      scale: 0.9,
      y: -500,
      duration: 0.6,
      ease: 'power3.in',
    })
    .to(
      curvePath,
      {
        attr: { d: 'M 0,-100 Q 50,-115 100,-100 L 100,0 Q 50,15 0,0 Z' },
        duration: 0.6,
        ease: 'power3.in',
      },
      '<',
    )
    .call(() => {
      window.dispatchEvent(new CustomEvent(PAGE_TRANSITION_DONE_EVENT));
    })
    .set(curveTransition, { visibility: 'hidden' });
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const curvePath = document.getElementById('curve-path');
  const pageNameDisplay = document.getElementById('page-name-display');
  const curveTransition = document.getElementById('curve-transition');
  if (!curvePath || !pageNameDisplay || !curveTransition) return;

  const tl = gsap.timeline();

  tl.set(curveTransition, { visibility: 'visible' })
    .set(curvePath, {
      attr: { d: 'M 0,120 Q 50,135 100,120 L 100,100 Q 50,85 0,100 Z' },
    })
    .set(pageNameDisplay, { opacity: 0, scale: 0.9 })
    .to(curvePath, {
      attr: { d: 'M 0,0 Q 50,-15 100,0 L 100,100 Q 50,115 0,100 Z' },
      duration: 0.6,
      ease: 'power3.out',
    })
    .call(() => {
      router.push(href);
    });
};

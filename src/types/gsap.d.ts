declare module 'gsap' {
  type GsapVars = Record<string, unknown>;

  type GsapContext = {
    revert: () => void;
  };

  type ScrollTriggerInstance = {
    kill: () => void;
  };

  type GsapTween = {
    kill: () => void;
    scrollTrigger?: ScrollTriggerInstance;
  };

  type GsapTimeline = {
    set: (target: unknown, vars: GsapVars, position?: string | number) => GsapTimeline;
    to: (target: unknown, vars: GsapVars, position?: string | number) => GsapTimeline;
    call: (callback: () => void, params?: unknown[], position?: string | number) => GsapTimeline;
    kill: () => void;
    scrollTrigger?: ScrollTriggerInstance;
  };

  type GsapStatic = {
    defaults: (vars: GsapVars) => void;
    context: (callback: () => void) => GsapContext;
    getProperty: (target: unknown, property: string) => unknown;
    registerPlugin: (...plugins: unknown[]) => void;
    set: (target: unknown, vars: GsapVars) => GsapTween;
    timeline: (vars?: GsapVars) => GsapTimeline;
    to: (target: unknown, vars: GsapVars) => GsapTween;
    fromTo: (target: unknown, fromVars: GsapVars, toVars: GsapVars) => GsapTween;
  };

  const gsap: GsapStatic;

  export default gsap;
}

declare module 'gsap/dist/gsap' {
  export { default } from 'gsap';
}
declare module 'gsap' {
  type GsapVars = Record<string, unknown>;

  type GsapContext = {
    revert: () => void;
  };

  type GsapStatic = {
    context: (callback: () => void) => GsapContext;
    getProperty: (target: unknown, property: string) => unknown;
    to: (target: unknown, vars: GsapVars) => unknown;
  };

  const gsap: GsapStatic;

  export default gsap;
}

declare module 'gsap/dist/gsap' {
  export { default } from 'gsap';
}
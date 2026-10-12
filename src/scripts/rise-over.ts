import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RiseOverOptions {
  /** The section scrolling up; its top edge drives the timeline */
  trigger: HTMLElement;
  /** Element with the panel-rise mixin (defaults to the trigger) */
  panel?: HTMLElement;
  /** The pinned section underneath: its content sinks back and its shade dims */
  recede?: { content?: Element | null; shade?: Element | null };
}

// A panel scrolls up over the pinned section before it (CSS sticky). Its
// corners and shadow come from the panel-rise mixin, driven here by --rise;
// the section behind recedes: content sinks back and fades, the shade dims.
export function riseOver({ trigger, panel = trigger, recede = {} }: RiseOverOptions) {
  return gsap
    .timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger, start: 'top bottom', end: 'top top', scrub: 0.4 },
    })
    .fromTo(panel, { '--rise': 0 }, { '--rise': 1 }, 0)
    .to(recede.content ?? [], { scale: 0.94, yPercent: -8, opacity: 0.2 }, 0)
    .to(recede.shade ?? [], { opacity: 1 }, 0);
}

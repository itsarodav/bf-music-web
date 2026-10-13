// Muted loops that play only while on screen (saves battery and data) and
// pause when they leave. With reduced motion they never start: the poster
// shows instead. The videos use preload="none", so nothing downloads until
// one first comes into view.
export function autoplayInView(videos: Iterable<HTMLVideoElement>) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      const video = target as HTMLVideoElement;
      if (isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
  });

  for (const video of videos) observer.observe(video);
}

// Devices with a real pointer (mouse, trackpad). Touch screens of any size,
// tablets included, fall back to playing in view.
export const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Muted loop that plays only while the pointer is over its card, or while
// keyboard focus is inside it (e.g. on its button), and pauses on leaving.
// With reduced motion it never starts: the poster shows instead.
export function playOnHover(card: HTMLElement, video: HTMLVideoElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const play = () => video.play().catch(() => {});
  const pause = () => video.pause();

  card.addEventListener('mouseenter', play);
  card.addEventListener('mouseleave', pause);
  card.addEventListener('focusin', play);
  card.addEventListener('focusout', (event) => {
    if (!card.contains(event.relatedTarget as Node | null)) pause();
  });
}

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

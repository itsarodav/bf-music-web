// Scheduled function: triggers a fresh deploy once a day so the home page
// picks up Blanca's latest YouTube Shorts (read at build time, see
// src/data/shorts.ts). BUILD_HOOK_URL is a Netlify build hook, set as an
// environment variable in the site settings (never committed).

export default async () => {
  const hook = process.env.BUILD_HOOK_URL;

  if (!hook) {
    console.error('[daily-rebuild] BUILD_HOOK_URL is not set');
    return;
  }

  const res = await fetch(hook, { method: 'POST' });
  console.log(`[daily-rebuild] Build hook responded ${res.status}`);
};

// Every day at 07:00 UTC (08:00/09:00 in Spain)
export const config = {
  schedule: '0 7 * * *',
};

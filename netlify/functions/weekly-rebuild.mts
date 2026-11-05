// Scheduled function: triggers a fresh deploy once a week so the home page
// picks up Blanca's latest YouTube Shorts (read at build time, see
// src/data/shorts.ts). BUILD_HOOK_URL is a Netlify build hook, set as an
// environment variable in the site settings (never committed).

export default async () => {
  const hook = process.env.BUILD_HOOK_URL;

  if (!hook) {
    console.error('[weekly-rebuild] BUILD_HOOK_URL is not set');
    return;
  }

  const res = await fetch(hook, { method: 'POST' });
  console.log(`[weekly-rebuild] Build hook responded ${res.status}`);
};

// Mondays only, at 07:00 UTC (08:00/09:00 in Spain). Weekly, not daily: each
// production deploy spends Netlify credits and the free plan ran out.
export const config = {
  schedule: '0 7 * * 1',
};

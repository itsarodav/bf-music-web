// Spanish: the source of truth. Its shape defines the Dictionary type, so
// va and en must have exactly the same keys.
import { common } from './common';
import { home, bio, music, film } from './pages';
import { press } from './press';
import { legal } from './legal';

export const es = { ...common, home, bio, music, film, press, legal };

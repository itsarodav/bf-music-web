import type { Dictionary } from '../types';
import { common } from './common';
import { home, bio, music, film } from './pages';
import { press } from './press';
import { legal } from './legal';

export const va: Dictionary = { ...common, home, bio, music, film, press, legal };

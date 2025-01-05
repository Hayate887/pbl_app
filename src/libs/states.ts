import { Session } from '@supabase/supabase-js';
import { atom } from 'jotai';

// sessionStateのJotai版
export const sessionState = atom<Session | null>(null);

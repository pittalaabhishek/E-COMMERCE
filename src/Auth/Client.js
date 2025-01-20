import { createClient } from '@supabase/supabase-js';

const rawSupabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const rawSupabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!rawSupabaseUrl || !rawSupabaseKey) {
  throw new Error('Supabase environment variables are missing.');
}

const supabaseUrl = rawSupabaseUrl.trim().replace(/\/+$/, ''); 
const supabaseKey = rawSupabaseKey.trim();


export const supabase = createClient(supabaseUrl, supabaseKey);

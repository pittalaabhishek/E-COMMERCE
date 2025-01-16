import { createClient } from '@supabase/supabase-js';

const rawSupabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const rawSupabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!rawSupabaseUrl || !rawSupabaseKey) {
  throw new Error('Supabase environment variables are missing.');
}

// Clean the URL to remove trailing slashes or other unexpected characters
const supabaseUrl = rawSupabaseUrl.trim().replace(/\/+$/, ''); 
const supabaseKey = rawSupabaseKey.trim();

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Loaded' : 'Missing');

export const supabase = createClient(supabaseUrl, supabaseKey);

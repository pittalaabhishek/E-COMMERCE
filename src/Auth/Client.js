import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tgvlscyrzlwdlebgyaxj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndmxzY3lyemx3ZGxlYmd5YXhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MzI4NzMsImV4cCI6MjA1MDUwODg3M30.ijg4aYcmOuJyudroWG7svoLrPI1R83XnR-OoAfK-F7U';
// const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndmxzY3lyemx3ZGxlYmd5YXhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDkzMjg3MywiZXhwIjoyMDUwNTA4ODczfQ.SKMPRc_HkikzULUQNKZU8VCbmb8vCZ_j-OpMWjUNF6A';

export const supabase = createClient(supabaseUrl, supabaseKey);
// export const serviceSupabase = createClient(supabaseUrl, supabaseServiceKey);
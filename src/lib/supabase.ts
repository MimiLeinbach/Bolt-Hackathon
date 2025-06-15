import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hyurmojmeqzmrmahlqcy.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5dXJtb2ptZXF6bXJtYWhscWN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4ODI1MzEsImV4cCI6MjA2NTQ1ODUzMX0.L4567_nwGWLNK08b6rfzVVsaX1AZ1rOHSxOz9j4n1b8'

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
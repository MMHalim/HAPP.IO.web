
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-key'

// Log a warning in development or if the values are default
if (supabaseUrl === 'https://example.supabase.co') {
  console.warn('Supabase URL is not set. File uploads will fail. Please set NEXT_PUBLIC_SUPABASE_URL.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

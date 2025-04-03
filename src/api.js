
// supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseKey = 'public-anon-key' // from Supabase dashboard (Project > API)

export const supabase = createClient(supabaseUrl, supabaseKey)
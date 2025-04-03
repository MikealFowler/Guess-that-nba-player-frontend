// supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://phpjycwernecyyrkypnn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBocGp5Y3dlcm5lY3l5cmt5cG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MTAyOTIsImV4cCI6MjA1OTE4NjI5Mn0.FLHbXL8Z9tZn8Vc91nIJ-kJtyljaNkB1hV9hBy0kuOk' // from Supabase dashboard (Project > API)

export const supabase = createClient(supabaseUrl, supabaseKey)
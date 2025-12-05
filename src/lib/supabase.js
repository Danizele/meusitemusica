import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rapprmbceggdjmtauaew.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcHBybWJjZWdnZGptdGF1YWV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTM2NjYsImV4cCI6MjA4MDQyOTY2Nn0.rsLhhExK_WhJylbW-S0zxe0mbaIbZSKv71vsuO4s3Qs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
import { createClient } from '@supabase/supabase-js'

// PEGUE ESSAS INFORMAÇÕES NO SUPABASE:
// Settings → API → Project URL e anon public key
const supabaseUrl = 'https://seu-projeto-id.supabase.co'
const supabaseAnonKey = 'sua-chave-publica-aqui'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
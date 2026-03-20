/**
 * INSTRUÇÕES PARA CONECTAR AO SUPABASE:
 * 
 * 1. Instale o cliente: npm install @supabase/supabase-js
 * 2. Crie uma tabela 'responses' com as colunas definidas em SurveyResponse
 * 3. Preencha as variáveis abaixo no arquivo .env
 * 4. Descomente o código e substitua as chamadas no surveyService.ts
 */

// import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;
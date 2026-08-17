import { createClient } from '@supabase/supabase-js';

// Clave pública (anon/publishable) — segura para exponer en el cliente,
// el acceso real está controlado por las políticas RLS en Supabase.
// Proyecto compartido "Apps" — las tablas de PTB usan el prefijo ptb_
// para no chocar con las de tus otras apps.
const supabaseUrl = 'https://larqxmgyutqiktsforgz.supabase.co';
const supabaseAnonKey = 'sb_publishable_cJvd0rZTogMotT0TuGwbbA_sXh1J8Cc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

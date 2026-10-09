import { createClient } from '@supabase/supabase-js';

export type Lead = { name: string; email: string; service: string; details: string };

// Server-only: uses the service role key, which bypasses RLS. Never import this from a client component.
export async function saveLead(lead: Lead): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY is not set');

  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await supabase.from('leads').insert(lead);
  if (error) throw new Error(`Supabase insert failed: ${error.message}`);
}

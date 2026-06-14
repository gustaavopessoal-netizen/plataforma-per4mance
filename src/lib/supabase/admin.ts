import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase com a SERVICE_ROLE — IGNORA a RLS. Use SOMENTE no servidor
 * (webhook do Asaas, checkout). NUNCA importe isto em código de cliente: a
 * service_role daria acesso total ao banco se vazasse pro navegador.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

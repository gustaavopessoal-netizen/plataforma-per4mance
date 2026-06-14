-- =====================================================================
-- PER4MANCE · Fase 3 (Asaas) · tabela de idempotência do webhook
-- Cole no SQL Editor do Supabase e RUN. Idempotente (pode rodar de novo).
-- =====================================================================

-- Guarda o id de cada evento já processado, para o reenvio do Asaas (que
-- entrega "pelo menos uma vez") não liberar/duplicar acesso duas vezes.
create table if not exists public.asaas_eventos (
  evt_id     text primary key,   -- id do EVENTO (evt_...), estável entre reenvios
  event      text,
  created_at timestamptz not null default now()
);

-- Só o servidor (service_role) escreve aqui. Liga a RLS e NÃO cria policy:
-- assim anon/authenticated não leem nem escrevem; a service_role ignora a RLS.
alter table public.asaas_eventos enable row level security;
alter table public.asaas_eventos force  row level security;

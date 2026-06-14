-- =====================================================================
-- PER4MANCE · Tabela de COMPRAS (entitlements)  ·  Supabase / Postgres + RLS
-- Cole TUDO no SQL Editor do Supabase (Database → SQL Editor → New query) e RUN.
-- Pode rodar de novo sem medo: é idempotente.
-- =====================================================================

-- 1) TABELA --------------------------------------------------------------
create table if not exists public.compras (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users (id) on delete cascade,
  tipo             text not null check (tipo in ('curso','ebook','colecao')),
  -- item_id: id do protocolo (ex.: 'joelho') ou do e-book (ex.: 'sono').
  -- NULL quando tipo = 'colecao' (a coleção não tem item único).
  item_id          text,
  asaas_payment_id text,
  status           text not null default 'confirmado'
                     check (status in ('confirmado','pendente','estornado')),
  created_at       timestamptz not null default now()
);

-- Coerência: curso/ebook PRECISAM de item_id; colecao NÃO tem item_id.
alter table public.compras drop constraint if exists compras_item_id_coerente;
alter table public.compras add constraint compras_item_id_coerente check (
  (tipo in ('curso','ebook') and item_id is not null)
  or (tipo = 'colecao' and item_id is null)
);

-- 2) ÍNDICES -------------------------------------------------------------
create index if not exists compras_user_id_idx on public.compras (user_id);

-- Idempotência do webhook do Asaas: o mesmo pagamento não vira 2 linhas.
create unique index if not exists compras_asaas_payment_id_uidx
  on public.compras (asaas_payment_id)
  where asaas_payment_id is not null;

-- 3) ROW LEVEL SECURITY --------------------------------------------------
alter table public.compras enable row level security;
alter table public.compras force  row level security;  -- defesa extra

drop policy if exists "compras_select_own" on public.compras;
drop policy if exists "compras_no_insert"  on public.compras;
drop policy if exists "compras_no_update"  on public.compras;
drop policy if exists "compras_no_delete"  on public.compras;

-- SELECT: cada usuário logado lê SOMENTE as próprias linhas.
create policy "compras_select_own"
  on public.compras for select to authenticated
  using (auth.uid() = user_id);

-- NÃO existe policy de INSERT/UPDATE/DELETE para anon/authenticated.
-- Sem policy permissiva, a RLS BLOQUEIA por padrão. Só a service_role
-- (webhook do Asaas, no servidor) escreve, pois ela ignora a RLS.
-- As policies "negar" abaixo são explícitas (documentam e protegem).
create policy "compras_no_insert" on public.compras for insert to anon, authenticated with check (false);
create policy "compras_no_update" on public.compras for update to anon, authenticated using (false) with check (false);
create policy "compras_no_delete" on public.compras for delete to anon, authenticated using (false);

-- 4) GRANTS (cinto + suspensório) ---------------------------------------
revoke insert, update, delete on public.compras from anon, authenticated;
grant  select on public.compras to authenticated;

-- =====================================================================
-- Como o app usa:
--   - Leitura (site): chave ANON + sessão do cookie → RLS garante "só as minhas".
--   - Escrita (Fase 3): webhook do Asaas usa a SERVICE_ROLE (ignora RLS) e
--     insere a compra com upsert(onConflict: 'asaas_payment_id').
--   - Promoção: comprar 'colecao' (ou os 9 protocolos) libera tudo + e-books.
-- =====================================================================

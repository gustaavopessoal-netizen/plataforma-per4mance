-- =====================================================================
-- PER4MANCE · Mensagens do admin para o aluno (dentro do app)
-- Cole no SQL Editor do Supabase e RUN. Idempotente.
-- =====================================================================

create table if not exists public.mensagens (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  texto      text not null,
  lida       boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists mensagens_user_idx on public.mensagens (user_id, created_at desc);

alter table public.mensagens enable row level security;
alter table public.mensagens force  row level security;

-- O aluno LÊ as próprias mensagens.
drop policy if exists "msg_select_own" on public.mensagens;
create policy "msg_select_own" on public.mensagens
  for select to authenticated using (auth.uid() = user_id);

-- O aluno pode marcar a própria como lida.
drop policy if exists "msg_update_own" on public.mensagens;
create policy "msg_update_own" on public.mensagens
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Quem ENVIA é só o admin (service_role) — sem policy de insert para os demais.

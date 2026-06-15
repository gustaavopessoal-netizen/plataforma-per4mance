-- =====================================================================
-- PER4MANCE · Anexos/adendos por aluno
-- Cole no SQL Editor do Supabase e RUN. Idempotente.
-- (O bucket de Storage "anexos" é criado automaticamente pela aplicação.)
-- =====================================================================

create table if not exists public.anexos (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  nome       text not null,       -- nome do arquivo (exibição)
  path       text not null,       -- caminho no Storage
  created_at timestamptz not null default now()
);

create index if not exists anexos_user_idx on public.anexos (user_id, created_at desc);

alter table public.anexos enable row level security;
alter table public.anexos force  row level security;

-- O aluno LISTA os próprios anexos (o download é por rota protegida no servidor).
drop policy if exists "anexos_select_own" on public.anexos;
create policy "anexos_select_own" on public.anexos
  for select to authenticated using (auth.uid() = user_id);

-- Inserir/excluir só o admin (service_role) — sem policy para os demais.

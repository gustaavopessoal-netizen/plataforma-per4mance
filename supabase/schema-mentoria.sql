-- =====================================================================
-- PER4MANCE · Mentoria — acesso (liberado manualmente pelo Gustavo)
-- Cole no SQL Editor do Supabase e RUN. Idempotente.
-- =====================================================================

create table if not exists public.mentoria_membros (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.mentoria_membros enable row level security;
alter table public.mentoria_membros force  row level security;

-- O aluno consegue ver se ele mesmo é membro.
drop policy if exists "mentoria_select_own" on public.mentoria_membros;
create policy "mentoria_select_own" on public.mentoria_membros
  for select to authenticated using (auth.uid() = user_id);

-- Liberar/remover é só o admin (service_role) — sem policy de insert/delete.

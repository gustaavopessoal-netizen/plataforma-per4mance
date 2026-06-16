-- =====================================================================
-- PER4MANCE · Mentoria — GRUPO/Fórum (posts + respostas)
-- Cole no SQL Editor do Supabase e RUN. Idempotente.
-- Só MEMBROS da mentoria leem e escrevem.
-- =====================================================================

create table if not exists public.mentoria_posts (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  nome       text not null,
  texto      text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.mentoria_respostas (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references public.mentoria_posts (id) on delete cascade,
  user_id    uuid not null references auth.users (id) on delete cascade,
  nome       text not null,
  texto      text not null,
  created_at timestamptz not null default now()
);

create index if not exists mentoria_posts_idx on public.mentoria_posts (created_at desc);
create index if not exists mentoria_respostas_idx on public.mentoria_respostas (post_id, created_at);

alter table public.mentoria_posts     enable row level security;
alter table public.mentoria_posts     force  row level security;
alter table public.mentoria_respostas enable row level security;
alter table public.mentoria_respostas force  row level security;

-- POSTS: só membros da mentoria leem; postam como si mesmos; apagam os próprios.
drop policy if exists "mp_select" on public.mentoria_posts;
create policy "mp_select" on public.mentoria_posts for select to authenticated
  using (exists (select 1 from public.mentoria_membros m where m.user_id = auth.uid()));
drop policy if exists "mp_insert" on public.mentoria_posts;
create policy "mp_insert" on public.mentoria_posts for insert to authenticated
  with check (auth.uid() = user_id
    and exists (select 1 from public.mentoria_membros m where m.user_id = auth.uid()));
drop policy if exists "mp_delete" on public.mentoria_posts;
create policy "mp_delete" on public.mentoria_posts for delete to authenticated
  using (auth.uid() = user_id);

-- RESPOSTAS: mesma regra.
drop policy if exists "mr_select" on public.mentoria_respostas;
create policy "mr_select" on public.mentoria_respostas for select to authenticated
  using (exists (select 1 from public.mentoria_membros m where m.user_id = auth.uid()));
drop policy if exists "mr_insert" on public.mentoria_respostas;
create policy "mr_insert" on public.mentoria_respostas for insert to authenticated
  with check (auth.uid() = user_id
    and exists (select 1 from public.mentoria_membros m where m.user_id = auth.uid()));
drop policy if exists "mr_delete" on public.mentoria_respostas;
create policy "mr_delete" on public.mentoria_respostas for delete to authenticated
  using (auth.uid() = user_id);

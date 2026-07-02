-- PER4MANCE · Liberação MANUAL de fichas por aluno (override do drip por data)
-- Cada linha = uma ficha destravada na mão pelo admin para um aluno específico.
-- O drip automático (1 ficha/15 dias a partir da compra) é calculado no código;
-- esta tabela só guarda as EXCEÇÕES liberadas manualmente.

create table if not exists public.fichas_liberadas (
  user_id    uuid not null references auth.users(id) on delete cascade,
  curso_id   text not null,
  ficha_num  int  not null check (ficha_num between 1 and 6),
  created_at timestamptz not null default now(),
  primary key (user_id, curso_id, ficha_num)
);

create index if not exists fichas_liberadas_user_idx on public.fichas_liberadas (user_id);

alter table public.fichas_liberadas enable row level security;
alter table public.fichas_liberadas force  row level security;

-- Aluno LÊ só as próprias liberações.
drop policy if exists "fl_select_own" on public.fichas_liberadas;
create policy "fl_select_own"
  on public.fichas_liberadas for select to authenticated
  using (auth.uid() = user_id);

-- Ninguém escreve via anon/authenticated (só a service_role, que ignora RLS, no admin).
drop policy if exists "fl_no_write" on public.fichas_liberadas;
create policy "fl_no_write"
  on public.fichas_liberadas for all to anon, authenticated
  using (false) with check (false);

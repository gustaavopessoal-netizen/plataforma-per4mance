-- =====================================================================
-- PER4MANCE · E-books vinculados a cada curso
-- Cole no SQL Editor do Supabase e RUN. Idempotente.
-- =====================================================================

create table if not exists public.curso_ebooks (
  curso_id text not null,   -- ex.: 'joelho'
  ebook_id text not null,   -- ex.: 'sono'
  primary key (curso_id, ebook_id)
);

-- Gerido só pelo admin (service_role); lido pelo servidor. RLS ligada sem policy.
alter table public.curso_ebooks enable row level security;
alter table public.curso_ebooks force  row level security;

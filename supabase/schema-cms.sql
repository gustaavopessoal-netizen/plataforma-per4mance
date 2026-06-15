-- =====================================================================
-- PER4MANCE · CMS de conteúdo (estilo Hotmart): MÓDULOS + AULAS
-- Cole no SQL Editor do Supabase e RUN. Idempotente.
-- =====================================================================

-- MÓDULOS (ex.: "Fase 1", "Boas-vindas") de cada protocolo (curso_id).
create table if not exists public.modulos (
  id         uuid primary key default gen_random_uuid(),
  curso_id   text not null,                 -- ex.: 'joelho'
  titulo     text not null,
  ordem      int  not null default 0,
  created_at timestamptz not null default now()
);

-- AULAS dentro de um módulo. video_url = link/embed (Bunny/Panda).
create table if not exists public.aulas (
  id         uuid primary key default gen_random_uuid(),
  modulo_id  uuid not null references public.modulos (id) on delete cascade,
  titulo     text not null,
  descricao  text,
  video_url  text,
  ordem      int  not null default 0,
  publicado  boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists modulos_curso_idx on public.modulos (curso_id, ordem);
create index if not exists aulas_modulo_idx  on public.aulas (modulo_id, ordem);

-- Só o servidor mexe (admin grava via service_role; a página do curso lê via
-- service_role e só entrega o vídeo a quem comprou). RLS ligada SEM policy.
alter table public.modulos enable row level security;
alter table public.modulos force  row level security;
alter table public.aulas   enable row level security;
alter table public.aulas   force  row level security;

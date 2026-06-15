-- =====================================================================
-- PER4MANCE · Admin · vídeos das aulas (Panda Video)
-- Cole no SQL Editor do Supabase e RUN. Idempotente.
-- =====================================================================

-- Guarda o link/embed do vídeo (Panda) de cada módulo de cada curso.
-- Escrito SÓ pelo painel admin (service_role) e lido SÓ pelo servidor
-- (que entrega o vídeo apenas a quem comprou). Por isso: RLS ligada,
-- sem nenhuma policy → anon/authenticated não acessam direto.
create table if not exists public.modulo_videos (
  curso_id    text not null,   -- ex.: 'joelho'
  modulo_num  int  not null,   -- 1..6
  video_url   text not null,   -- link/embed do Panda Video
  updated_at  timestamptz not null default now(),
  primary key (curso_id, modulo_num)
);

alter table public.modulo_videos enable row level security;
alter table public.modulo_videos force  row level security;

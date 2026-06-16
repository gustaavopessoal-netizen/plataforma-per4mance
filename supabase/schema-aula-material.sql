-- =====================================================================
-- PER4MANCE · Anexo (material) por AULA
-- Cole no SQL Editor do Supabase e RUN. Idempotente.
-- =====================================================================

alter table public.aulas add column if not exists material_path text;
alter table public.aulas add column if not exists material_nome text;

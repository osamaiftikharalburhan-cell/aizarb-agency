-- Run once in Supabase Dashboard → SQL Editor → New query.
create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) <= 200),
  email      text not null check (char_length(email) <= 320),
  service    text not null check (char_length(service) <= 100),
  details    text not null check (char_length(details) <= 5000),
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- RLS on with no policies: the public anon key can neither read nor write.
-- Only the server (service role key, which bypasses RLS) can insert.
alter table public.leads enable row level security;

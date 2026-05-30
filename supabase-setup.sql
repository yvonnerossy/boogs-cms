-- Run in Supabase SQL Editor
create table if not exists registrants (
  id text primary key,
  hof_name text,
  hof_phone text,
  hof_age text,
  hof_purok text,
  members jsonb default '[]',
  date timestamptz default now()
);

alter table registrants enable row level security;

drop policy if exists "Public insert" on registrants;
drop policy if exists "Public select" on registrants;
drop policy if exists "Public delete" on registrants;

create policy "Public insert" on registrants for insert with check (true);
create policy "Public select" on registrants for select using (true);
create policy "Public delete" on registrants for delete using (true);

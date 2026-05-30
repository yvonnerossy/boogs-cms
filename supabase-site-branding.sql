-- Run once in Supabase SQL Editor (syncs branding on all devices)

create table if not exists site_branding (
  id int primary key default 1 check (id = 1),
  settings jsonb not null default '{}',
  updated_at timestamptz default now()
);

insert into site_branding (id, settings) values (1, '{}') on conflict (id) do nothing;

alter table site_branding enable row level security;

drop policy if exists "Public select branding" on site_branding;
drop policy if exists "Public update branding" on site_branding;
drop policy if exists "Public insert branding" on site_branding;

create policy "Public select branding" on site_branding for select using (true);
create policy "Public update branding" on site_branding for update using (true) with check (true);
create policy "Public insert branding" on site_branding for insert with check (true);

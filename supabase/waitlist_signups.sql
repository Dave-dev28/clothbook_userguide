-- Clothbook landing page — isolated waitlist table
-- Run against the shared Supabase project. Does NOT touch app tables.
-- RLS: public insert-only; no public read/update/delete.

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text,
  phone text not null,
  role text check (role in ('tailor', 'shop_staff', 'customer', 'curious')),
  interested_in text[], -- e.g. {'voice_agent','design_studio','aso_ebi','basics'}
  source text default 'landing_page'
);

-- Helpful for admin review
create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);

create index if not exists waitlist_signups_phone_idx
  on public.waitlist_signups (phone);

alter table public.waitlist_signups enable row level security;

-- Drop existing policies if re-running
drop policy if exists "Public can insert waitlist signups" on public.waitlist_signups;
drop policy if exists "No public read on waitlist" on public.waitlist_signups;

-- Anon + authenticated may insert only
create policy "Public can insert waitlist signups"
  on public.waitlist_signups
  for insert
  to anon, authenticated
  with check (true);

-- Explicitly no SELECT/UPDATE/DELETE for anon.
-- Admins read via service role / dashboard (bypasses RLS).

comment on table public.waitlist_signups is
  'Landing page waitlist. Insert-only for public. Retire form when waitlistEnabled=false.';

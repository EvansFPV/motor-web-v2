-- motorwebapp release 1.1.0-beta
-- Supabase schema for auth-linked profiles/projects/subscriptions

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_project_id text not null,
  name text,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists projects_user_client_uidx on public.projects(user_id, client_project_id);
create index if not exists projects_user_updated_idx on public.projects(user_id, updated_at desc);

create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, plan)
  values (new.id, new.email, 'free')
  on conflict (id) do nothing;

  insert into public.subscriptions (user_id, status, plan)
  values (new.id, 'inactive', 'free')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.subscriptions enable row level security;

-- profiles
create policy if not exists profiles_select_own on public.profiles
  for select using (auth.uid() = id);

create policy if not exists profiles_update_own on public.profiles
  for update using (auth.uid() = id);

create policy if not exists profiles_insert_own on public.profiles
  for insert with check (auth.uid() = id);

-- projects
create policy if not exists projects_select_own on public.projects
  for select using (auth.uid() = user_id);

create policy if not exists projects_insert_own on public.projects
  for insert with check (auth.uid() = user_id);

create policy if not exists projects_update_own on public.projects
  for update using (auth.uid() = user_id);

create policy if not exists projects_delete_own on public.projects
  for delete using (auth.uid() = user_id);

-- subscriptions
create policy if not exists subscriptions_select_own on public.subscriptions
  for select using (auth.uid() = user_id);

create policy if not exists subscriptions_update_own on public.subscriptions
  for update using (auth.uid() = user_id);

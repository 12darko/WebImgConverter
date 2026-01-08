-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create the conversion_history table
create table public.conversion_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  file_name text not null,
  file_size bigint,
  converted_size bigint,
  format text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.conversion_history enable row level security;

-- Policy: Users can only see their own history
create policy "Users can view own history" on public.conversion_history
  for select using (auth.uid() = user_id);

-- Policy: Users can insert their own history
create policy "Users can insert own history" on public.conversion_history
  for insert with check (auth.uid() = user_id);

-- Policy: Users can delete their own history (Manual clear)
create policy "Users can delete own history" on public.conversion_history
  for delete using (auth.uid() = user_id);

-- AUTOMATIC CLEANUP FUNCTION & TRIGGER
-- This function deletes records older than 7 days
create or replace function public.delete_old_history()
returns trigger as $$
begin
  delete from public.conversion_history
  where created_at < now() - interval '7 days';
  return new;
end;
$$ language plpgsql;

-- Trigger: Run cleanup randomly on insert (to avoid running it on EVERY insert, maybe?)
-- Actually, running it on every insert is fine for small scale, or use pg_cron if available on plan.
-- For simplicity and effectiveness on generic plans, we'll run it on insert.
create trigger trigger_delete_old_history
  after insert on public.conversion_history
  execute procedure public.delete_old_history();

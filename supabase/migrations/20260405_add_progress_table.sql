create table if not exists public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  track_slug text not null,
  completed_lessons text[] not null default '{}',
  last_lesson_slug text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint progress_pkey primary key (user_id, track_slug)
);

create index if not exists progress_user_id_idx on public.progress (user_id);
create index if not exists progress_track_slug_idx on public.progress (track_slug);

alter table public.progress enable row level security;

drop policy if exists "Users can view their own progress" on public.progress;
create policy "Users can view their own progress"
on public.progress
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own progress" on public.progress;
create policy "Users can insert their own progress"
on public.progress
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own progress" on public.progress;
create policy "Users can update their own progress"
on public.progress
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own progress" on public.progress;
create policy "Users can delete their own progress"
on public.progress
for delete
to authenticated
using (auth.uid() = user_id);

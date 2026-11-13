-- CppValley Practice: run in your own Supabase SQL editor after review.
-- No service-role secrets or database credentials belong in Git.
-- User-controlled lesson progress is distinct from server-verified submissions.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 username text not null unique check (username ~ '^[a-z0-9_]{3,30}$'),
 display_name text check (char_length(display_name) <= 80),
 leaderboard_opt_in boolean not null default false,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create or replace function public.create_cppvalley_profile()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
 insert into public.profiles (id, username, display_name)
 values (new.id, 'dev_' || substring(replace(new.id::text, '-', '') from 1 for 16), null)
 on conflict (id) do nothing;
 return new;
end;
$$;

drop trigger if exists on_cppvalley_user_created on auth.users;
create trigger on_cppvalley_user_created
 after insert on auth.users for each row execute function public.create_cppvalley_profile();

insert into public.profiles(id,username)
select u.id,'dev_'||substring(replace(u.id::text,'-','') from 1 for 16) from auth.users u
on conflict (id) do nothing;

create table if not exists public.lesson_progress (
 user_id uuid not null references auth.users(id) on delete cascade,
 course_slug text not null check (char_length(course_slug) <= 120),
 lesson_slug text not null check (char_length(lesson_slug) <= 160),
 reviewed_at timestamptz not null default now(),
 primary key (user_id, course_slug, lesson_slug)
);

create table if not exists public.practice_submissions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 problem_slug text not null check (char_length(problem_slug) <= 160),
 source_code text not null check (char_length(source_code) between 1 and 25000),
 verdict text not null check (verdict in ('Accepted','Wrong Answer','Compilation Error','Runtime Error','Time Limit Exceeded','Time or Memory Limit Exceeded','Execution Error')),
 passed integer not null default 0 check (passed >= 0),
 total integer not null default 0 check (total >= 0),
 created_at timestamptz not null default now()
);

create index if not exists idx_cppvalley_submissions_user_time on public.practice_submissions(user_id,created_at desc);
create index if not exists idx_cppvalley_submissions_problem on public.practice_submissions(problem_slug);
create index if not exists idx_cppvalley_lesson_progress_user on public.lesson_progress(user_id,reviewed_at desc);

alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.practice_submissions enable row level security;

drop policy if exists "Select own profile or opted-in public profile" on public.profiles;
create policy "Select own profile or opted-in public profile" on public.profiles
 for select to authenticated, anon using (leaderboard_opt_in = true or auth.uid() = id);

drop policy if exists "Update own profile" on public.profiles;
create policy "Update own profile" on public.profiles
 for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "Select own lesson progress" on public.lesson_progress;
create policy "Select own lesson progress" on public.lesson_progress
 for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Insert own lesson progress" on public.lesson_progress;
create policy "Insert own lesson progress" on public.lesson_progress
 for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "Delete own lesson progress" on public.lesson_progress;
create policy "Delete own lesson progress" on public.lesson_progress
 for delete to authenticated using (auth.uid() = user_id);

drop policy if exists "Select own verified submissions" on public.practice_submissions;
create policy "Select own verified submissions" on public.practice_submissions
 for select to authenticated using (auth.uid() = user_id);

-- IMPORTANT: No user INSERT, UPDATE or DELETE policy for practice_submissions.
-- The trusted compiler API verifies code in an isolated VM before persisting
-- any verdict using the server-only SUPABASE_SERVICE_ROLE_KEY.
-- Users must never be able to manufacture Accepted submissions via PostgREST.
revoke insert, update, delete on public.practice_submissions from anon, authenticated;
grant select on public.practice_submissions to authenticated;

grant select on public.profiles to anon, authenticated;
grant update on public.profiles to authenticated;
grant select, insert, delete on public.lesson_progress to authenticated;

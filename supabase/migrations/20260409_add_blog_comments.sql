create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  parent_id uuid references public.blog_comments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_comments_body_length check (char_length(trim(body)) between 1 and 2000)
);

create index if not exists blog_comments_post_slug_idx on public.blog_comments (post_slug, created_at desc);
create index if not exists blog_comments_parent_id_idx on public.blog_comments (parent_id, created_at asc);
create index if not exists blog_comments_user_id_idx on public.blog_comments (user_id);

create table if not exists public.blog_comment_likes (
  comment_id uuid not null references public.blog_comments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint blog_comment_likes_pkey primary key (comment_id, user_id)
);

create index if not exists blog_comment_likes_user_id_idx on public.blog_comment_likes (user_id);

alter table public.blog_comments enable row level security;
alter table public.blog_comment_likes enable row level security;

drop policy if exists "Anyone can view blog comments" on public.blog_comments;
create policy "Anyone can view blog comments"
on public.blog_comments
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users can insert blog comments" on public.blog_comments;
create policy "Authenticated users can insert blog comments"
on public.blog_comments
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own blog comments" on public.blog_comments;
create policy "Users can update their own blog comments"
on public.blog_comments
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own blog comments" on public.blog_comments;
create policy "Users can delete their own blog comments"
on public.blog_comments
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Anyone can view comment likes" on public.blog_comment_likes;
create policy "Anyone can view comment likes"
on public.blog_comment_likes
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users can like comments" on public.blog_comment_likes;
create policy "Authenticated users can like comments"
on public.blog_comment_likes
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can remove their own likes" on public.blog_comment_likes;
create policy "Users can remove their own likes"
on public.blog_comment_likes
for delete
to authenticated
using (auth.uid() = user_id);

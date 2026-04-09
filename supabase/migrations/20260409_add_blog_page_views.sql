create table if not exists public.blog_page_views (
  post_slug text primary key,
  view_count bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_page_views enable row level security;

drop policy if exists "Anyone can view blog page views" on public.blog_page_views;
create policy "Anyone can view blog page views"
on public.blog_page_views
for select
to anon, authenticated
using (true);

drop policy if exists "Anyone can insert blog page views" on public.blog_page_views;
create policy "Anyone can insert blog page views"
on public.blog_page_views
for insert
to anon, authenticated
with check (true);

drop policy if exists "Anyone can update blog page views" on public.blog_page_views;
create policy "Anyone can update blog page views"
on public.blog_page_views
for update
to anon, authenticated
using (true)
with check (true);

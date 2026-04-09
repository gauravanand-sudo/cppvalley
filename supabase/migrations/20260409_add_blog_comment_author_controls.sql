alter table public.blog_comments
add column if not exists is_author boolean not null default false;

update public.blog_comments
set is_author = true
where lower(coalesce(author_name, '')) in ('phdprogrammer', 'phdprogrammer.official');

drop policy if exists "Users can update their own blog comments" on public.blog_comments;
create policy "Users can update their own blog comments"
on public.blog_comments
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own blog comments" on public.blog_comments;
create policy "Users can delete own or author can delete any blog comment"
on public.blog_comments
for delete
to authenticated
using (
  auth.uid() = user_id
  or lower(coalesce(auth.jwt() ->> 'email', '')) = 'phdprogrammer.official@gmail.com'
);

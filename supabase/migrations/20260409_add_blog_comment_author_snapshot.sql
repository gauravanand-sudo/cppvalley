alter table public.blog_comments
add column if not exists author_name text,
add column if not exists author_image text;

update public.blog_comments bc
set
  author_name = coalesce(nullif(trim(p.name), ''), bc.author_name, 'Reader'),
  author_image = coalesce(p.image, bc.author_image)
from public.profiles p
where p.id = bc.user_id
  and (
    bc.author_name is null
    or trim(bc.author_name) = ''
    or bc.author_image is null
  );

update public.blog_comments
set author_name = 'Reader'
where author_name is null or trim(author_name) = '';

import { MDXRemote } from "next-mdx-remote/rsc";

export default function MdxRenderer({ source }: { source: string }) {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXRemote source={source} />
    </article>
  );
}


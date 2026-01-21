import { MDXRemote } from "next-mdx-remote/rsc";
import CodeBlock from "@/components/CodeBlock";
import YouTube from "@/components/YouTube";

const components = {
  pre: CodeBlock,
  YouTube, // ✅ now available inside .mdx
};

export default function MdxRenderer({ source }: { source: string }) {
  return (
    <article className="text-gray-800">
      <MDXRemote source={source} components={components} />
    </article>
  );
}

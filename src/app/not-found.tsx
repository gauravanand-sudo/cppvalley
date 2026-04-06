// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">

      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="font-bold text-xl tracking-tight">
            <span className="text-[#9B1C3A]">cpp</span>
            <span className="text-gray-900">valley</span>
          </span>
          <span className="text-[10px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 font-mono">
            v0.1
          </span>
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        Content in pipeline.
      </h1>

      <p className="text-lg text-gray-500 max-w-sm leading-relaxed mb-10">
        This lesson is being recorded and written up. Check back soon while we finish publishing it.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/learn/tracks"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#9B1C3A] text-white text-sm font-semibold rounded-lg hover:bg-[#7d1530] transition-colors"
        >
          Browse courses
        </Link>
      </div>

      <p className="mt-16 text-xs font-mono text-gray-300">
        cppvalley · content uploading soon
      </p>

    </div>
  );
}

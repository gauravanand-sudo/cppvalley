"use client";

import CppvalleyLoading from "@/components/CppvalleyLoading";

export default function AppLoadingScreen({
  label = "cppvalley loading",
  caption = "Loading the next screen with cppvalley.",
}: {
  label?: string;
  caption?: string;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#592332,_#33161f_42%,_#160f13_100%)] text-[#f7eef1]">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-12">
        <div className="w-full rounded-[2rem] border border-[#ffffff1f] bg-[#ffffff0b] p-10 shadow-[0_30px_90px_rgba(18,8,12,0.42)] backdrop-blur">
          <CppvalleyLoading
            tone="dark"
            label={label}
            caption={caption}
            className="min-h-[280px]"
          />
        </div>
      </div>
    </div>
  );
}

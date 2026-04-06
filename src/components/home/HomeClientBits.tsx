"use client";

import { motion } from "framer-motion";

const JARGONS = [
  "virtual destructor", "false sharing", "vtable layout", "dynamic dispatch",
  "RTTI overhead", "perfect forwarding", "copy elision", "EBO optimization",
  "move semantics", "SFINAE", "CRTP pattern", "type erasure", "memory model",
  "sequential consistency", "happens-before", "cache coherence", "RAII",
  "placement new", "aligned_storage", "constexpr", "consteval", "concepts",
  "PMR allocators", "memory_order", "atomic fences", "lock-free queues",
  "std::launder", "ABI breakage", "name mangling", "value categories",
];

export function CppJargonsTicker() {
  return (
    <div className="border-b border-gray-100 py-3 overflow-hidden bg-white">
      <motion.div
        animate={{ x: [0, -1400] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-10 whitespace-nowrap"
      >
        {[...JARGONS, ...JARGONS].map((j, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm">
            <div className="w-1 h-1 rounded-full bg-[#9B1C3A]/40 shrink-0" />
            <span className="text-gray-400 font-mono text-xs">{j}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

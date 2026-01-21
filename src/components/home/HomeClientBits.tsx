"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Cpu,
  Send,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  Rocket,
} from "lucide-react";

/* ---------------- Topics ticker (moving) ---------------- */
export function CppJargonsTicker() {
  const jargons = [
    "virtual destructor",
    "false sharing",
    "vtable layout",
    "dynamic dispatch",
    "RTTI overhead",
    "perfect forwarding",
    "copy elision",
    "EBO optimization",
    "move semantics",
    "SFINAE",
    "CRTP pattern",
    "type erasure",
    "memory model",
    "sequential consistency",
    "happens-before",
    "cache coherence",
    "RAII",
    "smart pointers",
    "placement new",
    "aligned_storage",
    "constexpr",
    "consteval",
    "concepts",
    "ranges",
    "coroutines",
    "modules",
    "std::expected",
    "PMR allocators",
    "memory_order",
    "atomic fences",
    "lock-free queues",
  ];

  return (
    <div className="bg-white border-y border-gray-200 py-3 overflow-hidden">
      <motion.div
        animate={{ x: [0, -1100] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-8"
      >
        {[...jargons, ...jargons].map((j, idx) => (
          <div key={idx} className="flex items-center gap-4 text-sm font-mono">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/70" />
            <span className="text-gray-700">{j}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------------- Companies ticker (moving) ---------------- */
const companies = [
  { name: "Siemens EDA", role: "LMTS", pay: "35+ LPA" },
  { name: "Synopsys", role: "Senior Staff", pay: "40+ LPA" },
  { name: "Ansys", role: "Lead C++", pay: "45+ LPA" },
  { name: "Jane Street", role: "Quant C++", pay: "95+ LPA" },
  { name: "Tower Research", role: "SDE-III", pay: "70+ LPA" },
  { name: "Google", role: "Infra Engineer", pay: "65+ LPA" },
  { name: "Adobe", role: "Computer Scientist", pay: "80+ LPA" },
  { name: "Meta", role: "Systems", pay: "90+ LPA" },
];

export function CompaniesTicker() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="text-sm font-mono text-gray-700">Companies</div>
        <div className="text-xs text-gray-500">gliding</div>
      </div>

      <div className="py-4 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1300] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-6 px-6"
        >
          {[...companies, ...companies].map((c, idx) => (
            <div
              key={idx}
              className="shrink-0 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
            >
              <div className="text-sm font-semibold text-gray-900">
                {c.name}
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs font-mono text-gray-600">
                <span>{c.role}</span>
                <span className="text-gray-400">•</span>
                <span className="text-emerald-700">{c.pay}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- Success metrics ---------------- */
export function SuccessMetrics() {
  const metrics = [
    { value: "100%", label: "Technical Round Clearance", icon: Target },
    { value: "35 LPA+", label: "Offer Multiplier", icon: TrendingUp },
    { value: "60 days", label: "Avg. Preparation Time", icon: TrendingUp },
    { value: "2+ years", label: "Avg. Experience Required", icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-gray-200 mb-4 shadow-sm">
            <m.icon className="w-6 h-6 text-cyan-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{m.value}</div>
          <div className="text-sm text-gray-600">{m.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- Code preview terminal (restored) ---------------- */
export function CodePreviewTerminal() {
  const [activeTab, setActiveTab] = useState<"hft" | "eda" | "systems">("hft");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const submitInterval = setInterval(() => {
      if (!isSubmitted) {
        setIsSubmitted(true);
        const random = companies[Math.floor(Math.random() * companies.length)];
        setWelcomeMessage(`Welcome to ${random.name}!`);
        setTimeout(() => {
          setIsSubmitted(false);
          setWelcomeMessage("");
        }, 1500);
      }
    }, 2000);

    return () => clearInterval(submitInterval);
  }, [isSubmitted]);

  const handleSubmit = () => {
    setIsSubmitted(true);
    const random = companies[Math.floor(Math.random() * companies.length)];
    setWelcomeMessage(`Welcome to ${random.name}!`);
    setTimeout(() => {
      setIsSubmitted(false);
      setWelcomeMessage("");
    }, 2500);
  };

  const hftCode = `// HFT Order Matching Engine
template<typename Book>
class MatchingEngine {
  alignas(64) Book book_;
  std::atomic<int64_t> seq_{0};
  void process(Order& o) noexcept {
    auto s = seq_.fetch_add(1, std::memory_order_acq_rel);
    o.ts = __rdtsc();
    publish(o, s);
  }
};`;

  const edaCode = `// EDA Simulation Kernel
class Kernel {
  struct alignas(64) Event { uint64_t t, d; std::function<void()> cb; };
  std::priority_queue<Event> q_;
  void run(){ while(!q_.empty()){ auto e=q_.top(); q_.pop(); e.cb(); } }
};`;

  const systemsCode = `// Cache-aligned allocator
class Alloc {
  static constexpr size_t CLS=64;
  void* alloc(size_t n){
    void* p=nullptr;
    if(posix_memalign(&p, CLS, n)!=0) throw std::bad_alloc();
    return p;
  }
};`;

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-[0_18px_60px_-30px_rgba(0,0,0,0.6)]">
      <div className="border-b border-gray-800">
        <div className="flex">
          {[
            { id: "hft" as const, label: "HFT Systems", icon: TrendingUp },
            { id: "eda" as const, label: "EDA Kernels", icon: Cpu },
            { id: "systems" as const, label: "Systems Debug", icon: Terminal },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-mono transition-colors ${
                activeTab === tab.id
                  ? "text-white bg-white/5 border-b-2 border-cyan-400"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <pre
          ref={codeRef}
          className="p-6 text-sm text-gray-200 font-mono overflow-x-auto max-h-[400px] overflow-y-auto"
        >
          <code>
            {activeTab === "hft" && hftCode}
            {activeTab === "eda" && edaCode}
            {activeTab === "systems" && systemsCode}
          </code>
        </pre>

        <div className="absolute top-4 right-4 flex items-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              isSubmitted
                ? "bg-emerald-950 text-emerald-300 border-emerald-900 cursor-not-allowed"
                : "bg-cyan-950 text-cyan-300 border-cyan-900 hover:bg-cyan-900/40"
            }`}
          >
            {isSubmitted ? (
              <>
                <CheckCircle2 className="w-4 h-4 animate-pulse" />
                Submitted
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {welcomeMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl blur-xl" />
                <div className="relative bg-gray-950 border border-emerald-500/30 rounded-xl px-8 py-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
                    <h3 className="text-xl font-bold text-white">
                      Congratulations! 🎉
                    </h3>
                  </div>
                  <p className="text-lg text-gray-200 mb-2">{welcomeMessage}</p>
                  <p className="text-sm text-gray-400">
                    Your solution passed with optimal performance.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
                    <Rocket className="w-4 h-4" />
                    <span>Offer letter incoming in 48 hours</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

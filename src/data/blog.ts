export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime?: string;
  topics?: string[];
  discussionIssue?: number;
  sections: BlogSection[];
};

/*
  Daily publishing workflow:
  1. Add a new object to blogPosts.
  2. Use YYYY-MM-DD for publishedAt.
  3. Keep each post focused on one engineering idea.
  4. Optionally create a GitHub issue and set discussionIssue for public comments.
*/
export const blogPosts: BlogPost[] = [
  {
    slug: "roadmap-to-cracking-hft-in-120-days",
    title: "Roadmap to Cracking HFT in 120 Days",
    excerpt:
      "A focused 120-day engineering roadmap for building the C++, systems, low-latency and trading knowledge needed to compete for HFT software roles.",
    publishedAt: "2026-08-21",
    readingTime: "9 min read",
    topics: ["HFT", "C++", "Low Latency", "Career"],
    discussionIssue: 4,
    sections: [
      {
        paragraphs: [
          "High-frequency trading looks impossible from the outside because people often mix four different careers into one roadmap: quant research, quant trading, software engineering, and low-latency systems engineering. If your target is an HFT software or systems role, you do not need to become an expert in every branch of quantitative finance first.",
          "You need a narrower stack, learned deeply enough that you can build systems, explain performance trade-offs, debug them under pressure, and survive an interview that jumps from modern C++ to CPU caches to UDP multicast to an order book in minutes.",
          "This is the 120-day path I would use for that goal. It is aggressive, but the order matters more than the exact calendar. Do not rush past weak foundations just to say you finished a month.",
        ],
      },
      {
        heading: "Days 1–30 — C++ and measurement first",
        paragraphs: [
          "The first month is not about clever trading strategies. It is about becoming dangerous with the language and learning to measure instead of guess. HFT engineering punishes vague performance claims.",
        ],
        bullets: [
          "Modern C++: object lifetime, RAII, move semantics, templates, constexpr, smart pointers, containers, iterators and error handling.",
          "Memory: stack vs heap, allocation cost, alignment, layout, padding, ownership and avoiding unnecessary copies.",
          "Data structures and algorithms: arrays, hash tables, heaps, queues, trees, binary search, complexity and practical trade-offs.",
          "Linux basics: processes, threads, files, permissions, signals, /proc, shell tooling and compilation with GCC/Clang.",
          "Measurement: monotonic clocks, benchmark harnesses, warm-up, percentiles, histograms, p50/p99/p99.9 and why averages lie.",
        ],
      },
      {
        heading: "Build in month one",
        paragraphs: [
          "Do not finish the first 30 days with only notes. Build a small benchmark laboratory. Compare containers. Measure allocation strategies. Benchmark a queue. Record distributions, not one number. Write down what changed and why you think it changed.",
          "Your first portfolio artifact should prove that you understand reproducible performance work, not just syntax.",
        ],
      },
      {
        heading: "Days 31–60 — CPU, memory, concurrency and networking",
        paragraphs: [
          "This is where low-latency engineering starts to separate from ordinary application development. Your code does not run in an abstract machine. It runs through caches, branch predictors, TLBs, cores, NUMA domains, kernel queues and network stacks.",
        ],
        bullets: [
          "CPU architecture: cache hierarchy, cache lines, locality, branch prediction, instruction pipelines, TLBs and false sharing.",
          "Linux performance: CPU affinity, scheduling, context switches, interrupts, page faults, huge pages and NUMA awareness.",
          "Concurrency: mutexes, condition variables, atomics, happens-before, memory ordering, false sharing and lock contention.",
          "Lock-free foundations: SPSC queues, ring buffers, bounded structures, backpressure and the cost of synchronization.",
          "Networking: Ethernet, IP, TCP, UDP, sockets, multicast, packet loss, buffering, kernel paths and timestamping concepts.",
        ],
      },
      {
        heading: "Build in month two",
        paragraphs: [
          "Build a producer-consumer pipeline with a fixed-size ring buffer. Pin threads to cores. Measure throughput and tail latency. Then build a small UDP multicast receiver and feed decoded messages into that pipeline.",
          "At this point you should be able to explain why a supposedly faster design can have a worse p99.9, and why adding threads can make a low-latency system slower.",
        ],
      },
      {
        heading: "Days 61–90 — learn the market systems your code serves",
        paragraphs: [
          "Now add the trading domain. You do not need a five-month detour through machine learning, stochastic calculus and portfolio optimization to understand an HFT software stack. You do need enough market structure to know what every message and state transition means.",
        ],
        bullets: [
          "Market basics: instruments, venues, bids, asks, spread, limit orders, market orders, cancels, fills and positions.",
          "Market microstructure: matching engines, price-time priority, queue position, maker/taker behavior and book dynamics.",
          "Market data: snapshots, incremental feeds, sequence numbers, gap detection, recovery and deterministic book reconstruction.",
          "Order entry: sessions, order lifecycle, acknowledgements, rejects, cancels, replaces, fills and reconnect behavior.",
          "Risk: basic pre-trade limits, fat-finger checks, position limits, kill switches and failure-safe behavior.",
          "Latency path: market-data packet → decode → book update → strategy decision → risk → order encode → network send.",
        ],
      },
      {
        heading: "Build in month three",
        paragraphs: [
          "Build a deterministic limit order book from an event stream. Add sequence-gap detection and replay. Then connect it to a toy strategy interface and a simulated order gateway with basic risk checks.",
          "The objective is not to invent a profitable strategy. The objective is to demonstrate that you can design the machinery around one correctly, deterministically and with measurable latency.",
        ],
      },
      {
        heading: "Days 91–120 — capstone, production thinking and interviews",
        paragraphs: [
          "The final month turns knowledge into evidence. HFT interviews often expose candidates who have read every famous low-latency blog post but have never debugged a broken concurrent system or defended an architecture decision.",
        ],
        bullets: [
          "Capstone: integrate feed handler, book, strategy boundary, risk checks, order gateway, replay and metrics into one coherent tick-to-trade system.",
          "Reliability: malformed messages, stale sessions, packet loss, reconnects, replay, overload, shutdown and recovery.",
          "Profiling: perf, flame graphs, compiler output, allocation tracing and disciplined before/after measurements.",
          "Interview coding: arrays, strings, hashing, queues, graphs, binary search, heaps and medium-level timed problems.",
          "C++ interviews: lifetime, undefined behavior, templates, STL trade-offs, virtual dispatch, atomics and memory ordering.",
          "Systems interviews: caches, Linux scheduling, sockets, multicast, concurrency, NUMA and low-latency design.",
          "HFT interviews: order books, market-data recovery, order lifecycle, risk, latency budgets and system failure modes.",
          "Job search: tighten your resume around measurable projects, rehearse project walkthroughs and do mock interviews.",
        ],
      },
      {
        heading: "What I would not make core in these 120 days",
        paragraphs: [
          "If your target is HFT engineering, do not let a generic quant roadmap consume your schedule. XGBoost, Random Forests, PCA, Kaggle, ARIMA, GARCH, LSTMs, portfolio optimization and stochastic calculus can all be valuable in the right role, but they are not prerequisites for becoming strong at low-latency C++ systems engineering.",
          "Learn probability and statistics where they directly help: distributions, percentiles, variance, confidence in measurements and basic trading/risk vocabulary. Go deeper into quant research only if that is the role you actually want.",
        ],
      },
      {
        heading: "The standard for day 120",
        paragraphs: [
          "By day 120, the goal is not to know every HFT topic. The goal is to be able to sit with an engineer and reason clearly about a complete system: where latency comes from, where correctness can fail, how data moves through the machine, what the market messages mean, and how you would prove that your optimization actually helped.",
          "If you can build the capstone, explain its trade-offs, defend its measurements, and solve solid C++ and systems interview questions without hand-waving, you are no longer approaching HFT as a spectator. You have something concrete to compete with.",
        ],
      },
    ],
  },
];

export const blogPostsBySlug = new Map(blogPosts.map((post) => [post.slug, post]));

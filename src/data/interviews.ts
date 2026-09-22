export type InterviewQuestion = {
  id: string;
  title: string;
  round: string;
  difficulty: "Foundation" | "Intermediate" | "Advanced";
  prompt: string;
  answerFramework: string[];
  relatedTopics: string[];
};

export type InterviewSet = {
  slug: string;
  company: string;
  pageTitle: string;
  description: string;
  roleFocus: string;
  tags: string[];
  questions: InterviewQuestion[];
};

export const interviewSets: InterviewSet[] = [
  {
    slug: "adobe-cpp-interview-questions",
    company: "Adobe",
    pageTitle: "Adobe C++ Interview Questions",
    description:
      "Company-style C++ interview practice for Adobe software engineering rounds: object model, virtual dispatch, constructors, destructors, ownership and implementation clarity.",
    roleFocus: "C++ software engineer · product engineering · LLD",
    tags: ["C++", "OOP", "LLD", "Object model"],
    questions: [
      {
        id: "virtual-destructor",
        title: "Why should a base class destructor be virtual?",
        round: "C++ depth",
        difficulty: "Foundation",
        prompt:
          "Explain what can go wrong when deleting a derived object through a base-class pointer whose destructor is not virtual. Show how you would fix the design.",
        answerFramework: [
          "Explain static type vs dynamic type and why destructor dispatch matters.",
          "Mention undefined behavior or incomplete destruction risk when deleting through a non-virtual base destructor.",
          "Show a base class with a virtual destructor when it is intended for polymorphic deletion.",
          "Add design nuance: not every base class needs virtual functions; make non-polymorphic bases protected/non-virtual or final when appropriate."
        ],
        relatedTopics: ["virtual dispatch", "destructors", "RAII", "polymorphism"]
      },
      {
        id: "constructor-virtual-call",
        title: "Can a constructor call a virtual function safely?",
        round: "C++ object model",
        difficulty: "Intermediate",
        prompt:
          "A class calls a virtual method from its constructor. Explain what function actually runs and why this is usually a design smell.",
        answerFramework: [
          "Explain that during base construction, the derived part is not constructed yet.",
          "Virtual dispatch from constructors/destructors does not behave like normal runtime polymorphism.",
          "Discuss invariants and partially constructed object state.",
          "Suggest alternatives: factory function, non-virtual initialize step, composition or dependency injection."
        ],
        relatedTopics: ["constructors", "virtual functions", "object lifetime", "factory pattern"]
      },
      {
        id: "rule-of-five",
        title: "When do you implement the Rule of Five?",
        round: "Implementation",
        difficulty: "Intermediate",
        prompt:
          "Design a resource-owning class. Which special member functions do you define or delete, and when would you prefer the Rule of Zero?",
        answerFramework: [
          "Start from ownership: what resource is owned, who releases it, and whether copying is meaningful.",
          "Cover destructor, copy constructor, copy assignment, move constructor and move assignment.",
          "Prefer Rule of Zero using standard library types when possible.",
          "Explain noexcept moves and strong exception safety for assignment."
        ],
        relatedTopics: ["RAII", "move semantics", "copy control", "exception safety"]
      }
    ]
  },
  {
    slug: "nvidia-systems-cpp-interview-questions",
    company: "NVIDIA",
    pageTitle: "NVIDIA Systems C++ Interview Questions",
    description:
      "Company-style practice for performance-heavy C++ roles: memory layout, concurrency, caches, profiling and systems reasoning.",
    roleFocus: "systems software · performance engineering · C++",
    tags: ["Performance", "Concurrency", "Memory", "C++"],
    questions: [
      {
        id: "false-sharing",
        title: "How would you detect and fix false sharing?",
        round: "Systems performance",
        difficulty: "Advanced",
        prompt:
          "Two threads update independent counters but performance collapses when they run together. Explain false sharing and how you would prove it.",
        answerFramework: [
          "Explain cache lines and coherence traffic between cores.",
          "Describe measurement: benchmark, CPU affinity, perf counters and before/after comparison.",
          "Fix with padding/alignment, per-thread aggregation or redesigning shared state.",
          "Warn that padding should be measured and not applied blindly."
        ],
        relatedTopics: ["cache lines", "MESI", "perf", "threading"]
      },
      {
        id: "allocator-cost",
        title: "Why can heap allocation dominate latency?",
        round: "C++ performance",
        difficulty: "Intermediate",
        prompt:
          "A request path allocates many small objects. Explain the costs and redesign the path for predictable latency.",
        answerFramework: [
          "Mention allocator metadata, locks, fragmentation, cache misses and tail latency.",
          "Use object reuse, arenas, pools, reserve, contiguous storage and ownership clarity.",
          "Explain trade-offs: memory footprint, lifetime boundaries and debugging complexity.",
          "Validate with allocation tracing and latency histograms."
        ],
        relatedTopics: ["allocators", "memory pools", "tail latency", "profiling"]
      },
      {
        id: "atomic-ordering",
        title: "When is relaxed atomic ordering enough?",
        round: "Concurrency",
        difficulty: "Advanced",
        prompt:
          "You need an atomic counter for statistics. Is memory_order_relaxed correct? Explain the condition under which it is safe.",
        answerFramework: [
          "Separate atomicity from ordering.",
          "Relaxed ordering can be fine for independent counters where no synchronization or publication depends on the value.",
          "Do not use relaxed ordering to publish data or coordinate ownership.",
          "Explain how acquire/release or stronger ordering would be used for handoff."
        ],
        relatedTopics: ["atomics", "memory ordering", "data races", "synchronization"]
      }
    ]
  },
  {
    slug: "cadence-eda-cpp-interview-questions",
    company: "Cadence / EDA",
    pageTitle: "EDA C++ Interview Questions",
    description:
      "Company-style EDA software interview preparation focused on graph algorithms, parsers, netlists, timing-style reasoning and scalable C++ data structures.",
    roleFocus: "EDA software · VLSI CAD · semiconductor tooling",
    tags: ["EDA", "Graphs", "Parsers", "Algorithms"],
    questions: [
      {
        id: "netlist-graph",
        title: "Represent a netlist as a graph",
        round: "EDA algorithms",
        difficulty: "Intermediate",
        prompt:
          "Design data structures for a small netlist. You need fast traversal from cells to nets and nets to connected cells.",
        answerFramework: [
          "Define entities: cell, pin, net and connection edges.",
          "Choose stable IDs or indexes instead of pointer-heavy structures when scale matters.",
          "Discuss adjacency lists, memory locality and bidirectional lookup.",
          "Explain validation: dangling pins, duplicate connections and topological constraints."
        ],
        relatedTopics: ["graphs", "netlists", "data layout", "EDA"]
      },
      {
        id: "topological-order",
        title: "Detect cycles and produce topological order",
        round: "Algorithms",
        difficulty: "Foundation",
        prompt:
          "Given a directed dependency graph, detect whether it has a cycle and return a valid evaluation order when possible.",
        answerFramework: [
          "Use DFS coloring or Kahn's algorithm.",
          "State time and space complexity clearly.",
          "Explain how to return a helpful cycle error for debugging.",
          "Connect the idea to build systems, netlists, scheduling or data-flow graphs."
        ],
        relatedTopics: ["graphs", "DFS", "topological sort", "cycle detection"]
      },
      {
        id: "parser-design",
        title: "Design a simple parser for an EDA input format",
        round: "Systems design",
        difficulty: "Intermediate",
        prompt:
          "You need to parse a large line-oriented design file. How do you structure parsing, validation and error reporting?",
        answerFramework: [
          "Split lexical scanning, parsing and semantic validation.",
          "Preserve source locations for useful errors.",
          "Use streaming or chunked processing for large files.",
          "Discuss test cases, malformed input and performance bottlenecks."
        ],
        relatedTopics: ["parsing", "validation", "large files", "tooling"]
      }
    ]
  },
  {
    slug: "hft-cpp-interview-questions",
    company: "HFT Firms",
    pageTitle: "HFT C++ Interview Questions",
    description:
      "HFT-style software engineering questions covering low-latency C++, order books, market data, Linux, networking, risk and tick-to-trade systems.",
    roleFocus: "HFT software engineer · low-latency systems · trading infrastructure",
    tags: ["HFT", "Low latency", "Order book", "Linux"],
    questions: [
      {
        id: "order-book-design",
        title: "Design a limit order book",
        round: "HFT systems",
        difficulty: "Advanced",
        prompt:
          "Design an in-memory limit order book that supports add, cancel, modify and trade events while exposing best bid/ask efficiently.",
        answerFramework: [
          "Clarify price levels, order IDs, side, quantity and event semantics.",
          "Use maps/vectors for price levels depending on price domain and performance constraints.",
          "Keep order-id lookup separate from price-level ordering.",
          "Discuss determinism, replay, gaps, tests and latency measurement."
        ],
        relatedTopics: ["order book", "market data", "data structures", "latency"]
      },
      {
        id: "udp-gap-recovery",
        title: "How do you handle missing market-data packets?",
        round: "Networking",
        difficulty: "Advanced",
        prompt:
          "A UDP multicast feed has sequence numbers. Your process detects a gap. What should happen next?",
        answerFramework: [
          "Detect sequence gaps deterministically and stop using corrupted state for decisions.",
          "Request recovery or snapshot depending on feed design.",
          "Replay missed messages in order before marking the book valid again.",
          "Expose metrics, alerts and fail-safe behavior."
        ],
        relatedTopics: ["UDP", "multicast", "sequence numbers", "recovery"]
      },
      {
        id: "latency-budget",
        title: "Explain a tick-to-trade latency budget",
        round: "Systems design",
        difficulty: "Intermediate",
        prompt:
          "Break down the path from market-data packet arrival to order send. Where do you measure, and what can go wrong?",
        answerFramework: [
          "Break into receive, decode, book update, strategy, risk, encode and send.",
          "Measure with consistent timestamps and percentiles, not averages.",
          "Discuss CPU affinity, allocation, locks, logging, branch misses and NIC/kernel path.",
          "Use observability that does not itself destroy latency."
        ],
        relatedTopics: ["tick-to-trade", "latency", "measurement", "risk"]
      }
    ]
  }
];

export const interviewSetsBySlug = new Map(interviewSets.map((set) => [set.slug, set]));

export const interviewQuestionCount = interviewSets.reduce(
  (total, set) => total + set.questions.length,
  0,
);

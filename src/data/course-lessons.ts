import { lessons as hftLessons } from "./curriculum";
import { eliteCourses, type EliteCourse } from "./elite-courses";
import { careerCourseTopics } from "./career-course-topics";
import { problemBank, type BankProblem } from "./problem-bank";

export type CourseLesson = {
  slug: string;
  number: number;
  courseSlug: string;
  title: string;
  moduleTitle: string;
  moduleNumber: number;
  objectives: string[];
  lab: string;
  outcome: string;
  videoId?: string;
  problemSlugs: string[];
  practiceKind: "cpp-problems" | "specialty-labs";
};

/**
 * Curriculum topics are derived from the supplied 538-episode academic tracker.
 * Episode names are editorial curriculum titles, not a claim that their videos
 * are published. HFT retains the existing original 96-lesson outline.
 */
const concurrencySections: string[][] = [
  [
    "Concurrency vs Parallelism: Latency, Throughput & Progress",
    "std::thread Lifecycle: Join, Detach and RAII",
    "Passing Arguments Safely into Threads",
    "Transferring Thread Ownership",
    "Hardware Concurrency, Thread IDs and Topology",
    "thread_local Storage and Initialization",
  ],
  [
    "Race Conditions vs C++ Data Races",
    "Mutexes, std::lock_guard and std::unique_lock",
    "Deadlock Causes, Lock Ordering and Avoidance",
    "Protecting Shared State and Escaping References",
    "std::shared_mutex and Reader–Writer Locking",
    "Recursive Mutexes and Alternative Synchronization",
  ],
  [
    "Condition Variables, Predicates and Spurious Wakeups",
    "Implementing a Blocking Producer–Consumer Queue",
    "std::promise, std::future and std::packaged_task",
    "std::async: Launch Policies and Deferred Execution",
    "Waiting with Deadlines, Timeouts and Cancellation",
    "Callbacks, Handoff and Continuation Patterns",
  ],
  [
    "Happens-Before, Modification Order and Data-Race Freedom",
    "std::atomic Types, Operations and Initialization",
    "Relaxed, Acquire, Release and Sequential Consistency",
    "Release Sequences, Fences and Synchronizes-With",
    "Compare-and-Exchange: Weak, Strong and Failure Ordering",
    "Atomic Costs, Coherence Traffic and Lock-Freedom",
    "Formal Memory Ordering: Acquire/Release/Acq_Rel/Seq_Cst",
    "Publication, Transitive Happens-Before and Fences",
    "CAS Retry Loops and Failure Ordering",
    "Obstruction-Free, Lock-Free and Wait-Free Progress",
    "Linearizability, Linearization Points and Histories",
    "False Sharing, Cache-Line Padding and Backoff",
  ],
  [
    "Exception-Safe Thread-Safe Stack",
    "Fine-Grained Concurrent Queue",
    "Concurrent Hash Maps and Striped Locking",
    "Lock Granularity in Concurrent Linked Structures",
  ],
  [
    "Task Decomposition and Dependency Graphs",
    "False Sharing, Cache Contention and Scalability",
    "Thread Pools and Work-Stealing Schedulers",
    "Cooperative Cancellation and std::stop_token",
    "Parallel Algorithms and Execution Policies",
    "std::jthread, Latches, Barriers and Semaphores",
  ],
  [
    "SPSC Fixed-Capacity Ring Buffer: Invariants and Implementation",
    "SPSC Queue Padding and Benchmark Design",
    "MPSC Bounded Queue: Contention and Publication",
    "MPMC Bounded Queue with Sequence Counters",
    "Lock-Free Stack with Pointer Compare-and-Swap",
    "Memory-Ordering Bugs in Concurrent Queues",
    "Blocking vs Spin-Wait vs Adaptive Waiting",
    "Batching, Backpressure and Bounded Queues",
  ],
  [
    "The ABA Problem and Tagged Pointers",
    "Hazard Pointers: Memory Reclamation and Safety",
    "Epoch-Based Reclamation and Quiescent States",
    "Read-Copy-Update and Read-Mostly Data",
    "Seqlocks, Versioned Reads and Consistent Snapshots",
    "Double Buffering and Snapshot Publication",
    "Michael–Scott Queue: Algorithm and Proof Obligations",
    "Lock-Free Hash Tables and Resizing",
    "Litmus Tests and Concurrent Model Checking",
    "ThreadSanitizer Limitations for Atomic Correctness",
    "Production Lock-Free Code Review",
  ],
  [
    "ThreadSanitizer and Data-Race Detection",
    "Deadlock Diagnostics and Lock Instrumentation",
    "Deterministic Schedule Testing and Model-Based Fuzzing",
    "Parallel Benchmarking and Scalability Laws",
    "Concurrency Design Interview and Correctness Defense",
  ],
];

const otherCourseTitles: Record<string, string[][]> = {
  "core-cpp-interviews": [
    ["Translation Units, Linkage and the One-Definition Rule", "C++ Types, Declarations and Initialization", "Name Lookup, Scope and Overload Resolution", "Object Representation, Alignment and Padding"],
    ["Storage Duration and Object Lifetime", "Construction, Destruction and Exception Paths", "Stack, Heap and Static Storage", "Lifetime Extension, Aliasing and Dangling References"],
    ["RAII and Scope Guards", "std::unique_ptr and Ownership Transfer", "std::shared_ptr and Control Blocks", "std::weak_ptr, Ownership Cycles and Views"],
    ["Copy and Move Special Member Functions", "std::move and Valid Moved-From States", "noexcept Move and Container Relocation", "Rule of Zero/Five and Exception Guarantees"],
    ["Virtual Dispatch, Vtables and Object Slicing", "Virtual Destructors and Multiple Inheritance", "RTTI, Casts and Type Safety", "Composition, Interfaces and Object Relationships"],
    ["std::vector Growth, Capacity and Iterator Invalidation", "std::deque vs std::list: Stability and Locality", "Contiguous Storage and Cache-Efficient Iteration", "Allocator-Aware Containers and std::pmr"],
    ["std::map vs std::unordered_map: Complexity and Contracts", "Ordering, Hashing and Equality Requirements", "Iterator Categories and STL Algorithms", "Ranges, Views and Lazy Evaluation"],
    ["std::string and std::string_view Lifetimes", "std::optional, std::variant and std::any", "std::filesystem, Streams and Numeric Conversions", "Exceptions, Error Codes and Error-Safe APIs"],
    ["Function and Class Templates", "auto, decltype and Deduction Rules", "Template Specialization and Overload Resolution", "Type Traits and Generic Programming"],
    ["Undefined Behavior and the As-If Rule", "Sanitizers and Memory-Debugging Tools", "STL Trade-Off and Complexity Interviews", "C++ Lifetime and Correctness Code-Review Lab"],
  ],
  "dsa-algorithms-cpp": [
    ["Big-O and Tight Complexity Bounds", "Amortized Analysis and Potential Arguments", "Recursion, Loop Invariants and Correctness Proofs", "Choosing Data Structures Under Constraints"],
    ["Arrays, Hash Maps and Frequency Tables", "Prefix Sums and Difference Arrays", "Counting, Grouping and Hashing Invariants", "Intervals and Event Sweeping"],
    ["Two-Pointer Invariants", "Fixed-Size Sliding Windows", "Variable-Size Sliding Windows", "Monotonic Deques for Sliding Maximum"],
    ["Stacks for Parsing and Nesting", "Monotonic Stacks and Next-Greater Queries", "Min Stacks and Monotonic Queues", "Expression Evaluation and Parenthesis Parsing"],
    ["Linked Lists and Pointer Correctness", "Slow/Fast Pointers and Cycle Detection", "Circular Queues and Ring Buffers", "LRU Cache with a Hash Map and Linked List"],
    ["Binary Search Invariants and Boundary Conditions", "Binary Search on the Answer", "Merge Sort, Quicksort and Stable Ordering", "Quickselect, Partitioning and Top-K"],
    ["Binary Tree DFS and BFS Traversals", "Binary Search Trees and Their Invariants", "Lowest Common Ancestor", "Tree Diameter and Recursive State"],
    ["Binary Heaps and Priority Queues", "Top-K and Streaming Selection", "Merge K Sorted Streams", "Heap-Based Scheduling and Interval Processing"],
    ["Graph Representation, BFS and DFS", "Connected Components and Disjoint-Set Union", "Dijkstra and Shortest-Path Algorithms", "Topological Sorting and Dependency Graphs"],
    ["Greedy Choice and Exchange Arguments", "Interval Scheduling and Resource Allocation", "Minimum Spanning Trees", "Sweep-Line and Event Ordering"],
    ["One-Dimensional Dynamic Programming", "Grid and Path Dynamic Programming", "Knapsack and Subsequence State Design", "Advanced DP: Intervals, Bitmasks and Optimization"],
    ["Backtracking, Pruning and Search Ordering", "Tries and Prefix Queries", "Bit Manipulation and Numeric Correctness", "Fenwick and Segment Trees for Range Queries"],
  ],
  "stl-patterns-lld-cpp-design": [
    [
      "SOLID Principles in Performance-Sensitive C++",
      "Ownership, Composition and Inheritance Relationships",
      "Resource-Safe API Contracts",
      "Virtual Dispatch, Object Layout and Multiple Inheritance",
      "CRTP and Static Polymorphism",
      "Type Erasure and Any-Like Wrappers",
      "Concepts and Policy-Based Class Design",
      "std::expected, Exceptions and Error-Code API Design",
    ],
    [
      "Strategy Pattern and Compile-Time Policies",
      "Factories, Abstract Factories and Object Pools",
      "Observer Pattern, Event Buses and Callback Lifetimes",
      "Builder Pattern and Named-Parameter Idioms",
      "State Machines and Typestate",
      "Command Pattern, Undo and Deterministic Replay",
      "Dependency Injection and Service Boundaries",
      "Pimpl and ABI-Stable Interfaces",
      "Adapter and Decorator Patterns",
    ],
    [
      "Design a Rate Limiter",
      "Design an LRU/LFU Cache",
      "Design a Task Scheduler",
      "Design a Thread Pool",
      "Design a Logging Subsystem",
      "Design a Memory Arena",
      "Design a Publish/Subscribe Event Dispatcher",
      "Design a Connection Pool",
      "Design a Metrics Collection Library",
      "Design an Extensible Binary Parser",
    ],
    [
      "Unit Tests, Property Tests and Interface Contracts",
      "LLD Trade-Off Interviews and Whiteboarding",
      "Safe Refactoring of Legacy C++ Classes",
    ],
  ],
  "linux-os-networking-systems-engineers": [
    ["Linux Toolchains, Processes and Program Loading", "fork, exec and Process Lifecycles", "File Descriptors and Open File Descriptions", "Shells, Permissions and Runtime Environments"],
    ["Linux Scheduling and Preemption", "std::thread vs pthreads vs Kernel Tasks", "CPU Affinity, Isolation and SMT", "Context Switching, Interrupts and Timing"],
    ["Virtual Address Spaces, Paging and Page Faults", "Page Tables, TLBs and Huge Pages", "mmap, mlock and Memory Mapping", "NUMA, Memory Locality and Allocation"],
    ["System Calls and Kernel/User Boundaries", "Buffered vs Direct and Nonblocking I/O", "Signals, Pipes and Shared Memory IPC", "Unix Domain Sockets and File-Descriptor Passing"],
    ["TCP Handshake, Reliability and Flow Control", "Stream Framing and Partial Reads/Writes", "Nagle, Delayed ACKs and Backpressure", "Connection Shutdown, Timeouts and Retries"],
    ["UDP Datagram Semantics and Checksums", "IP Multicast Subscriptions", "Sequencing, Gap Detection and Packet Recovery", "Packet Drops, Socket Buffers and Observability"],
    ["select, poll and epoll Fundamentals", "Edge- vs Level-Triggered epoll", "Reactor and Event-Loop Architecture", "io_uring, Busy Polling and Asynchronous I/O Trade-Offs"],
    ["CPU Cache Hierarchy and Locality", "Cache Lines, Mapping and Misses", "MESI Coherence and False Sharing", "C++ Struct Padding, Alignment, AoS and SoA"],
    ["CPU Pipelines, Branch Prediction and Speculation", "Out-of-Order Execution and Front-End Bottlenecks", "SIMD, Prefetching and Vectorization", "Custom Arenas, Slabs and std::pmr Allocators"],
    ["gdb, Core Dumps and AddressSanitizer", "strace, eBPF and Syscall Tracing", "perf, Flame Graphs and Hardware Counters", "Benchmarking p50/p99/p99.9 Under Interference"],
  ],
  "advanced-modern-cpp": [
    ["auto and Placeholder-Type Deduction", "decltype, decltype(auto) and Unevaluated Expressions", "Reference Types, cv-Qualifiers and Value Categories", "Template Argument Deduction and Non-Deduced Contexts"],
    ["std::move: Cast Semantics and Moved-From State", "Forwarding References and Reference Collapsing", "std::forward and Perfect Forwarding", "Overload Resolution and Forwarding Pitfalls"],
    ["Variadic Templates and Parameter Packs", "Fold Expressions and Evaluation Order", "Template Specialization, SFINAE and Partial Ordering", "Compile-Time Recursion, Index Sequences and Generic Lambdas"],
    ["Structured Bindings and Copy Elision in C++17", "if constexpr and Compile-Time Branching", "std::optional, std::variant and std::visit", "std::string_view, std::filesystem and std::pmr"],
    ["Concepts, Requires-Expressions and Constraint Subsumption", "C++20 Ranges, Views and Borrowed Ranges", "Comparison Categories and the Spaceship Operator", "consteval, constinit and Constant Evaluation"],
    ["Coroutines, Suspension and Frame Lifetimes", "std::span and Nonowning Views", "std::jthread, stop_token and Cooperative Cancellation", "std::atomic_ref, Latches and Barriers"],
    ["C++23 Explicit Object Parameters (Deducing This)", "std::expected and Monadic Error Handling", "std::mdspan, std::flat_map and std::flat_set", "std::print, std::stacktrace and Feature Availability"],
    ["Type Erasure and std::move_only_function", "Small-Buffer Optimization and std::pmr", "Zero-Cost Abstractions, Exceptions and ABI", "Modules, Header Units and Library Interface Design"],
    ["Feature-Test Macros and Compiler Compatibility", "C++26 Preview: Fixed-Capacity Containers and Iterators", "C++26 Preview: Contracts, Reflection and SIMD", "Portability Lab: Standard Support, Defect Reports and Fallbacks"],
  ],
};

const slugify = (value: string) => value.toLowerCase()
  .replace(/c\+\+/g, "cpp").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const tokens = (value: string) => value.toLowerCase().split(/[^a-z0-9]+/)
  .filter(word => word.length >= 4 && !["build", "create", "implement", "using", "from", "with", "this", "design", "about", "basic", "into"].includes(word));
const uniqueWords = (value: string) => new Set(tokens(value));

function findRelevantProblems(course: EliteCourse, title: string, ordinal: number): string[] {
  if (["C5","C6","C7","C8","C9","C10"].includes(course.code)) return [];
  const preferred = course.slug.includes("concurrency") ? ["Concurrency"] :
    course.slug.includes("hft") ? ["HFT Systems","Concurrency","Core C++"] :
    course.slug.includes("patterns") ? ["Design Patterns","Core C++"] :
    course.slug.includes("linux") ? ["HFT Systems","Concurrency"] :
    ["Core C++","Concurrency"];
  const keywordSet = uniqueWords(title);
  const scored = problemBank.map((problem, position) => {
    let score = preferred.includes(problem.category) ? 35 - preferred.indexOf(problem.category) * 12 : 0;
    for (const word of tokens(problem.title + " " + problem.tags.join(" "))) {
      if (keywordSet.has(word)) score += 25;
    }
    // Deterministic variance gives lessons independent related problems
    // even where their text shares few keywords.
    score += (position + ordinal * 37) % 17;
    return { problem, score };
  });
  scored.sort((a,b) => b.score - a.score || a.problem.slug.localeCompare(b.problem.slug));
  const result = scored.filter(item => preferred.includes(item.problem.category)).slice(0,3).map(item => item.problem.slug);
  return result;
}

function makeLesson(
  course: EliteCourse, title: string, number: number,
  moduleNumber: number, details?: { goals?: string[]; lab?: string; proof?: string; videoId?: string },
): CourseLesson {
  const moduleTitle = course.modules[moduleNumber] ?? course.modules[0];
  const label = title.replace(/^[A-Z][a-z]+ [0-9]+: /,"");
  const specialty = ["C5","C6","C7","C8","C9","C10"].includes(course.code);
  const domain = course.code === "C5" ? "GPU memory, synchronization and CUDA correctness" :
    course.code === "C6" ? "single-device GPU kernel efficiency and numerics" :
    course.code === "C7" ? "inference runtime scheduling, KV memory and serving SLOs" :
    course.code === "C8" ? "LLM application trust boundaries, retrieval and evaluation" :
    course.code === "C9" ? "multi-GPU infrastructure, networking and failure handling" :
    course.code === "C10" ? "architecture trade-offs, risk, quality and technical leadership" :
    "C++ implementation contracts and performance";
  return {
    slug: String(number).padStart(3,"0") + "-" + slugify(title),
    number,
    courseSlug: course.slug,
    title,
    moduleTitle,
    moduleNumber,
    objectives: details?.goals ?? [
      "Explain the mechanisms, contracts and invariants behind " + label.toLowerCase() + ".",
      "Identify correctness risks, resource costs and failure modes in " + domain + ".",
      specialty
        ? "Design an appropriate experiment, prototype or architecture review with measurable acceptance criteria."
        : "Implement and reason about this concept in portable, testable C++.",
    ],
    lab: details?.lab ?? (specialty
      ? "Draft a reproducible hands-on lab for " + title + ". Include setup, a baseline, failure cases and measurable results."
      : "Implement a focused C++ example with boundary tests and explicitly documented invariants."),
    outcome: details?.proof ?? (specialty
      ? "Present evidence (code, workload traces, architecture decisions or benchmarks), not only a running demo."
      : "Provide tested C++ code, reasoning about undefined behavior, and a correctness/performance report."),
    ...(details?.videoId ? {videoId:details.videoId} : {}),
    problemSlugs: findRelevantProblems(course,title,number),
    practiceKind: specialty ? "specialty-labs" : "cpp-problems",
  };
}

export const courseLessons: CourseLesson[] = eliteCourses.flatMap(course => {
  if (course.slug === "low-latency-cpp-hft-systems") {
    return hftLessons.map(lesson => makeLesson(course,lesson.title,lesson.number,lesson.phase-1,{
      goals:[...lesson.learn],lab:lesson.lab,proof:lesson.proof,videoId:lesson.youtubeId,
    }));
  }
  if (course.slug === "cpp-concurrency-lockfree-systems") {
    let number = 0;
    return concurrencySections.flatMap((titles, moduleNumber) =>
      titles.map(title => makeLesson(course, title, ++number, moduleNumber)));
  }
  const sections = careerCourseTopics[course.slug] || otherCourseTitles[course.slug] || [];
  let number = 0;
  return sections.flatMap((titles, moduleNumber) =>
    titles.map(title => makeLesson(course, title, ++number, moduleNumber)));
});

export const lessonsByCourse = new Map(eliteCourses.map(course => [
  course.slug,courseLessons.filter(lesson => lesson.courseSlug === course.slug),
]));

export function getCourseLesson(courseSlug: string, lessonSlug: string): CourseLesson | undefined {
  return lessonsByCourse.get(courseSlug)?.find(lesson => lesson.slug === lessonSlug);
}

export function lessonsForProblem(slug: string): CourseLesson[] {
  return courseLessons.filter(lesson => lesson.problemSlugs.includes(slug)).slice(0,6);
}

export function getCourseProblemCounts(courseSlug: string) {
  const refs=lessonsByCourse.get(courseSlug)||[];
  const uniques = new Set(refs.flatMap(lesson=>lesson.problemSlugs));
  return { lessonCount:refs.length, uniqueProblems:uniques.size, specialtyLabs: refs.filter(l=>l.practiceKind==="specialty-labs").length * 2 };
}

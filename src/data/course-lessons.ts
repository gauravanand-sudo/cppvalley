import { lessons as hftLessons } from "./curriculum";
import { eliteCourses, type EliteCourse } from "./elite-courses";
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
};

const concurrencyTitles = [
  "Concurrency vs parallelism: foundations",
  "std::thread and creating workers",
  "join, detach, lifetime and RAII",
  "Race conditions vs data races",
  "std::mutex, lock_guard and unique_lock",
  "Deadlocks: detection and prevention",
  "shared_mutex, call_once and recursive_mutex",
  "Condition variables and spurious wakeups",
  "std::async, future and packaged_task",
  "promise and shared_future",
  "Timeouts, barriers and message passing",
  "Memory locations and the C++ memory model",
  "std::atomic and atomic operations",
  "Compare-and-swap: weak vs strong",
  "Relaxed, acquire, release and seq_cst",
  "Happens-before and atomic fences",
  "Build a mutex-protected stack",
  "Build a blocking thread-safe queue",
  "Fine-grained hash maps and linked lists",
  "Lock-free vs wait-free progress",
  "Build a lock-free stack and understand ABA",
  "Hazard pointers and reference counting",
  "Implement a lock-free queue",
  "Divide work across threads",
  "False sharing and cache contention",
  "Parallel algorithms from scratch",
  "Build a thread pool and work stealing",
  "Safe cancellation, shutdown and jthread",
  "C++ parallel STL execution policies",
  "Debug, test and verify concurrent code",
] as const;

const otherCourseTitles: Record<string, string[][]> = {
  "core-cpp-interviews": [
    ["Translation units and headers", "Compiler pipeline and linking", "Declarations, definitions and ODR", "Storage duration and scope"],
    ["Object lifetime rules", "Constructors and destruction order", "RAII and resource acquisition", "Exception safety basics"],
    ["Raw pointers and references", "unique_ptr and move ownership", "shared_ptr and weak_ptr cycles", "Ownership-aware API parameters"],
    ["Copy constructors and assignment", "Move constructors and noexcept", "The rule of zero and five", "Value categories in everyday C++"],
    ["Virtual dispatch and object layout", "Virtual destructors", "Slicing, casting and RTTI", "Abstract interfaces and composition"],
    ["vector, deque and list trade-offs", "Ordered and unordered maps", "Container invalidation", "Allocators and memory locality"],
    ["Iterator categories and algorithms", "Sorting and comparators", "Ranges and views", "Custom STL algorithms"],
    ["Undefined behavior and sanitizers", "Error handling and exceptions", "Debugging memory errors", "Performance measurement fundamentals"],
    ["Function and class templates", "auto and decltype", "Template specialization", "Type traits introduction"],
    ["RAII interview exercises", "C++ object model interview exercises", "STL interview challenges", "Systematic C++ revision"],
  ],
  "dsa-algorithms-cpp": [
    ["Big O and tight bounds", "Amortized analysis", "Recursion and invariants", "Choosing data structures"],
    ["Prefix sums and difference arrays", "Two pointers", "Sliding window", "Intervals and sweeping"],
    ["String parsing", "Hash maps and frequency counting", "Rolling hash basics", "Anagrams and pattern matching"],
    ["Stack foundations", "Monotonic stack", "Min stacks and deque", "Next greater element"],
    ["Linked-list patterns", "Two-pointer cycle detection", "Queues and ring buffers", "Design an LRU cache"],
    ["Binary search invariants", "Binary search on answers", "Merge sort and quicksort", "Quickselect and partitioning"],
    ["Binary tree traversals", "Binary search trees", "Lowest common ancestor", "Tree recursion and diameter"],
    ["Binary heaps", "Top K problems", "Merging ordered streams", "Priority queues in scheduling"],
    ["Graph representation and BFS", "DFS and connected components", "Dijkstra and shortest paths", "Topological sorting"],
    ["Greedy proof techniques", "Interval scheduling", "Disjoint sets", "Minimum spanning trees"],
    ["1D dynamic programming", "Grid DP", "Knapsack patterns", "DP over subsequences"],
    ["Backtracking and pruning", "Bitmask algorithms", "Tries and prefix queries", "Advanced range-query structures"],
  ],
  "stl-patterns-lld-cpp-design": [
    ["Responsibilities and boundaries", "Dependency inversion", "Composition over inheritance", "Interface contracts"],
    ["Single responsibility in C++", "Open-closed design", "Liskov substitution", "Interface segregation"],
    ["Factory method", "Abstract factory", "Builder and immutable objects", "Prototype and object construction"],
    ["Adapter pattern", "Decorator pattern", "Facade and proxy", "Composite and bridge"],
    ["Strategy pattern", "Observer and subscriptions", "State machines", "Command and undo"],
    ["Ownership contracts in APIs", "Safe observer lifetimes", "Object pool leases", "Polymorphic destruction"],
    ["LRU caching design", "Memory pool architecture", "Resource manager lifecycle", "Bounded queue design"],
    ["Typed event bus", "Event-driven state transitions", "Pub-sub with cancellation", "Message routing and validation"],
    ["Design a notification service", "Design an order router", "Design a matching engine", "Review and defend your LLD"],
  ],
  "linux-os-networking-systems-engineers": [
    ["Shell and process environment", "Filesystem and permissions", "Build tools and GDB", "Linux diagnostics"],
    ["Process creation and exec", "Linux threads and pthreads", "File descriptors", "Process lifecycle"],
    ["Scheduling policies", "Thread affinity", "Contention and preemption", "Synchronization primitives"],
    ["Virtual memory and paging", "Page tables and TLB", "mmap and memory mapping", "Memory allocation behavior"],
    ["System call boundaries", "Buffered vs direct I/O", "Nonblocking descriptors", "Filesystem error handling"],
    ["Signals and safe handling", "Pipes and FIFOs", "Shared memory IPC", "Unix domain sockets"],
    ["Socket lifecycle", "TCP reliability and congestion", "Stream framing", "Backpressure and timeouts"],
    ["UDP datagrams", "Multicast subscriptions", "Sequence recovery", "Packet loss monitoring"],
    ["epoll event loops", "Edge vs level triggered I/O", "Designing a reactor", "Async socket state machines"],
    ["gdb and core dumps", "strace and ltrace", "perf stat and flame graphs", "Reproducible performance tests"],
  ],
  "advanced-modern-cpp": [
    ["auto deduction rules", "decltype and decltype(auto)", "References and cv qualifiers", "Type traits"],
    ["lvalues, rvalues and xvalues", "Reference collapsing", "Move semantics deep dive", "Lifetime extension pitfalls"],
    ["Forwarding references", "std::forward and perfect forwarding", "Overload resolution", "SFINAE fundamentals"],
    ["Variadic templates", "Fold expressions", "Index sequences", "Compile-time recursion"],
    ["constexpr functions and containers", "consteval and constinit", "Compile-time computation", "Constant evaluation pitfalls"],
    ["C++20 concepts", "requires expressions", "Constraint subsumption", "Designing generic interfaces"],
    ["std::variant and visitation", "std::optional and expected", "Ranges and views", "Coroutines overview"],
    ["Static vs dynamic polymorphism", "Type erasure and std::function", "Small-buffer optimization", "Virtual vs template APIs"],
    ["Exception safety and noexcept", "Zero-cost abstractions", "Custom allocators", "Reviewing library-level API designs"],
  ],
};

const slugify = (value: string) => value.toLowerCase()
  .replace(/c\+\+/g, "cpp").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const tokens = (value: string) => value.toLowerCase().split(/[^a-z0-9]+/)
  .filter(word => word.length >= 4 && !["build", "create", "implement", "using", "from", "with", "this", "design", "about", "basic", "into"].includes(word));
const uniqueWords = (value: string) => new Set(tokens(value));

function findRelevantProblems(course: EliteCourse, title: string, ordinal: number): string[] {
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
  return {
    slug: String(number).padStart(3,"0") + "-" + slugify(title),
    number,
    courseSlug: course.slug,
    title,
    moduleTitle,
    moduleNumber,
    objectives: details?.goals ?? [
      "Explain the core ideas and invariants behind " + label.toLowerCase() + ".",
      "Reason about real C++ implementation trade-offs, failure cases and complexity.",
      "Apply the concept in an original, testable coding exercise.",
    ],
    lab: details?.lab ?? "Work through a focused C++ implementation and check its observable behavior under boundary cases.",
    outcome: details?.proof ?? "Record a working example, test evidence, and a brief explanation of the implementation choices.",
    ...(details?.videoId ? {videoId:details.videoId} : {}),
    problemSlugs: findRelevantProblems(course,title,number),
  };
}

export const courseLessons: CourseLesson[] = eliteCourses.flatMap(course => {
  if (course.slug === "low-latency-cpp-hft-systems") {
    return hftLessons.map(lesson => makeLesson(course,lesson.title,lesson.number,lesson.phase-1,{
      goals:[...lesson.learn],lab:lesson.lab,proof:lesson.proof,videoId:lesson.youtubeId,
    }));
  }
  if (course.slug === "cpp-concurrency-lockfree-systems") {
    return concurrencyTitles.map((title,i) => makeLesson(course,title,i+1,Math.min(course.modules.length-1,Math.floor(i/3.5))));
  }
  const sections = otherCourseTitles[course.slug] || [];
  return sections.flatMap((titles,moduleNumber) => titles.map((title,withinModule) => {
    const number=moduleNumber*4+withinModule+1;
    return makeLesson(course,title,number,moduleNumber);
  }));
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
  return { lessonCount:refs.length, uniqueProblems:uniques.size };
}

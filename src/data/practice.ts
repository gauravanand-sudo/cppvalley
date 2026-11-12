export type PracticeCategory = "HFT Systems" | "Concurrency" | "Core C++" | "Design Patterns";
export type PracticeDifficulty = "Easy" | "Medium" | "Hard";
export type PracticeExample = { input: string; output: string; explanation?: string };
export type PracticeProblem = {
  slug: string;
  title: string;
  category: PracticeCategory;
  difficulty: PracticeDifficulty;
  tags: string[];
  summary: string;
  statement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  examples: PracticeExample[];
  starterCode: string;
};
export const practiceCategories: PracticeCategory[] = ["HFT Systems", "Concurrency", "Core C++", "Design Patterns"];
export const practiceDifficulties: PracticeDifficulty[] = ["Easy", "Medium", "Hard"];

/** Editorial target: 100 fully verified, original problems per category AND difficulty. */
export const practiceTargetPerCategoryDifficulty = 100;

/** Original seed problems. Only publish problems with statements, starter code, and independently checked test fixtures. */
export const practiceProblems: PracticeProblem[] = [
  {
    slug: "trade-notional",
    title: "Calculate Total Trade Notional",
    category: "HFT Systems", difficulty: "Easy",
    tags: ["Market Data", "Arithmetic", "Parsing"],
    summary: "Calculate the total quantity × price across a stream of executed trades.",
    statement: "A trading feed sends executed trades as integer (quantity, price) pairs. Calculate the total notional value of the feed. This challenge tests reliable parsing and integer arithmetic. All quantities and prices are nonnegative.",
    inputFormat: "First line: N, the number of trades. Next N lines: quantity price.",
    outputFormat: "Print one integer: the sum of quantity × price for all trades.",
    constraints: ["0 ≤ N ≤ 100000", "0 ≤ quantity, price ≤ 100000", "The answer fits into a signed 64-bit integer."],
    examples: [{input:"3\n2 100\n1 90\n3 110",output:"620",explanation:"2×100 + 1×90 + 3×110 = 620."}],
    starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Read trades and print the total notional.\n    return 0;\n}\n"
  },
  {
    slug: "market-sequence-gaps",
    title: "Detect Missing Market Data Sequence Numbers",
    category: "HFT Systems", difficulty: "Medium",
    tags: ["Market Data", "Sequences", "Validation"],
    summary: "Count dropped sequence numbers in a strictly increasing market data stream.",
    statement: "A market-data publisher labels messages with monotonically increasing sequence numbers. A gap of size k between two received messages indicates k-1 missing messages. Count all missing messages. Input sequence numbers are strictly increasing.",
    inputFormat: "First line: N. Second line: N space-separated sequence numbers.",
    outputFormat: "Print the number of missing sequence numbers between the first and last received messages.",
    constraints: ["1 ≤ N ≤ 100000", "0 ≤ sequence[i] ≤ 10^12", "sequence[i] < sequence[i+1]"],
    examples: [{input:"5\n12 13 16 17 19",output:"3",explanation:"Messages 14, 15 and 18 are missing."}],
    starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Count sequence gaps.\n    return 0;\n}\n"
  },
  {
    slug: "mutex-ownership-trace",
    title: "Validate a Mutex Ownership Trace",
    category: "Concurrency", difficulty: "Easy",
    tags: ["Mutex", "State Machines", "Debugging"],
    summary: "Find invalid lock and unlock operations in a sequentially recorded trace.",
    statement: "A debugger records mutex operations in a single chronological trace. Each event is either L thread_id (lock) or U thread_id (unlock). The mutex is initially unlocked. A lock is valid only when it is unlocked; an unlock is valid only when the requesting thread owns it. Invalid operations increment an error counter and leave mutex state unchanged. Count errors. This is a trace-validation exercise, not a substitute for true concurrent race detection.",
    inputFormat: "First line: N. Next N lines: L id or U id.",
    outputFormat: "Print the number of invalid operations.",
    constraints: ["0 ≤ N ≤ 100000", "1 ≤ id ≤ 10^9"],
    examples: [{input:"6\nL 1\nL 2\nU 2\nU 1\nL 2\nU 2",output:"2",explanation:"Thread 2 cannot lock or unlock the mutex while thread 1 owns it."}],
    starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Validate lock ownership in event order.\n    return 0;\n}\n"
  },
  {
    slug: "bounded-ring-buffer",
    title: "Implement a Bounded Ring Buffer Simulator",
    category: "Concurrency", difficulty: "Medium",
    tags: ["Ring Buffer", "Queues", "Data Structures"],
    summary: "Model a fixed-capacity FIFO buffer, including full and empty behavior.",
    statement: "Implement a sequential reference model of a bounded FIFO ring buffer. PUSH x inserts x if there is room; otherwise print FULL. POP prints and removes the oldest element, or prints EMPTY when no element is available. Do not confuse this reference model with a thread-safe SPSC implementation; the latter requires additional concurrency reasoning.",
    inputFormat: "First line: capacity N and number of commands Q. Next Q lines: PUSH x or POP.",
    outputFormat: "Print a line for every POP and every rejected PUSH, in command order.",
    constraints: ["1 ≤ N ≤ 100000", "1 ≤ Q ≤ 100000", "-10^9 ≤ x ≤ 10^9"],
    examples: [{input:"2 6\nPUSH 7\nPUSH 8\nPUSH 9\nPOP\nPOP\nPOP",output:"FULL\n7\n8\nEMPTY"}],
    starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Implement FIFO queue behavior with a fixed capacity.\n    return 0;\n}\n"
  },
  {
    slug: "move-only-owner",
    title: "Track Move-Only Resource Ownership",
    category: "Core C++", difficulty: "Easy",
    tags: ["RAII", "Move Semantics", "Ownership"],
    summary: "Simulate ownership transfers of non-copyable C++ resources.",
    statement: "There are N named resource handles, indexed 1..N; initially none own a resource. CREATE i assigns a new resource to handle i. MOVE a b moves ownership FROM handle b TO handle a, leaving b empty; the previous resource of a is released. RESET i releases any resource owned by i. Print the number of handles that own a resource after processing all commands. Model valid move-only ownership rules.",
    inputFormat: "First line: N Q. Next Q lines: CREATE i, MOVE a b, or RESET i.",
    outputFormat: "Print the count of nonempty handles after the final command.",
    constraints: ["1 ≤ N ≤ 100000", "1 ≤ Q ≤ 100000", "1 ≤ a,b,i ≤ N", "For MOVE a b, a ≠ b."],
    examples: [{input:"3 5\nCREATE 1\nCREATE 2\nMOVE 3 1\nRESET 2\nCREATE 1",output:"2",explanation:"Handles 1 and 3 own resources."}],
    starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Model exclusive resource ownership.\n    return 0;\n}\n"
  },
  {
    slug: "lru-cache",
    title: "Implement an LRU Cache in C++",
    category: "Core C++", difficulty: "Medium",
    tags: ["STL", "unordered_map", "list", "Caching"],
    summary: "Build a least-recently-used cache with O(1) average operations.",
    statement: "Implement a cache with capacity C. PUT key value inserts or updates a key and marks it most recently used. If full, evict the least recently used key. GET key prints its value, or -1 if absent; a successful GET marks the key most recently used. Design for average O(1) per operation.",
    inputFormat: "First line: C Q. Next Q lines: PUT key value or GET key.",
    outputFormat: "For each GET print the result on its own line.",
    constraints: ["1 ≤ C ≤ 100000", "1 ≤ Q ≤ 100000", "Keys and values are signed 32-bit integers."],
    examples: [{input:"2 6\nPUT 1 10\nPUT 2 20\nGET 1\nPUT 3 30\nGET 2\nGET 3",output:"10\n-1\n30"}],
    starterCode: "#include <iostream>\n#include <list>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    // Implement LRU cache operations.\n    return 0;\n}\n"
  },
  {
    slug: "observer-dispatch",
    title: "Implement a Deterministic Observer Dispatcher",
    category: "Design Patterns", difficulty: "Medium",
    tags: ["Observer", "Event-Driven", "State Machines"],
    summary: "Process subscriptions and notifications in a stable registration order.",
    statement: "Build a reference event dispatcher. SUB id subscribes an observer if not already subscribed, placing it at the end. UNSUB id removes it if present. EMIT sends a notification to all currently subscribed observers in their registration order. Print IDs for each EMIT, space separated, or NONE if there are no subscribers. A re-subscribed observer is appended to the end.",
    inputFormat: "First line: Q. Next Q lines: SUB id, UNSUB id, or EMIT.",
    outputFormat: "One line per EMIT: observer IDs separated by spaces, or NONE.",
    constraints: ["1 ≤ Q ≤ 10000", "1 ≤ id ≤ 100000"],
    examples: [{input:"7\nSUB 2\nSUB 1\nEMIT\nUNSUB 2\nSUB 2\nEMIT\nEMIT",output:"2 1\n1 2\n1 2"}],
    starterCode: "#include <iostream>\n#include <list>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n    // Track observers in stable registration order.\n    return 0;\n}\n"
  },
  {
    slug: "strategy-routing",
    title: "Implement a Strategy-Based Order Router",
    category: "Design Patterns", difficulty: "Hard",
    tags: ["Strategy", "Routing", "Trading Systems"],
    summary: "Switch between routing policies without changing the order-processing interface.",
    statement: "A router processes orders using one of two policies, LOWEST_FEE or FASTEST. Each venue has a unique ID, an integer fee, and an integer latency. POLICY name changes the active policy. ROUTE selects the venue with minimum fee for LOWEST_FEE or minimum latency for FASTEST; ties go to the smaller venue ID. Print the selected venue ID for each ROUTE. The policy is initially LOWEST_FEE. Design your implementation so policies can be changed independently of the routing interface.",
    inputFormat: "First line: V Q. Next V lines: id fee latency. Next Q lines: POLICY LOWEST_FEE, POLICY FASTEST, or ROUTE.",
    outputFormat: "For each ROUTE print the selected venue ID.",
    constraints: ["1 ≤ V ≤ 100000", "1 ≤ Q ≤ 100000", "1 ≤ id ≤ 10^9; IDs are unique", "0 ≤ fee, latency ≤ 10^9"],
    examples: [{input:"3 4\n10 4 9\n20 3 8\n30 3 5\nROUTE\nPOLICY FASTEST\nROUTE\nROUTE",output:"20\n30\n30",explanation:"Fee tie goes to venue 20. Lowest latency is venue 30."}],
    starterCode: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Model interchangeable routing strategies.\n    return 0;\n}\n"
  }
];

export function getPracticeProblem(slug: string) {
  return practiceProblems.find(p => p.slug === slug);
}

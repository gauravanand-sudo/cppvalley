# Concurrency — 100 original problem candidates

> Editorial backlog; **not yet publicly solvable**. True concurrency properties require dedicated race detection, stress testing and memory-model-aware review in addition to functional output tests.

## Easy (25)

1. Validate Mutex Lock and Unlock Ownership
2. Count Active Threads from Start and Join Events
3. Detect a Missing Thread Join in a Trace
4. Find Conflicting Reads and Writes in an Event Log
5. Simulate an Atomic Counter Increment Stream
6. Detect a Double Unlock in a Lock Trace
7. Check Lock Acquisition Order Against a Ranking
8. Determine Whether a Barrier Can Release
9. Count Condition Variable Notifications
10. Simulate a One-Producer One-Consumer Queue
11. Track Thread IDs Through Ownership Moves
12. Identify Orphaned Tasks in a Job Queue
13. Simulate a Bounded Ring Buffer
14. Check Whether a Thread Pool Is Idle
15. Calculate Worker Utilization from Busy Intervals
16. Track Future Ready and Waiting States
17. Simulate a Semaphore with a Fixed Permit Count
18. Detect Duplicate Task Completion Events
19. Validate Task Start Finish State Transitions
20. Identify Critical Sections in an Access Log
21. Compute the Longest Sequential Dependency Chain
22. Count Per-Thread Work Items
23. Validate Monotonic Atomic Counter Readings
24. Detect Invalid Promise Completion Attempts
25. Calculate Peak Concurrent Task Count

## Medium (45)

1. Implement a Blocking Bounded Queue
2. Implement a Thread-Safe FIFO Queue with Mutex
3. Build a Thread-Safe Stack with Exception Safety
4. Implement a Multi-Reader Single-Writer Cache
5. Build a Producer-Consumer Pipeline with Shutdown
6. Implement a Countdown Latch
7. Implement a Reusable Barrier with Generations
8. Build a Concurrent Task Result Collector
9. Implement a Thread Pool with Graceful Shutdown
10. Create a Priority Task Executor
11. Build a Thread-Safe LRU Cache
12. Implement a Lock Striping Hash Table
13. Detect Cycles in a Lock Dependency Graph
14. Generate a Safe Global Mutex Lock Ordering
15. Implement a Reader-Writer Lock Policy Simulator
16. Build a Fair Ticket Lock
17. Implement a Bounded Channel with Timeout
18. Create a Multi-Stage Pipeline with Backpressure
19. Build a Concurrent Work Counter with Condition Variables
20. Implement a Cancelable Worker with Stop Token
21. Implement a Timed Mutex Acquisition Retry Loop
22. Build a Thread-Safe Event Dispatcher
23. Model a Happens-Before Graph and Reachability
24. Detect a Missing Synchronizes-With Edge
25. Simulate Acquire and Release Publication
26. Validate Sequentially Consistent Event Histories
27. Create a Thread-Local Metrics Aggregator
28. Build a Parallel Prefix Sum
29. Implement a Parallel Merge Sort
30. Implement a Parallel For-Each Task Scheduler
31. Build a Bounded Parallel Map Operator
32. Implement a Future-Based Fan-Out Fan-In
33. Build a Thread-Safe Logger with Flush
34. Create a Concurrent Cache with TTL Expiry
35. Implement a Multi-Producer Multi-Consumer Blocking Queue
36. Design a Shutdown-Safe Shared Resource Manager
37. Build a Counter with Sharded Atomics
38. Implement a Thread-Safe Object Pool
39. Detect False Sharing from a Memory Access Trace
40. Simulate a Work-Stealing Double-Ended Queue
41. Build a Thread Pool with Task Dependencies
42. Implement a Timed Producer-Consumer Pipeline
43. Track In-Flight Tasks for Draining Shutdown
44. Create a Retryable Task Scheduler with Idempotency
45. Validate a Concurrent Queue Linearization History

## Hard (30)

1. Implement a Correct SPSC Lock-Free Ring Buffer
2. Implement a Bounded MPMC Ring Buffer
3. Build a Lock-Free Stack with ABA Protection
4. Implement a Treiber Stack with Safe Reclamation
5. Build a Michael-Scott Style Lock-Free Queue
6. Implement Hazard Pointer Based Memory Reclamation
7. Build an Epoch-Based Reclamation Manager
8. Implement a Tagged Pointer Counter to Resist ABA
9. Build a Work-Stealing Chase-Lev Deque
10. Implement a NUMA-Aware Sharded Task Queue
11. Design a Read-Copy-Update Style Registry
12. Implement a Lock-Free Freelist with Reclamation
13. Build a Wait-Free Single-Writer Snapshot
14. Implement a Linearizability Test Harness
15. Create a Deterministic Concurrent Scheduler for Tests
16. Build a Bounded Executor with Recursive Task Support
17. Implement a Multi-Version Read-Mostly Data Store
18. Create a Parallel Graph Traversal with Work Stealing
19. Build a Cancellation-Safe Structured Task Tree
20. Implement a Concurrent Hash Map with Fine-Grained Resizing
21. Design a Starvation-Resistant Reader-Writer Lock
22. Build a Lock-Free Metrics Collection Pipeline
23. Implement a Batching MPSC Channel
24. Build a Thread Pool with Deadline Scheduling
25. Create a Deadlock Detector Using Wait-For Graphs
26. Implement a Memory Ordering Litmus Test Suite
27. Build an Atomic Publish-Subscribe Snapshot Store
28. Implement a High-Contention Parallel Memory Allocator
29. Design a Stress-Tested Bounded Concurrent Priority Queue
30. Benchmark Lock-Based Versus Lock-Free Queues Fairly

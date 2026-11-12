import { practiceProblems, type PracticeCategory, type PracticeDifficulty } from "./practice";

export type BankStatus = "runnable" | "in-review";
export type BankProblem = {
  slug: string;
  title: string;
  category: PracticeCategory;
  difficulty: PracticeDifficulty;
  status: BankStatus;
  tags: string[];
  summary: string;
};
const originalBacklog: Array<Pick<BankProblem,"slug"|"title"|"category"|"difficulty"|"status">> =
[
  {
    "slug": "trade-notional",
    "title": "Calculate Trade Notional from a Tick Stream",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "runnable"
  },
  {
    "slug": "find-the-tightest-bid-ask-spread",
    "title": "Find the Tightest Bid-Ask Spread",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "compute-the-midquote-from-a-bbo-snapshot",
    "title": "Compute the Midquote from a BBO Snapshot",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "detect-a-crossed-or-locked-market",
    "title": "Detect a Crossed or Locked Market",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "round-order-prices-to-the-nearest-tick",
    "title": "Round Order Prices to the Nearest Tick",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "validate-exchange-lot-size-rules",
    "title": "Validate Exchange Lot Size Rules",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "aggregate-executed-quantity-by-symbol",
    "title": "Aggregate Executed Quantity by Symbol",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "calculate-a-position-s-signed-inventory",
    "title": "Calculate a Position's Signed Inventory",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "compute-a-weighted-average-fill-price",
    "title": "Compute a Weighted Average Fill Price",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "find-the-largest-single-trade",
    "title": "Find the Largest Single Trade",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "convert-fixed-point-prices-to-ticks",
    "title": "Convert Fixed-Point Prices to Ticks",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "calculate-gross-and-net-exposure",
    "title": "Calculate Gross and Net Exposure",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "check-a-simple-pre-trade-quantity-limit",
    "title": "Check a Simple Pre-Trade Quantity Limit",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "calculate-round-trip-timestamp-latency",
    "title": "Calculate Round-Trip Timestamp Latency",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "convert-nanosecond-timestamps-to-microseconds",
    "title": "Convert Nanosecond Timestamps to Microseconds",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "identify-out-of-order-feed-sequence-numbers",
    "title": "Identify Out-of-Order Feed Sequence Numbers",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "market-sequence-gaps",
    "title": "Count Missing Market Data Messages",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "runnable"
  },
  {
    "slug": "detect-duplicate-trade-identifiers",
    "title": "Detect Duplicate Trade Identifiers",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "calculate-the-bid-ask-spread-in-basis-points",
    "title": "Calculate the Bid-Ask Spread in Basis Points",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "apply-a-maker-taker-fee-schedule",
    "title": "Apply a Maker-Taker Fee Schedule",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "calculate-pnl-on-a-closed-position",
    "title": "Calculate PnL on a Closed Position",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "find-the-first-price-crossing-a-threshold",
    "title": "Find the First Price Crossing a Threshold",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "normalize-exchange-symbol-codes",
    "title": "Normalize Exchange Symbol Codes",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "count-heartbeat-timeouts-in-a-session-log",
    "title": "Count Heartbeat Timeouts in a Session Log",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "reconstruct-a-simple-top-of-book-snapshot",
    "title": "Reconstruct a Simple Top-of-Book Snapshot",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "maintain-rolling-vwap-for-the-last-k-trades",
    "title": "Maintain Rolling VWAP for the Last K Trades",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "merge-two-exchange-trade-streams-by-timestamp",
    "title": "Merge Two Exchange Trade Streams by Timestamp",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-top-of-book-quote-tracker",
    "title": "Implement a Top-of-Book Quote Tracker",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "apply-add-update-delete-level-1-quote-events",
    "title": "Apply Add Update Delete Level-1 Quote Events",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "calculate-order-flow-imbalance-per-time-window",
    "title": "Calculate Order Flow Imbalance per Time Window",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "maintain-volume-at-each-price-level",
    "title": "Maintain Volume at Each Price Level",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-sliding-window-market-data-rate-monitor",
    "title": "Build a Sliding-Window Market Data Rate Monitor",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "repair-sequence-gaps-from-a-recovery-stream",
    "title": "Repair Sequence Gaps from a Recovery Stream",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "validate-snapshot-and-delta-sequence-continuity",
    "title": "Validate Snapshot and Delta Sequence Continuity",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "reconstruct-symbol-state-from-an-event-log",
    "title": "Reconstruct Symbol State from an Event Log",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-fixed-point-decimal-arithmetic-type",
    "title": "Implement a Fixed-Point Decimal Arithmetic Type",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "reject-invalid-tick-and-lot-combination-orders",
    "title": "Reject Invalid Tick and Lot Combination Orders",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-per-symbol-position-limit-checker",
    "title": "Implement a Per-Symbol Position Limit Checker",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "deduplicate-replayed-exchange-messages",
    "title": "Deduplicate Replayed Exchange Messages",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "track-orders-through-accepted-partially-filled-and-canceled-states",
    "title": "Track Orders Through Accepted Partially Filled and Canceled States",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "match-trade-confirmations-to-client-order-ids",
    "title": "Match Trade Confirmations to Client Order IDs",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-cancel-replace-order-bookkeeping",
    "title": "Implement Cancel-Replace Order Bookkeeping",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "calculate-queue-position-at-a-single-price",
    "title": "Calculate Queue Position at a Single Price",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "aggregate-best-bid-and-ask-across-venues",
    "title": "Aggregate Best Bid and Ask Across Venues",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "select-the-best-venue-after-trading-fees",
    "title": "Select the Best Venue After Trading Fees",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "calculate-volume-weighted-best-execution-price",
    "title": "Calculate Volume-Weighted Best Execution Price",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-an-exchange-session-heartbeat-monitor",
    "title": "Implement an Exchange Session Heartbeat Monitor",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "frame-a-length-prefixed-tcp-message-stream",
    "title": "Frame a Length-Prefixed TCP Message Stream",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "parse-a-binary-market-data-packet-with-bounds-checks",
    "title": "Parse a Binary Market Data Packet with Bounds Checks",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-bounded-udp-packet-reordering-buffer",
    "title": "Build a Bounded UDP Packet Reordering Buffer",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "recover-an-incremental-book-from-snapshot-plus-deltas",
    "title": "Recover an Incremental Book from Snapshot Plus Deltas",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-rolling-latency-percentile-calculator",
    "title": "Implement a Rolling Latency Percentile Calculator",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "merge-interval-based-trading-sessions",
    "title": "Merge Interval-Based Trading Sessions",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-an-order-rate-limiter-with-a-sliding-window",
    "title": "Build an Order Rate Limiter with a Sliding Window",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-token-bucket-for-gateway-requests",
    "title": "Implement a Token Bucket for Gateway Requests",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-symbol-to-instrument-id-lookup-table",
    "title": "Build a Symbol-to-Instrument-ID Lookup Table",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "maintain-top-k-most-active-trading-symbols",
    "title": "Maintain Top K Most Active Trading Symbols",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "process-trading-halts-and-resumptions",
    "title": "Process Trading Halts and Resumptions",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "calculate-intraday-realized-and-unrealized-pnl",
    "title": "Calculate Intraday Realized and Unrealized PnL",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-quote-staleness-detector",
    "title": "Implement a Quote Staleness Detector",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "track-exchange-reject-codes-and-retry-policy",
    "title": "Track Exchange Reject Codes and Retry Policy",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "construct-a-deterministic-market-data-replayer",
    "title": "Construct a Deterministic Market Data Replayer",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "calculate-effective-spread-from-executions",
    "title": "Calculate Effective Spread from Executions",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-risk-aware-order-quantity-clamp",
    "title": "Implement a Risk-Aware Order Quantity Clamp",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "merge-trades-across-venues-without-duplicates",
    "title": "Merge Trades Across Venues Without Duplicates",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-an-expiring-order-id-cache",
    "title": "Build an Expiring Order ID Cache",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-priority-based-execution-gateway-queue",
    "title": "Implement a Priority-Based Execution Gateway Queue",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "compute-market-depth-imbalance-by-price-level",
    "title": "Compute Market Depth Imbalance by Price Level",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "detect-a-bbo-change-from-batched-updates",
    "title": "Detect a BBO Change from Batched Updates",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "maintain-a-consistent-multi-symbol-snapshot",
    "title": "Maintain a Consistent Multi-Symbol Snapshot",
    "category": "HFT Systems",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-price-time-priority-limit-order-book",
    "title": "Implement a Price-Time Priority Limit Order Book",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-an-order-matching-engine-with-partial-fills",
    "title": "Build an Order Matching Engine with Partial Fills",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "support-cancel-and-replace-in-a-matching-engine",
    "title": "Support Cancel and Replace in a Matching Engine",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-an-iceberg-order-with-visible-quantity",
    "title": "Implement an Iceberg Order with Visible Quantity",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-an-auction-clearing-price-calculator",
    "title": "Build an Auction Clearing Price Calculator",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-multi-venue-smart-order-router",
    "title": "Create a Multi-Venue Smart Order Router",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "construct-an-event-sourced-order-management-system",
    "title": "Construct an Event-Sourced Order Management System",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-snapshot-recovery-for-multicast-market-data",
    "title": "Implement Snapshot-Recovery for Multicast Market Data",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "arbitrate-redundant-a-b-feed-channels-with-gap-recovery",
    "title": "Arbitrate Redundant A/B Feed Channels with Gap Recovery",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-deterministic-tick-to-trade-simulator",
    "title": "Build a Deterministic Tick-to-Trade Simulator",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-concurrent-market-data-fan-out-pipeline",
    "title": "Implement a Concurrent Market Data Fan-Out Pipeline",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-zero-allocation-binary-message-parser",
    "title": "Build a Zero-Allocation Binary Message Parser",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "design-a-cache-friendly-order-book-price-index",
    "title": "Design a Cache-Friendly Order Book Price Index",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-pre-trade-risk-pipeline-with-multiple-limits",
    "title": "Implement a Pre-Trade Risk Pipeline with Multiple Limits",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-self-healing-fix-style-session-state-machine",
    "title": "Create a Self-Healing FIX-Style Session State Machine",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-persistent-replayable-exchange-event-journal",
    "title": "Build a Persistent Replayable Exchange Event Journal",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-an-incremental-order-book-checksum-validator",
    "title": "Implement an Incremental Order Book Checksum Validator",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-latency-aware-order-gateway-scheduler",
    "title": "Build a Latency-Aware Order Gateway Scheduler",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "design-a-market-data-backpressure-and-drop-policy",
    "title": "Design a Market Data Backpressure and Drop Policy",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-portfolio-exposure-across-correlated-instruments",
    "title": "Implement Portfolio Exposure Across Correlated Instruments",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-cross-venue-order-and-fill-reconciliation-engine",
    "title": "Build a Cross-Venue Order and Fill Reconciliation Engine",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-consistent-snapshot-across-multiple-event-streams",
    "title": "Create a Consistent Snapshot Across Multiple Event Streams",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-high-throughput-trade-deduplication-index",
    "title": "Implement a High-Throughput Trade Deduplication Index",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-multi-producer-event-sequencer-with-stable-ordering",
    "title": "Build a Multi-Producer Event Sequencer with Stable Ordering",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-cancel-on-disconnect-across-open-orders",
    "title": "Implement Cancel-on-Disconnect Across Open Orders",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-deterministic-exchange-failure-and-recovery-simulator",
    "title": "Build a Deterministic Exchange Failure and Recovery Simulator",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-rate-limited-matching-engine-under-load",
    "title": "Create a Rate-Limited Matching Engine Under Load",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "design-a-risk-kill-switch-with-atomic-state-transition",
    "title": "Design a Risk-Kill-Switch with Atomic State Transition",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-cache-resident-instrument-metadata-store",
    "title": "Implement a Cache-Resident Instrument Metadata Store",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "benchmark-two-order-book-layouts-under-identical-workloads",
    "title": "Benchmark Two Order-Book Layouts Under Identical Workloads",
    "category": "HFT Systems",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "mutex-ownership-trace",
    "title": "Validate Mutex Lock and Unlock Ownership",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "runnable"
  },
  {
    "slug": "count-active-threads-from-start-and-join-events",
    "title": "Count Active Threads from Start and Join Events",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "detect-a-missing-thread-join-in-a-trace",
    "title": "Detect a Missing Thread Join in a Trace",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "find-conflicting-reads-and-writes-in-an-event-log",
    "title": "Find Conflicting Reads and Writes in an Event Log",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "simulate-an-atomic-counter-increment-stream",
    "title": "Simulate an Atomic Counter Increment Stream",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "detect-a-double-unlock-in-a-lock-trace",
    "title": "Detect a Double Unlock in a Lock Trace",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "check-lock-acquisition-order-against-a-ranking",
    "title": "Check Lock Acquisition Order Against a Ranking",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "determine-whether-a-barrier-can-release",
    "title": "Determine Whether a Barrier Can Release",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "count-condition-variable-notifications",
    "title": "Count Condition Variable Notifications",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "simulate-a-one-producer-one-consumer-queue",
    "title": "Simulate a One-Producer One-Consumer Queue",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "track-thread-ids-through-ownership-moves",
    "title": "Track Thread IDs Through Ownership Moves",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "identify-orphaned-tasks-in-a-job-queue",
    "title": "Identify Orphaned Tasks in a Job Queue",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "bounded-ring-buffer",
    "title": "Simulate a Bounded Ring Buffer",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "runnable"
  },
  {
    "slug": "check-whether-a-thread-pool-is-idle",
    "title": "Check Whether a Thread Pool Is Idle",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "calculate-worker-utilization-from-busy-intervals",
    "title": "Calculate Worker Utilization from Busy Intervals",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "track-future-ready-and-waiting-states",
    "title": "Track Future Ready and Waiting States",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "simulate-a-semaphore-with-a-fixed-permit-count",
    "title": "Simulate a Semaphore with a Fixed Permit Count",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "detect-duplicate-task-completion-events",
    "title": "Detect Duplicate Task Completion Events",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "validate-task-start-finish-state-transitions",
    "title": "Validate Task Start Finish State Transitions",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "identify-critical-sections-in-an-access-log",
    "title": "Identify Critical Sections in an Access Log",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "compute-the-longest-sequential-dependency-chain",
    "title": "Compute the Longest Sequential Dependency Chain",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "count-per-thread-work-items",
    "title": "Count Per-Thread Work Items",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "validate-monotonic-atomic-counter-readings",
    "title": "Validate Monotonic Atomic Counter Readings",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "detect-invalid-promise-completion-attempts",
    "title": "Detect Invalid Promise Completion Attempts",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "calculate-peak-concurrent-task-count",
    "title": "Calculate Peak Concurrent Task Count",
    "category": "Concurrency",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-a-blocking-bounded-queue",
    "title": "Implement a Blocking Bounded Queue",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-thread-safe-fifo-queue-with-mutex",
    "title": "Implement a Thread-Safe FIFO Queue with Mutex",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-thread-safe-stack-with-exception-safety",
    "title": "Build a Thread-Safe Stack with Exception Safety",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-multi-reader-single-writer-cache",
    "title": "Implement a Multi-Reader Single-Writer Cache",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-producer-consumer-pipeline-with-shutdown",
    "title": "Build a Producer-Consumer Pipeline with Shutdown",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-countdown-latch",
    "title": "Implement a Countdown Latch",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-reusable-barrier-with-generations",
    "title": "Implement a Reusable Barrier with Generations",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-concurrent-task-result-collector",
    "title": "Build a Concurrent Task Result Collector",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-thread-pool-with-graceful-shutdown",
    "title": "Implement a Thread Pool with Graceful Shutdown",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-priority-task-executor",
    "title": "Create a Priority Task Executor",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-thread-safe-lru-cache",
    "title": "Build a Thread-Safe LRU Cache",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-lock-striping-hash-table",
    "title": "Implement a Lock Striping Hash Table",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "detect-cycles-in-a-lock-dependency-graph",
    "title": "Detect Cycles in a Lock Dependency Graph",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "generate-a-safe-global-mutex-lock-ordering",
    "title": "Generate a Safe Global Mutex Lock Ordering",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-reader-writer-lock-policy-simulator",
    "title": "Implement a Reader-Writer Lock Policy Simulator",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-fair-ticket-lock",
    "title": "Build a Fair Ticket Lock",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-bounded-channel-with-timeout",
    "title": "Implement a Bounded Channel with Timeout",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-multi-stage-pipeline-with-backpressure",
    "title": "Create a Multi-Stage Pipeline with Backpressure",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-concurrent-work-counter-with-condition-variables",
    "title": "Build a Concurrent Work Counter with Condition Variables",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-cancelable-worker-with-stop-token",
    "title": "Implement a Cancelable Worker with Stop Token",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-timed-mutex-acquisition-retry-loop",
    "title": "Implement a Timed Mutex Acquisition Retry Loop",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-thread-safe-event-dispatcher",
    "title": "Build a Thread-Safe Event Dispatcher",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "model-a-happens-before-graph-and-reachability",
    "title": "Model a Happens-Before Graph and Reachability",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "detect-a-missing-synchronizes-with-edge",
    "title": "Detect a Missing Synchronizes-With Edge",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "simulate-acquire-and-release-publication",
    "title": "Simulate Acquire and Release Publication",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "validate-sequentially-consistent-event-histories",
    "title": "Validate Sequentially Consistent Event Histories",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-thread-local-metrics-aggregator",
    "title": "Create a Thread-Local Metrics Aggregator",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-parallel-prefix-sum",
    "title": "Build a Parallel Prefix Sum",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-parallel-merge-sort",
    "title": "Implement a Parallel Merge Sort",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-parallel-for-each-task-scheduler",
    "title": "Implement a Parallel For-Each Task Scheduler",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-bounded-parallel-map-operator",
    "title": "Build a Bounded Parallel Map Operator",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-future-based-fan-out-fan-in",
    "title": "Implement a Future-Based Fan-Out Fan-In",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-thread-safe-logger-with-flush",
    "title": "Build a Thread-Safe Logger with Flush",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-concurrent-cache-with-ttl-expiry",
    "title": "Create a Concurrent Cache with TTL Expiry",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-multi-producer-multi-consumer-blocking-queue",
    "title": "Implement a Multi-Producer Multi-Consumer Blocking Queue",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "design-a-shutdown-safe-shared-resource-manager",
    "title": "Design a Shutdown-Safe Shared Resource Manager",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-counter-with-sharded-atomics",
    "title": "Build a Counter with Sharded Atomics",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-thread-safe-object-pool",
    "title": "Implement a Thread-Safe Object Pool",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "detect-false-sharing-from-a-memory-access-trace",
    "title": "Detect False Sharing from a Memory Access Trace",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "simulate-a-work-stealing-double-ended-queue",
    "title": "Simulate a Work-Stealing Double-Ended Queue",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-thread-pool-with-task-dependencies",
    "title": "Build a Thread Pool with Task Dependencies",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-timed-producer-consumer-pipeline",
    "title": "Implement a Timed Producer-Consumer Pipeline",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "track-in-flight-tasks-for-draining-shutdown",
    "title": "Track In-Flight Tasks for Draining Shutdown",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-retryable-task-scheduler-with-idempotency",
    "title": "Create a Retryable Task Scheduler with Idempotency",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "validate-a-concurrent-queue-linearization-history",
    "title": "Validate a Concurrent Queue Linearization History",
    "category": "Concurrency",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-correct-spsc-lock-free-ring-buffer",
    "title": "Implement a Correct SPSC Lock-Free Ring Buffer",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-bounded-mpmc-ring-buffer",
    "title": "Implement a Bounded MPMC Ring Buffer",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-lock-free-stack-with-aba-protection",
    "title": "Build a Lock-Free Stack with ABA Protection",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-treiber-stack-with-safe-reclamation",
    "title": "Implement a Treiber Stack with Safe Reclamation",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-michael-scott-style-lock-free-queue",
    "title": "Build a Michael-Scott Style Lock-Free Queue",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-hazard-pointer-based-memory-reclamation",
    "title": "Implement Hazard Pointer Based Memory Reclamation",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-an-epoch-based-reclamation-manager",
    "title": "Build an Epoch-Based Reclamation Manager",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-tagged-pointer-counter-to-resist-aba",
    "title": "Implement a Tagged Pointer Counter to Resist ABA",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-work-stealing-chase-lev-deque",
    "title": "Build a Work-Stealing Chase-Lev Deque",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-numa-aware-sharded-task-queue",
    "title": "Implement a NUMA-Aware Sharded Task Queue",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "design-a-read-copy-update-style-registry",
    "title": "Design a Read-Copy-Update Style Registry",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-lock-free-freelist-with-reclamation",
    "title": "Implement a Lock-Free Freelist with Reclamation",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-wait-free-single-writer-snapshot",
    "title": "Build a Wait-Free Single-Writer Snapshot",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-linearizability-test-harness",
    "title": "Implement a Linearizability Test Harness",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-deterministic-concurrent-scheduler-for-tests",
    "title": "Create a Deterministic Concurrent Scheduler for Tests",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-bounded-executor-with-recursive-task-support",
    "title": "Build a Bounded Executor with Recursive Task Support",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-multi-version-read-mostly-data-store",
    "title": "Implement a Multi-Version Read-Mostly Data Store",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-parallel-graph-traversal-with-work-stealing",
    "title": "Create a Parallel Graph Traversal with Work Stealing",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-cancellation-safe-structured-task-tree",
    "title": "Build a Cancellation-Safe Structured Task Tree",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-concurrent-hash-map-with-fine-grained-resizing",
    "title": "Implement a Concurrent Hash Map with Fine-Grained Resizing",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "design-a-starvation-resistant-reader-writer-lock",
    "title": "Design a Starvation-Resistant Reader-Writer Lock",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-lock-free-metrics-collection-pipeline",
    "title": "Build a Lock-Free Metrics Collection Pipeline",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-batching-mpsc-channel",
    "title": "Implement a Batching MPSC Channel",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-thread-pool-with-deadline-scheduling",
    "title": "Build a Thread Pool with Deadline Scheduling",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-deadlock-detector-using-wait-for-graphs",
    "title": "Create a Deadlock Detector Using Wait-For Graphs",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-memory-ordering-litmus-test-suite",
    "title": "Implement a Memory Ordering Litmus Test Suite",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-an-atomic-publish-subscribe-snapshot-store",
    "title": "Build an Atomic Publish-Subscribe Snapshot Store",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-high-contention-parallel-memory-allocator",
    "title": "Implement a High-Contention Parallel Memory Allocator",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "design-a-stress-tested-bounded-concurrent-priority-queue",
    "title": "Design a Stress-Tested Bounded Concurrent Priority Queue",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "benchmark-lock-based-versus-lock-free-queues-fairly",
    "title": "Benchmark Lock-Based Versus Lock-Free Queues Fairly",
    "category": "Concurrency",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-scoped-file-handle-wrapper",
    "title": "Implement a Scoped File Handle Wrapper",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "count-live-objects-using-a-constructor-trace",
    "title": "Count Live Objects Using a Constructor Trace",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "move-only-owner",
    "title": "Simulate Move-Only Resource Ownership",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "runnable"
  },
  {
    "slug": "reverse-a-string-without-extra-allocation",
    "title": "Reverse a String Without Extra Allocation",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-a-bounds-checked-array-accessor",
    "title": "Implement a Bounds-Checked Array Accessor",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "compare-two-objects-with-custom-ordering",
    "title": "Compare Two Objects with Custom Ordering",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "remove-adjacent-duplicate-characters",
    "title": "Remove Adjacent Duplicate Characters",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-a-stack-using-std-vector",
    "title": "Implement a Stack Using std::vector",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "compute-word-frequencies-with-unordered-map",
    "title": "Compute Word Frequencies with unordered_map",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "normalize-an-input-string-with-std-string-view",
    "title": "Normalize an Input String with std::string_view",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "merge-two-sorted-vectors",
    "title": "Merge Two Sorted Vectors",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "find-the-first-duplicate-identifier",
    "title": "Find the First Duplicate Identifier",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-a-simple-fixed-capacity-string-buffer",
    "title": "Implement a Simple Fixed-Capacity String Buffer",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "model-copy-and-move-assignment-counters",
    "title": "Model Copy and Move Assignment Counters",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "check-iterator-range-validity",
    "title": "Check Iterator Range Validity",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "build-a-simple-raii-timer",
    "title": "Build a Simple RAII Timer",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-a-unique-integer-set",
    "title": "Implement a Unique Integer Set",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "find-the-kth-element-with-nth-element",
    "title": "Find the Kth Element with nth_element",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "count-distinct-keys-in-a-stream",
    "title": "Count Distinct Keys in a Stream",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-a-basic-circular-array-queue",
    "title": "Implement a Basic Circular Array Queue",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "create-a-scope-guard-callback",
    "title": "Create a Scope-Guard Callback",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-a-custom-comparator-for-sorting",
    "title": "Implement a Custom Comparator for Sorting",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "parse-comma-separated-integers-safely",
    "title": "Parse Comma-Separated Integers Safely",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-a-const-correct-read-only-span",
    "title": "Implement a Const-Correct Read-Only Span",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "simulate-pointer-ownership-reset-and-release",
    "title": "Simulate Pointer Ownership Reset and Release",
    "category": "Core C++",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "lru-cache",
    "title": "Implement an LRU Cache with STL Containers",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "runnable"
  },
  {
    "slug": "build-a-small-vector-with-inline-storage",
    "title": "Build a Small Vector with Inline Storage",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-move-only-dynamic-buffer",
    "title": "Implement a Move-Only Dynamic Buffer",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "write-an-exception-safe-resource-swap",
    "title": "Write an Exception-Safe Resource Swap",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-reference-counted-shared-handle",
    "title": "Implement a Reference-Counted Shared Handle",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-an-intrusive-doubly-linked-list",
    "title": "Build an Intrusive Doubly Linked List",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-stable-priority-queue-with-tie-breaking",
    "title": "Implement a Stable Priority Queue with Tie Breaking",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-type-erased-callable-wrapper",
    "title": "Create a Type-Erased Callable Wrapper",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-basic-memory-arena-allocator",
    "title": "Build a Basic Memory Arena Allocator",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-fixed-size-object-pool",
    "title": "Implement a Fixed-Size Object Pool",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "write-a-custom-allocator-aware-container",
    "title": "Write a Custom Allocator-Aware Container",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "design-a-non-owning-string-view-parser",
    "title": "Design a Non-Owning String View Parser",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-transactional-state-update-with-raii",
    "title": "Implement a Transactional State Update with RAII",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-heterogeneous-lookup-hash-map",
    "title": "Create a Heterogeneous Lookup Hash Map",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-an-ordered-interval-map",
    "title": "Build an Ordered Interval Map",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-trie-for-symbol-lookup",
    "title": "Implement a Trie for Symbol Lookup",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "write-a-streaming-json-tokenizer",
    "title": "Write a Streaming JSON Tokenizer",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-cpp-expression-parser",
    "title": "Implement a C++ Expression Parser",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-polymorphic-shape-registry",
    "title": "Build a Polymorphic Shape Registry",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-value-semantics-polymorphic-wrapper",
    "title": "Create a Value-Semantics Polymorphic Wrapper",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-an-optional-like-container",
    "title": "Implement an Optional-Like Container",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-an-expected-like-result-type",
    "title": "Implement an Expected-Like Result Type",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "write-a-variadic-type-safe-formatter",
    "title": "Write a Variadic Type-Safe Formatter",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-tuple-utility-using-parameter-packs",
    "title": "Create a Tuple Utility Using Parameter Packs",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-an-index-sequence-tuple-visitor",
    "title": "Implement an Index Sequence Tuple Visitor",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-compile-time-string-hash",
    "title": "Build a Compile-Time String Hash",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-constexpr-lookup-table",
    "title": "Create a constexpr Lookup Table",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-an-intrusive-reference-counter",
    "title": "Implement an Intrusive Reference Counter",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-stable-handle-table-with-generations",
    "title": "Build a Stable Handle Table with Generations",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-vector-with-strong-exception-guarantee",
    "title": "Implement a Vector with Strong Exception Guarantee",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "detect-invalidated-iterator-usage-from-an-event-trace",
    "title": "Detect Invalidated Iterator Usage from an Event Trace",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-copy-on-write-string-class",
    "title": "Build a Copy-on-Write String Class",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-bidirectional-iterator-for-a-linked-list",
    "title": "Implement a Bidirectional Iterator for a Linked List",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-sorted-flat-map",
    "title": "Create a Sorted Flat Map",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-an-interval-query-data-structure",
    "title": "Build an Interval Query Data Structure",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-custom-hash-for-composite-keys",
    "title": "Implement a Custom Hash for Composite Keys",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "write-a-zero-copy-binary-record-reader",
    "title": "Write a Zero-Copy Binary Record Reader",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-checked-integer-arithmetic-type",
    "title": "Implement a Checked Integer Arithmetic Type",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-dynamic-bitset",
    "title": "Build a Dynamic Bitset",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-small-buffer-optimization-string",
    "title": "Implement a Small-Buffer Optimization String",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "write-a-unicode-aware-utf-8-validator",
    "title": "Write a Unicode-Aware UTF-8 Validator",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-command-line-argument-parser",
    "title": "Build a Command-Line Argument Parser",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-memory-mapped-file-raii-wrapper",
    "title": "Implement a Memory-Mapped File RAII Wrapper",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-simple-event-loop-dispatcher",
    "title": "Build a Simple Event Loop Dispatcher",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-thread-safe-static-initialization-singleton",
    "title": "Implement a Thread-Safe Static Initialization Singleton",
    "category": "Core C++",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-standards-inspired-vector-with-allocator-support",
    "title": "Build a Standards-Inspired Vector with Allocator Support",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-type-safe-variant-using-tagged-storage",
    "title": "Implement a Type-Safe Variant Using Tagged Storage",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-general-purpose-function-type-erasure-wrapper",
    "title": "Build a General-Purpose Function Type Erasure Wrapper",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-coroutine-based-generator-in-modern-cpp",
    "title": "Create a Coroutine-Based Generator in Modern C++",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-an-async-result-type-with-promise-semantics",
    "title": "Implement an Async Result Type with Promise Semantics",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-lock-free-slab-allocator-interface",
    "title": "Build a Lock-Free Slab Allocator Interface",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-custom-polymorphic-memory-resource",
    "title": "Implement a Custom Polymorphic Memory Resource",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-numa-aware-allocation-strategy-simulator",
    "title": "Create a NUMA-Aware Allocation Strategy Simulator",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-high-performance-flat-hash-table",
    "title": "Implement a High-Performance Flat Hash Table",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-cache-friendly-b-tree-map",
    "title": "Build a Cache-Friendly B-Tree Map",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-persistent-immutable-vector",
    "title": "Implement a Persistent Immutable Vector",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-an-incremental-binary-protocol-decoder",
    "title": "Create an Incremental Binary Protocol Decoder",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-compact-serialization-framework",
    "title": "Build a Compact Serialization Framework",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-zero-allocation-token-stream",
    "title": "Implement a Zero-Allocation Token Stream",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "design-a-compile-time-dependency-injection-container",
    "title": "Design a Compile-Time Dependency Injection Container",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-type-safe-event-bus-with-templates",
    "title": "Build a Type-Safe Event Bus with Templates",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-strong-exception-safe-transaction-container",
    "title": "Implement a Strong-Exception-Safe Transaction Container",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-custom-memory-lifetime-tracking-debugger",
    "title": "Create a Custom Memory Lifetime Tracking Debugger",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-static-reflection-like-field-registry",
    "title": "Build a Static Reflection-Like Field Registry",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-plugin-interface-with-stable-abi-boundaries",
    "title": "Implement a Plugin Interface with Stable ABI Boundaries",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-generational-entity-component-storage",
    "title": "Create a Generational Entity Component Storage",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-fixed-point-numeric-type-with-overflow-modes",
    "title": "Implement a Fixed-Point Numeric Type with Overflow Modes",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-compile-time-units-and-dimensions-library",
    "title": "Build a Compile-Time Units and Dimensions Library",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-bump-pointer-arena-with-destructor-tracking",
    "title": "Implement a Bump-Pointer Arena with Destructor Tracking",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-simd-friendly-structure-of-arrays-container",
    "title": "Create a SIMD-Friendly Structure of Arrays Container",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-cache-efficient-prefix-index",
    "title": "Build a Cache-Efficient Prefix Index",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-an-ownership-aware-graph-library",
    "title": "Implement an Ownership-Aware Graph Library",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-coroutine-task-scheduler-interface",
    "title": "Create a Coroutine Task Scheduler Interface",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-an-exception-safe-dynamic-polymorphic-container",
    "title": "Build an Exception-Safe Dynamic Polymorphic Container",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-memory-safe-intrusive-tree-with-iterators",
    "title": "Implement a Memory-Safe Intrusive Tree with Iterators",
    "category": "Core C++",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-simple-factory-for-shape-objects",
    "title": "Implement a Simple Factory for Shape Objects",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "build-a-strategy-based-arithmetic-calculator",
    "title": "Build a Strategy-Based Arithmetic Calculator",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "create-a-basic-observer-subscription-list",
    "title": "Create a Basic Observer Subscription List",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-a-singleton-configuration-holder",
    "title": "Implement a Singleton Configuration Holder",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "build-a-command-object-for-increment-operations",
    "title": "Build a Command Object for Increment Operations",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "create-a-builder-for-immutable-configuration",
    "title": "Create a Builder for Immutable Configuration",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-an-adapter-for-legacy-temperature-units",
    "title": "Implement an Adapter for Legacy Temperature Units",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "build-a-decorator-that-logs-function-calls",
    "title": "Build a Decorator That Logs Function Calls",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "create-a-state-machine-for-a-door-lock",
    "title": "Create a State Machine for a Door Lock",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-a-prototype-clone-interface",
    "title": "Implement a Prototype Clone Interface",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "build-an-iterator-for-a-custom-collection",
    "title": "Build an Iterator for a Custom Collection",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-an-object-pool-for-fixed-size-objects",
    "title": "Implement an Object Pool for Fixed-Size Objects",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "create-a-null-object-for-optional-logging",
    "title": "Create a Null Object for Optional Logging",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "build-a-basic-chain-of-responsibility",
    "title": "Build a Basic Chain of Responsibility",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-an-event-listener-registration-api",
    "title": "Implement an Event Listener Registration API",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "create-a-template-method-for-file-processing",
    "title": "Create a Template Method for File Processing",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "build-a-mediator-for-two-components",
    "title": "Build a Mediator for Two Components",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-a-memento-snapshot-for-a-counter",
    "title": "Implement a Memento Snapshot for a Counter",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "create-an-abstract-factory-for-ui-widgets",
    "title": "Create an Abstract Factory for UI Widgets",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "build-a-facade-for-multi-step-initialization",
    "title": "Build a Facade for Multi-Step Initialization",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-a-composite-tree-summation",
    "title": "Implement a Composite Tree Summation",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "create-a-flyweight-registry-of-reused-symbols",
    "title": "Create a Flyweight Registry of Reused Symbols",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "build-a-visitor-for-two-expression-node-types",
    "title": "Build a Visitor for Two Expression Node Types",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "implement-a-command-history-with-undo",
    "title": "Implement a Command History with Undo",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "create-a-basic-dependency-injection-constructor",
    "title": "Create a Basic Dependency Injection Constructor",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "status": "in-review"
  },
  {
    "slug": "observer-dispatch",
    "title": "Build a Deterministic Observer Event Dispatcher",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "runnable"
  },
  {
    "slug": "strategy-routing",
    "title": "Implement Runtime-Switchable Order Routing Strategies",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "runnable"
  },
  {
    "slug": "create-a-thread-safe-observer-registry",
    "title": "Create a Thread-Safe Observer Registry",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "design-a-command-queue-with-undo-and-redo",
    "title": "Design a Command Queue with Undo and Redo",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-factory-registry-with-custom-constructors",
    "title": "Build a Factory Registry with Custom Constructors",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-builder-with-compile-time-required-fields",
    "title": "Implement a Builder with Compile-Time Required Fields",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-state-pattern-for-order-lifecycle",
    "title": "Create a State Pattern for Order Lifecycle",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-chain-of-risk-validation-handlers",
    "title": "Build a Chain of Risk Validation Handlers",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-decorator-stack-for-request-middleware",
    "title": "Implement a Decorator Stack for Request Middleware",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-composite-portfolio-valuation-tree",
    "title": "Create a Composite Portfolio Valuation Tree",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "design-a-flyweight-instrument-metadata-cache",
    "title": "Design a Flyweight Instrument Metadata Cache",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-an-adapter-between-two-market-data-formats",
    "title": "Implement an Adapter Between Two Market Data Formats",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-facade-around-trading-session-services",
    "title": "Build a Facade Around Trading Session Services",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-strategy-registry-for-pricing-algorithms",
    "title": "Implement a Strategy Registry for Pricing Algorithms",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-an-event-bus-with-subscription-tokens",
    "title": "Create an Event Bus with Subscription Tokens",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-an-object-pool-with-raii-lease-return",
    "title": "Build an Object Pool with RAII Lease Return",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-typed-visitor-for-an-expression-tree",
    "title": "Implement a Typed Visitor for an Expression Tree",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-memento-based-undo-stack",
    "title": "Create a Memento-Based Undo Stack",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-mediator-for-order-book-and-risk-engine",
    "title": "Build a Mediator for Order Book and Risk Engine",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-template-method-for-data-import",
    "title": "Implement a Template Method for Data Import",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-bridge-between-storage-and-serialization",
    "title": "Create a Bridge Between Storage and Serialization",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-proxy-with-lazy-resource-initialization",
    "title": "Build a Proxy with Lazy Resource Initialization",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-an-abstract-factory-for-message-parsers",
    "title": "Implement an Abstract Factory for Message Parsers",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-command-dispatcher-with-rate-limiting",
    "title": "Create a Command Dispatcher with Rate Limiting",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-an-observer-dispatcher-supporting-re-subscription",
    "title": "Build an Observer Dispatcher Supporting Re-Subscription",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-workflow-state-machine-with-guard-conditions",
    "title": "Implement a Workflow State Machine with Guard Conditions",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-decorator-for-metrics-instrumentation",
    "title": "Create a Decorator for Metrics Instrumentation",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-retry-policy-strategy-with-backoff",
    "title": "Build a Retry Policy Strategy with Backoff",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-circuit-breaker-state-machine",
    "title": "Implement a Circuit Breaker State Machine",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-cache-proxy-with-expiration",
    "title": "Create a Cache Proxy with Expiration",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-repository-pattern-with-in-memory-backend",
    "title": "Build a Repository Pattern with In-Memory Backend",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-strategy-based-file-compressor",
    "title": "Implement a Strategy-Based File Compressor",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-pipeline-of-composable-middleware",
    "title": "Create a Pipeline of Composable Middleware",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-an-iterator-with-modification-detection",
    "title": "Build an Iterator with Modification Detection",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-prototype-registry-with-deep-cloning",
    "title": "Implement a Prototype Registry with Deep Cloning",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-facade-for-socket-connection-lifecycle",
    "title": "Create a Facade for Socket Connection Lifecycle",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "design-an-adapter-for-heterogeneous-exchange-messages",
    "title": "Design an Adapter for Heterogeneous Exchange Messages",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-an-immutable-request-builder",
    "title": "Implement an Immutable Request Builder",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-rule-engine-with-chain-of-responsibility",
    "title": "Build a Rule Engine with Chain of Responsibility",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-scheduled-command-queue",
    "title": "Create a Scheduled Command Queue",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-multi-level-composite-configuration",
    "title": "Implement a Multi-Level Composite Configuration",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-strategy-based-order-validation-system",
    "title": "Build a Strategy-Based Order Validation System",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "create-a-publish-subscribe-event-router",
    "title": "Create a Publish-Subscribe Event Router",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "implement-a-unit-of-work-with-commit-and-rollback",
    "title": "Implement a Unit of Work with Commit and Rollback",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "design-a-pluggable-serialization-factory",
    "title": "Design a Pluggable Serialization Factory",
    "category": "Design Patterns",
    "difficulty": "Medium",
    "status": "in-review"
  },
  {
    "slug": "build-a-production-style-event-bus-with-safe-lifetime-management",
    "title": "Build a Production-Style Event Bus with Safe Lifetime Management",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-an-ownership-safe-observer-pattern-under-concurrency",
    "title": "Implement an Ownership-Safe Observer Pattern Under Concurrency",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "design-a-lock-free-publish-subscribe-dispatcher",
    "title": "Design a Lock-Free Publish-Subscribe Dispatcher",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-an-exchange-gateway-with-adapter-and-strategy-patterns",
    "title": "Build an Exchange Gateway with Adapter and Strategy Patterns",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-an-event-sourced-order-state-machine",
    "title": "Implement an Event-Sourced Order State Machine",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "design-a-rule-engine-with-hot-swappable-policies",
    "title": "Design a Rule Engine with Hot-Swappable Policies",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-pluggable-matching-engine-architecture",
    "title": "Build a Pluggable Matching Engine Architecture",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-runtime-plugin-registry-with-stable-interfaces",
    "title": "Create a Runtime Plugin Registry with Stable Interfaces",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-dependency-injection-container-with-scopes",
    "title": "Implement a Dependency Injection Container with Scopes",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-composable-asynchronous-middleware-pipeline",
    "title": "Build a Composable Asynchronous Middleware Pipeline",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "design-a-fault-tolerant-command-bus-with-retries",
    "title": "Design a Fault-Tolerant Command Bus with Retries",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-concurrent-object-pool-with-backpressure",
    "title": "Implement a Concurrent Object Pool with Backpressure",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-reversible-workflow-using-saga-style-commands",
    "title": "Create a Reversible Workflow Using Saga-Style Commands",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-multi-venue-market-data-normalization-layer",
    "title": "Build a Multi-Venue Market Data Normalization Layer",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "design-a-type-erased-strategy-with-zero-heap-allocations",
    "title": "Design a Type-Erased Strategy with Zero Heap Allocations",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-reactive-data-flow-graph-with-cycle-detection",
    "title": "Implement a Reactive Data Flow Graph with Cycle Detection",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-thread-safe-flyweight-cache-with-eviction",
    "title": "Create a Thread-Safe Flyweight Cache with Eviction",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-policy-based-static-dispatch-framework",
    "title": "Build a Policy-Based Static Dispatch Framework",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-statechart-with-nested-states-and-events",
    "title": "Implement a Statechart with Nested States and Events",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "design-a-concurrent-actor-like-mediator-system",
    "title": "Design a Concurrent Actor-Like Mediator System",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-multi-stage-validation-and-enrichment-pipeline",
    "title": "Create a Multi-Stage Validation and Enrichment Pipeline",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-high-performance-price-feed-observer-fanout",
    "title": "Build a High-Performance Price Feed Observer Fanout",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-versioned-configuration-snapshot-system",
    "title": "Implement a Versioned Configuration Snapshot System",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-transactional-unit-of-work-over-multiple-stores",
    "title": "Create a Transactional Unit of Work Over Multiple Stores",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-deterministic-simulation-using-command-replay",
    "title": "Build a Deterministic Simulation Using Command Replay",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-a-message-routing-table-with-visitor-dispatch",
    "title": "Implement a Message Routing Table with Visitor Dispatch",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "design-an-extensible-trading-risk-decorator-pipeline",
    "title": "Design an Extensible Trading Risk Decorator Pipeline",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "create-a-zero-allocation-event-handler-registry",
    "title": "Create a Zero-Allocation Event Handler Registry",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "implement-an-exchange-connector-with-lifecycle-state-pattern",
    "title": "Implement an Exchange Connector with Lifecycle State Pattern",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  },
  {
    "slug": "build-a-full-market-data-to-execution-pattern-composition",
    "title": "Build a Full Market-Data-to-Execution Pattern Composition",
    "category": "Design Patterns",
    "difficulty": "Hard",
    "status": "in-review"
  }
] as Array<Pick<BankProblem,"slug"|"title"|"category"|"difficulty"|"status">>;

const readyBySlug = new Map(practiceProblems.map(problem => [problem.slug, problem]));

const tokenTags: Array<[RegExp, string]> = [
  [/lock.free|atomics?|memory.order|compare.and.swap|aba|hazard|epoch/i,"Lock-free"],
  [/thread|mutex|race|deadlock|sync|semaphore|barrier|condition/i,"Threading"],
  [/cache|tlb|simd|branch|cpu|numa|memory|allocator/i,"Memory & performance"],
  [/order.book|matching|execution|venue|auction|price.time|limit.order/i,"Order books"],
  [/market.data|feed|sequence|trade|quote|ticker|symbol/i,"Market data"],
  [/socket|tcp|udp|network|packet|multicast|fix|session/i,"Networking"],
  [/pattern|factory|observer|strategy|builder|decorator|singleton|visitor|proxy/i,"Design patterns"],
  [/array|vector|stack|queue|map|graph|tree|sort|hash|trie|heap/i,"Data structures"],
  [/raii|ownership|move|copy|smart.pointer|lifetime/i,"Ownership"],
  [/template|constexpr|compile.time|coroutine|variant|type.erase/i,"Modern C++"],
];

export const problemBank: BankProblem[] = originalBacklog.map(item => {
  const ready = readyBySlug.get(item.slug);
  return {
    ...item,
    title: ready?.title ?? item.title,
    tags: ready?.tags ?? tokenTags.filter(([regex]) => regex.test(item.title)).map(([,tag]) => tag).slice(0,3),
    summary: ready?.summary ??
      "Curated " + item.difficulty.toLowerCase() + "-level C++ challenge concept. Full statement, reference solution, and independent grading tests are in editorial review.",
  };
});
export const problemBankBySlug = new Map(problemBank.map(problem => [problem.slug, problem]));
export const runnableProblems = problemBank.filter(problem => problem.status === "runnable");
export const problemBankStats = {
  total: problemBank.length,
  runnable: runnableProblems.length,
  inReview: problemBank.length - runnableProblems.length,
};
export function getBankProblem(slug: string): BankProblem | undefined {
  return problemBankBySlug.get(slug);
}

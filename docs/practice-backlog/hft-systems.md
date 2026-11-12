# HFT Systems — 100 original problem candidates

> Editorial backlog, **not 100 published or judged questions**. Every idea needs an original problem specification, reference solution and validated hidden tests before release.

## Easy (25)

1. Calculate Trade Notional from a Tick Stream
2. Find the Tightest Bid-Ask Spread
3. Compute the Midquote from a BBO Snapshot
4. Detect a Crossed or Locked Market
5. Round Order Prices to the Nearest Tick
6. Validate Exchange Lot Size Rules
7. Aggregate Executed Quantity by Symbol
8. Calculate a Position's Signed Inventory
9. Compute a Weighted Average Fill Price
10. Find the Largest Single Trade
11. Convert Fixed-Point Prices to Ticks
12. Calculate Gross and Net Exposure
13. Check a Simple Pre-Trade Quantity Limit
14. Calculate Round-Trip Timestamp Latency
15. Convert Nanosecond Timestamps to Microseconds
16. Identify Out-of-Order Feed Sequence Numbers
17. Count Missing Market Data Messages
18. Detect Duplicate Trade Identifiers
19. Calculate the Bid-Ask Spread in Basis Points
20. Apply a Maker-Taker Fee Schedule
21. Calculate PnL on a Closed Position
22. Find the First Price Crossing a Threshold
23. Normalize Exchange Symbol Codes
24. Count Heartbeat Timeouts in a Session Log
25. Reconstruct a Simple Top-of-Book Snapshot

## Medium (45)

1. Maintain Rolling VWAP for the Last K Trades
2. Merge Two Exchange Trade Streams by Timestamp
3. Implement a Top-of-Book Quote Tracker
4. Apply Add Update Delete Level-1 Quote Events
5. Calculate Order Flow Imbalance per Time Window
6. Maintain Volume at Each Price Level
7. Build a Sliding-Window Market Data Rate Monitor
8. Repair Sequence Gaps from a Recovery Stream
9. Validate Snapshot and Delta Sequence Continuity
10. Reconstruct Symbol State from an Event Log
11. Implement a Fixed-Point Decimal Arithmetic Type
12. Reject Invalid Tick and Lot Combination Orders
13. Implement a Per-Symbol Position Limit Checker
14. Deduplicate Replayed Exchange Messages
15. Track Orders Through Accepted Partially Filled and Canceled States
16. Match Trade Confirmations to Client Order IDs
17. Implement Cancel-Replace Order Bookkeeping
18. Calculate Queue Position at a Single Price
19. Aggregate Best Bid and Ask Across Venues
20. Select the Best Venue After Trading Fees
21. Calculate Volume-Weighted Best Execution Price
22. Implement an Exchange Session Heartbeat Monitor
23. Frame a Length-Prefixed TCP Message Stream
24. Parse a Binary Market Data Packet with Bounds Checks
25. Build a Bounded UDP Packet Reordering Buffer
26. Recover an Incremental Book from Snapshot Plus Deltas
27. Implement a Rolling Latency Percentile Calculator
28. Merge Interval-Based Trading Sessions
29. Build an Order Rate Limiter with a Sliding Window
30. Implement a Token Bucket for Gateway Requests
31. Build a Symbol-to-Instrument-ID Lookup Table
32. Maintain Top K Most Active Trading Symbols
33. Process Trading Halts and Resumptions
34. Calculate Intraday Realized and Unrealized PnL
35. Implement a Quote Staleness Detector
36. Track Exchange Reject Codes and Retry Policy
37. Construct a Deterministic Market Data Replayer
38. Calculate Effective Spread from Executions
39. Implement a Risk-Aware Order Quantity Clamp
40. Merge Trades Across Venues Without Duplicates
41. Build an Expiring Order ID Cache
42. Implement a Priority-Based Execution Gateway Queue
43. Compute Market Depth Imbalance by Price Level
44. Detect a BBO Change from Batched Updates
45. Maintain a Consistent Multi-Symbol Snapshot

## Hard (30)

1. Implement a Price-Time Priority Limit Order Book
2. Build an Order Matching Engine with Partial Fills
3. Support Cancel and Replace in a Matching Engine
4. Implement an Iceberg Order with Visible Quantity
5. Build an Auction Clearing Price Calculator
6. Create a Multi-Venue Smart Order Router
7. Construct an Event-Sourced Order Management System
8. Implement Snapshot-Recovery for Multicast Market Data
9. Arbitrate Redundant A/B Feed Channels with Gap Recovery
10. Build a Deterministic Tick-to-Trade Simulator
11. Implement a Concurrent Market Data Fan-Out Pipeline
12. Build a Zero-Allocation Binary Message Parser
13. Design a Cache-Friendly Order Book Price Index
14. Implement a Pre-Trade Risk Pipeline with Multiple Limits
15. Create a Self-Healing FIX-Style Session State Machine
16. Build a Persistent Replayable Exchange Event Journal
17. Implement an Incremental Order Book Checksum Validator
18. Build a Latency-Aware Order Gateway Scheduler
19. Design a Market Data Backpressure and Drop Policy
20. Implement Portfolio Exposure Across Correlated Instruments
21. Build a Cross-Venue Order and Fill Reconciliation Engine
22. Create a Consistent Snapshot Across Multiple Event Streams
23. Implement a High-Throughput Trade Deduplication Index
24. Build a Multi-Producer Event Sequencer with Stable Ordering
25. Implement Cancel-on-Disconnect Across Open Orders
26. Build a Deterministic Exchange Failure and Recovery Simulator
27. Create a Rate-Limited Matching Engine Under Load
28. Design a Risk-Kill-Switch with Atomic State Transition
29. Implement a Cache-Resident Instrument Metadata Store
30. Benchmark Two Order-Book Layouts Under Identical Workloads

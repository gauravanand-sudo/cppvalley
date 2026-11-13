/**
 * Structured lesson-topic outlines, not recorded courses or verified labs.
 * The C++ source comes from the owner's modern-C++ curriculum; CUDA and AI
 * topics draw on the existing 16-series academic planning workbook.
 *
 * Index = module number on the matching course in elite-courses.ts.
 * Never duplicate ownership across course boundaries: C5 correctness,
 * C6 single-GPU optimization, C7 inference runtime, C8 applications,
 * C9 distributed infrastructure, C10 architecture leadership.
 */
export const careerCourseTopics: Record<string,string[][]> = {
  "core-cpp-interviews": [
    ["C++ Compilation, Translation Units and the ODR","Static Types, Initialization and Narrowing","Expressions, cv-Qualifiers and Reference Types","Storage Duration and Object Lifetime","Alignment, Padding and Object Representation"],
    ["RAII, Scope Guards and Invariants","Constructors, Destructors and Exception Paths","std::unique_ptr and Move-Only Ownership","std::shared_ptr, Control Blocks and std::weak_ptr","Strong, Basic and No-Throw Exception Guarantees"],
    ["Class Invariants and Interface Contracts","Virtual Functions, Destructors and Object Slicing","Composition, Interfaces and Dependency Injection","SOLID Principles as Engineering Trade-Offs","Pimpl, API Boundaries and ABI Compatibility"],
    ["std::vector Capacity, Reallocation and Invalidation","std::deque, std::list and Cache Locality","std::map and std::unordered_map Contracts","Iterator Categories and Standard Algorithms","Ranges, Views and Borrowing Rules","std::string, std::string_view and Lifetime"],
    ["auto, decltype and Deduction Contexts","lvalues, rvalues and xvalues","Templates, Specialization and Instantiation","Type Traits and Compile-Time Introspection","Overload Resolution and Constrained Interfaces"],
    ["Copy/Move Special Members and the Rule of Zero","std::move, Casts and Moved-From Objects","Forwarding References and Reference Collapsing","Perfect Forwarding and std::forward","noexcept, Move Optimization and Container Behavior"],
    ["Structured Bindings and Lifetime Traps","if constexpr and Compile-Time Branches","std::optional, std::variant and std::visit","std::filesystem, std::any and std::pmr","Guaranteed Copy Elision and Evaluation Order"],
    ["C++20 Concepts and requires-Expressions","Ranges Pipelines and Iterator Sentinels","consteval, constinit and Constant Evaluation","Coroutines: Frames, Suspension and Ownership","std::span, std::format and Safe Nonowning Views"],
    ["C++23 Explicit Object Parameters","std::expected and Monadic Error Handling","std::mdspan and Multidimensional Views","std::print, Flat Containers and Stacktrace Support","Compiler Compatibility and Feature-Test Macros"],
    ["Policy-Based Design and Static Polymorphism","Type Erasure and std::function","Allocator Interfaces, Arenas and std::pmr","Exception-Safe and Performance-Aware APIs","Measuring Abstraction and Allocation Overhead"],
    ["Undefined Behavior, Aliasing and Object Lifetimes","AddressSanitizer, UBSan and Static Analysis","Property Tests and Fuzzing C++ Components","Unit Tests for Generic Libraries","Reviewing Unsafe Legacy APIs"],
    ["Capstone: Define a Binary Wire Format","Capstone: Build a Safe Parser and Serializer","Capstone: Fuzz and Sanitize the Component","Capstone: Benchmark and Profile Allocations","Capstone: Document API Guarantees and Portability"],
  ],
  "cuda-gpu-programming": [
    ["CPU vs GPU Throughput and SIMT","CUDA Toolkit, nvcc and Device Compatibility","Thread Grids, Blocks and Kernel Launches","Global Memory Indexing and Boundary Correctness","CUDA Error Checking and Compute-Sanitizer"],
    ["Registers, Shared, Global and Constant Memory","Memory Coalescing and Layout","Pinned Host Memory and Asynchronous Transfers","Unified Memory, Prefetch and Page Migration","Device Allocation, Lifetimes and Transfer Budgets"],
    ["Warp Divergence, Predication and Control Flow","Thread-Block Synchronization and Memory Visibility","Warp Shuffle, Ballot and Reduction Primitives","Device Atomics and Scoped Memory Ordering","GPU Race Detection and Nondeterminism"],
    ["Parallel Reductions and Numerical Stability","Prefix Scan: Blelloch and Segmentation","Histograms and Atomic Contention","GPU Stencils, Halos and Boundaries","Tiled Matrix Multiplication for Correctness"],
    ["CUDA Streams, Events and Dependencies","Async Copies and Overlapping Transfers","CUDA Graphs and Launch Overhead","Cooperative Groups and Thread-Block Clusters","Stream Synchronization Failure Cases"],
    ["Nsight Systems: Host–GPU Timeline","Nsight Compute: A First Kernel Profile","Compute-Sanitizer, Racecheck and Initcheck","Benchmark Warmups, Timers and Data Transfer Costs","Capstone: Verified Reductions, Scans and Stencils","Capstone: CPU Comparison and GPU Correctness Report"],
  ],
  "gpu-kernel-performance-engineering": [
    ["Roofline Analysis and Arithmetic Intensity","Occupancy, Registers and Spill Trade-Offs","Global Memory Throughput and Vectorized Loads","Bandwidth-Bound vs Compute-Bound Kernels","Benchmark Variance and Clock Control"],
    ["Shared-Memory Banks and Conflict Avoidance","Warp Scheduling and Instruction Dependencies","PTX and SASS Inspection Workflow","Async Data Staging and Double Buffering","Register Reuse and Thread-Block Tiling"],
    ["Tensor Core Execution and MMA Fragments","GEMM Tiling and Data Reuse","FP32, TF32, FP16, BF16 and FP8 Numerics","CUTLASS Kernel Composition","Numerical Error and Accuracy Budgets"],
    ["Triton JIT Kernels and Block Programs","Triton Reductions and Fused Softmax","Custom PyTorch C++/CUDA Operators","Kernel Fusion and Launch Amortization","Compare CUDA, CUTLASS and Triton"],
    ["Normalization and Attention Kernel IO Costs","FlashAttention-Style Tiling Concepts","GQA/MQA Kernel Shape Trade-Offs","Fused Quantized Operators and INT8/INT4","Autotuning vs Reproducibility"],
    ["Capstone: Build a GEMM Baseline","Capstone: Tune GEMM for a Defined GPU","Capstone: Fuse and Benchmark an Attention Operator","Capstone: Validate Mixed-Precision Error","Capstone: Publish Roofline and Regression Results"],
  ],
  "ai-inference-engines": [
    ["Transformer Inference: Weights, Activations and Tokens","Prefill vs Decode: Compute and Memory Behavior","Time to First Token and Inter-Token Latency","Tokens per Second, Concurrency and Tail Percentiles","Latency/Throughput Benchmark Workloads"],
    ["KV Cache Tensor Layout and Memory Accounting","Paged Attention and Variable-Length Requests","KV Cache Allocation, Eviction and Fragmentation","GQA/MQA and Memory Budget Trade-Offs","Prefix Caching and Admission Control"],
    ["Continuous Batching and Fairness","Priority Queues, Scheduling and Deadline Policies","Chunked Prefill and Decode Scheduling","Speculative Decoding and Acceptance Probability","Cancellation and Abandoned Request Cleanup"],
    ["Weight Quantization and Calibration Trade-Offs","Serving Engine Comparison: vLLM and Alternatives","GPU Memory Budgeting for Model Replicas","TensorRT-LLM Engine Design and Deployment","Model Routing and Engine Selection by Workload"],
    ["Inference Traffic Modeling and Burst Load","Backpressure, Circuit Breakers and Load Shedding","TTFT, ITL and Token-Throughput Observability","Cold Starts, Warm Pools and Rollbacks","Cost/Latency/Quality Optimization"],
    ["Capstone: Build a KV-Aware Scheduler Simulator","Capstone: Add Continuous Batching","Capstone: Validate Scheduling Correctness","Capstone: Benchmark a Live Inference Endpoint","Capstone: Present Capacity and Cost Evidence"],
  ],
  "production-llm-rag-agents": [
    ["Model API Contracts, Errors and Rate Limits","Context Windows, Tokenization and Costs","Instruction Hierarchy and Prompt-Injection Risks","Structured Outputs and Constrained Decoding","Conversation State and Durable Sessions"],
    ["Document Parsing and Provenance","Chunking Strategies and Metadata","Embeddings and Semantic Similarity","Vector Indexes: HNSW, IVF and PQ","Hybrid BM25 and Dense Retrieval","Cross-Encoders and Reranking"],
    ["Query Rewriting and Multi-Hop Retrieval","Grounding, Citations and Source Attribution","Tenant Isolation and Access-Controlled Retrieval","Recall@K, Faithfulness and Answer Quality","RAG Refresh, Caching and Deletion Policies"],
    ["Agents vs Deterministic Workflows","Tool Schemas and Argument Validation","Model Context Protocol and Tool Authorization","Durable Execution, Retries and Idempotency","Human Approval and High-Risk Actions","Agent Memory, Sandbox Scope and Recovery"],
    ["Golden Test Sets and Task-Based Evals","Offline Tool Mocks and Deterministic Tests","Prompt Injection and Tool Abuse Red Teaming","PII, Logging, Tracing and Cost Limits","Model Rollout, Versioning and Regression Gates"],
    ["Capstone: Build a Tenant-Aware Document Ingestion Pipeline","Capstone: Hybrid Retrieval with Citations","Capstone: Add a Permissioned Tool Agent","Capstone: Implement Offline Evaluation and Red Team Tests","Capstone: Deploy with Tracing, SLOs and Rollback"],
  ],
  "distributed-ai-gpu-infrastructure": [
    ["Partial Failure, Consistency and Distributed Clocks","GPU Interconnects: PCIe, NVLink and NVSwitch","Node Topology and Network Performance","Collective Communication and Bandwidth Models","Communication vs Computation Bottlenecks"],
    ["NCCL All-Reduce, Broadcast and All-Gather","Tensor, Pipeline and Data Parallelism","Collective Overlap and Communication Pipelines","Cross-Node Communication and RDMA Concepts","GPU-to-GPU Profiling and Failure Modes"],
    ["Model Sharding and Partition Strategies","Tensor Parallel Inference and Memory Footprints","Pipeline Parallel Bubbles and Scheduling","Distributed Training Checkpoints and Recovery","Serving Scale-Out vs Model Scale-Up"],
    ["Kubernetes GPU Device Scheduling","Resource Isolation, Quotas and Multi-Tenancy","GPU Admission Control and Fairness","Cluster Autoscaling and Warm Capacity","Node Drain, Preemption and Rolling Updates"],
    ["GPU OOM, Worker Loss and Degraded Service","Inference Observability and GPU Telemetry","SLOs, Retry Budgets and Timeouts","Capacity Planning and Cost Attribution","Multi-Region Recovery and State Consistency"],
    ["Capstone: Deploy Multi-GPU Model Serving","Capstone: Benchmark NCCL and Topology","Capstone: Test Node Failure and Rollback","Capstone: Measure TTFT, Throughput and GPU Utilization","Capstone: Document Capacity, Cost and Recovery Evidence"],
  ],
  "ai-systems-architecture": [
    ["Gather Requirements and Stakeholder Constraints","Quality Attributes: Reliability, Security and Latency","Architecture Decision Records and Trade-Off Tables","C4 Model and Platform Boundaries","Design Review and Interview Communication"],
    ["Managed Models vs Self-Hosted Engines","Data, Compute and Model Platform Boundaries","Model Routing, Fallback and Policy Controls","Platform Build-vs-Buy and Vendor Lock-In","Estimate Cost, Capacity and Model Quality"],
    ["Enterprise Multi-Tenancy and Identity Isolation","Secrets, Key Management and Auditability","Threat Modeling Prompt Injection and Tool Access","PII, Residency and Data Governance","Compliance Responsibilities and Supply Chain Risk"],
    ["Eval Governance and Production Quality Gates","Service Level Objectives and Error Budgets","LLM Traces, Token Costs and Quality Telemetry","FinOps, Chargeback and Unit Economics","Incident Response and Production Rollbacks"],
    ["Multi-Region and Disaster Recovery Design","Caching, Rate Limiting and Load Shedding","Cross-Team Platform Ownership and Interfaces","Failure Injection and Security Reviews","Observability, Capacity and Risk Registers"],
    ["Capstone: Enterprise AI Reference Architecture","Capstone: Threat Model and Tenant Boundaries","Capstone: ADRs for Model and Serving Decisions","Capstone: SLO, Evals and Cost Forecast","Capstone: Lead a Design Review and Incident Drill"],
  ],
};

import type { PracticeProblem } from "./practice";

/** Independently specified C++17 stdin/stdout exercises; keep judge cases server-side. */
export const expansionProblems: PracticeProblem[] = [
  {
    "slug": "find-the-tightest-bid-ask-spread",
    "title": "Find The Tightest Bid Ask Spread",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "tags": [
      "Spreads"
    ],
    "summary": "Given N top-of-book snapshots, each contains an integer bid and ask with ask at least bid.",
    "statement": "Given N top-of-book snapshots, each contains an integer bid and ask with ask at least bid. Print the smallest ask minus bid across all snapshots. Prices are expressed in ticks, not floating-point currency.",
    "inputFormat": "First line N; next N lines bid ask.",
    "outputFormat": "Print one nonnegative integer: the minimum spread.",
    "constraints": [
      "1 ≤ N ≤ 100000",
      "0 ≤ bid ≤ ask ≤ 10^9"
    ],
    "examples": [
      {
        "input": "3\n100 103\n102 103\n98 105",
        "output": "1"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement spreads logic.\n    return 0;\n}\n"
  },
  {
    "slug": "detect-a-crossed-or-locked-market",
    "title": "Detect A Crossed Or Locked Market",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "tags": [
      "Quotes"
    ],
    "summary": "Classify each quote: CROSSED if bid is greater than ask, LOCKED if bid equals ask, otherwise NORMAL.",
    "statement": "Classify each quote: CROSSED if bid is greater than ask, LOCKED if bid equals ask, otherwise NORMAL. Every line is independently evaluated.",
    "inputFormat": "First line N; next N lines bid ask.",
    "outputFormat": "Print N lines containing CROSSED, LOCKED, or NORMAL.",
    "constraints": [
      "1 ≤ N ≤ 100000",
      "0 ≤ bid, ask ≤ 10^9"
    ],
    "examples": [
      {
        "input": "3\n101 100\n100 100\n99 101",
        "output": "CROSSED\nLOCKED\nNORMAL"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement quotes logic.\n    return 0;\n}\n"
  },
  {
    "slug": "validate-exchange-lot-size-rules",
    "title": "Validate Exchange Lot Size Rules",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "tags": [
      "Risk Checks"
    ],
    "summary": "An exchange accepts only positive order quantities that are multiples of a fixed lot size.",
    "statement": "An exchange accepts only positive order quantities that are multiples of a fixed lot size. For each proposed quantity print VALID if it is positive and divisible by the lot size, otherwise INVALID.",
    "inputFormat": "First line: lotSize N. Next N lines: one proposed integer quantity.",
    "outputFormat": "Print VALID or INVALID for each quantity.",
    "constraints": [
      "1 ≤ lotSize ≤ 10^9",
      "1 ≤ N ≤ 100000",
      "-10^9 ≤ quantity ≤ 10^9"
    ],
    "examples": [
      {
        "input": "5 4\n5\n10\n0\n-5",
        "output": "VALID\nVALID\nINVALID\nINVALID"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement risk checks logic.\n    return 0;\n}\n"
  },
  {
    "slug": "calculate-gross-and-net-exposure",
    "title": "Calculate Gross And Net Exposure",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "tags": [
      "Risk Management"
    ],
    "summary": "You receive N signed position exposures.",
    "statement": "You receive N signed position exposures. Net exposure is the signed sum; gross exposure is the sum of absolute values. Print gross followed by net on one line. Use signed 64-bit arithmetic.",
    "inputFormat": "First line N; next line or lines contain N signed integers.",
    "outputFormat": "Print gross net separated by one space.",
    "constraints": [
      "0 ≤ N ≤ 100000",
      "-10^9 ≤ exposure ≤ 10^9"
    ],
    "examples": [
      {
        "input": "4\n10 -5 7 -12",
        "output": "34 0"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement risk management logic.\n    return 0;\n}\n"
  },
  {
    "slug": "find-the-largest-single-trade",
    "title": "Find The Largest Single Trade",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "tags": [
      "Trades"
    ],
    "summary": "A trade has integer quantity and price.",
    "statement": "A trade has integer quantity and price. Its notional is quantity multiplied by price. Find the maximum notional among N trades; use 64-bit arithmetic.",
    "inputFormat": "First line N; next N lines quantity price.",
    "outputFormat": "Print the maximum trade notional.",
    "constraints": [
      "1 ≤ N ≤ 100000",
      "0 ≤ quantity, price ≤ 10^9",
      "Products fit in signed 64-bit."
    ],
    "examples": [
      {
        "input": "3\n2 100\n3 90\n1 500",
        "output": "500"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement trades logic.\n    return 0;\n}\n"
  },
  {
    "slug": "calculate-round-trip-timestamp-latency",
    "title": "Calculate Round Trip Timestamp Latency",
    "category": "HFT Systems",
    "difficulty": "Easy",
    "tags": [
      "Latency"
    ],
    "summary": "Each request records a send timestamp and a completion timestamp in nanoseconds.",
    "statement": "Each request records a send timestamp and a completion timestamp in nanoseconds. Every completion timestamp is at least its send timestamp. Print the maximum observed round-trip latency.",
    "inputFormat": "First line N; next N lines sendNs completionNs.",
    "outputFormat": "Print one integer, the maximum difference.",
    "constraints": [
      "1 ≤ N ≤ 100000",
      "0 ≤ sendNs ≤ completionNs ≤ 10^15"
    ],
    "examples": [
      {
        "input": "3\n100 110\n150 180\n200 201",
        "output": "30"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement latency logic.\n    return 0;\n}\n"
  },
  {
    "slug": "count-active-threads-from-start-and-join-events",
    "title": "Count Active Threads From Start And Join Events",
    "category": "Concurrency",
    "difficulty": "Easy",
    "tags": [
      "Thread Lifecycle"
    ],
    "summary": "Replay a sequential trace of thread lifecycle events.",
    "statement": "Replay a sequential trace of thread lifecycle events. START id inserts a newly started thread; JOIN id removes an active thread after it has been joined. The trace is valid: no thread ID is started twice without joining, and all joins refer to active threads. Count active threads after the final event.",
    "inputFormat": "First line N; next N lines START id or JOIN id.",
    "outputFormat": "Print the count of active threads.",
    "constraints": [
      "0 ≤ N ≤ 100000",
      "1 ≤ id ≤ 10^9"
    ],
    "examples": [
      {
        "input": "5\nSTART 1\nSTART 2\nJOIN 1\nSTART 3\nJOIN 2",
        "output": "1"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement thread lifecycle logic.\n    return 0;\n}\n"
  },
  {
    "slug": "detect-a-missing-thread-join-in-a-trace",
    "title": "Detect A Missing Thread Join In A Trace",
    "category": "Concurrency",
    "difficulty": "Easy",
    "tags": [
      "Thread Lifecycle"
    ],
    "summary": "Each thread ID appears in exactly one START event, and may have one JOIN event after it starts.",
    "statement": "Each thread ID appears in exactly one START event, and may have one JOIN event after it starts. Determine how many started threads have not been joined when the trace ends. This evaluates a recorded event trace, not real synchronization.",
    "inputFormat": "First line N; next N lines START id or JOIN id.",
    "outputFormat": "Print the number of threads missing a JOIN.",
    "constraints": [
      "0 ≤ N ≤ 100000",
      "1 ≤ id ≤ 10^9",
      "Each JOIN corresponds to an earlier START."
    ],
    "examples": [
      {
        "input": "4\nSTART 1\nSTART 2\nJOIN 1\nSTART 3",
        "output": "2"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement thread lifecycle logic.\n    return 0;\n}\n"
  },
  {
    "slug": "simulate-an-atomic-counter-increment-stream",
    "title": "Simulate An Atomic Counter Increment Stream",
    "category": "Concurrency",
    "difficulty": "Easy",
    "tags": [
      "Atomics"
    ],
    "summary": "Simulate a serialized log of operations on an integer counter, initially 0.",
    "statement": "Simulate a serialized log of operations on an integer counter, initially 0. ADD x increases the counter by x; RESET sets it to 0. The word atomic describes the original producer's counter, but this task processes an already-ordered log.",
    "inputFormat": "First line N; next N lines ADD x or RESET.",
    "outputFormat": "Print the final signed counter value.",
    "constraints": [
      "0 ≤ N ≤ 100000",
      "-10^9 ≤ x ≤ 10^9",
      "The answer fits signed 64-bit."
    ],
    "examples": [
      {
        "input": "5\nADD 5\nADD -2\nRESET\nADD 7\nADD 1",
        "output": "8"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement atomics logic.\n    return 0;\n}\n"
  },
  {
    "slug": "determine-whether-a-barrier-can-release",
    "title": "Determine Whether A Barrier Can Release",
    "category": "Concurrency",
    "difficulty": "Easy",
    "tags": [
      "Synchronization"
    ],
    "summary": "A reusable barrier requires P arrivals per generation.",
    "statement": "A reusable barrier requires P arrivals per generation. Read N ARRIVE events and print RELEASE each time the count reaches P, then reset the arrival count to zero for the next generation. At the end print REMAINING x showing how many arrivals belong to the unfinished generation.",
    "inputFormat": "First line P N; next N lines are the word ARRIVE.",
    "outputFormat": "Print each RELEASE on its own line, followed by REMAINING x.",
    "constraints": [
      "1 ≤ P ≤ 100000",
      "0 ≤ N ≤ 100000"
    ],
    "examples": [
      {
        "input": "3 7\nARRIVE\nARRIVE\nARRIVE\nARRIVE\nARRIVE\nARRIVE\nARRIVE",
        "output": "RELEASE\nRELEASE\nREMAINING 1"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement synchronization logic.\n    return 0;\n}\n"
  },
  {
    "slug": "count-condition-variable-notifications",
    "title": "Count Condition Variable Notifications",
    "category": "Concurrency",
    "difficulty": "Easy",
    "tags": [
      "Condition Variables"
    ],
    "summary": "A debugger records N notification calls as ONE or ALL.",
    "statement": "A debugger records N notification calls as ONE or ALL. Count how many notify_one and notify_all operations occurred. Notifications do not imply successful wakeups; this exercise analyzes log events only.",
    "inputFormat": "First line N; next N lines ONE or ALL.",
    "outputFormat": "Print the number of ONE events followed by the number of ALL events.",
    "constraints": [
      "0 ≤ N ≤ 100000"
    ],
    "examples": [
      {
        "input": "5\nONE\nALL\nONE\nONE\nALL",
        "output": "3 2"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement condition variables logic.\n    return 0;\n}\n"
  },
  {
    "slug": "detect-duplicate-task-completion-events",
    "title": "Detect Duplicate Task Completion Events",
    "category": "Concurrency",
    "difficulty": "Easy",
    "tags": [
      "Task Lifecycle"
    ],
    "summary": "An execution log records completed task IDs.",
    "statement": "An execution log records completed task IDs. Each task should be completed once. Print the number of repeated completion events (the second and every later occurrence of the same ID).",
    "inputFormat": "First line N; next N integers are completed task IDs.",
    "outputFormat": "Print the number of duplicate completion events.",
    "constraints": [
      "0 ≤ N ≤ 100000",
      "1 ≤ id ≤ 10^9"
    ],
    "examples": [
      {
        "input": "6\n1 2 1 3 2 1",
        "output": "3"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement task lifecycle logic.\n    return 0;\n}\n"
  },
  {
    "slug": "reverse-a-string-without-extra-allocation",
    "title": "Reverse A String Without Extra Allocation",
    "category": "Core C++",
    "difficulty": "Easy",
    "tags": [
      "Strings"
    ],
    "summary": "Read a single line of text, including possible spaces, and print the characters in reverse order.",
    "statement": "Read a single line of text, including possible spaces, and print the characters in reverse order. Use an in-place reversal of the C++ string buffer rather than allocating another string. The input is ASCII text.",
    "inputFormat": "One line of up to 100000 printable ASCII characters.",
    "outputFormat": "Print the reversed line.",
    "constraints": [
      "0 ≤ line length ≤ 100000",
      "Printable ASCII input only."
    ],
    "examples": [
      {
        "input": "C++ Valley",
        "output": "yellaV ++C"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement strings logic.\n    return 0;\n}\n"
  },
  {
    "slug": "remove-adjacent-duplicate-characters",
    "title": "Remove Adjacent Duplicate Characters",
    "category": "Core C++",
    "difficulty": "Easy",
    "tags": [
      "Strings"
    ],
    "summary": "Repeatedly remove any pair of adjacent identical characters until no such pair remains.",
    "statement": "Repeatedly remove any pair of adjacent identical characters until no such pair remains. A stack-like single pass can simulate the repeated removals because newly adjacent pairs must also vanish. Input consists of lowercase Latin letters.",
    "inputFormat": "One string S on one line.",
    "outputFormat": "Print the reduced string, or EMPTY when all characters are removed.",
    "constraints": [
      "1 ≤ |S| ≤ 100000",
      "S contains only a–z."
    ],
    "examples": [
      {
        "input": "abbaca",
        "output": "ca"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement strings logic.\n    return 0;\n}\n"
  },
  {
    "slug": "compute-word-frequencies-with-unordered-map",
    "title": "Compute Word Frequencies With Unordered Map",
    "category": "Core C++",
    "difficulty": "Easy",
    "tags": [
      "Hash Maps"
    ],
    "summary": "Count how many times each input word occurs.",
    "statement": "Count how many times each input word occurs. Print each distinct word and its frequency in lexicographic (ascending) order. Words contain lowercase ASCII letters only; comparisons are case-sensitive.",
    "inputFormat": "First line N; next N whitespace-delimited words.",
    "outputFormat": "One line per distinct word: word count, sorted lexicographically.",
    "constraints": [
      "0 ≤ N ≤ 100000",
      "1 ≤ each word length ≤ 50"
    ],
    "examples": [
      {
        "input": "5\ncat dog cat bird dog",
        "output": "bird 1\ncat 2\ndog 2"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement hash maps logic.\n    return 0;\n}\n"
  },
  {
    "slug": "merge-two-sorted-vectors",
    "title": "Merge Two Sorted Vectors",
    "category": "Core C++",
    "difficulty": "Easy",
    "tags": [
      "Arrays"
    ],
    "summary": "Given two nondecreasing sequences A and B, merge them into one nondecreasing sequence.",
    "statement": "Given two nondecreasing sequences A and B, merge them into one nondecreasing sequence. Duplicates are preserved. Use linear time in the total number of items.",
    "inputFormat": "First line N M; next N integers for A, then M integers for B.",
    "outputFormat": "Print the merged values space-separated on one line; print an empty line if both sequences are empty.",
    "constraints": [
      "0 ≤ N,M ≤ 100000",
      "-10^9 ≤ values ≤ 10^9",
      "Both inputs are nondecreasing."
    ],
    "examples": [
      {
        "input": "3 3\n1 4 8\n2 2 9",
        "output": "1 2 2 4 8 9"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement arrays logic.\n    return 0;\n}\n"
  },
  {
    "slug": "find-the-first-duplicate-identifier",
    "title": "Find The First Duplicate Identifier",
    "category": "Core C++",
    "difficulty": "Easy",
    "tags": [
      "Hashing"
    ],
    "summary": "Scan N integers from left to right.",
    "statement": "Scan N integers from left to right. Print the value of the first element that has appeared earlier. If every element is unique, print NONE. The first duplicate is determined by the position of its second occurrence, not by numeric value.",
    "inputFormat": "First line N; next N signed integers.",
    "outputFormat": "Print the duplicated integer or NONE.",
    "constraints": [
      "0 ≤ N ≤ 100000",
      "-10^9 ≤ values ≤ 10^9"
    ],
    "examples": [
      {
        "input": "6\n4 8 1 8 4 1",
        "output": "8"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement hashing logic.\n    return 0;\n}\n"
  },
  {
    "slug": "build-a-strategy-based-arithmetic-calculator",
    "title": "Build A Strategy Based Arithmetic Calculator",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "tags": [
      "Strategy Pattern"
    ],
    "summary": "Implement a command-driven calculator with interchangeable operations ADD, SUB, MIN, MAX.",
    "statement": "Implement a command-driven calculator with interchangeable operations ADD, SUB, MIN, MAX. For every command, apply the requested arithmetic strategy to two signed integers and output the result.",
    "inputFormat": "First line Q; next Q lines OP a b, where OP is ADD, SUB, MIN or MAX.",
    "outputFormat": "Print one integer result for each operation.",
    "constraints": [
      "0 ≤ Q ≤ 100000",
      "-10^9 ≤ a,b ≤ 10^9",
      "All results fit signed 64-bit."
    ],
    "examples": [
      {
        "input": "4\nADD 2 9\nSUB 2 9\nMIN 2 9\nMAX 2 9",
        "output": "11\n-7\n2\n9"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement strategy pattern logic.\n    return 0;\n}\n"
  },
  {
    "slug": "implement-a-singleton-configuration-holder",
    "title": "Implement A Singleton Configuration Holder",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "tags": [
      "Singleton Pattern"
    ],
    "summary": "A process has one configuration registry.",
    "statement": "A process has one configuration registry. SET key value creates or overwrites an integer value. GET key prints its value or NONE if unset. All operations address the same global registry instance. A plain map is sufficient for the serialized input representation.",
    "inputFormat": "First line Q; next Q lines SET key integerValue or GET key.",
    "outputFormat": "Print the result of each GET.",
    "constraints": [
      "0 ≤ Q ≤ 100000",
      "1 ≤ key length ≤ 30, letters only",
      "-10^9 ≤ value ≤ 10^9"
    ],
    "examples": [
      {
        "input": "5\nSET mode 3\nGET mode\nGET x\nSET mode 4\nGET mode",
        "output": "3\nNONE\n4"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement singleton pattern logic.\n    return 0;\n}\n"
  },
  {
    "slug": "build-a-command-object-for-increment-operations",
    "title": "Build A Command Object For Increment Operations",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "tags": [
      "Command Pattern"
    ],
    "summary": "Maintain a signed counter initially zero.",
    "statement": "Maintain a signed counter initially zero. INC x adds x and records it as an undoable command. UNDO removes the effect of the latest non-undone INC, if present; otherwise it leaves the counter unchanged. Print the final value. Commands are processed in order.",
    "inputFormat": "First line Q; next Q lines INC x or UNDO.",
    "outputFormat": "Print one signed integer: the final counter.",
    "constraints": [
      "0 ≤ Q ≤ 100000",
      "-10^9 ≤ x ≤ 10^9",
      "The result fits signed 64-bit."
    ],
    "examples": [
      {
        "input": "6\nINC 5\nINC 3\nUNDO\nINC 2\nUNDO\nINC -1",
        "output": "4"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement command pattern logic.\n    return 0;\n}\n"
  },
  {
    "slug": "create-a-state-machine-for-a-door-lock",
    "title": "Create A State Machine For A Door Lock",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "tags": [
      "State Pattern"
    ],
    "summary": "Model a door with three states: CLOSED_UNLOCKED (initial), CLOSED_LOCKED, and OPEN.",
    "statement": "Model a door with three states: CLOSED_UNLOCKED (initial), CLOSED_LOCKED, and OPEN. LOCK is valid only when CLOSED_UNLOCKED; UNLOCK only when CLOSED_LOCKED; OPEN only when CLOSED_UNLOCKED; CLOSE only when OPEN. Invalid commands leave the state unchanged and print ERROR. Valid commands print the resulting state.",
    "inputFormat": "First line Q; next Q lines LOCK, UNLOCK, OPEN or CLOSE.",
    "outputFormat": "Print ERROR for invalid commands; otherwise print CLOSED_UNLOCKED, CLOSED_LOCKED or OPEN.",
    "constraints": [
      "0 ≤ Q ≤ 100000"
    ],
    "examples": [
      {
        "input": "5\nLOCK\nOPEN\nUNLOCK\nOPEN\nCLOSE",
        "output": "CLOSED_LOCKED\nERROR\nCLOSED_UNLOCKED\nOPEN\nCLOSED_UNLOCKED"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement state pattern logic.\n    return 0;\n}\n"
  },
  {
    "slug": "implement-a-simple-factory-for-shape-objects",
    "title": "Implement A Simple Factory For Shape Objects",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "tags": [
      "Factory Pattern"
    ],
    "summary": "A shape factory creates either SQUARE with one side length or RECT with width and height.",
    "statement": "A shape factory creates either SQUARE with one side length or RECT with width and height. Calculate each created shape's integer area and print it, preserving input order. All dimensions are nonnegative integers.",
    "inputFormat": "First line N; next N lines SQUARE side or RECT width height.",
    "outputFormat": "Print one 64-bit integer area per shape.",
    "constraints": [
      "0 ≤ N ≤ 100000",
      "0 ≤ dimensions ≤ 10^9"
    ],
    "examples": [
      {
        "input": "3\nSQUARE 3\nRECT 4 5\nSQUARE 0",
        "output": "9\n20\n0"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement factory pattern logic.\n    return 0;\n}\n"
  },
  {
    "slug": "implement-a-command-history-with-undo",
    "title": "Implement A Command History With Undo",
    "category": "Design Patterns",
    "difficulty": "Easy",
    "tags": [
      "Command History"
    ],
    "summary": "A text editor stores a single integer document value initially 0.",
    "statement": "A text editor stores a single integer document value initially 0. SET x sets the document to x and pushes the old value on undo history. UNDO restores the previous value if there is history; otherwise does nothing. PRINT emits the current document value.",
    "inputFormat": "First line Q; next Q lines SET x, UNDO or PRINT.",
    "outputFormat": "Print one value for every PRINT.",
    "constraints": [
      "0 ≤ Q ≤ 100000",
      "-10^9 ≤ x ≤ 10^9"
    ],
    "examples": [
      {
        "input": "7\nSET 4\nSET 9\nPRINT\nUNDO\nPRINT\nUNDO\nPRINT",
        "output": "9\n4\n0"
      }
    ],
    "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Implement command history logic.\n    return 0;\n}\n"
  }
];

import type { JudgeCase } from "./practice-judge-cases";

/** Server-only fixture sets for the expanded, publicly runnable C++ problem bank. */
export const expansionJudgeCases: Record<string, JudgeCase[]> = {
  "find-the-tightest-bid-ask-spread": [
    {
      "input": "3\n100 103\n102 103\n98 105",
      "expected": "1"
    },
    {
      "input": "1\n4 9",
      "expected": "5"
    },
    {
      "input": "4\n10 12\n10 10\n20 22\n1 9",
      "expected": "0"
    }
  ],
  "detect-a-crossed-or-locked-market": [
    {
      "input": "3\n101 100\n100 100\n99 101",
      "expected": "CROSSED\nLOCKED\nNORMAL"
    },
    {
      "input": "1\n0 0",
      "expected": "LOCKED"
    },
    {
      "input": "2\n3 9\n10 2",
      "expected": "NORMAL\nCROSSED"
    }
  ],
  "validate-exchange-lot-size-rules": [
    {
      "input": "5 4\n5\n10\n0\n-5",
      "expected": "VALID\nVALID\nINVALID\nINVALID"
    },
    {
      "input": "1 3\n1\n2\n-1",
      "expected": "VALID\nVALID\nINVALID"
    },
    {
      "input": "10 3\n9\n10\n20",
      "expected": "INVALID\nVALID\nVALID"
    }
  ],
  "calculate-gross-and-net-exposure": [
    {
      "input": "4\n10 -5 7 -12",
      "expected": "34 0"
    },
    {
      "input": "0\n",
      "expected": "0 0"
    },
    {
      "input": "3\n-10 -20 5",
      "expected": "35 -25"
    }
  ],
  "find-the-largest-single-trade": [
    {
      "input": "3\n2 100\n3 90\n1 500",
      "expected": "500"
    },
    {
      "input": "1\n0 99",
      "expected": "0"
    },
    {
      "input": "2\n1000000000 1000000000\n3 9",
      "expected": "1000000000000000000"
    }
  ],
  "calculate-round-trip-timestamp-latency": [
    {
      "input": "3\n100 110\n150 180\n200 201",
      "expected": "30"
    },
    {
      "input": "1\n5 5",
      "expected": "0"
    },
    {
      "input": "2\n0 1000000000000000\n100 105",
      "expected": "1000000000000000"
    }
  ],
  "count-active-threads-from-start-and-join-events": [
    {
      "input": "5\nSTART 1\nSTART 2\nJOIN 1\nSTART 3\nJOIN 2",
      "expected": "1"
    },
    {
      "input": "0\n",
      "expected": "0"
    },
    {
      "input": "4\nSTART 8\nSTART 9\nJOIN 8\nJOIN 9",
      "expected": "0"
    }
  ],
  "detect-a-missing-thread-join-in-a-trace": [
    {
      "input": "4\nSTART 1\nSTART 2\nJOIN 1\nSTART 3",
      "expected": "2"
    },
    {
      "input": "2\nSTART 1\nJOIN 1",
      "expected": "0"
    },
    {
      "input": "3\nSTART 5\nSTART 6\nSTART 7",
      "expected": "3"
    }
  ],
  "simulate-an-atomic-counter-increment-stream": [
    {
      "input": "5\nADD 5\nADD -2\nRESET\nADD 7\nADD 1",
      "expected": "8"
    },
    {
      "input": "0\n",
      "expected": "0"
    },
    {
      "input": "4\nADD -4\nADD 2\nRESET\nADD -9",
      "expected": "-9"
    }
  ],
  "determine-whether-a-barrier-can-release": [
    {
      "input": "3 7\nARRIVE\nARRIVE\nARRIVE\nARRIVE\nARRIVE\nARRIVE\nARRIVE",
      "expected": "RELEASE\nRELEASE\nREMAINING 1"
    },
    {
      "input": "2 0",
      "expected": "REMAINING 0"
    },
    {
      "input": "1 3\nARRIVE\nARRIVE\nARRIVE",
      "expected": "RELEASE\nRELEASE\nRELEASE\nREMAINING 0"
    }
  ],
  "count-condition-variable-notifications": [
    {
      "input": "5\nONE\nALL\nONE\nONE\nALL",
      "expected": "3 2"
    },
    {
      "input": "0",
      "expected": "0 0"
    },
    {
      "input": "3\nALL\nALL\nALL",
      "expected": "0 3"
    }
  ],
  "detect-duplicate-task-completion-events": [
    {
      "input": "6\n1 2 1 3 2 1",
      "expected": "3"
    },
    {
      "input": "4\n1 2 3 4",
      "expected": "0"
    },
    {
      "input": "5\n9 9 9 9 9",
      "expected": "4"
    }
  ],
  "reverse-a-string-without-extra-allocation": [
    {
      "input": "C++ Valley",
      "expected": "yellaV ++C"
    },
    {
      "input": "abc cba",
      "expected": "abc cba"
    },
    {
      "input": "racecar",
      "expected": "racecar"
    }
  ],
  "remove-adjacent-duplicate-characters": [
    {
      "input": "abbaca",
      "expected": "ca"
    },
    {
      "input": "aabb",
      "expected": "EMPTY"
    },
    {
      "input": "azxxzy",
      "expected": "ay"
    }
  ],
  "compute-word-frequencies-with-unordered-map": [
    {
      "input": "5\ncat dog cat bird dog",
      "expected": "bird 1\ncat 2\ndog 2"
    },
    {
      "input": "0",
      "expected": ""
    },
    {
      "input": "4\nz a z a",
      "expected": "a 2\nz 2"
    }
  ],
  "merge-two-sorted-vectors": [
    {
      "input": "3 3\n1 4 8\n2 2 9",
      "expected": "1 2 2 4 8 9"
    },
    {
      "input": "0 0\n",
      "expected": ""
    },
    {
      "input": "2 0\n-3 10",
      "expected": "-3 10"
    }
  ],
  "find-the-first-duplicate-identifier": [
    {
      "input": "6\n4 8 1 8 4 1",
      "expected": "8"
    },
    {
      "input": "3\n1 2 3",
      "expected": "NONE"
    },
    {
      "input": "5\n-1 0 -1 0 -1",
      "expected": "-1"
    }
  ],
  "build-a-strategy-based-arithmetic-calculator": [
    {
      "input": "4\nADD 2 9\nSUB 2 9\nMIN 2 9\nMAX 2 9",
      "expected": "11\n-7\n2\n9"
    },
    {
      "input": "0",
      "expected": ""
    },
    {
      "input": "2\nADD -1 -2\nMAX -8 -3",
      "expected": "-3\n-3"
    }
  ],
  "implement-a-singleton-configuration-holder": [
    {
      "input": "5\nSET mode 3\nGET mode\nGET x\nSET mode 4\nGET mode",
      "expected": "3\nNONE\n4"
    },
    {
      "input": "1\nGET missing",
      "expected": "NONE"
    },
    {
      "input": "4\nSET a -1\nSET b 2\nGET a\nGET b",
      "expected": "-1\n2"
    }
  ],
  "build-a-command-object-for-increment-operations": [
    {
      "input": "6\nINC 5\nINC 3\nUNDO\nINC 2\nUNDO\nINC -1",
      "expected": "4"
    },
    {
      "input": "2\nUNDO\nUNDO",
      "expected": "0"
    },
    {
      "input": "4\nINC 10\nINC -7\nUNDO\nUNDO",
      "expected": "0"
    }
  ],
  "create-a-state-machine-for-a-door-lock": [
    {
      "input": "5\nLOCK\nOPEN\nUNLOCK\nOPEN\nCLOSE",
      "expected": "CLOSED_LOCKED\nERROR\nCLOSED_UNLOCKED\nOPEN\nCLOSED_UNLOCKED"
    },
    {
      "input": "2\nOPEN\nCLOSE",
      "expected": "OPEN\nCLOSED_UNLOCKED"
    },
    {
      "input": "2\nUNLOCK\nLOCK",
      "expected": "ERROR\nCLOSED_LOCKED"
    }
  ],
  "implement-a-simple-factory-for-shape-objects": [
    {
      "input": "3\nSQUARE 3\nRECT 4 5\nSQUARE 0",
      "expected": "9\n20\n0"
    },
    {
      "input": "1\nRECT 1000000000 1000000000",
      "expected": "1000000000000000000"
    },
    {
      "input": "2\nSQUARE 1\nRECT 2 3",
      "expected": "1\n6"
    }
  ],
  "implement-a-command-history-with-undo": [
    {
      "input": "7\nSET 4\nSET 9\nPRINT\nUNDO\nPRINT\nUNDO\nPRINT",
      "expected": "9\n4\n0"
    },
    {
      "input": "3\nPRINT\nUNDO\nPRINT",
      "expected": "0\n0"
    },
    {
      "input": "4\nSET -2\nUNDO\nUNDO\nPRINT",
      "expected": "0"
    }
  ]
};

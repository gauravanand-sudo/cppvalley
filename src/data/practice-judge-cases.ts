/** Fixtures remain server-side. Never import this module into client components. */
export type JudgeCase = { input: string; expected: string };
export const practiceJudgeCases: Record<string, JudgeCase[]> = {
  "trade-notional": [
    {input:"3\n2 100\n1 90\n3 110\n",expected:"620"},
    {input:"0\n",expected:"0"},
    {input:"2\n100000 100000\n100000 100000\n",expected:"20000000000"}
  ],
  "market-sequence-gaps": [
    {input:"5\n12 13 16 17 19\n",expected:"3"},
    {input:"1\n42\n",expected:"0"},
    {input:"3\n1 4 8\n",expected:"5"}
  ],
  "mutex-ownership-trace": [
    {input:"6\nL 1\nL 2\nU 2\nU 1\nL 2\nU 2\n",expected:"2"},
    {input:"2\nL 7\nU 7\n",expected:"0"},
    {input:"3\nU 5\nL 1\nL 1\n",expected:"2"}
  ],
  "bounded-ring-buffer": [
    {input:"2 6\nPUSH 7\nPUSH 8\nPUSH 9\nPOP\nPOP\nPOP\n",expected:"FULL\n7\n8\nEMPTY"},
    {input:"1 5\nPUSH 5\nPOP\nPOP\nPUSH -2\nPOP\n",expected:"5\nEMPTY\n-2"},
    {input:"1 3\nPUSH 3\nPUSH 4\nPOP\n",expected:"FULL\n3"}
  ],
  "move-only-owner": [
    {input:"3 5\nCREATE 1\nCREATE 2\nMOVE 3 1\nRESET 2\nCREATE 1\n",expected:"2"},
    {input:"1 1\nRESET 1\n",expected:"0"},
    {input:"2 4\nCREATE 1\nCREATE 2\nMOVE 1 2\nRESET 1\n",expected:"0"}
  ],
  "lru-cache": [
    {input:"2 6\nPUT 1 10\nPUT 2 20\nGET 1\nPUT 3 30\nGET 2\nGET 3\n",expected:"10\n-1\n30"},
    {input:"1 5\nPUT 1 4\nGET 1\nPUT 2 7\nGET 1\nGET 2\n",expected:"4\n-1\n7"},
    {input:"2 5\nPUT 1 1\nPUT 2 2\nPUT 1 9\nGET 1\nGET 2\n",expected:"9\n2"}
  ],
  "observer-dispatch": [
    {input:"7\nSUB 2\nSUB 1\nEMIT\nUNSUB 2\nSUB 2\nEMIT\nEMIT\n",expected:"2 1\n1 2\n1 2"},
    {input:"1\nEMIT\n",expected:"NONE"},
    {input:"5\nSUB 2\nSUB 2\nEMIT\nUNSUB 2\nEMIT\n",expected:"2\nNONE"}
  ],
  "strategy-routing": [
    {input:"3 4\n10 4 9\n20 3 8\n30 3 5\nROUTE\nPOLICY FASTEST\nROUTE\nROUTE\n",expected:"20\n30\n30"},
    {input:"1 3\n42 0 100\nROUTE\nPOLICY FASTEST\nROUTE\n",expected:"42\n42"},
    {input:"2 4\n7 1 10\n9 1 9\nROUTE\nPOLICY FASTEST\nROUTE\nROUTE\n",expected:"7\n9\n9"}
  ]
};

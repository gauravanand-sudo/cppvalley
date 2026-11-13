import { problemBank, type BankProblem } from "./problem-bank";
export type StudyPlan = {slug:string;title:string;description:string;category:BankProblem["category"];limit:number;duration:string;icon:string};
export const studyPlans:StudyPlan[]=[
 {slug:"cpp-foundations-50",title:"C++ Foundations 50",description:"Ownership, STL, memory, and everyday language correctness.",category:"Core C++",limit:50,duration:"6 weeks",icon:"C++"},
 {slug:"cpp-algorithms-75",title:"Algorithms in C++ 75",description:"Data structures, search, ordering, hashing and algorithmic reasoning.",category:"Core C++",limit:75,duration:"8 weeks",icon:"↗"},
 {slug:"concurrency-50",title:"Concurrency 50",description:"Threads, synchronization, atomics, and safe concurrent structures.",category:"Concurrency",limit:50,duration:"6 weeks",icon:"◎"},
 {slug:"hft-engineering-75",title:"HFT Engineering 75",description:"Market data, order books, routing, and execution correctness.",category:"HFT Systems",limit:75,duration:"8 weeks",icon:"⌁"},
 {slug:"cpp-design-50",title:"C++ Design 50",description:"Realistic low-level designs, patterns, and ownership-safe interfaces.",category:"Design Patterns",limit:50,duration:"6 weeks",icon:"◇"},
];
export function getStudyPlan(slug:string){return studyPlans.find(p=>p.slug===slug);}
export function studyPlanProblems(plan:StudyPlan){
 const list=problemBank.filter(p=>p.category===plan.category);
 return [...list.filter(p=>p.status==="runnable"),...list.filter(p=>p.status==="in-review")].slice(0,plan.limit);
}

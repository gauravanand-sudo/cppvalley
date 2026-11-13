import "server-only";
import { eliteCourses } from "@/data/elite-courses";
import { courseLessons } from "@/data/course-lessons";
import { problemBank } from "@/data/problem-bank";
import { practiceProblems } from "@/data/practice";
import { practiceJudgeCases } from "@/data/practice-judge-cases";

/**
 * Fail the deployment build rather than ship an internally inconsistent
 * course-to-problem graph. Content readiness is NOT implied: in-review
 * entries are still deliberately marked as editorial candidates.
 */
export function assertContentIntegrity() {
  const failures: string[] = [];
  const fail = (condition: boolean, description: string) => {
    if (!condition) failures.push(description);
  };
  const problems = new Map(problemBank.map(problem => [problem.slug, problem]));
  const courses = new Map(eliteCourses.map(course => [course.slug, course]));
  const courseLessonKeys = new Set<string>();

  fail(eliteCourses.length === 7, "Exactly seven featured C++ courses are required.");
  fail(problemBank.length === 400, "The curated problem bank must include exactly 400 topics.");
  fail(problems.size === problemBank.length, "Problem slugs must be unique.");
  fail(courses.size === eliteCourses.length, "Course slugs must be unique.");
  fail(practiceProblems.length >= 30, "At least 30 fully specified runnable problems are required.");

  for (const category of ["HFT Systems", "Concurrency", "Core C++", "Design Patterns"]) {
    fail(problemBank.filter(item => item.category === category).length === 100,
      "Expected exactly 100 curated topics for " + category);
  }

  for (const problem of practiceProblems) {
    const catalog = problems.get(problem.slug);
    fail(catalog?.status === "runnable", "Runnable problem missing from catalog: " + problem.slug);
    fail(problem.statement.trim().length > 40, "Missing complete statement: " + problem.slug);
    fail(problem.starterCode.includes("int main"), "Missing C++ entry point: " + problem.slug);
    fail(problem.examples.length > 0, "Missing sample input/output: " + problem.slug);
    fail(problem.constraints.length > 0, "Missing constraints: " + problem.slug);
    fail((practiceJudgeCases[problem.slug] || []).length >= 3, "Insufficient tested fixtures: " + problem.slug);
  }

  for (const course of eliteCourses) {
    fail(courseLessons.some(lesson => lesson.courseSlug === course.slug),
      "Course has no lessons: " + course.slug);
  }

  for (const lesson of courseLessons) {
    const key = lesson.courseSlug + "/" + lesson.slug;
    fail(!courseLessonKeys.has(key), "Duplicate lesson: " + key);
    courseLessonKeys.add(key);
    fail(courses.has(lesson.courseSlug), "Lesson references unknown course: " + key);
    fail(lesson.problemSlugs.length >= 2 && lesson.problemSlugs.length <= 3,
      "Expected 2–3 linked practice topics for " + key);
    fail(new Set(lesson.problemSlugs).size === lesson.problemSlugs.length,
      "A lesson links to the same practice topic twice: " + key);
    for (const problemSlug of lesson.problemSlugs) {
      fail(problems.has(problemSlug),
        "Broken course lesson → practice link: " + key + " → " + problemSlug);
    }
  }

  if (failures.length) {
    throw new Error("CppValley catalog validation failed:\n" + failures.join("\n"));
  }

  return {
    courses: eliteCourses.length,
    lessons: courseLessons.length,
    curated: problemBank.length,
    runnable: practiceProblems.length,
  };
}

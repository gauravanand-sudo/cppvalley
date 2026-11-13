import "server-only";
import { eliteCourses } from "@/data/elite-courses";
import { courseLessons } from "@/data/course-lessons";
import { problemBank } from "@/data/problem-bank";
import { practiceProblems } from "@/data/practice";
import { practiceJudgeCases } from "@/data/practice-judge-cases";
import { careerPaths } from "@/data/career-paths";
import { specialtyLabs, specialtyLabsForLesson } from "@/data/specialty-practice";

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

  fail(eliteCourses.length === 10, "Exactly ten bounded career courses are required.");
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

  const courseCodes = new Set(eliteCourses.map(course => course.code));
  fail(courseCodes.size === 10, "Unique course codes C1–C10 required.");
  fail(careerPaths.length === 4, "Exactly four career paths are required.");

  for (const course of eliteCourses) {
    const lessons = courseLessons.filter(lesson => lesson.courseSlug === course.slug);
    fail(lessons.length >= 10,"Course requires substantive topic outlines: "+course.slug);
    fail(course.modules.length > 0,"Course has no modules: "+course.slug);
    fail(course.owns.length > 0 && course.excludes.length > 0,"Course boundaries missing: "+course.slug);
    fail(course.capstone.length >= 35,"Capstone definition missing: "+course.slug);
    for (const required of course.required) {
      fail(courses.has(required),"Broken prerequisite for "+course.slug+": "+required);
      fail(required !== course.slug,"Course cannot require itself: "+course.slug);
    }
    for (const lesson of lessons) {
      fail(lesson.moduleNumber >= 0 && lesson.moduleNumber < course.modules.length,
        "Lesson points to invalid module: "+course.slug+"/"+lesson.slug);
    }
  }

  for (const path of careerPaths) {
    fail(path.courseSlugs.length >= 2,"Career path missing core progression: "+path.slug);
    for (const slug of [...path.courseSlugs,...path.optionalCourseSlugs]) {
      fail(courses.has(slug),"Career path references missing course: "+path.slug+" → "+slug);
    }
  }

  const labSlugs = new Set(specialtyLabs.map(lab=>lab.slug));
  fail(labSlugs.size === specialtyLabs.length,"Specialty lab IDs must be unique.");
  for (const lesson of courseLessons) {
    const key = lesson.courseSlug + "/" + lesson.slug;
    fail(!courseLessonKeys.has(key), "Duplicate lesson: " + key);
    courseLessonKeys.add(key);
    fail(courses.has(lesson.courseSlug), "Lesson references unknown course: " + key);
    fail(new Set(lesson.problemSlugs).size === lesson.problemSlugs.length,
      "Duplicate CPU practice references for "+key);
    if(lesson.practiceKind==="cpp-problems") {
      fail(lesson.problemSlugs.length >= 2 && lesson.problemSlugs.length <= 3,
        "Expected 2–3 original C++ practice references for "+key);
      for(const problemSlug of lesson.problemSlugs) {
        fail(problems.has(problemSlug),"Unknown C++ problem linked to "+key+": "+problemSlug);
      }
    } else {
      fail(lesson.problemSlugs.length===0,"GPU/AI lesson must not claim CPU judge compatibility: "+key);
      fail(specialtyLabsForLesson(lesson.courseSlug,lesson.slug).length===2,
        "Expected two GPU/AI lab briefs for "+key);
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
    careerPaths: careerPaths.length,
    specialtyLabOutlines: specialtyLabs.length,
  };
}

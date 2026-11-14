import "server-only";
import { eliteCourses } from "@/data/elite-courses";
import { courseLessons } from "@/data/course-lessons";
import { problemBank } from "@/data/problem-bank";
import { practiceProblems } from "@/data/practice";
import { practiceJudgeCases } from "@/data/practice-judge-cases";
import { careerPaths } from "@/data/career-paths";
import { specialtyLabs, specialtyLabsForLesson } from "@/data/specialty-practice";
import { hftProjects, hftProjectStages, hftSkillLanes, hftMockLoops, hftFirmSignals } from "@/data/hft-interview-prep";

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
  fail(courseLessons.length === 444, "Expected 444 structured lesson outlines.");
  fail(specialtyLabs.length === 366, "Expected 366 drafted GPU/AI specialty lab briefs.");
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
  fail(hftProjects.length === 28, "Expected 28 original HFT project briefs.");
  fail(new Set(hftProjects.map(p=>p.id)).size === hftProjects.length, "HFT project IDs must be unique.");
  fail(hftSkillLanes.length === 7 && hftMockLoops.length === 6, "HFT skill and mock coverage incomplete.");
  fail(hftFirmSignals.length === 4 && hftFirmSignals.every(f=>f.link.startsWith("https://")), "HFT firm research sources missing.");
  for (const stage of hftProjectStages) {
    fail(hftProjects.filter(p=>p.stage===stage.code).length>=6, "Too few interview projects for "+stage.code);
  }
  for (const project of hftProjects) {
    fail(project.deliverables.length>=2 && project.acceptance.length>=2 && project.defense.length>30,
      "Missing project rubric for "+project.id);
  }

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
    const completed = new Set<string>();
    for (const slug of path.courseSlugs) {
      const course=courses.get(slug);
      fail(Boolean(course),"Career path references missing course: "+path.slug+" → "+slug);
      for(const prerequisite of course?.required || []) {
        fail(completed.has(prerequisite),
          "Path "+path.slug+" must teach prerequisite "+prerequisite+" before "+slug);
      }
      completed.add(slug);
    }
    for (const slug of path.optionalCourseSlugs) {
      fail(courses.has(slug),"Career path references missing optional course: "+path.slug+" → "+slug);
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

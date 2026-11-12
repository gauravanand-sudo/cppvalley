import Link from "next/link";
import type { Course } from "@/data/courses";
import { imageForCourse } from "@/data/media";

type Props = { course: Course; featured?: boolean };
const symbols: Record<string, string> = {
  "C++ Core": "C++", Systems: "SYS", "EDA / CAD": "EDA", "GPU / AI": "GPU", Roadmap: "MAP"
};
export function CourseCard({ course, featured = false }: Props) {
  return (
    <Link href={"/courses/" + course.slug} className={"g-course-card" + (featured ? " g-course-card-featured" : "")}>
      <div className="g-course-art">
        <img src={imageForCourse(course.slug, course.pillar)} alt="" loading="lazy" />
        <span className="g-art-label">{symbols[course.pillar] ?? "C++"}</span>
        {featured ? <span className="g-art-featured">Featured</span> : null}
      </div>
      <div className="g-course-body">
        <div className="g-course-eyebrow">{course.pillar}</div>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="g-course-tags">{course.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="g-course-bottom">
          <span>{course.level}</span><span>{course.duration}</span>
        </div>
        <span className="g-course-link">Explore course <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}
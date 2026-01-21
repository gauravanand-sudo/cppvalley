// src/components/LessonLayoutWrapper.tsx - FIXED INTERNAL SCROLLING
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function LessonLayoutWrapper({
  children,
  trackSlug,
}: {
  children: React.ReactNode;
  trackSlug: string;
}) {
  const pathname = usePathname();
  const [isLessonPage, setIsLessonPage] = useState(false);
  const [currentLessonSlug, setCurrentLessonSlug] = useState<string | null>(null);
  const [allLessons, setAllLessons] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentTitle, setCurrentTitle] = useState("");

  useEffect(() => {
    const match = pathname.match(/\/learn\/tracks\/[^\/]+\/([^\/]+)/);
    const slug = match ? match[1] : null;
    setCurrentLessonSlug(slug);
    setIsLessonPage(!!slug);

    if (slug) {
      fetch(`/api/track/${trackSlug}`)
        .then(res => res.json())
        .then(data => {
          if (data.sections) {
            const flatten = (items: any[], out: any[] = []) => {
              for (const it of items) {
                if (it?.slug) out.push(it);
                if (Array.isArray(it?.children)) flatten(it.children, out);
              }
              return out;
            };
            
            const lessons = flatten(data.sections.flatMap((s: any) => s.items ?? []));
            setAllLessons(lessons);
            const index = lessons.findIndex((x: any) => x.slug === slug);
            setCurrentIndex(index);
            
            if (index >= 0) {
              setCurrentTitle(lessons[index]?.title || "");
            }
          }
        })
        .catch(error => {
          console.error("Failed to load track data:", error);
        });
    }
  }, [pathname, trackSlug]);

  if (!isLessonPage) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold text-gray-900 truncate">
                {currentTitle}
              </div>
              <div className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded">
                {currentIndex + 1}/{allLessons.length}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {trackSlug.replace(/-/g, ' ')}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="deepseek-prose">
            {children}
          </div>
          <div className="h-20" />
        </div>
      </div>

      {/* Fixed Navigation Bar */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Previous Lesson */}
            {currentIndex > 0 ? (
              <Link
                href={`/learn/tracks/${trackSlug}/${allLessons[currentIndex - 1].slug}`}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Previous</div>
                  <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 truncate max-w-[200px]">
                    {allLessons[currentIndex - 1]?.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="w-48"></div>
            )}

            {/* Lesson Counter */}
            <div className="text-sm text-gray-600 px-4 py-2 bg-gray-100 rounded-lg">
              Lesson {currentIndex + 1} of {allLessons.length}
            </div>

            {/* Next Lesson */}
            {currentIndex < allLessons.length - 1 ? (
              <Link
                href={`/learn/tracks/${trackSlug}/${allLessons[currentIndex + 1].slug}`}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <div className="text-right">
                  <div className="text-xs text-gray-500">Next</div>
                  <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 truncate max-w-[200px]">
                    {allLessons[currentIndex + 1]?.title}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </Link>
            ) : (
              <div className="w-48"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
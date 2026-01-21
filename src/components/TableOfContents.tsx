// src/components/TableOfContents.tsx - Clean version
"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function TableOfContents({ 
  sections, 
  trackSlug,
  currentLessonSlug 
}: { 
  sections: any[];
  trackSlug: string;
  currentLessonSlug: string;
}) {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>(
    Object.fromEntries(sections.map((_, i) => [i, true]))
  );

  const toggleSection = (i: number) => {
    setOpenSections(prev => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Contents</h3>
        
        <div className="space-y-1">
          {sections.map((section, i) => (
            <div key={i} className="space-y-1">
              <button
                onClick={() => toggleSection(i)}
                className="w-full flex items-center justify-between px-2 py-2 rounded text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-left">{section.title}</span>
                <ChevronRight 
                  className={`w-3 h-3 transition-transform duration-200 ${
                    openSections[i] ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {openSections[i] && (
                <div className="ml-2 space-y-1 border-l border-gray-200 pl-3">
                  {section.items?.map((item: any, idx: number) => (
                    <LessonItem
                      key={idx}
                      item={item}
                      trackSlug={trackSlug}
                      currentLessonSlug={currentLessonSlug}
                      depth={0}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LessonItem({ item, trackSlug, currentLessonSlug, depth }: any) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = item.children?.length > 0;
  const isCurrent = item.slug === currentLessonSlug;

  if (!item.slug) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-2 py-2 rounded text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
        >
          <span className="text-left">{item.title}</span>
          {hasChildren && (
            <ChevronRight 
              className={`w-3 h-3 transition-transform duration-200 ${
                open ? 'rotate-90' : ''
              }`}
            />
          )}
        </button>

        {open && hasChildren && (
          <div className="ml-2 space-y-1 border-l border-gray-200 pl-3">
            {item.children.map((child: any, idx: number) => (
              <LessonItem
                key={idx}
                item={child}
                trackSlug={trackSlug}
                currentLessonSlug={currentLessonSlug}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={`/learn/tracks/${trackSlug}/${item.slug}`}
      className={`flex items-center gap-2 px-2 py-2 rounded text-sm transition-colors ${
        isCurrent
          ? 'text-blue-600 bg-blue-50 font-medium'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${
        isCurrent ? 'bg-blue-500' : 'bg-gray-300'
      }`} />
      <span className="truncate">{item.title}</span>
    </Link>
  );
}
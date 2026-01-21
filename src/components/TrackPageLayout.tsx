// src/components/TrackPageLayout.tsx - WITH SCROLL CONTROL
"use client";

import { ReactNode, useEffect } from "react";
import TrackHeader from "@/components/TrackHeader";

interface TrackPageLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function TrackPageLayout({ children, sidebar }: TrackPageLayoutProps) {
  useEffect(() => {
    // Disable body scrolling for track pages
    document.documentElement.style.setProperty('--page-scroll', 'hidden');
    
    return () => {
      // Re-enable body scrolling when leaving track page
      document.documentElement.style.setProperty('--page-scroll', 'auto');
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Fixed Header */}
      <TrackHeader />
      
      {/* Main Content Area - takes remaining space */}
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar - independent scroll */}
        <div className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 bg-white">
          <div className="h-full overflow-y-auto">
            {sidebar}
          </div>
        </div>
        
        {/* Right Content Area - independent scroll */}
        <div className="flex-1 min-w-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
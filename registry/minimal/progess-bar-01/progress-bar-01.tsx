"use client";

import type * as React from "react";
import { forwardRef } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Mock data
const mockData = {
  value: 65,
  max: 100,
  courseName: "React Fundamentals",
  courseUrl: "/courses/react-fundamentals",
};

export interface ProgressBar01Props
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  courseName?: string;
  courseUrl?: string;
  useMockData?: boolean;
}

const ProgressBar01 = forwardRef<HTMLDivElement, ProgressBar01Props>(
  (
    {
      className,
      value,
      max,
      courseName,
      courseUrl,
      useMockData = true,
      ...props
    },
    ref
  ) => {
    // Use mock data if useMockData is true and no specific props are provided
    const progressValue = value ?? (useMockData ? mockData.value : 50);
    const progressMax = max ?? (useMockData ? mockData.max : 100);
    const displayCourseName = courseName ?? (useMockData ? mockData.courseName : "React Fundamentals");
    const displayCourseUrl = courseUrl ?? (useMockData ? mockData.courseUrl : "#");

    const percentage = Math.round((progressValue / progressMax) * 100);

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {displayCourseName && (
          <p className="text-sm font-medium">
            {displayCourseUrl ? (
              <Link
                href={displayCourseUrl}
                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {displayCourseName}
              </Link>
            ) : (
              displayCourseName
            )}
            <span className="text-foreground"> progress so far</span>
          </p>
        )}
        <div className="flex items-center gap-4">
          <Progress value={percentage} className="h-4 flex-1" />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {percentage}%
          </span>
        </div>
      </div>
    );
  }
);

ProgressBar01.displayName = "ProgressBar01";

export { ProgressBar01 };

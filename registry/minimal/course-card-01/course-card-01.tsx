"use client";

import type React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CourseCard01Props
  extends React.HTMLAttributes<HTMLDivElement> {}

export const CourseCard01 = forwardRef<HTMLDivElement, CourseCard01Props>(
  ({ className, ...props }, ref) => {
    // Dummy data
    const courseData = {
      title: "Introduction to UX Design",
      instructor: "Sarah Johnson",
      duration: "4 weeks",
    };

    const handleCardClick = () => {
      console.log("Card clicked - Navigate to course details");
    };

    const handleDropdownClick = (e: React.MouseEvent) => {
      // Prevent the card click event from firing when clicking the dropdown
      e.stopPropagation();
    };

    return (
      <div
        ref={ref}
        className={cn(
          "border rounded-lg p-3 w-full max-w-[280px] bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer",
          className
        )}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleCardClick();
          }
        }}
        {...props}
      >
        <div className="w-full h-32 bg-muted rounded-md mb-3 relative">
          <div className="absolute top-2 right-2" onClick={handleDropdownClick}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={handleDropdownClick}>
                <DropdownMenuItem>Enroll</DropdownMenuItem>
                <DropdownMenuItem>View Course</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <h3 className="text-lg font-bold leading-tight mb-2">
          {courseData.title}
        </h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{courseData.instructor}</span>
          <span className="mx-2">•</span>
          <span>{courseData.duration}</span>
        </div>
      </div>
    );
  }
);

CourseCard01.displayName = "CourseCard01";

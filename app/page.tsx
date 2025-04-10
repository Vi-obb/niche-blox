import * as React from "react";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { CourseCard01 } from "@/registry/minimal/course-card-01/course-card-01";
import { Discussion01 } from "@/registry/minimal/discussion-01/discussion-01";
import { ProgressBar01 } from "@/registry/minimal/progess-bar-01/progress-bar-01";
import { QuizQuestion01 } from "@/registry/minimal/quiz-question-01/quiz-question-01";
import { Submission01 } from "@/registry/minimal/submission-01/submission-01";
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distribution code using shadcn.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Course Card Component
            </h2>
            <OpenInV0Button name="course-card-01" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <CourseCard01 />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Discussion Component
            </h2>
            <OpenInV0Button name="discussion-01" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <Discussion01 />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Progress Bar Component
            </h2>
            <OpenInV0Button name="progess-bar-01" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <ProgressBar01 />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Quiz Question Component
            </h2>
            <OpenInV0Button name="quiz-question-01" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <QuizQuestion01 />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Submission Component
            </h2>
            <OpenInV0Button name="submission-01" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <Submission01 />
          </div>
        </div>
      </main>
    </div>
  );
}

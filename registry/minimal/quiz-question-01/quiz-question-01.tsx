"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export interface QuizQuestion01Props
  extends React.HTMLAttributes<HTMLDivElement> {
  question?: string;
  onQuizSubmit?: (value: string) => void;
}

export const QuizQuestion01 = React.forwardRef<
  HTMLDivElement,
  QuizQuestion01Props
>(
  (
    {
      question = "Is React a JavaScript library for building user interfaces?",
      onQuizSubmit = (value: string) => console.log(`Quiz submitted with answer: ${value}`),
      className,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onQuizSubmit(value);
    };

    const handleClear = () => {
      setValue("");
    };

    return (
      <div ref={ref} className={cn("p-2", className)} {...props}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label
            htmlFor="quiz-question"
            className="text-base font-semibold block"
          >
            {question}
          </Label>
          <RadioGroup
            id="quiz-question"
            value={value}
            onValueChange={setValue}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="true" />
              <Label htmlFor="true">True</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="false" />
              <Label htmlFor="false">False</Label>
            </div>
          </RadioGroup>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              disabled={!value}
              className="w-full"
            >
              Clear
            </Button>
            <Button type="submit" className="w-full" disabled={!value}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
);

QuizQuestion01.displayName = "QuizQuestion01";

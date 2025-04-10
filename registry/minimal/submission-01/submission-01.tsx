"use client";

import type * as React from "react";
import { forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface Submission01Props
  extends React.HTMLAttributes<HTMLDivElement> {
  onFileSubmit?: (file: File | null) => void;
}

const Submission01 = forwardRef<HTMLDivElement, Submission01Props>(
  ({ className, onFileSubmit, ...props }, ref) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
      } else {
        setFile(null);
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (onFileSubmit) {
        onFileSubmit(file);
      }
    };

    return (
      <div ref={ref} className={cn("p-4", className)} {...props}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="file" onChange={handleFileChange} className="w-full" />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    );
  }
);

Submission01.displayName = "Submission01";

export { Submission01 };

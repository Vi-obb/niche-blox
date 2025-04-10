"use client";

import type * as React from "react";
import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Copy,
  ExternalLink,
  Monitor,
  Smartphone,
  Tablet,
  Check,
  CodeIcon,
} from "lucide-react";

export interface BlockContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  code: string;
  componentName: string;
  installCommand?: {
    npm?: string;
    pnpm?: string;
    yarn?: string;
    bun?: string;
  };
}

const BlockContainer = forwardRef<HTMLDivElement, BlockContainerProps>(
  (
    { className, children, code, componentName, installCommand, ...props },
    ref
  ) => {
    const [view, setView] = useState<"preview" | "code">("preview");
    const [breakpoint, setBreakpoint] = useState<
      "desktop" | "tablet" | "mobile"
    >("desktop");
    const [copied, setCopied] = useState(false);
    const [installCopied, setInstallCopied] = useState(false);
    const [packageManager, setPackageManager] = useState<
      "npm" | "pnpm" | "yarn" | "bun"
    >("pnpm");

    // Generate dynamic install commands if not provided
    const dynamicInstallCommand = installCommand || {
      npm: `npm install @ui/${componentName.toLowerCase()}`,
      pnpm: `pnpm add @ui/${componentName.toLowerCase()}`,
      yarn: `yarn add @ui/${componentName.toLowerCase()}`,
      bun: `bun add @ui/${componentName.toLowerCase()}`,
    };

    const copyToClipboard = (
      text: string,
      setCopiedState: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      navigator.clipboard.writeText(text);
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2000);
    };

    const breakpointWidths = {
      desktop: "w-full",
      tablet: "max-w-[768px]",
      mobile: "max-w-[375px]",
    };

    return (
      <div
        ref={ref}
        className={cn("border rounded-lg shadow-sm", className)}
        {...props}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b p-4 gap-4">
          <div className="font-bold text-lg">{componentName}</div>
          <div className="flex flex-wrap items-center gap-2">
            <Tabs
              defaultValue="preview"
              value={view}
              onValueChange={(value) => setView(value as "preview" | "code")}
              className="mr-2"
            >
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs
              value={breakpoint}
              onValueChange={(value) =>
                setBreakpoint(value as "desktop" | "tablet" | "mobile")
              }
              className="mr-2"
            >
              <TabsList>
                <TabsTrigger value="desktop" className="px-2">
                  <Monitor className="h-4 w-4" />
                  <span className="sr-only">Desktop view</span>
                </TabsTrigger>
                <TabsTrigger value="tablet" className="px-2">
                  <Tablet className="h-4 w-4" />
                  <span className="sr-only">Tablet view</span>
                </TabsTrigger>
                <TabsTrigger value="mobile" className="px-2">
                  <Smartphone className="h-4 w-4" />
                  <span className="sr-only">Mobile view</span>
                </TabsTrigger>
                <TabsTrigger value="page" className="px-2">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Open as page</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {view === "code" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(code, setCopied)}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {copied ? "Copied" : "Copy code"}
                </span>
              </Button>
            )}

            <Button size="sm" className="gap-1.5">
              <CodeIcon className="h-3.5 w-3.5" />
              Open in v0
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-8 bg-gray-50">
          {view === "preview" ? (
            <div
              className={cn(
                "mx-auto transition-all duration-200 ease-in-out",
                breakpointWidths[breakpoint],
                breakpoint === "mobile"
                  ? "border border-dashed border-gray-300 p-4 rounded-lg"
                  : "",
                breakpoint === "tablet"
                  ? "border border-dashed border-gray-300 p-4 rounded-lg"
                  : ""
              )}
            >
              {children}
            </div>
          ) : (
            <pre className="bg-gray-800 text-white p-4 rounded overflow-auto text-sm">
              <code>{code}</code>
            </pre>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="font-medium mb-2">Installation</div>
          <Tabs
            defaultValue="pnpm"
            value={packageManager}
            onValueChange={(value) =>
              setPackageManager(value as "npm" | "pnpm" | "yarn" | "bun")
            }
            className="w-full"
          >
            <div className="flex items-center justify-between mb-2">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="pnpm" className="flex-1 sm:flex-initial">
                  pnpm
                </TabsTrigger>
                <TabsTrigger value="npm" className="flex-1 sm:flex-initial">
                  npm
                </TabsTrigger>
                <TabsTrigger value="yarn" className="flex-1 sm:flex-initial">
                  yarn
                </TabsTrigger>
                <TabsTrigger value="bun" className="flex-1 sm:flex-initial">
                  bun
                </TabsTrigger>
              </TabsList>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  copyToClipboard(
                    dynamicInstallCommand[packageManager] || "",
                    setInstallCopied
                  )
                }
              >
                {installCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {installCopied ? "Copied" : "Copy installation command"}
                </span>
              </Button>
            </div>
            <div className="bg-gray-800 text-white p-3 rounded font-mono text-sm overflow-x-auto">
              {dynamicInstallCommand[packageManager]}
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
);

BlockContainer.displayName = "BlockContainer";

export { BlockContainer };

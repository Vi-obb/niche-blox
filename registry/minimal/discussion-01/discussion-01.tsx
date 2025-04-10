"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

export interface Discussion01Props
  extends React.HTMLAttributes<HTMLDivElement> {
  content?: string;
  username?: string;
  onReply?: (replyText?: string) => void;
}

// Mock data for the component
const defaultProps: Pick<Discussion01Props, 'content' | 'username'> = {
  content: "This is a sample discussion post. It demonstrates how the component works without needing to pass custom content.",
  username: "Fiifi Obbeng",
};

const Discussion01 = React.forwardRef<HTMLDivElement, Discussion01Props>(
  ({ 
    content = defaultProps.content,
    username = defaultProps.username, 
    onReply, 
    className, 
    ...props 
  }, ref) => {
    const [isReplying, setIsReplying] = React.useState(false);
    const [replyText, setReplyText] = React.useState("");
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const replyId = React.useId();

    const handleReplyClick = () => {
      if (!isReplying) {
        setIsReplying(true);
        // Focus the textarea after it renders
        setTimeout(() => textareaRef.current?.focus(), 0);
      } else {
        if (onReply && replyText.trim()) onReply(replyText);
        setReplyText("");
        setIsReplying(false);
      }
    };

    // Auto-resize textarea as content grows
    React.useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "0px";
        const scrollHeight = textarea.scrollHeight;
        textarea.style.height = scrollHeight + "px";
      }
    }, [replyText]);

    return (
      <div
        ref={ref}
        className={cn("border rounded-lg p-4 w-full", className)}
        {...props}
      >
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{username}</p>
          <p className="text-base break-words">{content}</p>
          <div className="pt-2">
            {isReplying ? (
              <div className="space-y-2">
                <label
                  htmlFor={replyId}
                  className="block text-xs text-muted-foreground font-medium"
                >
                  Your reply to this post
                </label>
                <div className="flex items-start gap-2">
                  <textarea
                    id={replyId}
                    ref={textareaRef}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300 min-h-[36px] resize-none overflow-hidden"
                    rows={1}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        !e.shiftKey &&
                        replyText.trim()
                      ) {
                        e.preventDefault();
                        handleReplyClick();
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReplyClick}
                    aria-label="Send reply"
                    className="h-9 px-3"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReplyClick}
                aria-label="Reply"
              >
                Reply
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Discussion01.displayName = "Discussion01";

export { Discussion01 };

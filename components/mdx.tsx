"use client";

import type React from "react";

interface MdxProps {
  code?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Mdx({ code, children, className = "" }: MdxProps) {
  if (code) {
    return (
      <div
        className={`prose max-w-none dark:prose-invert ${className}`}
        dangerouslySetInnerHTML={{ __html: code }}
      />
    );
  }

  return (
    <div className={`prose max-w-none dark:prose-invert ${className}`}>
      {children}
    </div>
  );
}

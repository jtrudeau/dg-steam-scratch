"use client";

import { useEffect, useId, useRef } from "react";

type ScratchBlockProps = {
  code: string;
  className?: string;
};

export function ScratchBlock({ code, className }: ScratchBlockProps) {
  const containerId = useId().replace(/:/g, "");
  const preRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderBlocks = async () => {
      const scratchblocksModule = await import("scratchblocks");
      const scratchblocks = scratchblocksModule.default ?? scratchblocksModule;

      if (!isMounted || !preRef.current) return;

      const container = preRef.current.parentElement;
      if (!container) return;

      preRef.current.textContent = code.trim();
      container.querySelectorAll("svg").forEach((node) => node.remove());

      if (scratchblocks?.renderMatching) {
        scratchblocks.renderMatching(`#${containerId} pre.scratchblocks`, {
          style: "scratch3",
        });
      }
    };

    void renderBlocks();

    return () => {
      isMounted = false;
    };
  }, [code, containerId]);

  return (
    <div id={containerId} className={className}>
      <pre ref={preRef} className="scratchblocks">
        {code}
      </pre>
    </div>
  );
}

"use client";

import type { WorksheetBlock } from "@/types/content";

type WorksheetViewerProps = {
  title: string;
  audience: string;
  blocks: WorksheetBlock[];
};

export const WorksheetViewer = ({
  title,
  audience,
  blocks,
}: WorksheetViewerProps) => {
  const handlePrint = () => {
    window.print();
  };

  const renderBlock = (block: WorksheetBlock, index: number) => {
    switch (block.type) {
      case "section":
        return (
          <h2 key={`${block.title}-${index}`} className="mt-6 font-black">
            {block.title}
          </h2>
        );
      case "paragraph":
        return (
          <p key={`para-${index}`} className="mt-2 text-sm">
            {block.text || "\u00A0"}
          </p>
        );
      case "list":
        return (
          <div key={`list-${index}`} className="mt-3 text-sm">
            {block.title && (
              <p className="font-semibold uppercase tracking-[0.2em]">
                {block.title}
              </p>
            )}
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {block.items.map((item, idx) => (
                <li key={`item-${idx}`}>{item || "\u00A0"}</li>
              ))}
            </ul>
          </div>
        );
      case "table":
        return (
          <table key={`table-${index}`} className="mt-3 w-full border-2 border-[var(--ink)]">
            <thead>
              <tr>
                {block.headers.map((header) => (
                  <th
                    key={header}
                    className="border border-[var(--ink)] bg-[var(--scratch-blue)] px-2 py-1 text-left text-xs font-black text-white"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIdx) => (
                <tr key={`row-${rowIdx}`}>
                  {row.map((cell, cellIdx) => (
                    <td key={`cell-${cellIdx}`} className="border border-[var(--ink)] px-2 py-1 text-sm">
                      {cell || "\u00A0"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="panel p-6 print:border-0 print:p-0">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em]">
            Worksheet · {audience}
          </p>
          <h1 className="font-display text-3xl font-black text-[var(--ink)]">
            {title}
          </h1>
        </div>
        <button onClick={handlePrint} className="btn btn-secondary">
          Print / PDF
        </button>
      </div>
      <article className="prose mt-6 max-w-none print:prose-lg">
        {blocks.map((block, index) => renderBlock(block, index))}
      </article>
    </div>
  );
};


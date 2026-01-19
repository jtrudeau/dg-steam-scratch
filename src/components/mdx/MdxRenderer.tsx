import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScratchBlock } from "@/components/ScratchBlock";

type MdxRendererProps = {
  source: string;
};

// Custom component to handle ScratchBlock syntax in markdown
const components = {
  code: ({
    inline,
    className,
    children,
    ...props
  }: {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
  }) => {
    const match = /language-scratch/.exec(className || "");
    if (!inline && match) {
      return <ScratchBlock code={String(children).replace(/\n$/, "")} />;
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export function MdxRenderer({ source }: MdxRendererProps) {
  if (!source?.trim()) return null;

  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  );
}

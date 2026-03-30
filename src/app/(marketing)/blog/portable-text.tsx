import type { MarketingPost } from '@/lib/site-content';

type Block = MarketingPost['body'][number];
type PTBlock = Extract<Block, { _type: 'block' | 'image' }>;

function renderSpans(block: PTBlock) {
  if (!block.children) return null;
  return block.children.map((span, i) => {
    let node: React.ReactNode = span.text;
    if (span.marks?.includes('strong')) node = <strong key={i}>{node}</strong>;
    if (span.marks?.includes('em')) node = <em key={i}>{node}</em>;
    if (span.marks?.includes('code')) node = <code key={i} className="font-mono text-[0.88em] bg-[oklch(from_var(--foreground)_l_c_h/0.06)] px-1 py-0.5 rounded">{node}</code>;
    return <span key={i}>{node}</span>;
  });
}

type PortableTextRendererProps = {
  blocks: MarketingPost['body'];
};

export function PortableTextRenderer({ blocks }: PortableTextRendererProps) {
  const rendered: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const rawBlock = blocks[i];

    // Callout
    if (rawBlock._type === 'callout') {
      rendered.push(
        <aside key={i} className="border border-(--border) bg-[oklch(from_var(--foreground)_l_c_h/0.03)] p-5">
          {rawBlock.title ? <p className="text-sm font-semibold text-(--foreground)">{rawBlock.title}</p> : null}
          {rawBlock.body ? <p className="mt-2 text-sm leading-6 text-(--muted-foreground)">{rawBlock.body}</p> : null}
        </aside>
      );
      i++;
      continue;
    }

    const block = rawBlock as PTBlock;

    // Image
    if (block._type === 'image') {
      i++;
      continue; // skip inline images without URLs for now
    }

    const style = block.style ?? 'normal';

    // Headings — !important beats space-y's high-specificity :not([hidden]) selector
    if (style === 'h1') {
      rendered.push(<h2 key={i} className="!mt-14 text-[1.5rem] leading-tight tracking-[-0.02em] text-(--foreground)">{renderSpans(block)}</h2>);
      i++; continue;
    }
    if (style === 'h2') {
      rendered.push(<h2 key={i} className="!mt-14 text-[1.5rem] leading-tight tracking-[-0.02em] text-(--foreground)">{renderSpans(block)}</h2>);
      i++; continue;
    }
    if (style === 'h3') {
      rendered.push(<h3 key={i} className="!mt-10 text-[1.15rem] font-semibold leading-tight text-(--foreground)">{renderSpans(block)}</h3>);
      i++; continue;
    }
    if (style === 'h4') {
      rendered.push(<h4 key={i} className="!mt-8 text-base font-semibold text-(--foreground)">{renderSpans(block)}</h4>);
      i++; continue;
    }

    // Blockquote
    if (style === 'blockquote') {
      rendered.push(
        <blockquote key={i} className="!mt-8 border-l-2 border-(--border) pl-5 italic text-(--muted-foreground)">
          {renderSpans(block)}
        </blockquote>
      );
      i++; continue;
    }

    // Bullet list — collect consecutive bullet items
    if (block.listItem === 'bullet') {
      const listItems: React.ReactNode[] = [];
      while (i < blocks.length) {
        const b = blocks[i] as PTBlock;
        if (b._type !== 'block' || b.listItem !== 'bullet') break;
        listItems.push(<li key={i} className="leading-[1.8]">{renderSpans(b)}</li>);
        i++;
      }
      rendered.push(<ul key={`ul-${i}`} className="list-disc pl-6 [&>li+li]:mt-3">{listItems}</ul>);
      continue;
    }

    // Numbered list — collect consecutive numbered items
    if (block.listItem === 'number') {
      const listItems: React.ReactNode[] = [];
      while (i < blocks.length) {
        const b = blocks[i] as PTBlock;
        if (b._type !== 'block' || b.listItem !== 'number') break;
        listItems.push(<li key={i} className="leading-[1.8]">{renderSpans(b)}</li>);
        i++;
      }
      rendered.push(<ol key={`ol-${i}`} className="list-decimal pl-6 [&>li+li]:mt-3">{listItems}</ol>);
      continue;
    }

    // Normal paragraph — skip empty blocks
    const hasText = block.children?.some(s => s.text?.trim());
    if (!hasText) { i++; continue; }

    rendered.push(<p key={i}>{renderSpans(block)}</p>);
    i++;
  }

  return (
    <div className="space-y-6 text-[1.0625rem] leading-[1.8] text-(--muted-foreground)">
      {rendered}
    </div>
  );
}

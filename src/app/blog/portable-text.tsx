import type { MarketingPost } from '@/lib/site-content';

type PortableTextRendererProps = {
  blocks: MarketingPost['body'];
};

function getBlockText(block: MarketingPost['body'][number]) {
  if (block._type !== 'block') {
    return '';
  }

  return block.children?.map((child) => child.text).join('') ?? '';
}

export function PortableTextRenderer({ blocks }: PortableTextRendererProps) {
  return (
    <div className="space-y-5 text-base leading-7 text-(--muted-foreground)">
      {blocks.map((block, index) => {
        if (block._type === 'callout') {
          return (
            <aside key={`callout-${index}`} className="border border-(--border) bg-[oklch(from_var(--foreground)_l_c_h/0.03)] p-5">
              {block.title ? <p className="text-sm font-semibold text-(--foreground)">{block.title}</p> : null}
              {block.body ? <p className="mt-2 text-sm leading-6 text-(--muted-foreground)">{block.body}</p> : null}
            </aside>
          );
        }

        const text = getBlockText(block);
        const style = block.style ?? 'normal';

        if (!text) {
          return null;
        }

        if (style === 'h2') {
          return (
            <h2 key={`block-${index}`} className="mb-3 pt-6 text-[1.5rem] leading-tight tracking-[-0.02em] text-(--foreground)">
              {text}
            </h2>
          );
        }

        if (style === 'h3') {
          return (
            <h3 key={`block-${index}`} className="mb-2 pt-4 text-[1.15rem] font-semibold leading-tight text-(--foreground)">
              {text}
            </h3>
          );
        }

        return <p key={`block-${index}`}>{text}</p>;
      })}
    </div>
  );
}

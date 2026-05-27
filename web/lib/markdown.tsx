import React from 'react';

/** Minimal markdown → JSX for blog content (##, ###, >, -, **bold**, *italic*). */
export function renderMarkdown(md: string): React.ReactNode[] {
  const lines = md.split('\n');
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  let key = 0;

  const flushList = () => {
    if (list.length) {
      out.push(
        <ul className="article-list" key={`ul-${key++}`}>
          {list.map((li, i) => (
            <li key={i}>{inline(li)}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { flushList(); continue; }

    if (line.startsWith('### ')) { flushList(); out.push(<h3 key={key++}>{inline(line.slice(4))}</h3>); }
    else if (line.startsWith('## ')) { flushList(); out.push(<h2 key={key++}>{inline(line.slice(3))}</h2>); }
    else if (line.startsWith('> ')) { flushList(); out.push(<blockquote className="article-quote" key={key++}>{inline(line.slice(2))}</blockquote>); }
    else if (line.startsWith('- ')) { list.push(line.slice(2)); }
    else { flushList(); out.push(<p key={key++}>{inline(line)}</p>); }
  }
  flushList();
  return out;
}

function inline(text: string): React.ReactNode {
  // **bold** then *italic*
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (p.startsWith('*') && p.endsWith('*')) return <em key={i}>{p.slice(1, -1)}</em>;
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

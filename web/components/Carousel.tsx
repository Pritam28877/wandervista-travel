'use client';

import { useRef } from 'react';

/**
 * Generic horizontal carousel: arrow buttons + drag-to-scroll.
 * Mirrors initHorizontalScrollers() from the original site.
 */
export function Carousel({
  children,
  trackClass,
  scrollerClass = '',
  arrowClass,
  prevClass,
  nextClass,
}: {
  children: React.ReactNode;
  trackClass: string;
  scrollerClass?: string;
  arrowClass: string;
  prevClass: string;
  nextClass: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const step = () => {
    const t = trackRef.current;
    return t ? Math.max(t.clientWidth * 0.8, 280) : 300;
  };
  const scrollBy = (dir: number) =>
    trackRef.current?.scrollBy({ left: dir * step(), behavior: 'smooth' });

  // drag-to-scroll
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const onDown = (e: React.MouseEvent) => {
    const t = trackRef.current!;
    drag.current = { down: true, startX: e.pageX - t.offsetLeft, startScroll: t.scrollLeft, moved: false };
    t.classList.add('is-dragging');
  };
  const onUp = () => {
    drag.current.down = false;
    trackRef.current?.classList.remove('is-dragging');
  };
  const onMove = (e: React.MouseEvent) => {
    if (!drag.current.down) return;
    e.preventDefault();
    const t = trackRef.current!;
    const walk = e.pageX - t.offsetLeft - drag.current.startX;
    if (Math.abs(walk) > 6) drag.current.moved = true;
    t.scrollLeft = drag.current.startScroll - walk;
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div className={scrollerClass} style={{ position: 'relative' }}>
      <button className={`${arrowClass} ${prevClass}`} aria-label="Previous" onClick={() => scrollBy(-1)}>
        <i className="fas fa-chevron-left" />
      </button>
      <div
        ref={trackRef}
        className={trackClass}
        onMouseDown={onDown}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onMouseMove={onMove}
        onClickCapture={onClickCapture}
      >
        {children}
      </div>
      <button className={`${arrowClass} ${nextClass}`} aria-label="Next" onClick={() => scrollBy(1)}>
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { CvData, Template } from '@/stores/cv';
import { PAGE_INNER, paginateBlocks } from '@/lib/paging';

interface PagedCvProps {
  data: CvData;
  template: Template;
  children: React.ReactNode;
}

/**
 * PagedCv wraps a template and handles multi-page A4 layout.
 * It measures content blocks and distributes them across pages with proper breaks.
 */
export function PagedCv({ data, template, children }: PagedCvProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<HTMLElement[][]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    // Small delay to ensure content is fully rendered
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      // Find all elements with .avoid-break class (sections)
      const blocks = Array.from(
        containerRef.current.querySelectorAll('.avoid-break')
      ) as HTMLElement[];

      if (blocks.length === 0) {
        // No blocks found, treat entire content as single page
        setPages([[containerRef.current.firstElementChild as HTMLElement].filter(Boolean)]);
        return;
      }

      // Use pagination utility to split blocks across pages
      const paginatedPages = paginateBlocks(blocks, PAGE_INNER.h);
      setPages(paginatedPages);
    }, 100);

    return () => clearTimeout(timer);
  }, [isClient, data, template]);

  // During SSR or initial render, show unpaginated content
  if (!isClient || pages.length === 0) {
    return (
      <div ref={containerRef} className="single-page-render">
        {children}
      </div>
    );
  }

  // Render paginated content
  return (
    <div className="paged-cv-container">
      {pages.map((pageBlocks, pageIdx) => (
        <div
          key={pageIdx}
          className="a4-page bg-white shadow-xl mx-auto mb-8"
          style={{
            width: `${PAGE_INNER.w}px`,
            minHeight: `${PAGE_INNER.h}px`,
            pageBreakAfter: pageIdx < pages.length - 1 ? 'always' : 'auto',
          }}
          data-page-number={pageIdx + 1}
        >
          {/* Clone and append each block to this page */}
          {pageBlocks.map((block, blockIdx) => (
            <div
              key={blockIdx}
              dangerouslySetInnerHTML={{ __html: block.outerHTML }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

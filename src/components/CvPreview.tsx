import { useEffect, useRef, useState } from 'react';
import { CvData, Template } from '@/stores/cv';
import { TemplateRenderer } from './TemplateRenderer';

interface CvPreviewProps {
  data: CvData;
  template: Template;
  isThumbnail?: boolean;
}

// A4 dimensions in pixels at 96 DPI
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export function CvPreview({ data, template, isThumbnail = false }: CvPreviewProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!frameRef.current || isThumbnail) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const scaleX = width / A4_WIDTH;
        const scaleY = height / A4_HEIGHT;
        const newScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%
        setScale(newScale);
      }
    });

    observer.observe(frameRef.current);

    return () => observer.disconnect();
  }, [isThumbnail]);

  return (
    <div 
      ref={frameRef} 
      className={isThumbnail ? "w-full h-full" : "relative h-full overflow-auto bg-muted/30 flex items-start justify-center p-4"}
    >
      <div
        id="cv-a4"
        style={{
          width: `${A4_WIDTH}px`,
          height: `${A4_HEIGHT}px`,
          transform: isThumbnail ? 'none' : `scale(${scale})`,
          transformOrigin: 'top center',
          backgroundColor: '#ffffff',
        }}
        className={isThumbnail ? "" : "shadow-lg"}
      >
        <TemplateRenderer template={template} data={data} isThumbnail={isThumbnail} />
      </div>
    </div>
  );
}

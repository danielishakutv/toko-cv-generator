import { CvData, Template } from '@/stores/cv';
import { TemplateRenderer } from './TemplateRenderer';

interface OffscreenTemplateRendererProps {
  template: Template;
  cvData: CvData;
}

/**
 * Renders a template offscreen for thumbnail generation
 * Positioned absolutely off-viewport to avoid visual jank
 * Uses a unique key to force remounting when template changes
 */
export function OffscreenTemplateRenderer({ 
  template, 
  cvData,
}: OffscreenTemplateRendererProps) {
  return (
    <div 
      aria-hidden="true" 
      className="fixed -left-[9999px] -top-[9999px] p-0 m-0"
    >
      <div
        key={`thumb-${template.id}-${template.theme?.primary}-${template.layout}`}
        id="thumb-a4"
        style={{
          width: '596px',
          height: '842px',
          background: '#ffffff',
          padding: '12px',
          overflow: 'hidden',
        }}
      >
        <TemplateRenderer template={template} data={cvData} isThumbnail />
      </div>
    </div>
  );
}

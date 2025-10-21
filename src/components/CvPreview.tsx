import { CvData, Template } from '@/stores/cv';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { ElegantTemplate } from './templates/ElegantTemplate';

interface CvPreviewProps {
  data: CvData;
  template: Template;
}

export function CvPreview({ data, template }: CvPreviewProps) {
  const TemplateComponent = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    elegant: ElegantTemplate,
    minimal: ClassicTemplate,
    creative: ModernTemplate,
    professional: ModernTemplate,
    tech: ClassicTemplate,
    executive: ElegantTemplate,
    academic: ClassicTemplate,
  }[template.id] || ClassicTemplate;

  return (
    <div id="cv-preview" className="cv-preview">
      <TemplateComponent data={data} template={template} />
    </div>
  );
}

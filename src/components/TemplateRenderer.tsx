import { CvData, Template } from '@/stores/cv';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { ElegantTemplate } from './templates/ElegantTemplate';

interface TemplateRendererProps {
  template: Template;
  data: CvData;
  isThumbnail?: boolean;
}

/**
 * Central component that renders the appropriate template component
 * based on template.id. Must NOT rely on global state.
 */
export function TemplateRenderer({
  template,
  data,
  isThumbnail = false,
}: TemplateRendererProps) {
  // Pass isThumbnail through template prop for components that need it
  const templateWithMode = { ...template, isThumbnail };

  switch (template.id) {
    case 'classic':
      return <ClassicTemplate data={data} template={templateWithMode} />;
    
    case 'modern':
      return <ModernTemplate data={data} template={templateWithMode} />;
    
    case 'elegant':
      return <ElegantTemplate data={data} template={templateWithMode} />;
    
    case 'minimal':
      // Minimal uses classic layout with different theme
      return <ClassicTemplate data={data} template={templateWithMode} />;
    
    case 'creative':
      // Creative uses elegant sidebar-right layout
      return <ElegantTemplate data={data} template={templateWithMode} />;
    
    case 'professional':
      // Professional uses modern two-column layout
      return <ModernTemplate data={data} template={templateWithMode} />;
    
    case 'tech':
      // Tech uses classic layout with monospace font
      return <ClassicTemplate data={data} template={templateWithMode} />;
    
    case 'executive':
      // Executive uses elegant sidebar layout
      return <ElegantTemplate data={data} template={templateWithMode} />;
    
    case 'academic':
      // Academic uses classic layout
      return <ClassicTemplate data={data} template={templateWithMode} />;
    
    default:
      // Safe fallback only
      console.warn(`Unknown template id: ${template.id}, falling back to Classic`);
      return <ClassicTemplate data={data} template={templateWithMode} />;
  }
}

import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Template } from '@/stores/cv';
import { Skeleton } from './ui/skeleton';

interface TemplateCardProps {
  template: Template;
  thumbnail?: string;
}

export function TemplateCard({ template, thumbnail }: TemplateCardProps) {
  const navigate = useNavigate();

  const layoutLabels = {
    'one-column': 'Single Column',
    'two-column': 'Two Columns',
    'sidebar-left': 'Left Sidebar',
    'sidebar-right': 'Right Sidebar',
  };

  return (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
      onClick={() => navigate(`/builder/${template.id}`)}
    >
      <div className="aspect-[596/842] bg-muted relative overflow-hidden rounded-t-xl">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={`Preview of ${template.name} CV template`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          // Fallback placeholder
          <>
            <div
              className="absolute inset-0 flex items-center justify-center text-6xl font-bold opacity-10"
              style={{ color: template.theme.primary }}
            >
              CV
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              {layoutLabels[template.layout]}
            </Badge>
            <Badge
              variant="outline"
              className="text-xs capitalize"
              style={{ borderColor: template.theme.primary, color: template.theme.primary }}
            >
              {template.theme.font}
            </Badge>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg group-hover:text-primary transition">
          {template.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {template.sections.length} sections
        </p>
      </CardContent>
    </Card>
  );
}

export function TemplateCardSkeleton() {
  return (
    <Card>
      <Skeleton className="aspect-[8.5/11]" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
}

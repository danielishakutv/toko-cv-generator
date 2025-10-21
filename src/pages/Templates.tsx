import { useEffect, useState } from 'react';
import { useCvStore } from '@/stores/cv';
import { TemplateCard } from '@/components/TemplateCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

export function Templates() {
  const { templates, loadDemoTemplates } = useCvStore();
  const [search, setSearch] = useState('');
  const [layoutFilter, setLayoutFilter] = useState<string | null>(null);

  useEffect(() => {
    if (templates.length === 0) {
      loadDemoTemplates();
    }
  }, [templates.length, loadDemoTemplates]);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(search.toLowerCase());
    const matchesLayout = !layoutFilter || template.layout === layoutFilter;
    return matchesSearch && matchesLayout;
  });

  const layoutOptions = [
    { value: 'one-column', label: 'Single Column' },
    { value: 'two-column', label: 'Two Columns' },
    { value: 'sidebar-left', label: 'Left Sidebar' },
    { value: 'sidebar-right', label: 'Right Sidebar' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Template</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select from our professionally designed templates. All are ATS-friendly and
            optimized for readability.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground self-center">
              Layout:
            </span>
            <Badge
              variant={layoutFilter === null ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setLayoutFilter(null)}
            >
              All
            </Badge>
            {layoutOptions.map((option) => (
              <Badge
                key={option.value}
                variant={layoutFilter === option.value ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setLayoutFilter(option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No templates found. Try adjusting your filters.
            </p>
          </div>
        )}

        {/* Info */}
        <div className="mt-12 p-6 bg-muted/30 rounded-2xl">
          <h3 className="font-semibold text-lg mb-2">Need help choosing?</h3>
          <p className="text-muted-foreground">
            All templates are fully customizable and will adapt to your content. Choose the
            layout that best represents your professional style. Single column templates are
            great for traditional industries, while sidebar layouts work well for creative
            fields.
          </p>
        </div>
      </div>
    </div>
  );
}

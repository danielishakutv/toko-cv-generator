import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { useCvStore } from '@/stores/cv';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TemplateCard } from '@/components/TemplateCard';
import { ProfileAlert } from '@/components/ProfileAlert';
import { FileText, Share2, Download, Plus, Edit, Copy, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

export function Dashboard() {
  const { user } = useAuthStore();
  const { templates, documents, loadDemoTemplates, deleteDocument, duplicateDocument } = useCvStore();
  const { addToast } = useToast();

  useEffect(() => {
    if (templates.length === 0) {
      loadDemoTemplates();
    }
  }, [templates.length, loadDemoTemplates]);

  if (!user) {
    return null;
  }

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteDocument(id);
      addToast('CV deleted successfully', 'success');
    }
  };

  const handleDuplicate = (id: string) => {
    duplicateDocument(id);
    addToast('CV duplicated successfully', 'success');
  };

  const stats = [
    {
      label: 'Total CVs',
      value: documents.length,
      icon: FileText,
      color: 'text-blue-600',
    },
    {
      label: 'Saved',
      value: documents.length,
      icon: Download,
      color: 'text-green-600',
    },
    {
      label: 'Shared',
      value: Math.floor(documents.length / 2),
      icon: Share2,
      color: 'text-purple-600',
    },
  ];

  const featuredTemplates = templates.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your CVs and create new ones from professional templates
          </p>
        </div>

        {/* Profile Completeness Alert */}
        <ProfileAlert />

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent CVs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent CVs</CardTitle>
                <CardDescription>
                  View and manage your saved CV documents
                </CardDescription>
              </div>
              <Button asChild>
                <Link to="/templates">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {documents.length > 0 ? (
              <div className="space-y-4">
                {documents.map((doc) => {
                  const template = templates.find((t) => t.id === doc.templateId);
                  return (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          <FileText className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{doc.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            {template && <Badge variant="outline">{template.name}</Badge>}
                            <span>
                              Updated{' '}
                              {formatDistanceToNow(new Date(doc.lastModified), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                        >
                          <Link to={`/result/${doc.id}`}>
                            <FileText className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          asChild
                        >
                          <Link to={`/builder/${doc.templateId}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDuplicate(doc.id)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(doc.id, doc.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No CVs yet</h3>
                <p className="text-muted-foreground mb-6">
                  Get started by creating your first professional CV
                </p>
                <Button asChild>
                  <Link to="/templates">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First CV
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Featured Templates */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Featured Templates</h2>
              <p className="text-muted-foreground">
                Popular templates to get you started
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/templates">View All</Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle>💡 Quick Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Keep your CV concise - aim for 1-2 pages</li>
              <li>• Use action verbs to describe your achievements</li>
              <li>• Tailor your CV for each job application</li>
              <li>• Proofread carefully for spelling and grammar</li>
              <li>• Include quantifiable results whenever possible</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCvStore } from '@/stores/cv';
import { useAuthStore } from '@/stores/auth';
import { CvPreview } from '@/components/CvPreview';
import { ShareDialog } from '@/components/ShareDialog';
import { AuthDialog } from '@/components/AuthDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Download,
  Share2,
  Save,
  Copy,
  Edit,
  ArrowLeft,
  LayoutTemplate,
} from 'lucide-react';
import { downloadCvAsPdf } from '@/lib/pdf';

export function Result() {
  const { docId } = useParams<{ docId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { templates, activeDoc, documents, saveActive, duplicateDocument, setActiveDocById, loadDemoTemplates } = useCvStore();
  const { addToast } = useToast();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);

  useEffect(() => {
    if (templates.length === 0) {
      loadDemoTemplates();
    }
  }, [templates.length, loadDemoTemplates]);

  useEffect(() => {
    if (docId && !activeDoc) {
      const doc = documents.find((d) => d.id === docId);
      if (doc) {
        setActiveDocById(docId);
      }
    }
  }, [docId, activeDoc, documents, setActiveDocById]);

  const template = templates.find((t) => t.id === activeDoc?.templateId);

  if (!activeDoc || !template) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p>CV not found</p>
          <Button asChild className="mt-4">
            <Link to="/templates">Go to Templates</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleDownload = async () => {
    if (!user) {
      setShowDownloadPrompt(true);
      // Still allow download after showing prompt
      setTimeout(() => {
        proceedWithDownload();
      }, 100);
      return;
    }
    
    proceedWithDownload();
  };

  const proceedWithDownload = async () => {
    try {
      await downloadCvAsPdf('cv-preview', `${activeDoc.title || 'cv'}.pdf`);
      addToast('CV downloaded successfully!', 'success');
    } catch (error) {
      addToast('Failed to download CV. Please try again.', 'error');
    }
  };

  const handleShare = () => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }

    setShowShareDialog(true);
  };

  const handleSave = () => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }

    saveActive();
    addToast('CV saved successfully!', 'success');
  };

  const handleDuplicate = () => {
    duplicateDocument(activeDoc.id);
    addToast('CV duplicated successfully!', 'success');
  };

  const handleEdit = () => {
    navigate(`/builder/${template.id}`);
  };

  return (
    <>
      <div className="min-h-screen bg-muted/30">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-background border-b print-hide">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/templates">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Templates
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={handleDuplicate}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/templates">
                    <LayoutTemplate className="mr-2 h-4 w-4" />
                    Change Template
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Action Buttons */}
            <div className="mb-8 flex flex-wrap gap-4 justify-center print-hide">
              <Button size="lg" onClick={handleDownload} className="min-w-[150px]">
                <Download className="mr-2 h-5 w-5" />
                Download PDF
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleShare}
                className="min-w-[150px]"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleSave}
                className="min-w-[150px]"
              >
                <Save className="mr-2 h-5 w-5" />
                Save
              </Button>
            </div>

            {/* CV Preview */}
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <CvPreview data={activeDoc} template={template} />
            </div>

            {/* Info */}
            <div className="mt-8 text-center text-sm text-muted-foreground print-hide">
              <p>
                Your CV is ready! Download as PDF, share with a link, or save it to your
                account.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      <ShareDialog
        open={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        cvId={activeDoc.id}
        cvTitle={activeDoc.title}
      />

      {/* Auth Dialog */}
      <AuthDialog
        open={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        redirectTo={`/result/${docId}`}
      />

      {/* Download Prompt for Guests */}
      {showDownloadPrompt && !user && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 print-hide">
          <div className="bg-background p-8 rounded-2xl max-w-md mx-4 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Download Starting...</h3>
            <p className="text-muted-foreground mb-6">
              Your CV is being downloaded! Create a free account to save your CV and avoid
              re-typing next time. You'll also be able to share it online.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowDownloadPrompt(false);
                  setShowAuthDialog(true);
                }}
                className="flex-1"
              >
                Create Account
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDownloadPrompt(false)}
                className="flex-1"
              >
                Continue as Guest
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

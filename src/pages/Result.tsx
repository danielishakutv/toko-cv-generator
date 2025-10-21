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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Download,
  Share2,
  Save,
  Copy,
  Edit,
  ArrowLeft,
  LayoutTemplate,
  FileImage,
  FileText,
} from 'lucide-react';
import { exportPdfA4, exportJpeg, exportDocx } from '@/lib/pdf';

export function Result() {
  const { docId } = useParams<{ docId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { templates, activeDoc, documents, saveActive, duplicateDocument, setActiveDocById, loadDemoTemplates } = useCvStore();
  const { addToast } = useToast();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showAuthMode, setShowAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showSaveShareModal, setShowSaveShareModal] = useState(false);
  const [modalAction, setModalAction] = useState<'save' | 'share'>('save');

  // Check if user dismissed the download prompt in this session
  const [downloadPromptDismissed, setDownloadPromptDismissed] = useState(
    sessionStorage.getItem('downloadPromptDismissed') === 'true'
  );

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

  const cvElement = () => document.getElementById('cv-a4');
  const fileName = (ext: string) => `CV-${activeDoc.personal.fullName.replace(/\s+/g, '-') || 'document'}.${ext}`;

  const handleDownloadPdf = async () => {
    const el = cvElement();
    if (!el) return;
    
    try {
      await exportPdfA4(el, fileName('pdf'));
      addToast('CV downloaded as PDF!', 'success');
      
      // Show prompt to guests only once per session
      if (!user && !downloadPromptDismissed) {
        setTimeout(() => {
          setShowSaveShareModal(true);
          setModalAction('save');
        }, 500);
      }
    } catch (error) {
      addToast('Failed to download PDF. Please try again.', 'error');
    }
  };

  const handleDownloadJpeg = async () => {
    const el = cvElement();
    if (!el) return;
    
    try {
      await exportJpeg(el, fileName('jpeg'));
      addToast('CV downloaded as JPEG!', 'success');
    } catch (error) {
      addToast('Failed to download JPEG. Please try again.', 'error');
    }
  };

  const handleDownloadDocx = async () => {
    const el = cvElement();
    if (!el) return;
    
    try {
      await exportDocx(el, fileName('docx'));
      addToast('CV downloaded as DOCX!', 'success');
    } catch (error) {
      addToast('Failed to download DOCX. Please try again.', 'error');
    }
  };

  const handleShare = () => {
    if (!user) {
      setModalAction('share');
      setShowSaveShareModal(true);
      return;
    }

    setShowShareDialog(true);
  };

  const handleSave = () => {
    if (!user) {
      setModalAction('save');
      setShowSaveShareModal(true);
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

  const dismissDownloadPrompt = () => {
    sessionStorage.setItem('downloadPromptDismissed', 'true');
    setDownloadPromptDismissed(true);
    setShowSaveShareModal(false);
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg" className="min-w-[150px]">
                    <Download className="mr-2 h-5 w-5" />
                    Download
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleDownloadPdf}>
                    <FileText className="mr-2 h-4 w-4" />
                    PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadDocx}>
                    <FileText className="mr-2 h-4 w-4" />
                    DOCX
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadJpeg}>
                    <FileImage className="mr-2 h-4 w-4" />
                    JPEG
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
        mode={showAuthMode}
        redirectTo={`/result/${docId}`}
      />

      {/* Save/Share Modal for Guests */}
      <Dialog open={showSaveShareModal} onOpenChange={setShowSaveShareModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a free account to {modalAction === 'save' ? 'save' : 'share'}</DialogTitle>
            <DialogDescription>
              {modalAction === 'save' 
                ? 'Save your CV to your account and access it anytime, anywhere. You can also share it with a link and track views.'
                : 'Create an account to generate shareable links for your CV and track who views it.'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={() => {
                setShowSaveShareModal(false);
                setShowAuthMode('signup');
                setShowAuthDialog(true);
              }}
              className="w-full"
            >
              Sign up
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowSaveShareModal(false);
                setShowAuthMode('signin');
                setShowAuthDialog(true);
              }}
              className="w-full"
            >
              Sign in
            </Button>
            <Button
              variant="ghost"
              onClick={dismissDownloadPrompt}
              className="w-full"
            >
              Continue as guest
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

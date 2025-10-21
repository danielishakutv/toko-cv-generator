import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  cvId: string;
  cvTitle: string;
}

export function ShareDialog({ open, onClose, cvId, cvTitle }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();
  
  // Generate a fake shareable link
  const shareUrl = `${window.location.origin}/shared/${cvId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      addToast('Link copied to clipboard!', 'success');
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      addToast('Failed to copy link', 'error');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Your CV</DialogTitle>
          <DialogDescription>
            Share "{cvTitle}" with potential employers or on your professional networks
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="share-link">Shareable Link</Label>
            <div className="flex gap-2">
              <Input
                id="share-link"
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
                aria-label="Copy link"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Anyone with this link can view your CV
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

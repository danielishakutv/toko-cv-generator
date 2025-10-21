import { useRef } from 'react';
import { User, Upload, X } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuthStore } from '@/stores/auth';

interface PhotoUploadProps {
  photoUrl?: string;
  fullName?: string;
  supportsPhoto?: boolean;
  onChange: (photoUrl: string | undefined) => void;
}

export function PhotoUpload({ photoUrl, fullName, supportsPhoto, onChange }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUseProfilePhoto = () => {
    if (user?.avatarUrl) {
      onChange(user.avatarUrl);
    }
  };

  const handleRemove = () => {
    onChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {/* Photo Preview */}
        <Avatar className="w-24 h-24">
          {photoUrl ? (
            <AvatarImage src={photoUrl} alt={fullName || 'Profile photo'} />
          ) : (
            <AvatarFallback className="text-2xl">
              <User className="w-12 h-12" />
            </AvatarFallback>
          )}
        </Avatar>

        {/* Actions */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>

            {user?.avatarUrl && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleUseProfilePhoto}
              >
                Use Profile Photo
              </Button>
            )}

            {photoUrl && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemove}
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            )}
          </div>

          {supportsPhoto && !photoUrl && (
            <p className="text-xs text-muted-foreground">
              💡 This template supports a profile photo. Add one for best results.
            </p>
          )}
          {!supportsPhoto && photoUrl && (
            <p className="text-xs text-muted-foreground">
              ℹ️ This template doesn't display photos, but you can add one anyway.
            </p>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}

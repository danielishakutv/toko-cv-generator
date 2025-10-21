import { useState } from 'react';
import { useAuthStore } from '@/stores/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { User as UserIcon, Mail, Save, Trash2 } from 'lucide-react';

export function Profile() {
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  if (!user) {
    return null;
  }

  const handleSave = () => {
    // In a real app, this would update the user profile
    addToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information and profile picture
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Profile picture is automatically generated from your initials
                </p>
                <Button variant="outline" size="sm" disabled>
                  Change Picture
                </Button>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">
                  <UserIcon className="inline h-4 w-4 mr-2" />
                  Full Name
                </Label>
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-email">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email Address
                </Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Manage your notification and display preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme-setting">Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred color theme
                </p>
              </div>
              <select
                id="theme-setting"
                className="px-3 py-2 border rounded-md bg-background"
                defaultValue="system"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about your CVs and account
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">
                  Get tips, best practices, and product updates
                </p>
              </div>
              <Switch
                id="marketing-emails"
                checked={marketingEmails}
                onCheckedChange={setMarketingEmails}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Manage your account and data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Export Your Data</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Download all your CVs and personal data in JSON format
              </p>
              <Button variant="outline">Export Data</Button>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2 text-destructive">Danger Zone</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Permanently delete your account and all associated data
              </p>
              <Button variant="destructive" disabled>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
                <span className="ml-2 text-xs">(Demo)</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

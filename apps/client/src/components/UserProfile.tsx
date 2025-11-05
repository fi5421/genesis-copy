import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { syncUser, updateUser } from '@/api/user';
import { toast } from 'sonner';

export function UserProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(user?.name || '');

  if (!user) {
    return (
      <Card className="max-w-md">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            No user data available
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setIsLoading(true);

    try {
      await updateUser({ name: name.trim() });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user.name);
    setIsEditing(false);
  };

  const handleSync = async () => {
    setIsLoading(true);

    try {
      await syncUser({
        firebaseUid: user.firebaseUid,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      toast.success('Profile synced successfully!');
    } catch (err) {
      toast.error('Failed to sync profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">User Profile</CardTitle>
          {user.isAdmin && (
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              Admin
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={isLoading} size="sm">
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground">
                Name
              </Label>
              <p className="text-sm">{user.name}</p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground">
                Email
              </Label>
              <p className="text-sm">{user.email}</p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground">
                Firebase UID
              </Label>
              <p className="text-xs font-mono bg-muted px-2 py-1 rounded">
                {user.firebaseUid}
              </p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground">
                Member Since
              </Label>
              <p className="text-sm">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setIsEditing(true)} size="sm">
                Edit Profile
              </Button>
              <Button
                variant="outline"
                onClick={handleSync}
                disabled={isLoading}
                size="sm"
              >
                {isLoading ? 'Syncing...' : 'Sync Profile'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { UserProfile } from '@/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/profile/')({
  component: Profile,
});

function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-lg text-gray-600">
          Manage your profile information and sync with Firebase.
        </p>
      </div>

      <div className="flex justify-start">
        <UserProfile />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Firebase Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Your profile is now integrated with Firebase authentication and
            synced with the server database. Changes made here will be saved to
            both your local database and reflected in your Firebase profile.
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Profile data is automatically synced when you log in</li>
            <li>• Updates are saved to the server database</li>
            <li>• Admin status is managed server-side</li>
            <li>• Use "Sync Profile" to refresh data from the server</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

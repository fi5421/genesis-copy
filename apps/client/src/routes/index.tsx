import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome Home, {user?.name}!
        </h1>
        <p className="text-lg text-gray-600">
          This is your dashboard. Navigate using the sidebar to explore
          different sections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Getting Started
          </h3>
          <p className="text-gray-600">
            Your app is now running with a beautiful sidebar powered by Radix UI
            and Tailwind CSS.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Navigation
          </h3>
          <p className="text-gray-600">
            Use the sidebar to navigate between different pages. The active page
            is highlighted.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Customization
          </h3>
          <p className="text-gray-600">
            Easy to customize navigation items, styling, and add new pages to
            your application.
          </p>
        </div>
      </div>
    </div>
  );
}

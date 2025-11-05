import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AppSidebar, NavigationItem } from '@/components';
import { HomeIcon, InfoIcon, UserIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

const navigationItems: NavigationItem[] = [
  {
    title: 'Home',
    url: '/',
    icon: HomeIcon,
  },
  {
    title: 'About',
    url: '/about',
    icon: InfoIcon,
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: UserIcon,
  },
];

function RootComponent() {
  const { isAuthenticated, isLoading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' });
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4">
          <Outlet />
        </div>
        {/* {import.meta.env.VITE_NODE_ENV === 'development' && (
          <TanStackRouterDevtools />
        )} */}
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar navigationItems={navigationItems} title="My Workspace" />
      <div className="flex-1 overflow-auto bg-white">
        <div className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
      <Toaster position="top-right" />
    </SidebarProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});

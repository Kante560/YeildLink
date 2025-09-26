import React from 'react';
import Navigation from './Navigation';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/AuthContext/AuthContext';
import { Home, Sprout, MapPin, ShoppingCart, User, CircleHelp, LogOut, Bell, Search } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  useSidebar
} from './ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

// Child component to handle main content with sidebar state
const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { state } = useSidebar(); // Safe to use here, inside SidebarProvider

  return (
    <main className={cn(
      "flex-1 pt-10 pb-20 md:pb-0",
      state === "expanded" ? "md:ml-[--sidebar-width]" : "md:ml-0"
    )}>
      {children}
    </main>
  );
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/crops', icon: Sprout, label: 'Track crops' },
    { path: '/track-location', icon: MapPin, label: 'Track Location' },
    { path: '/map', icon: MapPin, label: 'Map' },
    { path: '/marketplace', icon: ShoppingCart, label: 'Market' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/auth?mode=login');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-background flex w-full md:max-w-8xl md:mx-auto">
        {/* Sidebar trigger button - always visible on md+ screens */}
     <div className="hidden md:block fixed left-4 top-4 z-50">
          <SidebarTrigger className="inline-flex items-center justify-center h-10 w-10 rounded-md text-primary bg-white border shadow hover:bg-primary hover:text-white transition-colors" />
        </div>
        
        {/* Sidebar for desktop */}
        <Sidebar className="hidden md:flex fixed">
          <SidebarHeader className="p-6 border-b border-border">
            <div className="flex-1" />
          </SidebarHeader>
          <SidebarContent>
            <div className="px-5 py-4 flex flex-col h-full justify-between">
              <div className="space-y-1">
                {navItems.map(({ path, icon: Icon, label }) => {
                  const isActive = location.pathname === path;
                  return (
                    <Link
                      key={path}
                      to={path}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <Icon size={18} />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className=" " />

              <div className=" mb-4 border-t border-border  space-y-1">
                <div className="flex-1 h-[1px] mb-8 bg-gradient-to-r from-white via-gray-300 to-white "></div>
                <Link
                  to="/terms"
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
                >
                  <CircleHelp size={18} />
                  <span>Terms & conditions</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut size={18} className="text-inherit" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>
        {/* Sidebar sheet for mobile */}
        <Sidebar className="md:hidden">
          <SidebarHeader className="p-6 border-b border-border" />
          <SidebarContent>
            <div className="px-5 py-4 flex flex-col h-full justify-between">
              <div className="space-y-1">
                {navItems.map(({ path, icon: Icon, label }) => {
                  const isActive = location.pathname === path;
                  return (
                    <Link
                      key={path}
                      to={path}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <Icon size={18} />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className=" " />

              <div className=" mb-4 border-t border-border  space-y-1">
                <div className="flex-1 h-[1px] mb-8 bg-gradient-to-r from-white via-gray-300 to-white "></div>
                <Link
                  to="/terms"
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
                >
                  <CircleHelp size={18} />
                  <span>Terms & conditions</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut size={18} className="text-inherit" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <MainContent>{children}</MainContent>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full">
        <Navigation />
      </div>
    </SidebarProvider>
  );
};

export default Layout;

import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="flex md:max-w-7xl md:mx-auto">
        {/* Sidebar Navigation for Desktop */}
        <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-border md:bg-card/50 md:backdrop-blur">
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-primary">YieldLink</h1>
            <p className="text-sm text-muted-foreground">Smart Farming Platform</p>
          </div>
          <Navigation />
        </aside>

        {/* Main Content */}
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden">
        <Navigation />
      </div>
    </div>
  );
};

export default Layout;
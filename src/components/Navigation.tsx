import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sprout, MapPin, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/crops', icon: Sprout, label: 'My Crops' },
    { path: '/map', icon: MapPin, label: 'Map' },
    { path: '/marketplace', icon: ShoppingCart, label: 'Market' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:static md:bg-transparent md:border-0">
      <div className="flex justify-around items-center py-2 md:flex-col md:space-y-2 md:py-4">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center p-3 rounded-lg transition-colors",
                "md:w-full md:flex-row md:justify-start md:space-x-3 md:px-4",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 md:text-sm md:mt-0">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
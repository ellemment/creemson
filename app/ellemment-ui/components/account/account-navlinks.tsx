import { Link } from '@remix-run/react';
import React from 'react';
import { Icon, type IconName } from '#app/components/ui/icon';

interface NavLinkProps {
  to: string;
  icon: IconName;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, children, className = '' }) => (
  <Link to={to} className={`flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md ${className}`}>
    <Icon name={icon} className="mr-3 h-4 w-4" />
    {children}
  </Link>
);

interface AccountNavLinksProps {
  username: string;
}

export function AccountNavLinks({ username }: AccountNavLinksProps) {
  return (
    <div className="space-y-8 mt-12">
      <div>
        <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 tracking-wider">Application</h3>
        <nav className="space-y-1">
          <NavLink to={`/account/beta`} icon="mix">App</NavLink>
          <NavLink to={`/account/beta`} icon="timer">Activity</NavLink>
          <NavLink to={`/account/beta`} icon="mixer-vertical">Metrics</NavLink>
          <NavLink to={`/account/beta`} icon="calendar">History</NavLink>
        </nav>
      </div>
      <div>
        <nav className="mt-12 space-y-1">
          <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 tracking-wider">Account</h3>
          <NavLink to={`/account/${username}/content/new`} icon="plus">Create</NavLink>
          <NavLink to="/account" icon="magic-wand">Discover</NavLink>
          <NavLink to="/account" icon="bookmark">Favorites</NavLink>
          <NavLink to="/account" icon="dashboard">Library</NavLink>
          <NavLink to="/account" icon="update">Updates</NavLink>
        </nav>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppState } from '@/contexts/AppStateContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  LayoutDashboard, ShoppingCart, Warehouse,
  ArrowLeftRight, Bell, LogOut, CookingPot,
  PackageSearch, Truck, AlertTriangle, Boxes, Grid3X3,
  PanelLeftClose, PanelLeftOpen
} from 'lucide-react';

const kitchenLinks = [
  { to: '/kitchen/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/kitchen/orders', label: 'Order Queue', icon: ShoppingCart },
  { to: '/kitchen/production', label: 'Production', icon: CookingPot },
  { to: '/kitchen/raw-materials', label: 'Raw Materials', icon: PackageSearch },
  { to: '/stock-transfer', label: 'Transfers', icon: ArrowLeftRight },
  { to: '/notifications', label: 'Notifications', icon: Bell },
];

const warehouseLinks = [
  { to: '/warehouse/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/warehouse/orders', label: 'Dispatch Queue', icon: ShoppingCart },
  { to: '/warehouse/inventory', label: 'Inventory', icon: Warehouse },
  { to: '/warehouse/rack-management', label: 'Rack Mgmt', icon: Grid3X3 },
  { to: '/warehouse/procurement', label: 'Procurement', icon: Truck },
  { to: '/warehouse/distribution', label: 'Distribution', icon: Boxes },
  { to: '/warehouse/low-stock-alerts', label: 'Alerts', icon: AlertTriangle },
  { to: '/stock-transfer', label: 'Transfers', icon: ArrowLeftRight },
  { to: '/notifications', label: 'Notifications', icon: Bell },
];

export const AppSidebar = () => {
  const { user, isKitchen, logout } = useAuth();
  const { unreadCount, lowStockAlertCount } = useAppState();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const links = isKitchen ? kitchenLinks : warehouseLinks;

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const getBadge = (to: string) => {
    if (to === '/notifications' && unreadCount > 0) return unreadCount;
    if (to === '/warehouse/low-stock-alerts' && lowStockAlertCount > 0) return lowStockAlertCount;
    return 0;
  };

  const SidebarLink = ({ link }: { link: typeof links[0] }) => {
    const badge = getBadge(link.to);
    const content = (
      <NavLink
        to={link.to}
        className={({ isActive }) => cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-all duration-200 relative',
          collapsed && 'justify-center px-2',
          isActive
            ? 'bg-sidebar-accent text-primary font-semibold'
            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        )}
      >
        <div className="relative">
          <link.icon className="h-4 w-4 shrink-0" />
          {badge > 0 && collapsed && (
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-destructive text-[10px] text-white flex items-center justify-center font-bold">{badge}</span>
          )}
        </div>
        {!collapsed && (
          <>
            <span className="flex-1">{link.label}</span>
            {badge > 0 && (
              <span className="h-5 min-w-[20px] px-1 rounded-full bg-destructive text-[10px] text-white flex items-center justify-center font-bold">{badge}</span>
            )}
          </>
        )}
      </NavLink>
    );

    if (collapsed) {
      return (
        <Tooltip key={link.to} delayDuration={0}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="font-body text-xs">
            {link.label}{badge > 0 ? ` (${badge})` : ''}
          </TooltipContent>
        </Tooltip>
      );
    }

    return content;
  };

  return (
    <aside className={cn(
      'h-screen sticky top-0 bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300 shrink-0',
      collapsed ? 'w-16' : 'w-64'
    )}>
      <div className={cn('p-4 border-b border-sidebar-border flex items-center', collapsed ? 'justify-center' : 'justify-between')}>
        {!collapsed && (
          <div>
            <h1 className="text-lg font-display font-bold text-sidebar-primary-foreground">
              <span className="text-primary">Thatha</span> Hub
            </h1>
            <p className="text-xs text-sidebar-muted mt-0.5 font-body">
              {isKitchen ? '🍳 Kitchen' : '📦 Warehouse'}
            </p>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="text-sidebar-foreground hover:text-primary transition-colors p-1 rounded-md hover:bg-sidebar-accent">
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {links.map((link) => (
          <SidebarLink key={link.to} link={link} />
        ))}
      </nav>

      <div className={cn('p-2 border-t border-sidebar-border space-y-1', collapsed && 'flex flex-col items-center')}>
        <div className={cn('flex items-center px-2 py-1', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && <span className="text-xs text-sidebar-muted font-body">Theme</span>}
          <ThemeToggle />
        </div>

        {!collapsed ? (
          <NavLink to="/profile" className={({ isActive }) => cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body',
            isActive ? 'bg-sidebar-accent text-primary' : 'text-sidebar-foreground hover:bg-sidebar-accent'
          )}>
            <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
              {user?.name.charAt(0)}
            </div>
            <div className="truncate">
              <p className="text-sm truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-muted truncate">{user?.email}</p>
            </div>
          </NavLink>
        ) : (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink to="/profile" className="flex items-center justify-center p-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent">
                <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                  {user?.name.charAt(0)}
                </div>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-body text-xs">{user?.name}</TooltipContent>
          </Tooltip>
        )}

        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button onClick={handleLogout} className="flex items-center justify-center p-2.5 rounded-lg text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                <LogOut className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-body text-xs">Logout</TooltipContent>
          </Tooltip>
        ) : (
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive w-full transition-colors">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        )}
      </div>
    </aside>
  );
};

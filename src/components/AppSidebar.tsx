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
  PanelLeftClose, PanelLeftOpen, ChevronRight
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
          'group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-body transition-all duration-200 relative',
          collapsed && 'justify-center px-2',
          isActive
            ? 'bg-sidebar-accent text-primary font-semibold shadow-sm shadow-primary/5'
            : 'text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'
        )}
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary" />
            )}
            <div className="relative">
              <link.icon className={cn('h-[18px] w-[18px] shrink-0 transition-colors', isActive && 'text-primary')} />
              {badge > 0 && collapsed && (
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-destructive text-[10px] text-white flex items-center justify-center font-bold animate-glow-pulse">{badge}</span>
              )}
            </div>
            {!collapsed && (
              <>
                <span className="flex-1 truncate">{link.label}</span>
                {badge > 0 && (
                  <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-destructive text-[10px] text-white flex items-center justify-center font-bold">{badge}</span>
                )}
              </>
            )}
          </>
        )}
      </NavLink>
    );

    if (collapsed) {
      return (
        <Tooltip key={link.to} delayDuration={0}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="font-body text-xs bg-popover border">
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
      collapsed ? 'w-[60px]' : 'w-[250px]'
    )}>
      {/* Header */}
      <div className={cn('p-3 border-b border-sidebar-border flex items-center', collapsed ? 'justify-center' : 'justify-between')}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <span className="text-sm font-display font-extrabold text-primary">T</span>
            </div>
            <div>
              <h1 className="text-sm font-display font-bold text-sidebar-primary-foreground leading-tight">
                Thatha <span className="text-primary">Hub</span>
              </h1>
              <p className="text-[10px] text-sidebar-muted font-body leading-tight">
                {isKitchen ? '🍳 Kitchen' : '📦 Warehouse'}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-sidebar-accent"
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] uppercase tracking-widest text-sidebar-muted font-semibold px-3 py-2">Navigation</p>
        )}
        {links.map((link) => (
          <SidebarLink key={link.to} link={link} />
        ))}
      </nav>

      {/* Footer */}
      <div className={cn('p-2 border-t border-sidebar-border space-y-1', collapsed && 'flex flex-col items-center')}>
        <div className={cn('flex items-center px-2 py-1', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && <span className="text-[10px] uppercase tracking-widest text-sidebar-muted font-semibold">Theme</span>}
          <ThemeToggle />
        </div>

        {!collapsed ? (
          <NavLink to="/profile" className={({ isActive }) => cn(
            'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-body transition-all',
            isActive ? 'bg-sidebar-accent text-primary' : 'text-sidebar-foreground hover:bg-sidebar-accent/60'
          )}>
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xs font-bold text-primary shrink-0 border border-primary/10">
              {user?.name.charAt(0)}
            </div>
            <div className="truncate">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-[10px] text-sidebar-muted truncate">{user?.email}</p>
            </div>
            <ChevronRight className="h-3 w-3 text-sidebar-muted ml-auto shrink-0" />
          </NavLink>
        ) : (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink to="/profile" className="flex items-center justify-center p-2 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/60 transition-all">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xs font-bold text-primary border border-primary/10">
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
              <button onClick={handleLogout} className="flex items-center justify-center p-2 rounded-xl text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all">
                <LogOut className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-body text-xs">Logout</TooltipContent>
          </Tooltip>
        ) : (
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-body text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive w-full transition-all">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        )}
      </div>
    </aside>
  );
};

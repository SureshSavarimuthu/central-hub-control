import { useAuth } from '@/contexts/AuthContext';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  LayoutDashboard, Package, ShoppingCart, ChefHat, Warehouse, Building2,
  Users, ArrowLeftRight, BarChart3, Bell, Settings, LogOut, CookingPot,
  PackageSearch, Truck, AlertTriangle, ClipboardList, Boxes, Grid3X3
} from 'lucide-react';

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: Grid3X3 },
  { to: '/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/hubs', label: 'Hubs', icon: Building2 },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/stock-transfer', label: 'Transfers', icon: ArrowLeftRight },
  { to: '/reports/orders', label: 'Reports', icon: BarChart3 },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/settings/general', label: 'Settings', icon: Settings },
];

const kitchenLinks = [
  { to: '/kitchen/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/kitchen/orders', label: 'Order Queue', icon: ShoppingCart },
  { to: '/kitchen/production', label: 'Production', icon: CookingPot },
  { to: '/kitchen/recipes', label: 'Recipes', icon: ClipboardList },
  { to: '/kitchen/fresh-stock', label: 'Fresh Stock', icon: Boxes },
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
  { to: '/warehouse/distribution', label: 'Distribution', icon: Truck },
  { to: '/warehouse/low-stock-alerts', label: 'Alerts', icon: AlertTriangle },
  { to: '/stock-transfer', label: 'Transfers', icon: ArrowLeftRight },
  { to: '/notifications', label: 'Notifications', icon: Bell },
];

export const AppSidebar = () => {
  const { user, isAdmin, isKitchen, logout } = useAuth();
  const location = useLocation();
  const links = isAdmin ? adminLinks : isKitchen ? kitchenLinks : warehouseLinks;

  return (
    <aside className="w-64 min-h-screen bg-sidebar flex flex-col border-r border-sidebar-border">
      <div className="p-5 border-b border-sidebar-border">
        <h1 className="text-xl font-display font-bold text-sidebar-primary-foreground">
          <span className="text-primary">Thatha</span> CentralHub
        </h1>
        <p className="text-xs text-sidebar-muted mt-1 font-body">{user?.role.replace(/_/g, ' ')}</p>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {links.map((link, i) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-all duration-200',
              isActive
                ? 'bg-sidebar-accent text-primary font-semibold'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <link.icon className="h-4 w-4 shrink-0" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center justify-between px-3 py-1 mb-1">
          <span className="text-xs text-sidebar-muted font-body">Theme</span>
          <ThemeToggle />
        </div>
        <NavLink to="/profile" className={({ isActive }) => cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body mb-1', isActive ? 'bg-sidebar-accent text-primary' : 'text-sidebar-foreground hover:bg-sidebar-accent')}>
          <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
            {user?.name.charAt(0)}
          </div>
          <div className="truncate">
            <p className="text-sm truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-muted truncate">{user?.email}</p>
          </div>
        </NavLink>
        <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive w-full transition-colors">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

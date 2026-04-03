import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Button } from '@/components/ui/button';
import { CheckCheck, ShoppingCart, Package, Settings, ArrowLeftRight, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const iconMap: Record<string, any> = { Orders: ShoppingCart, Stock: Package, System: Settings, Transfers: ArrowLeftRight };

const NotificationsPage = () => {
  const { notifications, markAllNotificationsRead, toggleNotificationRead } = useAppState();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Notifications</h1>
          <Button variant="outline" size="sm" onClick={markAllNotificationsRead}>
            <CheckCheck className="h-3 w-3 mr-1" />Mark all read
          </Button>
        </div>
        <div className="space-y-2">
          {notifications.map(n => {
            const Icon = iconMap[n.type] || Package;
            return (
              <div
                key={n.id}
                className={`bg-card rounded-xl border p-4 flex items-start gap-3 cursor-pointer hover:shadow-sm transition-shadow ${!n.read ? 'border-l-4 border-l-primary' : 'opacity-70'}`}
                onClick={() => n.link && navigate(n.link)}
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-body font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground font-body">{n.message}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-body whitespace-nowrap">{new Date(n.createdAt).toLocaleDateString()}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => { e.stopPropagation(); toggleNotificationRead(n.id); }}
                  >
                    {n.read ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default NotificationsPage;

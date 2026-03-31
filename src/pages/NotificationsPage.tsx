import { AppLayout } from '@/components/AppLayout';
import { dummyNotifications } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { CheckCheck, ShoppingCart, Package, Settings, ArrowLeftRight } from 'lucide-react';

const iconMap: Record<string, any> = { Orders: ShoppingCart, Stock: Package, System: Settings, Transfers: ArrowLeftRight };

const NotificationsPage = () => (
  <AppLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Notifications</h1>
        <Button variant="outline" size="sm"><CheckCheck className="h-3 w-3 mr-1" />Mark all read</Button>
      </div>
      <div className="space-y-2">
        {dummyNotifications.map(n => {
          const Icon = iconMap[n.type] || Package;
          return (
            <div key={n.id} className={`bg-card rounded-xl border p-4 flex items-start gap-3 ${!n.read ? 'border-l-4 border-l-primary' : 'opacity-70'}`}>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Icon className="h-4 w-4 text-primary" /></div>
              <div className="flex-1">
                <p className="text-sm font-body font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground font-body">{n.message}</p>
              </div>
              <span className="text-xs text-muted-foreground font-body whitespace-nowrap">{new Date(n.createdAt).toLocaleDateString()}</span>
            </div>
          );
        })}
      </div>
    </div>
  </AppLayout>
);

export default NotificationsPage;

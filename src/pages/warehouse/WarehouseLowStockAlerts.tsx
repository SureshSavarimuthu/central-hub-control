import { AppLayout } from '@/components/AppLayout';
import { dummyProducts } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Bell, BellOff } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const WarehouseLowStockAlerts = () => {
  const whProducts = dummyProducts.filter(p => p.locationId === 'h3');
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold">Low Stock Alert Configuration</h1>
        <div className="bg-card rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30">
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Product</th>
              <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Current</th>
              <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Threshold</th>
              <th className="text-center p-3 text-xs font-body font-semibold text-muted-foreground">In-App</th>
              <th className="text-center p-3 text-xs font-body font-semibold text-muted-foreground">Email</th>
              <th className="text-center p-3 text-xs font-body font-semibold text-muted-foreground">SMS</th>
              <th className="p-3"></th>
            </tr></thead>
            <tbody>
              {whProducts.map(p => (
                <tr key={p.id} className={`border-b ${p.stock <= p.lowStockThreshold ? 'bg-destructive/5' : ''}`}>
                  <td className="p-3 text-sm font-body font-medium">{p.name}</td>
                  <td className={`p-3 text-right text-sm font-body ${p.stock <= p.lowStockThreshold ? 'text-destructive font-semibold' : ''}`}>{p.stock}</td>
                  <td className="p-3 text-right text-sm font-body">{p.lowStockThreshold}</td>
                  <td className="p-3 text-center"><Switch defaultChecked /></td>
                  <td className="p-3 text-center"><Switch defaultChecked /></td>
                  <td className="p-3 text-center"><Switch /></td>
                  <td className="p-3"><Button variant="ghost" size="sm"><BellOff className="h-3 w-3 mr-1" />Snooze</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default WarehouseLowStockAlerts;

import { AppLayout } from '@/components/AppLayout';
import { KpiCard } from '@/components/KpiCard';
import { StatusChip } from '@/components/StatusChip';
import { useAppState } from '@/contexts/AppStateContext';
import { Warehouse, AlertTriangle, Clock, Package, Plus, Truck, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const WarehouseDashboard = () => {
  const { inventory, subOrders, procurements, lowStockAlertCount } = useAppState();
  const navigate = useNavigate();
  const totalSKUs = inventory.length;
  const expiringSoon = 3;
  const outOfStock = inventory.filter(p => p.stock === 0).length;
  const pendingDispatch = subOrders.filter(s => s.hubId === 'h3' && !['Delivered', 'Cancelled'].includes(s.status));

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Warehouse Dashboard</h1>
          <p className="text-muted-foreground font-body text-sm">Central Warehouse · WH-CH-01</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Total SKUs" value={totalSKUs} icon={Package} />
          <KpiCard title="Expiring Soon" value={expiringSoon} icon={Clock} trend="within 7 days" trendUp={false} />
          <KpiCard title="Low Stock Alerts" value={lowStockAlertCount} icon={AlertTriangle} pulse={lowStockAlertCount > 0} />
          <KpiCard title="Rack Utilisation" value="82%" icon={Warehouse} trend="+3% this week" trendUp />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border p-5 hover:shadow-lg transition-shadow dark:hover:shadow-primary/5">
            <h3 className="font-display font-semibold mb-4">Pending Dispatch</h3>
            <div className="space-y-2">
              {pendingDispatch.length > 0 ? pendingDispatch.map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-background hover:bg-muted/30 transition-colors">
                  <div>
                    <p className="text-sm font-code">{s.id}</p>
                    <p className="text-xs text-muted-foreground font-body">{s.items.map(i => i.productName).join(', ')}</p>
                  </div>
                  <StatusChip status={s.status} />
                </div>
              )) : <p className="text-sm text-muted-foreground font-body">No pending dispatches</p>}
            </div>
          </div>
          <div className="bg-card rounded-xl border p-5 hover:shadow-lg transition-shadow dark:hover:shadow-primary/5">
            <h3 className="font-display font-semibold mb-4">Low Stock Items</h3>
            <div className="space-y-2">
              {inventory.filter(p => p.stock <= p.lowStockThreshold).map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-background border-l-4 border-l-destructive">
                  <div>
                    <p className="text-sm font-body font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground font-code">{p.sku}</p>
                  </div>
                  <span className="text-sm font-body font-semibold text-destructive">{p.stock}/{p.lowStockThreshold}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border p-5 hover:shadow-lg transition-shadow dark:hover:shadow-primary/5">
          <h3 className="font-display font-semibold mb-4">Incoming Deliveries</h3>
          <div className="space-y-2">
            {procurements.filter(p => ['Confirmed', 'Submitted'].includes(p.status)).map(po => (
              <div key={po.id} className="flex items-center justify-between p-3 rounded-lg bg-background">
                <div>
                  <p className="text-sm font-body font-medium">{po.material}</p>
                  <p className="text-xs text-muted-foreground font-body">{po.vendorName} · <span className="font-code">{po.poNumber}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-body">{po.quantity} units</p>
                  <p className="text-xs text-muted-foreground font-body">ETA: {po.expectedDelivery}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button size="sm" onClick={() => navigate('/warehouse/procurement')}><Plus className="h-3 w-3 mr-1" />Create Procurement</Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/warehouse/orders')}><Truck className="h-3 w-3 mr-1" />Dispatch Queue</Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/warehouse/rack-management')}><Grid3X3 className="h-3 w-3 mr-1" />Rack Management</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default WarehouseDashboard;

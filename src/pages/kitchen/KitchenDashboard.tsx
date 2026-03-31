import { AppLayout } from '@/components/AppLayout';
import { KpiCard } from '@/components/KpiCard';
import { StatusChip } from '@/components/StatusChip';
import { dummyBatches, dummyOrders, dummyProducts } from '@/data/dummy';
import { ChefHat, ShoppingCart, Boxes, TrendingUp, Play, PackageSearch, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const KitchenDashboard = () => {
  const kitchenOrders = dummyOrders.flatMap(o => o.subOrders).filter(s => s.hubId === 'h1' && !['Delivered', 'Cancelled'].includes(s.status));
  const freshStock = dummyProducts.filter(p => p.locationId === 'h1' && p.availability === 'INSTOCK').reduce((s, p) => s + p.stock, 0);
  const efficiency = 92;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Kitchen Dashboard</h1>
          <p className="text-muted-foreground font-body text-sm">North Chennai Kitchen · KTN-CH-01</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Active Batches" value={dummyBatches.filter(b => b.status === 'In Progress').length} icon={ChefHat} />
          <KpiCard title="Pending Orders" value={kitchenOrders.length} icon={ShoppingCart} trend="2 urgent" trendUp={false} />
          <KpiCard title="Fresh Stock" value={freshStock} icon={Boxes} trend="units ready" trendUp />
          <KpiCard title="Efficiency" value={`${efficiency}%`} icon={TrendingUp} trend="vs 88% target" trendUp />
        </div>

        <div className="bg-card rounded-xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Production Queue</h3>
            <Button size="sm"><Play className="h-3 w-3 mr-1" />Start Batch</Button>
          </div>
          <div className="space-y-3">
            {dummyBatches.map(b => (
              <div key={b.id} className="p-4 rounded-lg bg-background border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-body font-medium text-sm">{b.productName}</p>
                    <p className="text-xs text-muted-foreground font-code">{b.id} · Batch: {b.batchSize} units</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${b.status === 'Ready' ? 'bg-accent/15 text-accent' : b.status === 'Paused' ? 'bg-status-ready/15 text-status-ready' : b.status === 'Failed' ? 'bg-destructive/15 text-destructive' : 'bg-primary/15 text-primary'}`}>
                    {b.status}
                  </span>
                </div>
                <Progress value={b.progress} className="h-2" />
                <p className="text-xs text-muted-foreground font-body mt-1">{b.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border p-5">
          <h3 className="font-display font-semibold mb-4">Pending Orders</h3>
          <div className="space-y-2">
            {kitchenOrders.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-background">
                <div>
                  <p className="text-sm font-code">{s.id}</p>
                  <p className="text-xs text-muted-foreground font-body">{s.items.map(i => `${i.productName} ×${i.quantity}`).join(', ')}</p>
                </div>
                <StatusChip status={s.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm"><PackageSearch className="h-3 w-3 mr-1" />Request Raw Material</Button>
          <Button variant="outline" size="sm"><ArrowLeftRight className="h-3 w-3 mr-1" />Transfer Stock</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default KitchenDashboard;

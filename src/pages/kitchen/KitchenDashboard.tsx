import { AppLayout } from '@/components/AppLayout';
import { KpiCard } from '@/components/KpiCard';
import { StatusChip } from '@/components/StatusChip';
import { useAppState } from '@/contexts/AppStateContext';
import { ChefHat, ShoppingCart, Boxes, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const KitchenDashboard = () => {
  const { batches, subOrders } = useAppState();
  const navigate = useNavigate();
  const kitchenOrders = subOrders.filter(s => s.hubId === 'h1' && !['Delivered', 'Cancelled'].includes(s.status));
  const activeBatches = batches.filter(b => b.status === 'In Progress').length;
  const readyBatches = batches.filter(b => b.status === 'Ready').length;
  const efficiency = batches.filter(b => b.status === 'Ready').length > 0
    ? Math.round(batches.filter(b => b.status === 'Ready').reduce((s, b) => s + (b.actualYield / b.plannedYield) * 100, 0) / batches.filter(b => b.status === 'Ready').length)
    : 92;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Kitchen Dashboard</h1>
          <p className="text-muted-foreground font-body text-sm">North Chennai Kitchen · KTN-CH-01</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Active Batches" value={activeBatches} icon={ChefHat} />
          <KpiCard title="Pending Orders" value={kitchenOrders.length} icon={ShoppingCart} trend={`${kitchenOrders.filter(o => o.status === 'Pending').length} pending`} trendUp={false} />
          <KpiCard title="Ready Batches" value={readyBatches} icon={Boxes} trend="completed" trendUp />
          <KpiCard title="Efficiency" value={`${efficiency}%`} icon={TrendingUp} trend="vs 88% target" trendUp={efficiency >= 88} />
        </div>

        <div className="bg-card rounded-xl border p-5 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/kitchen/production')}>
          <h3 className="font-display font-semibold mb-4">Production Queue</h3>
          <div className="space-y-3">
            {batches.slice(0, 4).map(b => (
              <div key={b.id} className="p-4 rounded-lg bg-background border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-body font-medium text-sm">{b.productName}</p>
                    <p className="text-xs text-muted-foreground font-code">{b.id} · {b.batchSize} units</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {b.status === 'In Progress' && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                    )}
                    <span className={cn(
                      'text-xs font-semibold px-2 py-0.5 rounded-full',
                      b.status === 'Ready' ? 'bg-accent/15 text-accent' : b.status === 'Paused' ? 'bg-muted text-muted-foreground' : b.status === 'Failed' ? 'bg-destructive/15 text-destructive' : 'bg-primary/15 text-primary'
                    )}>{b.status}</span>
                  </div>
                </div>
                <Progress value={b.progress} className={cn('h-2', b.status === 'In Progress' && 'animate-pulse')} />
                <p className="text-xs text-muted-foreground font-body mt-1">{b.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border p-5 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/kitchen/orders')}>
          <h3 className="font-display font-semibold mb-4">Pending Orders</h3>
          <div className="space-y-2">
            {kitchenOrders.slice(0, 5).map(s => (
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
      </div>
    </AppLayout>
  );
};

export default KitchenDashboard;

import { AppLayout } from '@/components/AppLayout';
import { StatusChip } from '@/components/StatusChip';
import { dummyOrders } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

const KitchenOrders = () => {
  const subOrders = dummyOrders.flatMap(o => o.subOrders).filter(s => s.hubId === 'h1');
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold">Kitchen Order Queue</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subOrders.map(s => {
            const mins = Math.floor((Date.now() - new Date(s.assignedAt).getTime()) / 60000);
            return (
              <div key={s.id} className="bg-card rounded-xl border p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-code text-sm font-semibold">{s.id}</p>
                  <StatusChip status={s.status} />
                </div>
                <div className="space-y-1 mb-3">
                  {s.items.map((it, i) => <p key={i} className="text-sm font-body">{it.productName} <span className="text-muted-foreground">×{it.quantity}</span></p>)}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{mins}m ago</span>
                  <span>Deadline: {new Date(s.deliveryDeadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <Button size="sm" className="w-full mt-3">Update Status</Button>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default KitchenOrders;

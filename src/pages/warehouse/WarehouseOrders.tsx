import { AppLayout } from '@/components/AppLayout';
import { StatusChip } from '@/components/StatusChip';
import { useAppState } from '@/contexts/AppStateContext';
import { Button } from '@/components/ui/button';
import { Truck, Check } from 'lucide-react';

const WarehouseOrders = () => {
  const { subOrders, updateSubOrderStatus } = useAppState();
  const whOrders = subOrders.filter(s => s.hubId === 'h3');
  const pending = whOrders.filter(s => !['Delivered', 'Cancelled', 'Out for Delivery'].includes(s.status));
  const dispatched = whOrders.filter(s => ['Out for Delivery', 'Delivered'].includes(s.status));

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold">Dispatch Queue</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-display font-semibold mb-3">Pending ({pending.length})</h3>
            <div className="space-y-3">
              {pending.map(s => (
                <div key={s.id} className="bg-card rounded-xl border p-4 animate-fade-in">
                  <div className="flex items-center justify-between mb-2"><p className="font-code text-sm">{s.id}</p><StatusChip status={s.status} /></div>
                  {s.items.map((it, i) => <p key={i} className="text-sm font-body">{it.productName} ×{it.quantity}</p>)}
                  <Button size="sm" className="w-full mt-3" onClick={() => updateSubOrderStatus(s.id, 'Out for Delivery')}>
                    <Truck className="h-3 w-3 mr-1" />Mark Dispatch
                  </Button>
                </div>
              ))}
              {pending.length === 0 && <p className="text-sm text-muted-foreground font-body">No pending items</p>}
            </div>
          </div>
          <div>
            <h3 className="font-display font-semibold mb-3">Dispatched ({dispatched.length})</h3>
            <div className="space-y-3">
              {dispatched.map(s => (
                <div key={s.id} className="bg-card rounded-xl border p-4">
                  <div className="flex items-center justify-between mb-2"><p className="font-code text-sm">{s.id}</p><StatusChip status={s.status} /></div>
                  {s.items.map((it, i) => <p key={i} className="text-sm font-body">{it.productName} ×{it.quantity}</p>)}
                  {s.status !== 'Delivered' && (
                    <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => updateSubOrderStatus(s.id, 'Delivered')}>
                      <Check className="h-3 w-3 mr-1" />Confirm Delivery
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default WarehouseOrders;

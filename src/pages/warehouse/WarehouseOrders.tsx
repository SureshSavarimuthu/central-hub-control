import { AppLayout } from '@/components/AppLayout';
import { StatusChip } from '@/components/StatusChip';
import { dummyOrders } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Truck, Check } from 'lucide-react';

const WarehouseOrders = () => {
  const subOrders = dummyOrders.flatMap(o => o.subOrders).filter(s => s.hubId === 'h3');
  const pending = subOrders.filter(s => !['Delivered', 'Cancelled', 'Out for Delivery'].includes(s.status));
  const dispatched = subOrders.filter(s => ['Out for Delivery', 'Delivered'].includes(s.status));

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold">Dispatch Queue</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-display font-semibold mb-3">Pending ({pending.length})</h3>
            <div className="space-y-3">
              {pending.map(s => (
                <div key={s.id} className="bg-card rounded-xl border p-4">
                  <div className="flex items-center justify-between mb-2"><p className="font-code text-sm">{s.id}</p><StatusChip status={s.status} /></div>
                  {s.items.map((it, i) => <p key={i} className="text-sm font-body">{it.productName} ×{it.quantity}</p>)}
                  <Button size="sm" className="w-full mt-3"><Truck className="h-3 w-3 mr-1" />Mark Dispatch</Button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display font-semibold mb-3">Dispatched ({dispatched.length})</h3>
            <div className="space-y-3">
              {dispatched.map(s => (
                <div key={s.id} className="bg-card rounded-xl border p-4">
                  <div className="flex items-center justify-between mb-2"><p className="font-code text-sm">{s.id}</p><StatusChip status={s.status} /></div>
                  {s.items.map((it, i) => <p key={i} className="text-sm font-body">{it.productName} ×{it.quantity}</p>)}
                  {s.status !== 'Delivered' && <Button variant="outline" size="sm" className="w-full mt-3"><Check className="h-3 w-3 mr-1" />Confirm Delivery</Button>}
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

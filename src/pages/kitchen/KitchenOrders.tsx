import { AppLayout } from '@/components/AppLayout';
import { StatusChip } from '@/components/StatusChip';
import { useAppState } from '@/contexts/AppStateContext';
import { Button } from '@/components/ui/button';
import { Clock, ChevronRight, Check, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const statusFlow = ['Pending', 'Confirmed', 'In Production', 'Ready for Dispatch', 'Out for Delivery', 'Delivered'];

const KitchenOrders = () => {
  const { subOrders, updateSubOrderStatus } = useAppState();
  const kitchenOrders = subOrders.filter(s => s.hubId === 'h1');
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? kitchenOrders : kitchenOrders.filter(s => s.status === filter);

  const getNextStatus = (current: string) => {
    const idx = statusFlow.indexOf(current);
    return idx >= 0 && idx < statusFlow.length - 1 ? statusFlow[idx + 1] : null;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Kitchen Order Queue</h1>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              {statusFlow.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(s => {
            const mins = Math.floor((Date.now() - new Date(s.assignedAt).getTime()) / 60000);
            const next = getNextStatus(s.status);
            return (
              <div key={s.id} className="bg-card rounded-xl border p-5 hover:shadow-md transition-shadow animate-fade-in">
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
                {s.status !== 'Delivered' && s.status !== 'Cancelled' && (
                  <div className="flex gap-2 mt-3">
                    {next && (
                      <Button size="sm" className="flex-1" onClick={() => updateSubOrderStatus(s.id, next)}>
                        <ChevronRight className="h-3 w-3 mr-1" />{next}
                      </Button>
                    )}
                    {s.status === 'Pending' && (
                      <Button variant="outline" size="sm" className="text-destructive" onClick={() => updateSubOrderStatus(s.id, 'Cancelled')}>
                        <X className="h-3 w-3 mr-1" />Cancel
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && <p className="text-muted-foreground font-body col-span-full text-center py-8">No orders found</p>}
        </div>
      </div>
    </AppLayout>
  );
};

export default KitchenOrders;

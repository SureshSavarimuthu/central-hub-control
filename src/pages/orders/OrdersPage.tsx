import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { StatusChip } from '@/components/StatusChip';
import { dummyOrders } from '@/data/dummy';
import { Input } from '@/components/ui/input';
import { Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const OrdersPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const filtered = dummyOrders.filter(o =>
    (search === '' || o.id.toLowerCase().includes(search.toLowerCase()) || o.franchiseName.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'all' || o.status === statusFilter)
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Orders</h1>
            <p className="text-muted-foreground font-body text-sm">{dummyOrders.length} total orders</p>
          </div>
          <Button variant="outline" size="sm"><Download className="h-3 w-3 mr-1" />Export</Button>
        </div>

        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..." className="pl-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {['Pending','Confirmed','In Production','Ready for Dispatch','Out for Delivery','Delivered','Cancelled','On Hold'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Order ID</th>
                <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Franchise</th>
                <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Sub-orders</th>
                <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Value</th>
                <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Status</th>
                <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Placed</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} className="border-b hover:bg-muted/10 transition-colors cursor-pointer">
                  <td className="p-3"><Link to={`/orders/${o.id}`} className="font-code text-sm text-primary hover:underline">{o.id}</Link></td>
                  <td className="p-3 text-sm font-body">{o.franchiseName}</td>
                  <td className="p-3 text-sm font-body">{o.subOrders.length} hub{o.subOrders.length > 1 ? 's' : ''}</td>
                  <td className="p-3 text-right text-sm font-body font-medium">₹{o.totalValue.toLocaleString()}</td>
                  <td className="p-3"><StatusChip status={o.status} /></td>
                  <td className="p-3 text-xs text-muted-foreground font-body">{new Date(o.placedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default OrdersPage;

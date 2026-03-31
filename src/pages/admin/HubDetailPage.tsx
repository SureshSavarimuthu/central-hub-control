import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { dummyHubs, dummyUsers, dummyProducts, dummyOrders } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Archive } from 'lucide-react';

const HubDetailPage = () => {
  const { id } = useParams();
  const hub = dummyHubs.find(h => h.id === id);
  if (!hub) return <AppLayout><p>Hub not found</p></AppLayout>;
  const users = dummyUsers.filter(u => u.hubId === id);
  const products = dummyProducts.filter(p => p.locationId === id);
  const orders = dummyOrders.flatMap(o => o.subOrders).filter(s => s.hubId === id);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/admin/hubs"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
          <div className="flex-1">
            <h1 className="text-2xl font-display font-bold">{hub.name}</h1>
            <p className="text-muted-foreground font-code text-sm">{hub.code} · {hub.type} · {hub.city}</p>
          </div>
          <Button variant="outline" size="sm"><Edit className="h-3 w-3 mr-1" />Edit</Button>
          <Button variant="outline" size="sm" className="text-destructive"><Archive className="h-3 w-3 mr-1" />Deactivate</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border p-4"><p className="text-xs text-muted-foreground font-body">Status</p><p className="font-body font-semibold mt-1">{hub.status}</p></div>
          <div className="bg-card rounded-xl border p-4"><p className="text-xs text-muted-foreground font-body">Capacity</p><p className="font-body font-semibold mt-1">{hub.capacity} {hub.type === 'Kitchen' ? 'units/day' : 'sqft'}</p></div>
          <div className="bg-card rounded-xl border p-4"><p className="text-xs text-muted-foreground font-body">Utilisation</p><p className="font-body font-semibold mt-1">{hub.utilisation}%</p></div>
          <div className="bg-card rounded-xl border p-4"><p className="text-xs text-muted-foreground font-body">Operating Hours</p><p className="font-body font-semibold mt-1">{hub.operatingHours}</p></div>
        </div>

        <div className="bg-card rounded-xl border p-5">
          <h3 className="font-display font-semibold mb-3">Team ({users.length})</h3>
          <div className="space-y-2">
            {users.map(u => (
              <div key={u.id} className="flex items-center justify-between p-2 rounded bg-background">
                <div><p className="text-sm font-body font-medium">{u.name}</p><p className="text-xs text-muted-foreground font-body">{u.role.replace(/_/g, ' ')}</p></div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${u.status ? 'bg-accent/15 text-accent' : 'bg-muted text-muted-foreground'}`}>{u.status ? 'Active' : 'Inactive'}</span>
              </div>
            ))}
            {users.length === 0 && <p className="text-sm text-muted-foreground font-body">No team members assigned</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border p-4"><p className="text-xs text-muted-foreground font-body">Products</p><p className="text-2xl font-display font-bold mt-1">{products.length}</p></div>
          <div className="bg-card rounded-xl border p-4"><p className="text-xs text-muted-foreground font-body">Orders Fulfilled</p><p className="text-2xl font-display font-bold mt-1">{orders.filter(o => o.status === 'Delivered').length}</p></div>
          <div className="bg-card rounded-xl border p-4"><p className="text-xs text-muted-foreground font-body">Active Orders</p><p className="text-2xl font-display font-bold mt-1">{orders.filter(o => !['Delivered', 'Cancelled'].includes(o.status)).length}</p></div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HubDetailPage;

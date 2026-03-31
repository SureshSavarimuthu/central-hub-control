import { AppLayout } from '@/components/AppLayout';
import { KpiCard } from '@/components/KpiCard';
import { StatusChip } from '@/components/StatusChip';
import { dummyHubs, dummyOrders, dummyProducts, dummyNotifications, revenueData, topProducts } from '@/data/dummy';
import { Building2, ShoppingCart, AlertTriangle, DollarSign, TrendingUp } from 'lucide-react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AdminDashboard = () => {
  const activeHubs = dummyHubs.filter(h => h.status === 'Operational').length;
  const liveOrders = dummyOrders.filter(o => !['Delivered', 'Cancelled'].includes(o.status)).length;
  const lowStock = dummyProducts.filter(p => p.stock <= p.lowStockThreshold).length;
  const todayRevenue = dummyOrders.filter(o => o.status !== 'Cancelled').reduce((s, o) => s + o.totalValue, 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground font-body text-sm">Overview of your hub network</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Active Hubs" value={activeHubs} icon={Building2} trend="+1 this month" trendUp />
          <KpiCard title="Live Orders" value={liveOrders} icon={ShoppingCart} trend="3 in production" trendUp />
          <KpiCard title="Low Stock Alerts" value={lowStock} icon={AlertTriangle} pulse={lowStock > 0} trend={`${lowStock} items`} trendUp={false} />
          <KpiCard title="Today's Revenue" value={`₹${todayRevenue.toLocaleString()}`} icon={DollarSign} trend="+12% vs yesterday" trendUp />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-display font-semibold mb-4">Revenue by Hub (Weekly)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="ktn1" name="N.Chennai Kitchen" stackId="1" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" fillOpacity={0.6} />
                <Area type="monotone" dataKey="ktn2" name="S.Chennai Kitchen" stackId="1" fill="hsl(var(--status-confirmed))" stroke="hsl(var(--status-confirmed))" fillOpacity={0.6} />
                <Area type="monotone" dataKey="wh1" name="Central Warehouse" stackId="1" fill="hsl(var(--info))" stroke="hsl(var(--info))" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-display font-semibold mb-4">Top Selling Products</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={120} />
                <Tooltip />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-display font-semibold mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {dummyOrders.slice(0, 5).map(o => (
                <div key={o.id} className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <div>
                    <p className="font-code text-sm">{o.id}</p>
                    <p className="text-xs text-muted-foreground font-body">{o.franchiseName}</p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="text-sm font-semibold font-body">₹{o.totalValue.toLocaleString()}</span>
                    <StatusChip status={o.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-display font-semibold mb-4">Hub Health</h3>
            <div className="space-y-3">
              {dummyHubs.map(h => (
                <div key={h.id} className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <div className="flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${h.status === 'Operational' ? 'bg-accent' : h.status === 'Under Maintenance' ? 'bg-status-ready' : 'bg-muted-foreground'}`} />
                    <div>
                      <p className="text-sm font-body font-medium">{h.name}</p>
                      <p className="text-xs text-muted-foreground font-code">{h.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-body">{h.utilisation}% utilised</p>
                    <p className="text-xs text-muted-foreground font-body">{h.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border p-5">
          <h3 className="font-display font-semibold mb-4">Recent Alerts</h3>
          <div className="space-y-2">
            {dummyNotifications.filter(n => !n.read).map(n => (
              <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg bg-background border-l-4 border-l-primary">
                <div className="flex-1">
                  <p className="text-sm font-body font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground font-body">{n.message}</p>
                </div>
                <span className="text-xs text-muted-foreground font-body whitespace-nowrap">{new Date(n.createdAt).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;

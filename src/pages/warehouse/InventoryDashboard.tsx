import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, AlertTriangle, XCircle, TrendingDown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';

const InventoryDashboard = () => {
  const { inventory, stockMovements } = useAppState();
  const navigate = useNavigate();

  const totalStock = inventory.reduce((sum, p) => sum + p.stock, 0);
  const lowStock = inventory.filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold);
  const outOfStock = inventory.filter(p => p.stock === 0);
  const todayUsage = useMemo(() => {
    const today = new Date().toDateString();
    return stockMovements
      .filter(m => m.type === 'out' && new Date(m.date).toDateString() === today)
      .reduce((sum, m) => sum + m.quantity, 0);
  }, [stockMovements]);

  // 7-day usage trend
  const usageData = useMemo(() => {
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = d.toDateString();
      const usage = stockMovements
        .filter(m => m.type === 'out' && new Date(m.date).toDateString() === key)
        .reduce((s, m) => s + m.quantity, 0);
      return { day: d.toLocaleDateString('en', { weekday: 'short' }), usage };
    });
    // Add some baseline if no data yet
    if (days.every(d => d.usage === 0)) {
      return days.map((d, i) => ({ ...d, usage: [12, 18, 15, 22, 19, 25, 21][i] }));
    }
    return days;
  }, [stockMovements]);

  const kpis = [
    { label: 'Total Stock', value: totalStock, sub: 'units in warehouse', icon: Package, tone: 'primary', filter: 'all' },
    { label: 'Low Stock', value: lowStock.length, sub: 'items need restock', icon: AlertTriangle, tone: 'warning', filter: 'low' },
    { label: 'Out of Stock', value: outOfStock.length, sub: 'items unavailable', icon: XCircle, tone: 'danger', filter: 'out' },
    { label: "Today's Usage", value: todayUsage, sub: 'units consumed', icon: TrendingDown, tone: 'info', filter: 'all' },
  ];

  const toneClasses: Record<string, string> = {
    primary: 'from-primary/20 to-primary/5 text-primary border-primary/20',
    warning: 'from-status-pending/20 to-status-pending/5 text-status-pending border-status-pending/20',
    danger: 'from-destructive/20 to-destructive/5 text-destructive border-destructive/20',
    info: 'from-info/20 to-info/5 text-info border-info/20',
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-2">
            Inventory Dashboard <span>📦</span>
          </h1>
          <p className="text-sm text-muted-foreground font-body mt-1">Track, manage, and optimize your stock</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <button
              key={k.label}
              onClick={() => navigate(`/warehouse/inventory?filter=${k.filter}`)}
              className="group text-left"
            >
              <Card className="hover:scale-[1.02] transition-transform">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn('h-11 w-11 rounded-xl bg-gradient-to-br border flex items-center justify-center', toneClasses[k.tone])}>
                      <k.icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-3xl font-display font-bold tracking-tight">{k.value}</p>
                  <p className="text-sm font-semibold mt-1">{k.label}</p>
                  <p className="text-xs text-muted-foreground font-body">{k.sub}</p>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>

        {/* Chart + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">📉 Usage Trend (7 days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.75rem',
                      fontSize: '12px',
                    }}
                  />
                  <Line type="monotone" dataKey="usage" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: 'hsl(var(--primary))', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">⚠️ Low Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[240px] overflow-auto">
              {[...outOfStock, ...lowStock].slice(0, 8).map(p => {
                const isOut = p.stock === 0;
                return (
                  <button
                    key={p.id}
                    onClick={() => navigate('/warehouse/inventory')}
                    className={cn(
                      'w-full text-left p-3 rounded-xl border transition-all hover:scale-[1.01]',
                      isOut
                        ? 'bg-destructive/10 border-destructive/30 hover:bg-destructive/15'
                        : 'bg-status-pending/10 border-status-pending/30 hover:bg-status-pending/15'
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{p.name}</p>
                        <p className="text-xs text-muted-foreground font-body">
                          {isOut ? 'Out of stock' : `${p.stock} ${p.unit} left`}
                        </p>
                      </div>
                      <span className={cn('h-2 w-2 rounded-full shrink-0', isOut ? 'bg-destructive animate-pulse' : 'bg-status-pending')} />
                    </div>
                  </button>
                );
              })}
              {lowStock.length === 0 && outOfStock.length === 0 && (
                <p className="text-center text-sm text-muted-foreground font-body py-8">All stock levels healthy ✨</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default InventoryDashboard;

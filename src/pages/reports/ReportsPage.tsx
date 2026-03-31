import { AppLayout } from '@/components/AppLayout';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const orderData = [
  { date: 'Mon', orders: 12, fulfilled: 11, cancelled: 1 },
  { date: 'Tue', orders: 15, fulfilled: 14, cancelled: 1 },
  { date: 'Wed', orders: 10, fulfilled: 10, cancelled: 0 },
  { date: 'Thu', orders: 18, fulfilled: 16, cancelled: 2 },
  { date: 'Fri', orders: 22, fulfilled: 20, cancelled: 2 },
  { date: 'Sat', orders: 28, fulfilled: 26, cancelled: 2 },
  { date: 'Sun', orders: 20, fulfilled: 19, cancelled: 1 },
];

const ReportsPage = () => (
  <AppLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[['Total Orders', '125'], ['Fulfilment Rate', '94.4%'], ['Revenue', '₹1,87,600'], ['Cancellations', '7']].map(([l, v]) => (
          <div key={l} className="bg-card rounded-xl border p-5"><p className="text-xs text-muted-foreground font-body">{l}</p><p className="text-2xl font-display font-bold mt-1">{v}</p></div>
        ))}
      </div>
      <div className="bg-card rounded-xl border p-5">
        <h3 className="font-display font-semibold mb-4">Order Trends (Weekly)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orderData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" /><YAxis />
            <Tooltip />
            <Bar dataKey="fulfilled" name="Fulfilled" fill="hsl(var(--accent))" radius={[4,4,0,0]} />
            <Bar dataKey="cancelled" name="Cancelled" fill="hsl(var(--destructive))" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </AppLayout>
);

export default ReportsPage;

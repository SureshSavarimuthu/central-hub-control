import { AppLayout } from '@/components/AppLayout';
import { dummyTransfers } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusColors: Record<string, string> = { Requested: 'bg-primary/15 text-primary', Approved: 'bg-accent/15 text-accent', 'In Transit': 'bg-info/15 text-info', Received: 'bg-status-delivered/15 text-status-delivered', Rejected: 'bg-destructive/15 text-destructive' };

const StockTransferList = () => (
  <AppLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Stock Transfers</h1>
        <Button size="sm"><Plus className="h-3 w-3 mr-1" />New Transfer</Button>
      </div>
      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b bg-muted/30">
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">ID</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">From</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">To</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Items</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Reason</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Status</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Date</th>
          </tr></thead>
          <tbody>
            {dummyTransfers.map(t => (
              <tr key={t.id} className="border-b hover:bg-muted/10">
                <td className="p-3"><Link to={`/stock-transfer/${t.id}`} className="font-code text-sm text-primary hover:underline">{t.id}</Link></td>
                <td className="p-3 text-sm font-body">{t.sourceHubName}</td>
                <td className="p-3 text-sm font-body">{t.destHubName}</td>
                <td className="p-3 text-xs font-body">{t.items.length} item{t.items.length > 1 ? 's' : ''}</td>
                <td className="p-3 text-xs font-body">{t.reason}</td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[t.status]}`}>{t.status}</span></td>
                <td className="p-3 text-xs font-body">{new Date(t.requestedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </AppLayout>
);

export default StockTransferList;

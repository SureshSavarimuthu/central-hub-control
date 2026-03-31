import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight } from 'lucide-react';

const freshStock = [
  { id: 'fs1', product: 'Butter Croissant', quantity: 78, batchId: 'B-002', producedAt: '2024-03-31T07:30:00Z', transferred: false, expiresIn: '8 hrs' },
  { id: 'fs2', product: 'Whole Wheat Bread', quantity: 45, batchId: 'B-002', producedAt: '2024-03-31T07:30:00Z', transferred: true, expiresIn: '24 hrs' },
  { id: 'fs3', product: 'Paneer Puff', quantity: 0, batchId: 'B-003', producedAt: '2024-03-31T09:00:00Z', transferred: false, expiresIn: '6 hrs' },
];

const KitchenFreshStock = () => (
  <AppLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Fresh Stock</h1>
      <p className="text-muted-foreground font-body text-sm">Items produced today at this kitchen</p>
      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b bg-muted/30">
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Product</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Batch</th>
            <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Qty</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Produced</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Expires In</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Status</th>
            <th className="p-3"></th>
          </tr></thead>
          <tbody>
            {freshStock.map(fs => (
              <tr key={fs.id} className="border-b">
                <td className="p-3 text-sm font-body">{fs.product}</td>
                <td className="p-3 font-code text-xs">{fs.batchId}</td>
                <td className="p-3 text-right text-sm font-body">{fs.quantity}</td>
                <td className="p-3 text-xs font-body">{new Date(fs.producedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td className="p-3 text-xs font-body">{fs.expiresIn}</td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${fs.transferred ? 'bg-accent/15 text-accent' : 'bg-primary/15 text-primary'}`}>{fs.transferred ? 'Transferred' : 'Available'}</span></td>
                <td className="p-3">{!fs.transferred && fs.quantity > 0 && <Button variant="outline" size="sm"><ArrowLeftRight className="h-3 w-3 mr-1" />Transfer</Button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </AppLayout>
);

export default KitchenFreshStock;

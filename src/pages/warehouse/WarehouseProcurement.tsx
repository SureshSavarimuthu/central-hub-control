import { AppLayout } from '@/components/AppLayout';
import { dummyProcurements } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const statusColors: Record<string, string> = { Draft: 'bg-muted text-muted-foreground', Submitted: 'bg-info/15 text-info', Confirmed: 'bg-accent/15 text-accent', Received: 'bg-status-delivered/15 text-status-delivered', Cancelled: 'bg-destructive/15 text-destructive' };

const WarehouseProcurement = () => (
  <AppLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Procurement Orders</h1>
        <Button size="sm"><Plus className="h-3 w-3 mr-1" />New PO</Button>
      </div>
      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b bg-muted/30">
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">PO Number</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Vendor</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Material</th>
            <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Qty</th>
            <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Unit Price</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">ETA</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Status</th>
          </tr></thead>
          <tbody>
            {dummyProcurements.map(po => (
              <tr key={po.id} className="border-b hover:bg-muted/10">
                <td className="p-3 font-code text-sm">{po.poNumber}</td>
                <td className="p-3 text-sm font-body">{po.vendorName}</td>
                <td className="p-3 text-sm font-body">{po.material}</td>
                <td className="p-3 text-right text-sm font-body">{po.quantity}</td>
                <td className="p-3 text-right text-sm font-body">₹{po.unitPrice}</td>
                <td className="p-3 text-sm font-body">{po.expectedDelivery}</td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[po.status]}`}>{po.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </AppLayout>
);

export default WarehouseProcurement;

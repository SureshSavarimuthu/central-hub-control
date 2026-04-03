import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, X, Truck, Package } from 'lucide-react';

const StockTransferDetail = () => {
  const { id } = useParams();
  const { transfers, updateTransferStatus } = useAppState();
  const transfer = transfers.find(t => t.id === id);
  if (!transfer) return <AppLayout><p className="font-body text-muted-foreground">Transfer not found</p></AppLayout>;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/stock-transfer"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
          <div>
            <h1 className="text-2xl font-display font-bold">{transfer.id}</h1>
            <p className="text-muted-foreground font-body text-sm">{transfer.reason}</p>
          </div>
          <span className={`ml-auto text-xs px-2.5 py-1 rounded-full font-semibold ${
            transfer.status === 'Requested' ? 'bg-primary/15 text-primary' :
            transfer.status === 'Approved' ? 'bg-accent/15 text-accent' :
            transfer.status === 'In Transit' ? 'bg-info/15 text-info' :
            transfer.status === 'Received' ? 'bg-accent/15 text-accent' :
            'bg-destructive/15 text-destructive'
          }`}>{transfer.status}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl border p-5">
            <p className="text-xs text-muted-foreground font-body mb-1">Source Hub</p>
            <p className="font-body font-semibold">{transfer.sourceHubName}</p>
          </div>
          <div className="bg-card rounded-xl border p-5">
            <p className="text-xs text-muted-foreground font-body mb-1">Destination Hub</p>
            <p className="font-body font-semibold">{transfer.destHubName}</p>
          </div>
        </div>

        <div className="bg-card rounded-xl border p-5">
          <h3 className="font-display font-semibold mb-3">Items</h3>
          <table className="w-full">
            <thead><tr className="border-b"><th className="text-left p-2 text-xs font-body text-muted-foreground">Product</th><th className="text-right p-2 text-xs font-body text-muted-foreground">Qty</th><th className="text-left p-2 text-xs font-body text-muted-foreground">Unit</th></tr></thead>
            <tbody>{transfer.items.map((it, i) => <tr key={i} className="border-b"><td className="p-2 text-sm font-body">{it.productName}</td><td className="p-2 text-right text-sm font-body">{it.quantity}</td><td className="p-2 text-sm font-body">{it.unit}</td></tr>)}</tbody>
          </table>
        </div>

        <div className="bg-card rounded-xl border p-5 space-y-2">
          <div className="flex justify-between text-sm font-body"><span className="text-muted-foreground">Requested by</span><span>{transfer.requestedBy}</span></div>
          <div className="flex justify-between text-sm font-body"><span className="text-muted-foreground">Requested at</span><span>{new Date(transfer.requestedAt).toLocaleString()}</span></div>
          {transfer.notes && <div className="flex justify-between text-sm font-body"><span className="text-muted-foreground">Notes</span><span>{transfer.notes}</span></div>}
        </div>

        <div className="flex gap-3">
          {transfer.status === 'Requested' && (
            <>
              <Button size="sm" onClick={() => updateTransferStatus(transfer.id, 'Approved')}><Check className="h-3 w-3 mr-1" />Approve</Button>
              <Button variant="outline" size="sm" className="text-destructive" onClick={() => updateTransferStatus(transfer.id, 'Rejected')}><X className="h-3 w-3 mr-1" />Reject</Button>
            </>
          )}
          {transfer.status === 'Approved' && (
            <Button size="sm" onClick={() => updateTransferStatus(transfer.id, 'In Transit')}><Truck className="h-3 w-3 mr-1" />Mark In Transit</Button>
          )}
          {transfer.status === 'In Transit' && (
            <Button size="sm" onClick={() => updateTransferStatus(transfer.id, 'Received')}><Package className="h-3 w-3 mr-1" />Mark Received</Button>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default StockTransferDetail;

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dummyHubs } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';

const statusColors: Record<string, string> = { Requested: 'bg-primary/15 text-primary', Approved: 'bg-accent/15 text-accent', 'In Transit': 'bg-info/15 text-info', Received: 'bg-status-delivered/15 text-status-delivered', Rejected: 'bg-destructive/15 text-destructive' };

const StockTransferList = () => {
  const { transfers, addTransfer } = useAppState();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ sourceHubId: '', destHubId: '', productName: '', quantity: 0, unit: '', reason: '', notes: '' });

  const hubs = dummyHubs.filter(h => h.status === 'Operational');

  const handleSubmit = () => {
    const source = hubs.find(h => h.id === form.sourceHubId);
    const dest = hubs.find(h => h.id === form.destHubId);
    if (!source || !dest) return;
    addTransfer({
      sourceHubId: source.id, sourceHubName: source.name,
      destHubId: dest.id, destHubName: dest.name,
      items: [{ productName: form.productName, quantity: form.quantity, unit: form.unit }],
      reason: form.reason, status: 'Requested',
      requestedBy: user?.name || '', requestedAt: new Date().toISOString(), notes: form.notes,
    });
    setOpen(false);
    setForm({ sourceHubId: '', destHubId: '', productName: '', quantity: 0, unit: '', reason: '', notes: '' });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Stock Transfers</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button size="sm"><Plus className="h-3 w-3 mr-1" />New Transfer</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle className="font-display">New Stock Transfer</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label className="font-body">Source Hub</Label>
                  <Select value={form.sourceHubId} onValueChange={v => setForm(f => ({ ...f, sourceHubId: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select source" /></SelectTrigger>
                    <SelectContent>{hubs.map(h => <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label className="font-body">Destination Hub</Label>
                  <Select value={form.destHubId} onValueChange={v => setForm(f => ({ ...f, destHubId: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select destination" /></SelectTrigger>
                    <SelectContent>{hubs.filter(h => h.id !== form.sourceHubId).map(h => <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label className="font-body">Product Name</Label><Input value={form.productName} onChange={e => setForm(f => ({ ...f, productName: e.target.value }))} className="mt-1" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="font-body">Quantity</Label><Input type="number" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: +e.target.value }))} className="mt-1" /></div>
                  <div><Label className="font-body">Unit</Label><Input value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} className="mt-1" placeholder="kg, pieces..." /></div>
                </div>
                <div><Label className="font-body">Reason</Label><Input value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} className="mt-1" placeholder="Production Need, Surplus..." /></div>
                <div><Label className="font-body">Notes</Label><Input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="mt-1" /></div>
                <Button onClick={handleSubmit} disabled={!form.sourceHubId || !form.destHubId || !form.productName} className="w-full">Create Transfer</Button>
              </div>
            </DialogContent>
          </Dialog>
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
              {transfers.map(t => (
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
};

export default StockTransferList;

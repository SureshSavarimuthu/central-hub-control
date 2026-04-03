import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const statusColors: Record<string, string> = { Draft: 'bg-muted text-muted-foreground', Submitted: 'bg-info/15 text-info', Confirmed: 'bg-accent/15 text-accent', Received: 'bg-status-delivered/15 text-status-delivered', Cancelled: 'bg-destructive/15 text-destructive' };
const statusFlow = ['Draft', 'Submitted', 'Confirmed', 'Received'];

const WarehouseProcurement = () => {
  const { procurements, addProcurement, updateProcurementStatus, deleteProcurement } = useAppState();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ poNumber: '', vendorName: '', material: '', quantity: 0, unitPrice: 0, expectedDelivery: '', status: 'Draft' as const });

  const handleSubmit = () => {
    const poNum = form.poNumber || `PO-2024-${String(procurements.length + 148).padStart(4, '0')}`;
    addProcurement({ ...form, poNumber: poNum });
    setOpen(false);
    setForm({ poNumber: '', vendorName: '', material: '', quantity: 0, unitPrice: 0, expectedDelivery: '', status: 'Draft' });
  };

  const getNextStatus = (current: string) => {
    const idx = statusFlow.indexOf(current);
    return idx >= 0 && idx < statusFlow.length - 1 ? statusFlow[idx + 1] : null;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Procurement Orders</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button size="sm"><Plus className="h-3 w-3 mr-1" />New PO</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle className="font-display">New Procurement Order</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label className="font-body">Vendor Name</Label><Input value={form.vendorName} onChange={e => setForm(f => ({ ...f, vendorName: e.target.value }))} className="mt-1" /></div>
                <div><Label className="font-body">Material</Label><Input value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))} className="mt-1" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="font-body">Quantity</Label><Input type="number" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: +e.target.value }))} className="mt-1" /></div>
                  <div><Label className="font-body">Unit Price (₹)</Label><Input type="number" value={form.unitPrice} onChange={e => setForm(f => ({ ...f, unitPrice: +e.target.value }))} className="mt-1" /></div>
                </div>
                <div><Label className="font-body">Expected Delivery</Label><Input type="date" value={form.expectedDelivery} onChange={e => setForm(f => ({ ...f, expectedDelivery: e.target.value }))} className="mt-1" /></div>
                <Button onClick={handleSubmit} disabled={!form.vendorName || !form.material} className="w-full">Create PO</Button>
              </div>
            </DialogContent>
          </Dialog>
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
              <th className="p-3 text-xs font-body font-semibold text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {procurements.map(po => {
                const next = getNextStatus(po.status);
                return (
                  <tr key={po.id} className="border-b hover:bg-muted/10">
                    <td className="p-3 font-code text-sm">{po.poNumber}</td>
                    <td className="p-3 text-sm font-body">{po.vendorName}</td>
                    <td className="p-3 text-sm font-body">{po.material}</td>
                    <td className="p-3 text-right text-sm font-body">{po.quantity}</td>
                    <td className="p-3 text-right text-sm font-body">₹{po.unitPrice}</td>
                    <td className="p-3 text-sm font-body">{po.expectedDelivery}</td>
                    <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[po.status]}`}>{po.status}</span></td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {next && po.status !== 'Cancelled' && (
                          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => updateProcurementStatus(po.id, next as any)}>{next}</Button>
                        )}
                        {po.status === 'Draft' && (
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteProcurement(po.id)}><Trash2 className="h-3 w-3" /></Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default WarehouseProcurement;

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PackageSearch, Plus, Trash2, Edit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const KitchenRawMaterials = () => {
  const { rawMaterials, addRawMaterial, updateRawMaterial, deleteRawMaterial, restockRequests, addRestockRequest, updateRestockStatus } = useAppState();
  const [restockOpen, setRestockOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [restockForm, setRestockForm] = useState({ materialName: '', quantity: 0, unit: '', notes: '' });
  const [materialForm, setMaterialForm] = useState({ name: '', current: 0, min: 0, unit: '', consumption: 0 });

  const handleRestock = (m?: typeof rawMaterials[0]) => {
    if (m) setRestockForm({ materialName: m.name, quantity: m.min - m.current, unit: m.unit, notes: '' });
    setRestockOpen(true);
  };

  const submitRestock = () => {
    addRestockRequest(restockForm);
    setRestockOpen(false);
    setRestockForm({ materialName: '', quantity: 0, unit: '', notes: '' });
  };

  const handleEdit = (m: typeof rawMaterials[0]) => {
    setEditId(m.id);
    setMaterialForm({ name: m.name, current: m.current, min: m.min, unit: m.unit, consumption: m.consumption });
  };

  const submitEdit = () => {
    if (editId) {
      updateRawMaterial(editId, materialForm);
      setEditId(null);
    }
  };

  const submitAdd = () => {
    addRawMaterial(materialForm);
    setAddOpen(false);
    setMaterialForm({ name: '', current: 0, min: 0, unit: '', consumption: 0 });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Raw Materials</h1>
          <div className="flex gap-2">
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild><Button variant="outline" size="sm"><Plus className="h-3 w-3 mr-1" />Add Material</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle className="font-display">Add Raw Material</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div><Label className="font-body">Name</Label><Input value={materialForm.name} onChange={e => setMaterialForm(f => ({ ...f, name: e.target.value }))} className="mt-1" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label className="font-body">Current Stock</Label><Input type="number" value={materialForm.current} onChange={e => setMaterialForm(f => ({ ...f, current: +e.target.value }))} className="mt-1" /></div>
                    <div><Label className="font-body">Min Required</Label><Input type="number" value={materialForm.min} onChange={e => setMaterialForm(f => ({ ...f, min: +e.target.value }))} className="mt-1" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label className="font-body">Unit</Label><Input value={materialForm.unit} onChange={e => setMaterialForm(f => ({ ...f, unit: e.target.value }))} className="mt-1" /></div>
                    <div><Label className="font-body">Daily Usage</Label><Input type="number" value={materialForm.consumption} onChange={e => setMaterialForm(f => ({ ...f, consumption: +e.target.value }))} className="mt-1" /></div>
                  </div>
                  <Button onClick={submitAdd} disabled={!materialForm.name} className="w-full">Add</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button size="sm" onClick={() => handleRestock()}><PackageSearch className="h-3 w-3 mr-1" />Request Restock</Button>
          </div>
        </div>

        {/* Restock dialog */}
        <Dialog open={restockOpen} onOpenChange={setRestockOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Request Restock</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label className="font-body">Material</Label><Input value={restockForm.materialName} onChange={e => setRestockForm(f => ({ ...f, materialName: e.target.value }))} className="mt-1" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="font-body">Quantity</Label><Input type="number" value={restockForm.quantity} onChange={e => setRestockForm(f => ({ ...f, quantity: +e.target.value }))} className="mt-1" /></div>
                <div><Label className="font-body">Unit</Label><Input value={restockForm.unit} onChange={e => setRestockForm(f => ({ ...f, unit: e.target.value }))} className="mt-1" /></div>
              </div>
              <div><Label className="font-body">Notes</Label><Input value={restockForm.notes} onChange={e => setRestockForm(f => ({ ...f, notes: e.target.value }))} className="mt-1" /></div>
              <Button onClick={submitRestock} disabled={!restockForm.materialName || !restockForm.quantity} className="w-full">Submit Request</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit dialog */}
        <Dialog open={!!editId} onOpenChange={() => setEditId(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Edit Material</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label className="font-body">Name</Label><Input value={materialForm.name} onChange={e => setMaterialForm(f => ({ ...f, name: e.target.value }))} className="mt-1" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="font-body">Current Stock</Label><Input type="number" value={materialForm.current} onChange={e => setMaterialForm(f => ({ ...f, current: +e.target.value }))} className="mt-1" /></div>
                <div><Label className="font-body">Min Required</Label><Input type="number" value={materialForm.min} onChange={e => setMaterialForm(f => ({ ...f, min: +e.target.value }))} className="mt-1" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="font-body">Unit</Label><Input value={materialForm.unit} onChange={e => setMaterialForm(f => ({ ...f, unit: e.target.value }))} className="mt-1" /></div>
                <div><Label className="font-body">Daily Usage</Label><Input type="number" value={materialForm.consumption} onChange={e => setMaterialForm(f => ({ ...f, consumption: +e.target.value }))} className="mt-1" /></div>
              </div>
              <Button onClick={submitEdit} className="w-full">Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="bg-card rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30">
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Material</th>
              <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Current</th>
              <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Min</th>
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Unit</th>
              <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Daily Use</th>
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Status</th>
              <th className="p-3 text-xs font-body font-semibold text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {rawMaterials.map(m => {
                const isLow = m.current < m.min;
                return (
                  <tr key={m.id} className={`border-b ${isLow ? 'bg-destructive/5' : ''}`}>
                    <td className="p-3 text-sm font-body font-medium">{m.name}</td>
                    <td className={`p-3 text-right text-sm font-body ${isLow ? 'text-destructive font-semibold' : ''}`}>{m.current}</td>
                    <td className="p-3 text-right text-sm font-body text-muted-foreground">{m.min}</td>
                    <td className="p-3 text-sm font-body">{m.unit}</td>
                    <td className="p-3 text-right text-sm font-body">{m.consumption}</td>
                    <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${isLow ? 'bg-destructive/15 text-destructive' : 'bg-accent/15 text-accent'}`}>{isLow ? 'Low' : 'OK'}</span></td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEdit(m)}><Edit2 className="h-3 w-3" /></Button>
                        {isLow && <Button variant="ghost" size="icon" className="h-7 w-7 text-primary" onClick={() => handleRestock(m)}><PackageSearch className="h-3 w-3" /></Button>}
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteRawMaterial(m.id)}><Trash2 className="h-3 w-3" /></Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {restockRequests.length > 0 && (
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-display font-semibold mb-3">Restock Requests</h3>
            <div className="space-y-2">
              {restockRequests.map(r => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-background border">
                  <div>
                    <p className="text-sm font-body font-medium">{r.materialName} — {r.quantity} {r.unit}</p>
                    <p className="text-xs text-muted-foreground font-body">{r.id} · {new Date(r.requestedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${r.status === 'Pending' ? 'bg-primary/15 text-primary' : r.status === 'Approved' ? 'bg-accent/15 text-accent' : r.status === 'Delivered' ? 'bg-accent/15 text-accent' : 'bg-destructive/15 text-destructive'}`}>{r.status}</span>
                    {r.status === 'Pending' && (
                      <Button variant="ghost" size="sm" onClick={() => updateRestockStatus(r.id, 'Approved')}>Approve</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default KitchenRawMaterials;

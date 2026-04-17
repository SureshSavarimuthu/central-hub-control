import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Truck, Plus, Edit, Trash2, Search, Phone, Mail } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';
import type { Supplier } from '@/contexts/AppStateContext';

const supplierSchema = z.object({
  name: z.string().trim().min(1, 'Name required').max(100),
  contact: z.string().trim().min(1, 'Contact required').max(20),
  email: z.string().trim().email('Invalid email').or(z.literal('')),
});

const SupplierManagement = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useAppState();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [form, setForm] = useState({ name: '', contact: '', email: '', itemsSupplied: '', notes: '' });

  const filtered = suppliers.filter(s =>
    !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.itemsSupplied.some(i => i.toLowerCase().includes(search.toLowerCase()))
  );

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', contact: '', email: '', itemsSupplied: '', notes: '' });
    setOpen(true);
  };

  const openEdit = (s: Supplier) => {
    setEditing(s);
    setForm({ name: s.name, contact: s.contact, email: s.email, itemsSupplied: s.itemsSupplied.join(', '), notes: s.notes });
    setOpen(true);
  };

  const handleSubmit = () => {
    const result = supplierSchema.safeParse({ name: form.name, contact: form.contact, email: form.email });
    if (!result.success) return toast.error(result.error.errors[0].message);
    const data = {
      name: form.name.trim(),
      contact: form.contact.trim(),
      email: form.email.trim(),
      itemsSupplied: form.itemsSupplied.split(',').map(s => s.trim()).filter(Boolean),
      notes: form.notes.trim(),
    };
    if (editing) updateSupplier(editing.id, data);
    else addSupplier(data);
    setOpen(false);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-2">
              Suppliers <Truck className="h-7 w-7 text-primary" />
            </h1>
            <p className="text-sm text-muted-foreground font-body mt-1">Manage your vendor directory</p>
          </div>
          <Button onClick={openNew}>
            <Plus className="h-4 w-4 mr-1" /> Add Supplier
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search suppliers or items..." className="pl-9" />
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-card/95 backdrop-blur z-10">
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground">Name</th>
                    <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground">Contact</th>
                    <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground">Items Supplied</th>
                    <th className="text-right p-4 text-xs font-body font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={4} className="text-center py-12 text-sm text-muted-foreground font-body">No suppliers found</td></tr>
                  ) : filtered.map(s => (
                    <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <p className="font-semibold text-sm">{s.name}</p>
                        {s.notes && <p className="text-xs text-muted-foreground font-body mt-0.5">{s.notes}</p>}
                      </td>
                      <td className="p-4 text-sm font-body">
                        <div className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-muted-foreground" />{s.contact}</div>
                        {s.email && <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5"><Mail className="h-3 w-3" />{s.email}</div>}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {s.itemsSupplied.map((item, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full text-[11px] bg-primary/10 text-primary border border-primary/20 font-body">{item}</span>
                          ))}
                          {s.itemsSupplied.length === 0 && <span className="text-xs text-muted-foreground">—</span>}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(s)}>
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => { if (confirm(`Delete ${s.name}?`)) deleteSupplier(s.id); }}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">{editing ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
            <DialogDescription>Enter supplier contact details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label>Name *</Label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} maxLength={100} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Contact *</Label>
                <Input value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} maxLength={20} />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} maxLength={255} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Items Supplied (comma-separated)</Label>
              <Input value={form.itemsSupplied} onChange={e => setForm({ ...form, itemsSupplied: e.target.value })} placeholder="Milk, Butter, Cheese" />
            </div>
            <div className="grid gap-2">
              <Label>Notes</Label>
              <Input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} maxLength={200} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>{editing ? 'Update' : 'Save'} ✅</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default SupplierManagement;

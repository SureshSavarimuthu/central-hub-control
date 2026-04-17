import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppState } from '@/contexts/AppStateContext';
import { z } from 'zod';
import { toast } from 'sonner';
import { Sprout } from 'lucide-react';

const itemSchema = z.object({
  name: z.string().trim().min(1, 'Name required').max(100),
  category: z.string().min(1, 'Category required'),
  unit: z.string().min(1, 'Unit required'),
  stock: z.number().min(0, 'No negative stock'),
  lowStockThreshold: z.number().min(0, 'No negative threshold'),
  sku: z.string().max(50),
  rack: z.string().max(50),
  expiry: z.string(),
  supplierId: z.string().optional(),
  price: z.number().min(0),
});

const categories = ['Raw', 'Pack', 'Beverage', 'Dairy', 'Spice', 'Other'];
const unitsByCategory: Record<string, string[]> = {
  Raw: ['kg', 'g', 'L', 'ml'],
  Pack: ['Box', 'piece', 'pack'],
  Beverage: ['L', 'ml', 'bottle'],
  Dairy: ['L', 'ml', 'kg'],
  Spice: ['kg', 'g'],
  Other: ['piece', 'unit', 'kg', 'L'],
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editId?: string | null;
}

export const InventoryItemDialog = ({ open, onOpenChange, editId }: Props) => {
  const { inventory, suppliers, addInventoryItem, updateInventoryItem } = useAppState();
  const editing = editId ? inventory.find(i => i.id === editId) : null;

  const [form, setForm] = useState({
    name: '',
    category: 'Raw',
    unit: 'kg',
    stock: 0,
    lowStockThreshold: 10,
    sku: '',
    rack: 'A1-R01',
    expiry: '2025-12-31',
    supplierId: '',
    price: 0,
  });

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        category: editing.category,
        unit: editing.unit,
        stock: editing.stock,
        lowStockThreshold: editing.lowStockThreshold,
        sku: editing.sku,
        rack: editing.rack,
        expiry: editing.expiry,
        supplierId: editing.supplierId || '',
        price: editing.price,
      });
    } else {
      setForm({ name: '', category: 'Raw', unit: 'kg', stock: 0, lowStockThreshold: 10, sku: '', rack: 'A1-R01', expiry: '2025-12-31', supplierId: '', price: 0 });
    }
  }, [editing, open]);

  const handleSubmit = () => {
    const result = itemSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    const data = { ...form, locationId: 'h3', supplierId: form.supplierId || undefined };
    if (editId) {
      updateInventoryItem(editId, data);
    } else {
      addInventoryItem(data);
    }
    onOpenChange(false);
  };

  const availableUnits = unitsByCategory[form.category] || ['unit'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Sprout className="h-5 w-5 text-primary" />
            {editId ? 'Edit Inventory Item' : 'Add Inventory Item'}
          </DialogTitle>
          <DialogDescription>Enter item details and stock configuration</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label>Item Name *</Label>
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Milk" maxLength={100} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Category *</Label>
              <Select value={form.category} onValueChange={v => setForm({ ...form, category: v, unit: unitsByCategory[v]?.[0] || 'unit' })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Unit *</Label>
              <Select value={form.unit} onValueChange={v => setForm({ ...form, unit: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {availableUnits.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Opening Stock *</Label>
              <Input type="number" min={0} value={form.stock} onChange={e => setForm({ ...form, stock: Math.max(0, parseInt(e.target.value) || 0) })} />
            </div>
            <div className="grid gap-2">
              <Label>Reorder Level *</Label>
              <Input type="number" min={0} value={form.lowStockThreshold} onChange={e => setForm({ ...form, lowStockThreshold: Math.max(0, parseInt(e.target.value) || 0) })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>SKU</Label>
              <Input value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} placeholder="WH-RM-001" maxLength={50} />
            </div>
            <div className="grid gap-2">
              <Label>Rack Location</Label>
              <Input value={form.rack} onChange={e => setForm({ ...form, rack: e.target.value })} placeholder="A1-R01" maxLength={50} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Expiry Date</Label>
              <Input type="date" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Unit Price (₹)</Label>
              <Input type="number" min={0} step="0.01" value={form.price} onChange={e => setForm({ ...form, price: Math.max(0, parseFloat(e.target.value) || 0) })} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Supplier</Label>
            <Select value={form.supplierId || 'none'} onValueChange={v => setForm({ ...form, supplierId: v === 'none' ? '' : v })}>
              <SelectTrigger><SelectValue placeholder="Select supplier" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">— None —</SelectItem>
                {suppliers.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{editId ? 'Update' : 'Save'} ✅</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

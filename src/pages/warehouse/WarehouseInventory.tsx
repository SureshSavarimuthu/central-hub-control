import { useState, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Upload, Minus, Plus, Edit, Trash2, ArrowDownToLine, ArrowUpFromLine, Package } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { InventoryItemDialog } from './InventoryItemDialog';
import { useNavigate } from 'react-router-dom';

const WarehouseInventory = () => {
  const { inventory, adjustStock, importInventoryCSV, deleteInventoryItem } = useAppState();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>(searchParams.get('filter') || 'all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const products = useMemo(() => {
    return inventory.filter(p => {
      const matchSearch = search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        filter === 'all' ? true :
        filter === 'low' ? (p.stock > 0 && p.stock <= p.lowStockThreshold) :
        filter === 'out' ? p.stock === 0 :
        filter === 'ok' ? p.stock > p.lowStockThreshold : true;
      return matchSearch && matchFilter;
    });
  }, [inventory, search, filter]);

  const getStatus = (p: typeof inventory[0]) => {
    if (p.stock === 0) return { label: 'Out', color: 'text-destructive', bg: 'bg-destructive/10', dot: 'bg-destructive', emoji: '🔴' };
    if (p.stock <= p.lowStockThreshold) return { label: 'Low', color: 'text-status-pending', bg: 'bg-status-pending/10', dot: 'bg-status-pending', emoji: '🟡' };
    return { label: 'OK', color: 'text-success', bg: 'bg-success/10', dot: 'bg-success', emoji: '🟢' };
  };

  const handleEdit = (id: string) => { setEditId(id); setDialogOpen(true); };
  const handleAdd = () => { setEditId(null); setDialogOpen(true); };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete "${name}" from inventory?`)) deleteInventoryItem(id);
  };

  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string;
        const lines = text.split('\n').filter(l => l.trim());
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const nameIdx = headers.indexOf('name');
        const skuIdx = headers.indexOf('sku');
        const stockIdx = headers.indexOf('stock');
        const unitIdx = headers.indexOf('unit');
        if (nameIdx === -1 || stockIdx === -1) return toast.error('CSV must have "name" and "stock" columns');
        const imported = lines.slice(1).map((line, i) => {
          const cols = line.split(',').map(c => c.trim());
          return {
            id: `csv-${Date.now()}-${i}`,
            name: cols[nameIdx] || '', sku: skuIdx >= 0 ? cols[skuIdx] : '', rack: 'Unassigned',
            stock: parseInt(cols[stockIdx]) || 0, unit: unitIdx >= 0 ? cols[unitIdx] : 'unit',
            expiry: '2024-12-31', lowStockThreshold: 10, locationId: 'h3', category: 'Imported', price: 0,
          };
        }).filter(p => p.name);
        importInventoryCSV([...inventory, ...imported]);
      } catch { toast.error('Failed to parse CSV'); }
    };
    reader.readAsText(file);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-2">
              Inventory <Package className="h-7 w-7 text-primary" />
            </h1>
            <p className="text-sm text-muted-foreground font-body mt-1">{inventory.length} items tracked</p>
          </div>
          <div className="flex gap-2">
            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleCSVImport} />
            <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
              <Upload className="h-3.5 w-3.5 mr-1.5" /> Import CSV
            </Button>
            <Button size="sm" onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or SKU..." className="pl-9" />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All items</SelectItem>
              <SelectItem value="ok">🟢 In stock</SelectItem>
              <SelectItem value="low">🟡 Low stock</SelectItem>
              <SelectItem value="out">🔴 Out of stock</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => navigate('/warehouse/stock-movement')}>
            <ArrowDownToLine className="h-3.5 w-3.5 mr-1" /> Stock In/Out
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-card/95 backdrop-blur z-10">
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground">Item</th>
                    <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground">Category</th>
                    <th className="text-right p-4 text-xs font-body font-semibold text-muted-foreground">Qty</th>
                    <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground">Unit</th>
                    <th className="text-left p-4 text-xs font-body font-semibold text-muted-foreground">Status</th>
                    <th className="text-right p-4 text-xs font-body font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-12 text-sm text-muted-foreground font-body">No items match</td></tr>
                  ) : products.map(p => {
                    const status = getStatus(p);
                    return (
                      <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <p className="text-sm font-semibold">{p.name}</p>
                          <p className="text-[11px] text-muted-foreground font-code">{p.sku || '—'} • {p.rack}</p>
                        </td>
                        <td className="p-4 text-sm font-body text-muted-foreground">{p.category}</td>
                        <td className={cn('p-4 text-right text-sm font-body font-semibold', status.color)}>{p.stock}</td>
                        <td className="p-4 text-sm font-body text-muted-foreground">{p.unit}</td>
                        <td className="p-4">
                          <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold', status.bg, status.color)}>
                            <span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />
                            {status.label}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 justify-end">
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => adjustStock(p.id, -1)} title="Decrease"><Minus className="h-3 w-3" /></Button>
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => adjustStock(p.id, 1)} title="Increase"><Plus className="h-3 w-3" /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 ml-1" onClick={() => handleEdit(p.id)} title="Edit"><Edit className="h-3.5 w-3.5" /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10" onClick={() => handleDelete(p.id, p.name)} title="Delete"><Trash2 className="h-3.5 w-3.5" /></Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <InventoryItemDialog open={dialogOpen} onOpenChange={setDialogOpen} editId={editId} />
    </AppLayout>
  );
};

export default WarehouseInventory;

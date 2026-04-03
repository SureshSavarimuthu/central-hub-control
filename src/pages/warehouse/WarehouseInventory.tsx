import { useState, useRef } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Upload, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

const WarehouseInventory = () => {
  const { inventory, adjustStock, importInventoryCSV } = useAppState();
  const [search, setSearch] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const products = inventory.filter(p => search === '' || p.name.toLowerCase().includes(search.toLowerCase()));

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

        if (nameIdx === -1 || stockIdx === -1) {
          toast.error('CSV must have "name" and "stock" columns');
          return;
        }

        const imported = lines.slice(1).map((line, i) => {
          const cols = line.split(',').map(c => c.trim());
          return {
            id: `csv-${i}`,
            name: cols[nameIdx] || '',
            sku: skuIdx >= 0 ? cols[skuIdx] : '',
            rack: 'Unassigned',
            stock: parseInt(cols[stockIdx]) || 0,
            unit: unitIdx >= 0 ? cols[unitIdx] : 'unit',
            expiry: '2024-12-31',
            lowStockThreshold: 10,
            locationId: 'h3',
            category: 'Imported',
            price: 0,
          };
        }).filter(p => p.name);

        importInventoryCSV([...inventory, ...imported]);
      } catch {
        toast.error('Failed to parse CSV');
      }
    };
    reader.readAsText(file);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Inventory</h1>
          <div>
            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleCSVImport} />
            <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
              <Upload className="h-3 w-3 mr-1" />CSV Import
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search inventory..." className="pl-9 max-w-md" />
        </div>
        <div className="bg-card rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30">
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Product</th>
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">SKU</th>
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Rack</th>
              <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Qty</th>
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Unit</th>
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Expiry</th>
              <th className="p-3 text-xs font-body font-semibold text-muted-foreground">Adjust</th>
            </tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className={`border-b ${p.stock <= p.lowStockThreshold ? 'bg-destructive/5' : ''}`}>
                  <td className="p-3 text-sm font-body font-medium">{p.name}</td>
                  <td className="p-3 font-code text-xs">{p.sku}</td>
                  <td className="p-3 text-xs font-code">{p.rack}</td>
                  <td className={`p-3 text-right text-sm font-body ${p.stock <= p.lowStockThreshold ? 'text-destructive font-semibold' : ''}`}>{p.stock}</td>
                  <td className="p-3 text-sm font-body">{p.unit}</td>
                  <td className="p-3 text-xs font-body">{p.expiry}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => adjustStock(p.id, -1)}><Minus className="h-3 w-3" /></Button>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => adjustStock(p.id, 1)}><Plus className="h-3 w-3" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default WarehouseInventory;

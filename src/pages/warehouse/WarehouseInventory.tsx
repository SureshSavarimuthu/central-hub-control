import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { dummyProducts } from '@/data/dummy';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Upload, Minus, Plus } from 'lucide-react';

const WarehouseInventory = () => {
  const [search, setSearch] = useState('');
  const products = dummyProducts.filter(p => p.locationId === 'h3' && (search === '' || p.name.toLowerCase().includes(search.toLowerCase())));

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Inventory</h1>
          <Button variant="outline" size="sm"><Upload className="h-3 w-3 mr-1" />CSV Import</Button>
        </div>
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search inventory..." className="pl-9 max-w-md" /></div>
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
                  <td className="p-3 text-xs font-code">A1-R03</td>
                  <td className={`p-3 text-right text-sm font-body ${p.stock <= p.lowStockThreshold ? 'text-destructive font-semibold' : ''}`}>{p.stock}</td>
                  <td className="p-3 text-sm font-body">{p.unit}</td>
                  <td className="p-3 text-xs font-body">2024-04-15</td>
                  <td className="p-3"><div className="flex gap-1"><Button variant="outline" size="icon" className="h-6 w-6"><Minus className="h-3 w-3" /></Button><Button variant="outline" size="icon" className="h-6 w-6"><Plus className="h-3 w-3" /></Button></div></td>
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

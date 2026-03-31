import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { dummyProducts, dummyHubs } from '@/data/dummy';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Download, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminProducts = () => {
  const [search, setSearch] = useState('');
  const [hubFilter, setHubFilter] = useState('all');
  const filtered = dummyProducts.filter(p =>
    (search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())) &&
    (hubFilter === 'all' || p.locationId === hubFilter)
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Product Catalogue</h1>
            <p className="text-muted-foreground font-body text-sm">{dummyProducts.length} products across all hubs</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="h-3 w-3 mr-1" />Export</Button>
            <Link to="/products/new"><Button size="sm"><Plus className="h-3 w-3 mr-1" />Add Product</Button></Link>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products, SKUs..." className="pl-9" />
          </div>
          <Select value={hubFilter} onValueChange={setHubFilter}>
            <SelectTrigger className="w-[200px]"><SelectValue placeholder="All Hubs" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hubs</SelectItem>
              {dummyHubs.map(h => <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Product</th>
                  <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">SKU</th>
                  <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Hub</th>
                  <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Category</th>
                  <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Price</th>
                  <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Stock</th>
                  <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Status</th>
                  <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Dietary</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => {
                  const hub = dummyHubs.find(h => h.id === p.locationId);
                  const isLow = p.stock <= p.lowStockThreshold;
                  return (
                    <tr key={p.id} className={`border-b hover:bg-muted/10 transition-colors ${isLow ? 'bg-status-ready/5' : ''}`}>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-body font-medium">{p.name}</p>
                          {p.isNewArrival && <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-0">New</Badge>}
                        </div>
                      </td>
                      <td className="p-3 font-code text-xs text-muted-foreground">{p.sku}</td>
                      <td className="p-3 text-xs font-body">{hub?.name || '-'}</td>
                      <td className="p-3 text-xs font-body">{p.category}</td>
                      <td className="p-3 text-right text-sm font-body">₹{p.price}</td>
                      <td className={`p-3 text-right text-sm font-body font-medium ${isLow ? 'text-destructive' : ''}`}>{p.stock}</td>
                      <td className="p-3">
                        <span className={`text-xs font-body px-2 py-0.5 rounded-full ${p.availability === 'INSTOCK' ? 'bg-accent/15 text-accent' : p.availability === 'OUTOFSTOCK' ? 'bg-destructive/15 text-destructive' : 'bg-muted text-muted-foreground'}`}>
                          {p.availability}
                        </span>
                      </td>
                      <td className="p-3 text-xs font-body">{p.dietary}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminProducts;

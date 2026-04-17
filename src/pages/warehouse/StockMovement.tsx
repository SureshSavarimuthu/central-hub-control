import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownToLine, ArrowUpFromLine, Settings2, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const reasonsIn = ['Purchase', 'Return', 'Transfer In', 'Production Output'];
const reasonsOut = ['Orders', 'Wastage', 'Transfer Out', 'Damage'];
const reasonsAdjust = ['Stock Count', 'Correction', 'Manual'];

const StockMovement = () => {
  const { inventory, suppliers, stockMovements, recordStockMovement } = useAppState();
  const [tab, setTab] = useState<'in' | 'out' | 'adjust'>('in');
  const [form, setForm] = useState({ inventoryId: '', quantity: 0, reason: '', supplierId: '' });

  const reasons = tab === 'in' ? reasonsIn : tab === 'out' ? reasonsOut : reasonsAdjust;

  const handleSubmit = () => {
    if (!form.inventoryId) return toast.error('Select an item');
    if (form.quantity <= 0) return toast.error('Quantity must be greater than 0');
    if (!form.reason) return toast.error('Select a reason');
    const item = inventory.find(i => i.id === form.inventoryId);
    if (!item) return;
    const supplier = suppliers.find(s => s.id === form.supplierId);
    recordStockMovement({
      inventoryId: item.id,
      inventoryName: item.name,
      type: tab,
      quantity: form.quantity,
      reason: form.reason,
      supplierId: supplier?.id,
      supplierName: supplier?.name,
      user: 'You',
    });
    setForm({ inventoryId: '', quantity: 0, reason: '', supplierId: '' });
  };

  const tabConfig = {
    in: { icon: ArrowDownToLine, label: 'Stock In', tone: 'text-success' },
    out: { icon: ArrowUpFromLine, label: 'Stock Out', tone: 'text-destructive' },
    adjust: { icon: Settings2, label: 'Adjustments', tone: 'text-info' },
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-2">
            Stock Movement <RotateCw className="h-7 w-7 text-primary" />
          </h1>
          <p className="text-sm text-muted-foreground font-body mt-1">Track stock in, out, and adjustments</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
              <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
                {(['in', 'out', 'adjust'] as const).map(k => {
                  const cfg = tabConfig[k];
                  const Icon = cfg.icon;
                  return (
                    <TabsTrigger key={k} value={k} className="gap-2">
                      <Icon className={cn('h-4 w-4', tab === k && cfg.tone)} />
                      {cfg.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <TabsContent value={tab} className="mt-0">
                <div className="grid gap-4 max-w-2xl">
                  <div className="grid gap-2">
                    <Label>Item *</Label>
                    <Select value={form.inventoryId} onValueChange={v => setForm({ ...form, inventoryId: v })}>
                      <SelectTrigger><SelectValue placeholder="Select inventory item" /></SelectTrigger>
                      <SelectContent>
                        {inventory.map(i => (
                          <SelectItem key={i.id} value={i.id}>
                            {i.name} <span className="text-muted-foreground">— {i.stock} {i.unit}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Quantity *</Label>
                      <Input type="number" min={1} value={form.quantity} onChange={e => setForm({ ...form, quantity: Math.max(0, parseFloat(e.target.value) || 0) })} />
                    </div>
                    <div className="grid gap-2">
                      <Label>Reason *</Label>
                      <Select value={form.reason} onValueChange={v => setForm({ ...form, reason: v })}>
                        <SelectTrigger><SelectValue placeholder="Select reason" /></SelectTrigger>
                        <SelectContent>
                          {reasons.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {tab === 'in' && (
                    <div className="grid gap-2">
                      <Label>Supplier</Label>
                      <Select value={form.supplierId || 'none'} onValueChange={v => setForm({ ...form, supplierId: v === 'none' ? '' : v })}>
                        <SelectTrigger><SelectValue placeholder="Select supplier (optional)" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">— None —</SelectItem>
                          {suppliers.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" onClick={() => setForm({ inventoryId: '', quantity: 0, reason: '', supplierId: '' })}>Cancel</Button>
                    <Button onClick={handleSubmit} className="flex-1 sm:flex-none">Update Stock ✅</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {stockMovements.length === 0 ? (
              <p className="text-center py-8 text-sm text-muted-foreground font-body">No stock movements yet</p>
            ) : (
              <div className="space-y-2">
                {stockMovements.slice(0, 20).map(m => {
                  const sign = m.type === 'in' ? '+' : m.type === 'out' ? '-' : '±';
                  const tone = m.type === 'in' ? 'text-success' : m.type === 'out' ? 'text-destructive' : 'text-info';
                  return (
                    <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className={cn('h-9 w-9 rounded-lg bg-muted flex items-center justify-center font-bold font-code text-sm', tone)}>
                          {sign}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{m.inventoryName} <span className={cn('font-code', tone)}>{sign}{m.quantity}</span></p>
                          <p className="text-xs text-muted-foreground font-body">{m.reason}{m.supplierName ? ` • ${m.supplierName}` : ''}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground font-body">{new Date(m.date).toLocaleString()}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default StockMovement;

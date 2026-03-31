import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';

const aisles = [
  { id: 'A1', racks: [{ id: 'R01', product: 'Whole Wheat Flour', qty: 200, capacity: 300 }, { id: 'R02', product: 'Sugar (Refined)', qty: 180, capacity: 200 }, { id: 'R03', product: 'Milk Packs', qty: 12, capacity: 100 }, { id: 'R04', product: null, qty: 0, capacity: 150 }] },
  { id: 'A2', racks: [{ id: 'R01', product: 'Maida Flour', qty: 150, capacity: 200 }, { id: 'R02', product: 'Cocoa Powder', qty: 45, capacity: 80 }, { id: 'R03', product: null, qty: 0, capacity: 120 }, { id: 'R04', product: 'Packaging Boxes', qty: 300, capacity: 500 }] },
];

const WarehouseRackManagement = () => (
  <AppLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Rack Management</h1>
      {aisles.map(a => (
        <div key={a.id} className="space-y-3">
          <h3 className="font-display font-semibold">Aisle {a.id}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {a.racks.map(r => {
              const pct = r.capacity > 0 ? (r.qty / r.capacity) * 100 : 0;
              return (
                <div key={r.id} className={`bg-card rounded-xl border p-4 ${r.product ? '' : 'border-dashed'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-code text-xs">{a.id}-{r.id}</p>
                    <Button variant="ghost" size="icon" className="h-6 w-6"><QrCode className="h-3 w-3" /></Button>
                  </div>
                  {r.product ? (
                    <>
                      <p className="text-sm font-body font-medium">{r.product}</p>
                      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${pct > 80 ? 'bg-destructive' : pct > 50 ? 'bg-status-ready' : 'bg-accent'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground font-body mt-1">{r.qty}/{r.capacity} ({pct.toFixed(0)}%)</p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground font-body italic">Empty slot</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </AppLayout>
);

export default WarehouseRackManagement;

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { QrCode, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const initialAisles = [
  { id: 'A1', racks: [{ id: 'R01', product: 'Whole Wheat Flour', qty: 200, capacity: 300 }, { id: 'R02', product: 'Sugar (Refined)', qty: 180, capacity: 200 }, { id: 'R03', product: 'Milk Packs', qty: 12, capacity: 100 }, { id: 'R04', product: null as string | null, qty: 0, capacity: 150 }] },
  { id: 'A2', racks: [{ id: 'R01', product: 'Maida Flour', qty: 150, capacity: 200 }, { id: 'R02', product: 'Cocoa Powder', qty: 45, capacity: 80 }, { id: 'R03', product: null as string | null, qty: 0, capacity: 120 }, { id: 'R04', product: 'Packaging Boxes', qty: 300, capacity: 500 }] },
];

const WarehouseRackManagement = () => {
  const [aisles, setAisles] = useState(initialAisles);
  const [qrOpen, setQrOpen] = useState<{ aisle: string; rack: string } | null>(null);

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold">Rack Management</h1>

        <Dialog open={!!qrOpen} onOpenChange={() => setQrOpen(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">QR Code — {qrOpen?.aisle}-{qrOpen?.rack}</DialogTitle></DialogHeader>
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="h-48 w-48 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed">
                <div className="text-center">
                  <QrCode className="h-16 w-16 mx-auto text-primary mb-2" />
                  <p className="font-code text-sm font-semibold">{qrOpen?.aisle}-{qrOpen?.rack}</p>
                  <p className="text-xs text-muted-foreground font-body mt-1">Scan to view rack details</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-body">Location: Aisle {qrOpen?.aisle}, Rack {qrOpen?.rack}</p>
            </div>
          </DialogContent>
        </Dialog>

        {aisles.map(a => (
          <div key={a.id} className="space-y-3">
            <h3 className="font-display font-semibold">Aisle {a.id}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {a.racks.map(r => {
                const pct = r.capacity > 0 ? (r.qty / r.capacity) * 100 : 0;
                return (
                  <div key={r.id} className={`bg-card rounded-xl border p-4 hover:shadow-md transition-all ${r.product ? '' : 'border-dashed'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-code text-xs">{a.id}-{r.id}</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setQrOpen({ aisle: a.id, rack: r.id })}>
                        <QrCode className="h-3 w-3" />
                      </Button>
                    </div>
                    {r.product ? (
                      <>
                        <p className="text-sm font-body font-medium">{r.product}</p>
                        <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${pct > 80 ? 'bg-destructive' : pct > 50 ? 'bg-status-ready' : 'bg-accent'}`}
                            style={{ width: `${pct}%` }}
                          />
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
};

export default WarehouseRackManagement;

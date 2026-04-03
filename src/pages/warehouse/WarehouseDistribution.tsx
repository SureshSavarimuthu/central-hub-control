import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Truck, CheckCircle, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const WarehouseDistribution = () => {
  const { shipments, updateShipmentStatus, addShipment } = useAppState();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ destination: '', vehicle: '', driver: '', departure: '', items: '' });

  const handleSubmit = () => {
    addShipment({
      destination: form.destination,
      vehicle: form.vehicle,
      driver: form.driver,
      departure: form.departure,
      status: 'Loading',
      items: form.items.split(',').map(s => s.trim()).filter(Boolean),
    });
    setOpen(false);
    setForm({ destination: '', vehicle: '', driver: '', departure: '', items: '' });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Distribution & Dispatch</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button size="sm"><Plus className="h-3 w-3 mr-1" />New Shipment</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle className="font-display">New Shipment</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label className="font-body">Destination</Label><Input value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} className="mt-1" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="font-body">Vehicle</Label><Input value={form.vehicle} onChange={e => setForm(f => ({ ...f, vehicle: e.target.value }))} className="mt-1" placeholder="TN 01 AB 1234" /></div>
                  <div><Label className="font-body">Driver</Label><Input value={form.driver} onChange={e => setForm(f => ({ ...f, driver: e.target.value }))} className="mt-1" /></div>
                </div>
                <div><Label className="font-body">Departure Time</Label><Input value={form.departure} onChange={e => setForm(f => ({ ...f, departure: e.target.value }))} className="mt-1" placeholder="10:30 AM" /></div>
                <div><Label className="font-body">Items (comma separated)</Label><Input value={form.items} onChange={e => setForm(f => ({ ...f, items: e.target.value }))} className="mt-1" placeholder="Butter Croissant ×20, Danish ×10" /></div>
                <Button onClick={handleSubmit} disabled={!form.destination} className="w-full">Create Shipment</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-4">
          {shipments.map(s => (
            <div key={s.id} className="bg-card rounded-xl border p-5 animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-code text-sm font-semibold">{s.id}</p>
                  <p className="text-sm font-body">{s.destination}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${s.status === 'Delivered' ? 'bg-accent/15 text-accent' : s.status === 'In Transit' ? 'bg-info/15 text-info' : 'bg-primary/15 text-primary'}`}>{s.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm font-body mb-3">
                <div><p className="text-xs text-muted-foreground">Vehicle</p><p className="font-code text-xs">{s.vehicle}</p></div>
                <div><p className="text-xs text-muted-foreground">Driver</p><p>{s.driver}</p></div>
                <div><p className="text-xs text-muted-foreground">Departure</p><p>{s.departure}</p></div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">{s.items.map((it, i) => <span key={i} className="text-xs bg-muted/50 px-2 py-0.5 rounded font-body">{it}</span>)}</div>
              {s.status === 'Loading' && (
                <Button size="sm" onClick={() => updateShipmentStatus(s.id, 'In Transit')}>
                  <Truck className="h-3 w-3 mr-1" />Start Transit
                </Button>
              )}
              {s.status === 'In Transit' && (
                <Button size="sm" onClick={() => updateShipmentStatus(s.id, 'Delivered')}>
                  <CheckCircle className="h-3 w-3 mr-1" />Confirm Delivery
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default WarehouseDistribution;

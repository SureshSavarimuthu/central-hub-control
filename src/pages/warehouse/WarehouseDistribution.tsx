import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Truck, Camera, CheckCircle } from 'lucide-react';

const shipments = [
  { id: 'SHP-001', destination: 'Thatha Anna Nagar', vehicle: 'TN 01 AB 1234', driver: 'Ravi Kumar', departure: '10:30 AM', status: 'In Transit', items: ['Butter Croissant ×20', 'Almond Danish ×10'] },
  { id: 'SHP-002', destination: 'Thatha Adyar', vehicle: 'TN 01 CD 5678', driver: 'Ganesh M', departure: '11:00 AM', status: 'Loading', items: ['Whole Wheat Flour ×5 kg', 'Milk Packs ×12'] },
  { id: 'SHP-003', destination: 'North Chennai Kitchen', vehicle: 'TN 01 EF 9012', driver: 'Suresh P', departure: '09:00 AM', status: 'Delivered', items: ['Sugar ×20 kg'] },
];

const WarehouseDistribution = () => (
  <AppLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Distribution & Dispatch</h1>
      <div className="space-y-4">
        {shipments.map(s => (
          <div key={s.id} className="bg-card rounded-xl border p-5">
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
            {s.status !== 'Delivered' && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Camera className="h-3 w-3 mr-1" />Proof of Delivery</Button>
                <Button size="sm"><CheckCircle className="h-3 w-3 mr-1" />Confirm Delivery</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </AppLayout>
);

export default WarehouseDistribution;

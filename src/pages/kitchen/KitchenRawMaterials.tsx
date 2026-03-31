import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { PackageSearch } from 'lucide-react';

const materials = [
  { name: 'All-purpose Flour', current: 45, min: 30, unit: 'kg', consumption: 12 },
  { name: 'Butter', current: 8, min: 15, unit: 'kg', consumption: 6 },
  { name: 'Sugar', current: 22, min: 10, unit: 'kg', consumption: 4 },
  { name: 'Milk', current: 15, min: 20, unit: 'litres', consumption: 8 },
  { name: 'Yeast', current: 3, min: 2, unit: 'kg', consumption: 0.5 },
  { name: 'Eggs', current: 120, min: 60, unit: 'pieces', consumption: 30 },
];

const KitchenRawMaterials = () => (
  <AppLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Raw Materials</h1>
        <Button size="sm"><PackageSearch className="h-3 w-3 mr-1" />Request Restock</Button>
      </div>
      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b bg-muted/30">
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Material</th>
            <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Current</th>
            <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Min Required</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Unit</th>
            <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Daily Usage</th>
            <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Status</th>
          </tr></thead>
          <tbody>
            {materials.map(m => {
              const isLow = m.current < m.min;
              return (
                <tr key={m.name} className={`border-b ${isLow ? 'bg-destructive/5' : ''}`}>
                  <td className="p-3 text-sm font-body font-medium">{m.name}</td>
                  <td className={`p-3 text-right text-sm font-body ${isLow ? 'text-destructive font-semibold' : ''}`}>{m.current}</td>
                  <td className="p-3 text-right text-sm font-body text-muted-foreground">{m.min}</td>
                  <td className="p-3 text-sm font-body">{m.unit}</td>
                  <td className="p-3 text-right text-sm font-body">{m.consumption}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${isLow ? 'bg-destructive/15 text-destructive' : 'bg-accent/15 text-accent'}`}>{isLow ? 'Low' : 'OK'}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </AppLayout>
);

export default KitchenRawMaterials;

import { AppLayout } from '@/components/AppLayout';
import { dummyBatches } from '@/data/dummy';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Play, Pause, Check, X } from 'lucide-react';

const KitchenProduction = () => (
  <AppLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Production Queue</h1>
        <Button size="sm"><Play className="h-3 w-3 mr-1" />New Batch</Button>
      </div>
      <div className="space-y-4">
        {dummyBatches.map(b => (
          <div key={b.id} className="bg-card rounded-xl border p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-body font-semibold">{b.productName}</p>
                <p className="text-xs text-muted-foreground font-code">{b.id} · {b.batchSize} units</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${b.status === 'Ready' ? 'bg-accent/15 text-accent' : b.status === 'Paused' ? 'bg-status-ready/15 text-status-ready' : 'bg-primary/15 text-primary'}`}>{b.status}</span>
              </div>
            </div>
            <Progress value={b.progress} className="h-2.5 mb-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
              <span>{b.progress}% complete</span>
              <span>Started: {new Date(b.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span>ETA: {new Date(b.expectedCompletion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            {b.status === 'Ready' && (
              <div className="mt-3 text-sm font-body">
                <span>Yield: {b.actualYield}/{b.plannedYield} ({((b.actualYield / b.plannedYield) * 100).toFixed(0)}%)</span>
              </div>
            )}
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm"><Pause className="h-3 w-3 mr-1" />Pause</Button>
              <Button variant="outline" size="sm"><Check className="h-3 w-3 mr-1" />Mark Ready</Button>
              <Button variant="outline" size="sm" className="text-destructive"><X className="h-3 w-3 mr-1" />Failed</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AppLayout>
);

export default KitchenProduction;

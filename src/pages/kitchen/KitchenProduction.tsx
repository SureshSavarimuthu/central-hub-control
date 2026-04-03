import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Play, Pause, Check, X, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const KitchenProduction = () => {
  const { batches, updateBatchStatus, addBatch } = useAppState();
  const [newOpen, setNewOpen] = useState(false);
  const [form, setForm] = useState({ productName: '', batchSize: 50, plannedYield: 50 });
  const [yieldDialog, setYieldDialog] = useState<string | null>(null);
  const [yieldVal, setYieldVal] = useState(0);

  const sorted = [...batches].sort((a, b) => {
    const order: Record<string, number> = { 'In Progress': 0, 'Paused': 1, 'Ready': 2, 'Failed': 3 };
    return (order[a.status] ?? 4) - (order[b.status] ?? 4);
  });

  const handleNewBatch = () => {
    addBatch({
      productName: form.productName,
      batchSize: form.batchSize,
      startTime: new Date().toISOString(),
      expectedCompletion: new Date(Date.now() + 3 * 3600000).toISOString(),
      progress: 0,
      status: 'In Progress',
      plannedYield: form.plannedYield,
      actualYield: 0,
    });
    setNewOpen(false);
    setForm({ productName: '', batchSize: 50, plannedYield: 50 });
  };

  const handleMarkReady = (id: string) => {
    setYieldDialog(id);
    const batch = batches.find(b => b.id === id);
    setYieldVal(batch?.plannedYield ?? 0);
  };

  const confirmReady = () => {
    if (yieldDialog) {
      updateBatchStatus(yieldDialog, 'Ready', yieldVal);
      setYieldDialog(null);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Production Queue</h1>
          <Dialog open={newOpen} onOpenChange={setNewOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="h-3 w-3 mr-1" />New Batch</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle className="font-display">New Production Batch</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label className="font-body">Product Name</Label><Input value={form.productName} onChange={e => setForm(f => ({ ...f, productName: e.target.value }))} className="mt-1" placeholder="e.g. Butter Croissant" /></div>
                <div><Label className="font-body">Batch Size</Label><Input type="number" value={form.batchSize} onChange={e => setForm(f => ({ ...f, batchSize: +e.target.value }))} className="mt-1" /></div>
                <div><Label className="font-body">Planned Yield</Label><Input type="number" value={form.plannedYield} onChange={e => setForm(f => ({ ...f, plannedYield: +e.target.value }))} className="mt-1" /></div>
                <Button onClick={handleNewBatch} disabled={!form.productName} className="w-full">Create Batch</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Yield confirmation dialog */}
        <Dialog open={!!yieldDialog} onOpenChange={() => setYieldDialog(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Enter Actual Yield</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label className="font-body">Actual Yield</Label><Input type="number" value={yieldVal} onChange={e => setYieldVal(+e.target.value)} className="mt-1" /></div>
              <Button onClick={confirmReady} className="w-full">Confirm Ready</Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          {sorted.map(b => {
            const isInProgress = b.status === 'In Progress';
            const isPaused = b.status === 'Paused';
            const isReady = b.status === 'Ready';
            const isFailed = b.status === 'Failed';

            return (
              <div key={b.id} className={cn(
                'bg-card rounded-xl border p-5 transition-all animate-fade-in',
                isPaused && 'opacity-60',
                isFailed && 'border-destructive/30'
              )}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-body font-semibold">{b.productName}</p>
                    <p className="text-xs text-muted-foreground font-code">{b.id} · {b.batchSize} units</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isInProgress && (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                      </span>
                    )}
                    <span className={cn(
                      'text-xs font-semibold px-2.5 py-1 rounded-full',
                      isInProgress && 'bg-primary/15 text-primary',
                      isPaused && 'bg-muted text-muted-foreground',
                      isReady && 'bg-accent/15 text-accent',
                      isFailed && 'bg-destructive/15 text-destructive',
                    )}>{b.status}</span>
                  </div>
                </div>

                <div className="relative">
                  <Progress value={b.progress} className={cn('h-2.5 mb-2', isInProgress && 'animate-pulse')} />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
                  <span>{b.progress}% complete</span>
                  <span>Started: {new Date(b.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span>ETA: {new Date(b.expectedCompletion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {isReady && (
                  <div className="mt-3 text-sm font-body bg-accent/5 rounded-lg p-2">
                    <span className="font-semibold">Yield:</span> {b.actualYield}/{b.plannedYield} ({((b.actualYield / b.plannedYield) * 100).toFixed(0)}%)
                  </div>
                )}

                {!isReady && !isFailed && (
                  <div className="flex gap-2 mt-3">
                    {isInProgress && (
                      <Button variant="outline" size="sm" onClick={() => updateBatchStatus(b.id, 'Paused')}>
                        <Pause className="h-3 w-3 mr-1" />Pause
                      </Button>
                    )}
                    {isPaused && (
                      <Button variant="outline" size="sm" onClick={() => updateBatchStatus(b.id, 'In Progress')}>
                        <Play className="h-3 w-3 mr-1" />Resume
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleMarkReady(b.id)}>
                      <Check className="h-3 w-3 mr-1" />Mark Ready
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive" onClick={() => updateBatchStatus(b.id, 'Failed')}>
                      <X className="h-3 w-3 mr-1" />Failed
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default KitchenProduction;

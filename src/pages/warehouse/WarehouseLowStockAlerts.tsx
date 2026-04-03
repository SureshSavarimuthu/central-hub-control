import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Button } from '@/components/ui/button';
import { BellOff, Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const WarehouseLowStockAlerts = () => {
  const { inventory, alertConfigs, updateAlertConfig, snoozeAlert, lowStockAlertCount } = useAppState();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Low Stock Alert Configuration</h1>
            <p className="text-sm text-muted-foreground font-body">{lowStockAlertCount} active alert{lowStockAlertCount !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30">
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Product</th>
              <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Current</th>
              <th className="text-right p-3 text-xs font-body font-semibold text-muted-foreground">Threshold</th>
              <th className="text-center p-3 text-xs font-body font-semibold text-muted-foreground">In-App</th>
              <th className="text-center p-3 text-xs font-body font-semibold text-muted-foreground">Email</th>
              <th className="text-center p-3 text-xs font-body font-semibold text-muted-foreground">SMS</th>
              <th className="p-3"></th>
            </tr></thead>
            <tbody>
              {inventory.map(p => {
                const config = alertConfigs.find(a => a.productId === p.id);
                const isSnoozed = config?.snoozedUntil && new Date(config.snoozedUntil) > new Date();
                const isLow = p.stock <= p.lowStockThreshold;
                return (
                  <tr key={p.id} className={`border-b ${isLow ? 'bg-destructive/5' : ''} ${isSnoozed ? 'opacity-50' : ''}`}>
                    <td className="p-3 text-sm font-body font-medium">
                      {p.name}
                      {isSnoozed && <span className="ml-2 text-xs text-muted-foreground">(snoozed)</span>}
                    </td>
                    <td className={`p-3 text-right text-sm font-body ${isLow ? 'text-destructive font-semibold' : ''}`}>{p.stock}</td>
                    <td className="p-3 text-right text-sm font-body">{p.lowStockThreshold}</td>
                    <td className="p-3 text-center">
                      <Switch checked={config?.inApp ?? true} onCheckedChange={v => updateAlertConfig(p.id, { inApp: v })} />
                    </td>
                    <td className="p-3 text-center">
                      <Switch checked={config?.email ?? true} onCheckedChange={v => updateAlertConfig(p.id, { email: v })} />
                    </td>
                    <td className="p-3 text-center">
                      <Switch checked={config?.sms ?? false} onCheckedChange={v => updateAlertConfig(p.id, { sms: v })} />
                    </td>
                    <td className="p-3">
                      {isSnoozed ? (
                        <Button variant="ghost" size="sm" onClick={() => updateAlertConfig(p.id, { snoozedUntil: null })}>
                          <Bell className="h-3 w-3 mr-1" />Unsnooze
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" onClick={() => snoozeAlert(p.id, 24)}>
                          <BellOff className="h-3 w-3 mr-1" />Snooze 24h
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default WarehouseLowStockAlerts;

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const SettingsPage = () => {
  const { settings, updateSettings } = useAppState();
  const [form, setForm] = useState(settings);

  const handleSave = () => {
    updateSettings(form);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold">Settings</h1>
        <div className="bg-card rounded-xl border p-6 space-y-4 max-w-2xl">
          <h3 className="font-display font-semibold">General</h3>
          <div><Label className="font-body">Business Name</Label><Input value={form.businessName} onChange={e => setForm((f: any) => ({ ...f, businessName: e.target.value }))} className="mt-1" /></div>
          <div><Label className="font-body">Contact Email</Label><Input value={form.contactEmail} onChange={e => setForm((f: any) => ({ ...f, contactEmail: e.target.value }))} className="mt-1" /></div>
          <div><Label className="font-body">Default GST Slab (%)</Label><Input value={form.defaultGst} onChange={e => setForm((f: any) => ({ ...f, defaultGst: +e.target.value }))} type="number" className="mt-1" /></div>
          <div><Label className="font-body">Order ID Prefix</Label><Input value={form.orderPrefix} onChange={e => setForm((f: any) => ({ ...f, orderPrefix: e.target.value }))} className="mt-1 font-code" /></div>
          <div className="flex items-center justify-between"><Label className="font-body">Enable Email Notifications</Label><Switch checked={form.emailNotif} onCheckedChange={v => setForm((f: any) => ({ ...f, emailNotif: v }))} /></div>
          <div className="flex items-center justify-between"><Label className="font-body">Enable SMS Notifications</Label><Switch checked={form.smsNotif} onCheckedChange={v => setForm((f: any) => ({ ...f, smsNotif: v }))} /></div>
          <div className="flex items-center justify-between"><Label className="font-body">Low Stock Alert Threshold (default)</Label><Input value={form.lowStockDefault} onChange={e => setForm((f: any) => ({ ...f, lowStockDefault: +e.target.value }))} type="number" className="w-20" /></div>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;

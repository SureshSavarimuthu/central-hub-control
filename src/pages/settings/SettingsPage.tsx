import { AppLayout } from '@/components/AppLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const SettingsPage = () => (
  <AppLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Settings</h1>
      <div className="bg-card rounded-xl border p-6 space-y-4 max-w-2xl">
        <h3 className="font-display font-semibold">General</h3>
        <div><Label className="font-body">Business Name</Label><Input defaultValue="Thatha CentralHub" className="mt-1" /></div>
        <div><Label className="font-body">Contact Email</Label><Input defaultValue="admin@thatha.com" className="mt-1" /></div>
        <div><Label className="font-body">Default GST Slab (%)</Label><Input defaultValue="5" type="number" className="mt-1" /></div>
        <div><Label className="font-body">Order ID Prefix</Label><Input defaultValue="ORD-2024-" className="mt-1 font-code" /></div>
        <div className="flex items-center justify-between"><Label className="font-body">Enable Email Notifications</Label><Switch defaultChecked /></div>
        <div className="flex items-center justify-between"><Label className="font-body">Enable SMS Notifications</Label><Switch /></div>
        <div className="flex items-center justify-between"><Label className="font-body">Low Stock Alert Threshold (default)</Label><Input defaultValue="10" type="number" className="w-20" /></div>
        <Button>Save Settings</Button>
      </div>
    </div>
  </AppLayout>
);

export default SettingsPage;

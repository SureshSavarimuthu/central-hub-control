import { AppLayout } from '@/components/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { dummyHubs } from '@/data/dummy';

const ProfilePage = () => {
  const { user } = useAuth();
  if (!user) return null;
  const hub = dummyHubs.find(h => h.id === user.hubId);

  return (
    <AppLayout>
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-2xl font-display font-bold">My Profile</h1>
        <div className="bg-card rounded-xl border p-6 space-y-4">
          <div><Label className="font-body">Name</Label><Input value={user.name} readOnly className="mt-1" /></div>
          <div><Label className="font-body">Email</Label><Input value={user.email} readOnly className="mt-1" /></div>
          <div><Label className="font-body">Phone</Label><Input value={user.phone} readOnly className="mt-1" /></div>
          <div><Label className="font-body">Role</Label><Input value={user.role.replace(/_/g, ' ')} readOnly className="mt-1" /></div>
          <div><Label className="font-body">Assigned Hub</Label><Input value={hub?.name || '—'} readOnly className="mt-1" /></div>
          <div><Label className="font-body">Access Key</Label><Input value="••••-••••-••••" readOnly className="mt-1 font-code" /></div>
        </div>
        <div className="bg-card rounded-xl border p-6 space-y-4">
          <h3 className="font-display font-semibold">Change Password</h3>
          <div><Label className="font-body">Current Password</Label><Input type="password" className="mt-1" /></div>
          <div><Label className="font-body">New Password</Label><Input type="password" className="mt-1" /></div>
          <div><Label className="font-body">Confirm New Password</Label><Input type="password" className="mt-1" /></div>
          <Button>Update Password</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;

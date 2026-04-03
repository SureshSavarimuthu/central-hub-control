import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useAppState } from '@/contexts/AppStateContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { dummyHubs } from '@/data/dummy';

const ProfilePage = () => {
  const { user } = useAuth();
  const { userProfile, updateProfile, updatePassword } = useAppState();
  if (!user) return null;
  const hub = dummyHubs.find(h => h.id === user.hubId);

  const [name, setName] = useState(userProfile.name || user.name);
  const [email, setEmail] = useState(userProfile.email || user.email);
  const [phone, setPhone] = useState(userProfile.phone || user.phone);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwError, setPwError] = useState('');

  useEffect(() => {
    if (!userProfile.name && user) {
      updateProfile({ name: user.name, email: user.email, phone: user.phone });
    }
  }, []);

  const handleProfileSave = () => {
    updateProfile({ name, email, phone });
  };

  const handlePasswordChange = () => {
    setPwError('');
    if (newPw !== confirmPw) { setPwError('Passwords do not match'); return; }
    if (newPw.length < 6) { setPwError('Password must be at least 6 characters'); return; }
    const success = updatePassword(currentPw, newPw);
    if (success) { setCurrentPw(''); setNewPw(''); setConfirmPw(''); }
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-2xl font-display font-bold">My Profile</h1>
        <div className="bg-card rounded-xl border p-6 space-y-4">
          <div><Label className="font-body">Name</Label><Input value={name} onChange={e => setName(e.target.value)} className="mt-1" /></div>
          <div><Label className="font-body">Email</Label><Input value={email} onChange={e => setEmail(e.target.value)} className="mt-1" /></div>
          <div><Label className="font-body">Phone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} className="mt-1" /></div>
          <div><Label className="font-body">Role</Label><Input value={user.role.replace(/_/g, ' ')} readOnly className="mt-1 bg-muted/30" /></div>
          <div><Label className="font-body">Assigned Hub</Label><Input value={hub?.name || '—'} readOnly className="mt-1 bg-muted/30" /></div>
          <Button onClick={handleProfileSave}>Save Profile</Button>
        </div>
        <div className="bg-card rounded-xl border p-6 space-y-4">
          <h3 className="font-display font-semibold">Change Password</h3>
          <div><Label className="font-body">Current Password</Label><Input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} className="mt-1" /></div>
          <div><Label className="font-body">New Password</Label><Input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} className="mt-1" /></div>
          <div><Label className="font-body">Confirm New Password</Label><Input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} className="mt-1" /></div>
          {pwError && <p className="text-destructive text-sm font-body">{pwError}</p>}
          <Button onClick={handlePasswordChange} disabled={!currentPw || !newPw}>Update Password</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;

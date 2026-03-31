import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { dummyUsers, dummyHubs } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
  const [search, setSearch] = useState('');
  const filtered = dummyUsers.filter(u => search === '' || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Users</h1>
          <Button size="sm"><Plus className="h-3 w-3 mr-1" />Add User</Button>
        </div>
        <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="pl-9" /></div>
        <div className="bg-card rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30">
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Name</th>
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Email</th>
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Role</th>
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Hub</th>
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Status</th>
              <th className="text-left p-3 text-xs font-body font-semibold text-muted-foreground">Last Login</th>
            </tr></thead>
            <tbody>
              {filtered.map(u => {
                const hub = dummyHubs.find(h => h.id === u.hubId);
                return (
                  <tr key={u.id} className="border-b hover:bg-muted/10">
                    <td className="p-3"><Link to={`/admin/users/${u.id}`} className="text-sm font-body font-medium text-primary hover:underline">{u.name}</Link></td>
                    <td className="p-3 text-sm font-body text-muted-foreground">{u.email}</td>
                    <td className="p-3 text-xs font-body">{u.role.replace(/_/g, ' ')}</td>
                    <td className="p-3 text-xs font-body">{hub?.name || '—'}</td>
                    <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${u.status ? 'bg-accent/15 text-accent' : 'bg-muted text-muted-foreground'}`}>{u.status ? 'Active' : 'Inactive'}</span></td>
                    <td className="p-3 text-xs font-body text-muted-foreground">{new Date(u.lastLogin).toLocaleDateString()}</td>
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

export default AdminUsers;

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { dummyHubs } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const AdminHubs = () => {
  const [search, setSearch] = useState('');
  const filtered = dummyHubs.filter(h => search === '' || h.name.toLowerCase().includes(search.toLowerCase()) || h.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Hub Directory</h1>
          <Button size="sm"><Plus className="h-3 w-3 mr-1" />Create Hub</Button>
        </div>
        <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search hubs..." className="pl-9" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(h => (
            <Link key={h.id} to={`/admin/hubs/${h.id}`} className="bg-card rounded-xl border p-5 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${h.status === 'Operational' ? 'bg-accent' : h.status === 'Under Maintenance' ? 'bg-status-ready' : 'bg-muted-foreground'}`} />
                  <span className={`text-xs px-2 py-0.5 rounded-full font-body ${h.type === 'Kitchen' ? 'bg-primary/15 text-primary' : 'bg-info/15 text-info'}`}>{h.type}</span>
                </div>
                <p className="font-code text-xs text-muted-foreground">{h.code}</p>
              </div>
              <h3 className="font-body font-semibold">{h.name}</h3>
              <p className="text-xs text-muted-foreground font-body">{h.city} · {h.status}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground font-body">
                <span>{h.utilisation}% utilised</span>
                <span>{h.teamCount} members</span>
              </div>
              <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${h.utilisation}%` }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminHubs;

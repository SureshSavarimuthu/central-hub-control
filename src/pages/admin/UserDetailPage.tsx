import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { dummyUsers, dummyHubs } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, RefreshCw, Ban } from 'lucide-react';

const UserDetailPage = () => {
  const { id } = useParams();
  const user = dummyUsers.find(u => u.id === id);
  if (!user) return <AppLayout><p>User not found</p></AppLayout>;
  const hub = dummyHubs.find(h => h.id === user.hubId);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/admin/users"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
          <div className="flex-1">
            <h1 className="text-2xl font-display font-bold">{user.name}</h1>
            <p className="text-muted-foreground font-body text-sm">{user.role.replace(/_/g, ' ')}</p>
          </div>
          <Button variant="outline" size="sm"><Edit className="h-3 w-3 mr-1" />Edit</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border p-5 space-y-3">
            <h3 className="font-display font-semibold">Details</h3>
            {[['Email', user.email], ['Phone', user.phone], ['Hub', hub?.name || '—'], ['Access Key', user.accessKey], ['Status', user.status ? 'Active' : 'Inactive'], ['Last Login', new Date(user.lastLogin).toLocaleString()]].map(([label, val]) => (
              <div key={label as string} className="flex justify-between">
                <span className="text-sm text-muted-foreground font-body">{label}</span>
                <span className={`text-sm font-body ${label === 'Access Key' ? 'font-code' : ''}`}>{val}</span>
              </div>
            ))}
          </div>
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-display font-semibold mb-3">Activity Log</h3>
            <div className="space-y-2 text-sm font-body text-muted-foreground">
              <p>• Logged in — {new Date(user.lastLogin).toLocaleString()}</p>
              <p>• Updated stock for Butter Croissant — Mar 30, 14:30</p>
              <p>• Approved transfer ST-004 — Mar 29, 08:00</p>
              <p>• Changed order status ORD-2024-0870 — Mar 30, 12:00</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm"><RefreshCw className="h-3 w-3 mr-1" />Regenerate Access Key</Button>
          <Button variant="outline" size="sm" className="text-destructive"><Ban className="h-3 w-3 mr-1" />Suspend</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default UserDetailPage;

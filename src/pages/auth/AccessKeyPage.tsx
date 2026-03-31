import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, ArrowLeft } from 'lucide-react';

const AccessKeyPage = () => {
  const { loginWithAccessKey } = useAuth();
  const navigate = useNavigate();
  const [hubCode, setHubCode] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginWithAccessKey(hubCode, accessKey)) {
      navigate(hubCode.startsWith('KTN') ? '/kitchen/dashboard' : '/warehouse/dashboard');
    } else {
      setError('Invalid hub code or access key.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Link to="/auth/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground font-body mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to login
        </Link>
        <h1 className="text-2xl font-display font-bold mb-2">Access Key Login</h1>
        <p className="text-muted-foreground font-body mb-6 text-sm">For kitchen and warehouse tablet devices.</p>
        <form onSubmit={handleSubmit} className="bg-card rounded-xl border p-6 space-y-4 shadow-sm">
          <div><Label className="font-body">Hub Code</Label><Input value={hubCode} onChange={e => setHubCode(e.target.value)} placeholder="KTN-CH-01" className="mt-1 font-code" /></div>
          <div><Label className="font-body">Access Key</Label><Input value={accessKey} onChange={e => setAccessKey(e.target.value)} placeholder="KTN-3F8A-2N5R" className="mt-1 font-code" /></div>
          {error && <p className="text-destructive text-sm font-body">{error}</p>}
          <Button type="submit" className="w-full"><KeyRound className="h-4 w-4 mr-2" />Authenticate</Button>
        </form>
        <p className="text-xs text-center text-muted-foreground mt-4 font-body">Demo key: KTN-3F8A-2N5R (Kitchen Manager)</p>
      </div>
    </div>
  );
};

export default AccessKeyPage;

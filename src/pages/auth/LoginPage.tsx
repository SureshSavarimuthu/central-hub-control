import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const LoginPage = () => {
  const { login, user, getDefaultRoute } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('priya@thatha.com');
  const [password, setPassword] = useState('password');
  const [showPw, setShowPw] = useState(false);
  const [hubCode, setHubCode] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // If already logged in, redirect
  if (user) {
    navigate(getDefaultRoute(), { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (attempts >= 5) return;
    if (login(email, password)) {
      // login sets user, re-render will redirect via getDefaultRoute
    } else {
      setAttempts(a => a + 1);
      setError('Invalid credentials. Only Kitchen & Warehouse users can login here.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold"><span className="text-primary">Thatha</span> Hub</h1>
          <p className="text-muted-foreground font-body mt-2">Kitchen & Warehouse Management</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-xl border p-6 space-y-4 shadow-sm">
          <div>
            <Label className="font-body">Email</Label>
            <Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@thatha.com" className="mt-1" />
          </div>
          <div>
            <Label className="font-body">Password</Label>
            <div className="relative mt-1">
              <Input value={password} onChange={e => setPassword(e.target.value)} type={showPw ? 'text' : 'password'} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <Label className="font-body">Hub Code <span className="text-muted-foreground">(optional)</span></Label>
            <Input value={hubCode} onChange={e => setHubCode(e.target.value)} placeholder="KTN-CH-01" className="mt-1 font-code" />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="rounded" />
              Remember this device
            </label>
            <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline font-body">Forgot password?</Link>
          </div>
          {error && <p className="text-destructive text-sm font-body">{error}</p>}
          {attempts >= 5 && <p className="text-destructive text-sm font-body">Account locked. Try again in 15 minutes.</p>}
          <Button type="submit" className="w-full" disabled={attempts >= 5}>
            <LogIn className="h-4 w-4 mr-2" /> Sign In
          </Button>
          <div className="text-center">
            <Link to="/auth/access-key" className="text-sm text-muted-foreground hover:text-primary font-body">Sign in with Access Key instead</Link>
          </div>
        </form>
        <p className="text-xs text-center text-muted-foreground mt-4 font-body">Demo: priya@thatha.com (Kitchen) • vikram@thatha.com (Warehouse)</p>
      </div>
    </div>
  );
};

export default LoginPage;

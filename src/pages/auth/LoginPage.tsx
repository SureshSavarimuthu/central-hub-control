import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LogIn, ChefHat, Warehouse } from 'lucide-react';
import { cn } from '@/lib/utils';

const LoginPage = () => {
  const { login, user, getDefaultRoute } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate(getDefaultRoute(), { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attempts >= 5) return;
    setLoading(true);
    setError('');
    // Simulate network delay
    await new Promise(r => setTimeout(r, 600));
    if (login(email, password)) {
      // redirect handled by re-render
    } else {
      setAttempts(a => a + 1);
      setError('Invalid credentials. Only Kitchen & Warehouse users can login here.');
    }
    setLoading(false);
  };

  const quickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background gradient-mesh noise-overlay relative p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-info/5 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-4 glow-primary">
            <span className="text-2xl font-display font-extrabold text-primary">T</span>
          </div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight">
            <span className="text-primary">Thatha</span> <span className="text-foreground">Hub</span>
          </h1>
          <p className="text-muted-foreground font-body mt-2 text-sm">Kitchen & Warehouse Management</p>
        </div>

        {/* Login Card */}
        <div className="glass dark:glass-dark rounded-2xl border border-border/50 p-7 space-y-5 shadow-xl dark:shadow-2xl dark:shadow-primary/5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="font-body text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</Label>
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="you@thatha.com"
                className="h-11 bg-muted/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-xs font-medium uppercase tracking-wider text-muted-foreground">Password</Label>
              <div className="relative">
                <Input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="h-11 bg-muted/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-body cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="rounded border-border/50 bg-muted/50" />
                Remember me
              </label>
              <Link to="/auth/forgot-password" className="text-sm text-primary/80 hover:text-primary font-body transition-colors">Forgot?</Link>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                <p className="text-destructive text-sm font-body">{error}</p>
              </div>
            )}
            {attempts >= 5 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                <p className="text-destructive text-sm font-body">Account locked. Try again in 15 minutes.</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 font-semibold text-sm tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
              disabled={attempts >= 5 || loading}
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" /> Sign In
                </>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/50" /></div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card/60 px-3 text-muted-foreground font-body backdrop-blur-sm">Quick Demo Login</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => quickLogin('priya@thatha.com')}
              className={cn(
                'flex flex-col items-center gap-2 p-3 rounded-xl border border-border/50 hover:border-primary/30',
                'bg-muted/30 hover:bg-primary/5 transition-all group cursor-pointer'
              )}
            >
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:glow-primary transition-all">
                <ChefHat className="h-4 w-4 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold font-body">Kitchen</p>
                <p className="text-[10px] text-muted-foreground font-code">priya@thatha.com</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => quickLogin('vikram@thatha.com')}
              className={cn(
                'flex flex-col items-center gap-2 p-3 rounded-xl border border-border/50 hover:border-info/30',
                'bg-muted/30 hover:bg-info/5 transition-all group cursor-pointer'
              )}
            >
              <div className="h-9 w-9 rounded-lg bg-info/10 flex items-center justify-center transition-all">
                <Warehouse className="h-4 w-4 text-info" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold font-body">Warehouse</p>
                <p className="text-[10px] text-muted-foreground font-code">vikram@thatha.com</p>
              </div>
            </button>
          </div>
        </div>

        <p className="text-[11px] text-center text-muted-foreground/60 mt-6 font-body">
          Password for demo accounts: <span className="font-code">password</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

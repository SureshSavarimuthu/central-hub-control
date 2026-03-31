import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

const UnauthorizedPage = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCountdown(c => { if (c <= 1) { navigate('/auth/login'); return 0; } return c - 1; }), 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-display font-bold mb-2">Session Expired</h1>
        <p className="text-muted-foreground font-body mb-6">Your session has expired or you don't have permission to access this page.</p>
        <Link to="/auth/login"><Button>Return to Login</Button></Link>
        <p className="text-xs text-muted-foreground font-body mt-4">Auto-redirecting in {countdown}s</p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;

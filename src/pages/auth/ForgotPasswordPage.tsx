import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, KeyRound, Check } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const handleOtpChange = (i: number, v: string) => {
    if (v.length > 1) return;
    const newOtp = [...otp];
    newOtp[i] = v;
    setOtp(newOtp);
    if (v && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  const handleResend = () => {
    setCooldown(60);
    const timer = setInterval(() => setCooldown(c => { if (c <= 1) { clearInterval(timer); return 0; } return c - 1; }), 1000);
  };

  const strength = newPw.length >= 12 ? 3 : newPw.length >= 8 ? 2 : newPw.length >= 4 ? 1 : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Link to="/auth/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground font-body mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to login
        </Link>
        <h1 className="text-2xl font-display font-bold mb-2">Reset Password</h1>
        <div className="bg-card rounded-xl border p-6 space-y-4 shadow-sm">
          {step === 1 && (
            <>
              <p className="text-sm text-muted-foreground font-body">Enter your official email to receive a verification code.</p>
              <div><Label className="font-body">Email</Label><Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@thatha.com" className="mt-1" /></div>
              <Button onClick={() => { setStep(2); handleResend(); }} className="w-full"><Mail className="h-4 w-4 mr-2" />Send OTP</Button>
            </>
          )}
          {step === 2 && (
            <>
              <p className="text-sm text-muted-foreground font-body">Enter the 6-digit code sent to {email}</p>
              <div className="flex gap-2 justify-center">
                {otp.map((v, i) => (
                  <Input key={i} id={`otp-${i}`} value={v} onChange={e => handleOtpChange(i, e.target.value)} maxLength={1} className="w-12 h-12 text-center text-lg font-code" />
                ))}
              </div>
              <Button onClick={() => setStep(3)} className="w-full"><KeyRound className="h-4 w-4 mr-2" />Verify</Button>
              <button onClick={handleResend} disabled={cooldown > 0} className="text-sm text-primary hover:underline font-body w-full text-center disabled:text-muted-foreground">
                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP'}
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <div><Label className="font-body">New Password</Label><Input value={newPw} onChange={e => setNewPw(e.target.value)} type="password" className="mt-1" /></div>
              <div className="flex gap-1">{[1,2,3].map(i => <div key={i} className={`h-1.5 flex-1 rounded-full ${strength >= i ? (i === 1 ? 'bg-destructive' : i === 2 ? 'bg-status-ready' : 'bg-accent') : 'bg-muted'}`} />)}</div>
              <div><Label className="font-body">Confirm Password</Label><Input value={confirmPw} onChange={e => setConfirmPw(e.target.value)} type="password" className="mt-1" /></div>
              <Button onClick={() => setStep(4)} className="w-full" disabled={!newPw || newPw !== confirmPw}><Check className="h-4 w-4 mr-2" />Reset Password</Button>
            </>
          )}
          {step === 4 && (
            <div className="text-center py-4">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3"><Check className="h-6 w-6 text-accent" /></div>
              <p className="font-body font-semibold">Password reset successful!</p>
              <Link to="/auth/login"><Button variant="outline" className="mt-4">Back to Login</Button></Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

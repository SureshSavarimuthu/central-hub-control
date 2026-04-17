import { ReactNode } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { useAuth } from '@/contexts/AuthContext';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="flex min-h-screen w-full bg-background gradient-mesh noise-overlay relative">
      {/* Decorative ambient orbs (same as LoginPage) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-info/5 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-[26rem] h-[26rem] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <AppSidebar />
      <main className="flex-1 overflow-auto relative z-10">
        <div className="p-6 max-w-[1400px] mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

import { ReactNode } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { useAuth } from '@/contexts/AuthContext';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-[1400px] mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

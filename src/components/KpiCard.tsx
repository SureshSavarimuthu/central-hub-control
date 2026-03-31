import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
  pulse?: boolean;
}

export const KpiCard = ({ title, value, icon: Icon, trend, trendUp, className, pulse }: KpiCardProps) => (
  <div className={cn('bg-card rounded-lg border p-5 transition-all duration-200 hover:shadow-md', pulse && 'animate-pulse-ring', className)}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-body text-muted-foreground">{title}</p>
        <p className="text-2xl font-display font-bold mt-1">{value}</p>
        {trend && (
          <p className={cn('text-xs font-body mt-1', trendUp ? 'text-accent' : 'text-destructive')}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
  </div>
);

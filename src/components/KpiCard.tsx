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
  <div className={cn(
    'group relative bg-card rounded-2xl border border-border/50 p-5 transition-all duration-300',
    'hover:border-primary/20 hover:shadow-lg dark:hover:shadow-primary/5',
    pulse && 'animate-pulse-ring',
    className
  )}>
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-xs font-body font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="text-2xl font-display font-extrabold tracking-tight">{value}</p>
        {trend && (
          <p className={cn('text-xs font-body font-medium flex items-center gap-1', trendUp ? 'text-accent' : 'text-destructive')}>
            <span className={cn('inline-flex items-center justify-center h-4 w-4 rounded-full text-[10px]', trendUp ? 'bg-accent/10' : 'bg-destructive/10')}>
              {trendUp ? '↑' : '↓'}
            </span>
            {trend}
          </p>
        )}
      </div>
      <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center transition-all group-hover:bg-primary/15 group-hover:scale-105">
        <Icon className="h-5 w-5 text-primary" />
      </div>
    </div>
  </div>
);

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
    'group relative glass dark:glass-dark rounded-2xl border border-border/50 p-5 transition-all duration-300',
    'hover:border-primary/30 hover:shadow-xl dark:hover:shadow-primary/10 hover:-translate-y-0.5',
    pulse && 'animate-pulse-ring',
    className
  )}>
    {/* subtle top-edge highlight */}
    <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

    <div className="flex items-center justify-between">
      <div className="space-y-1.5">
        <p className="text-[11px] font-body font-medium uppercase tracking-[0.12em] text-muted-foreground">{title}</p>
        <p className="text-[28px] font-display font-extrabold tracking-tight leading-none">{value}</p>
        {trend && (
          <p className={cn('text-xs font-body font-medium flex items-center gap-1.5 pt-0.5', trendUp ? 'text-accent' : 'text-destructive')}>
            <span className={cn('inline-flex items-center justify-center h-4 w-4 rounded-full text-[10px] font-bold', trendUp ? 'bg-accent/15' : 'bg-destructive/15')}>
              {trendUp ? '↑' : '↓'}
            </span>
            {trend}
          </p>
        )}
      </div>
      <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center transition-all group-hover:bg-primary/15 group-hover:scale-105 group-hover:glow-primary">
        <Icon className="h-5 w-5 text-primary" />
      </div>
    </div>
  </div>
);

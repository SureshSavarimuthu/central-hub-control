import { OrderStatus } from '@/types';
import { cn } from '@/lib/utils';

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  'Pending':            { bg: 'bg-status-pending/10',        text: 'text-status-pending',       dot: 'bg-status-pending' },
  'Confirmed':          { bg: 'bg-status-confirmed/10',      text: 'text-status-confirmed',     dot: 'bg-status-confirmed' },
  'In Production':      { bg: 'bg-status-production/10',     text: 'text-status-production',    dot: 'bg-status-production' },
  'Ready for Dispatch': { bg: 'bg-status-ready/10',          text: 'text-status-ready',         dot: 'bg-status-ready' },
  'Ready':              { bg: 'bg-status-ready/10',          text: 'text-status-ready',         dot: 'bg-status-ready' },
  'Out for Delivery':   { bg: 'bg-status-out-delivery/10',   text: 'text-status-out-delivery',  dot: 'bg-status-out-delivery' },
  'Delivered':          { bg: 'bg-status-delivered/10',       text: 'text-status-delivered',     dot: 'bg-status-delivered' },
  'Cancelled':          { bg: 'bg-status-cancelled/10',       text: 'text-status-cancelled',     dot: 'bg-status-cancelled' },
  'On Hold':            { bg: 'bg-status-on-hold/10',         text: 'text-status-on-hold',       dot: 'bg-status-on-hold' },
  'In Progress':        { bg: 'bg-status-production/10',      text: 'text-status-production',    dot: 'bg-status-production' },
  'Paused':             { bg: 'bg-status-on-hold/10',         text: 'text-status-on-hold',       dot: 'bg-status-on-hold' },
  'Failed':             { bg: 'bg-status-cancelled/10',       text: 'text-status-cancelled',     dot: 'bg-status-cancelled' },
};

const fallback = { bg: 'bg-muted', text: 'text-muted-foreground', dot: 'bg-muted-foreground' };

export const StatusChip = ({ status, className }: { status: string; className?: string }) => {
  const config = statusConfig[status] || fallback;
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold font-body tracking-wide transition-colors',
      config.bg, config.text, className
    )}>
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />
      {status}
    </span>
  );
};

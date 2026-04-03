import { OrderStatus } from '@/types';
import { cn } from '@/lib/utils';

const statusConfig: Record<OrderStatus, { bg: string; text: string }> = {
  'Pending': { bg: 'bg-status-pending/15', text: 'text-status-pending' },
  'Confirmed': { bg: 'bg-status-confirmed/15', text: 'text-status-confirmed' },
  'In Production': { bg: 'bg-status-production/15', text: 'text-status-production' },
  'Ready for Dispatch': { bg: 'bg-status-ready/15', text: 'text-status-ready' },
  'Out for Delivery': { bg: 'bg-status-out-delivery/15', text: 'text-status-out-delivery' },
  'Delivered': { bg: 'bg-status-delivered/15', text: 'text-status-delivered' },
  'Cancelled': { bg: 'bg-status-cancelled/15', text: 'text-status-cancelled' },
  'On Hold': { bg: 'bg-status-on-hold/15', text: 'text-status-on-hold' },
};

export const StatusChip = ({ status, className }: { status: string; className?: string }) => {
  const config = statusConfig[status as OrderStatus] || { bg: 'bg-muted', text: 'text-muted-foreground' };
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-body transition-colors duration-200', config.bg, config.text, className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', config.text.replace('text-', 'bg-'))} />
      {status}
    </span>
  );
};
